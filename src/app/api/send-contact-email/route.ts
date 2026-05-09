import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  badRequest,
  escapeHtml,
  escapeHtmlWithLineBreaks,
  getRequestId,
  isValidEmail,
  isValidPhone,
  logApiEvent,
  normalizeText,
  validateRequiredFields,
} from '@/lib/api';
import { findReferralOwnerByCode, saveContactSubmission, saveReferralUse } from '@/lib/admin-store';

// 初始化Resend（如果有API key的话）
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FALLBACK_CONTACT = {
  email: 'xuguang.ma@climateseal.net',
  phone: '+86 15652618365',
};

function successWithFallback() {
  return NextResponse.json(
    {
      success: true,
      fallback: true,
      contactInfo: FALLBACK_CONTACT,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId();

  try {
    const body = await request.json();
    const name = normalizeText(body?.name);
    const email = normalizeText(body?.email).toLowerCase();
    const phone = normalizeText(body?.phone);
    const company = normalizeText(body?.company);
    const industry = normalizeText(body?.industry);
    const message = normalizeText(body?.message);
    const referralCode = normalizeText(body?.referralCode).toUpperCase();

    const missingFields = validateRequiredFields(
      { name, email, phone, company, industry, message },
      ['name', 'email', 'phone', 'company', 'industry', 'message']
    );

    if (missingFields.length > 0) {
      return badRequest(requestId, `Missing required fields: ${missingFields.join(', ')}`);
    }

    if (!isValidEmail(email)) {
      return badRequest(requestId, 'Please provide a valid email address');
    }

    if (!isValidPhone(phone)) {
      return badRequest(requestId, 'Please provide a valid phone number');
    }

    const referralOwner = referralCode ? await findReferralOwnerByCode(referralCode) : null;

    if (referralCode && !referralOwner) {
      return badRequest(requestId, 'Referral code not found or inactive');
    }

    await saveContactSubmission({
      id: requestId,
      submittedAt: new Date().toISOString(),
      name,
      email,
      phone,
      company,
      industry,
      message,
      referralCode: referralOwner?.referralCode,
      referralOwnerId: referralOwner?.id,
      referralOwnerName: referralOwner?.name,
    });

    if (referralOwner) {
      await saveReferralUse({
        id: `${requestId}-ref`,
        createdAt: new Date().toISOString(),
        referralCode: referralOwner.referralCode,
        referralOwnerId: referralOwner.id,
        referralOwnerName: referralOwner.name,
        referredName: name,
        referredEmail: email,
        referredCompany: company,
        source: 'contact_form',
        contactSubmissionId: requestId,
        status: 'new',
        rewardValueUsd: 200,
      });
    }

    logApiEvent('send-contact-email', requestId, 'received', {
      hasResendConfig: Boolean(resend && process.env.RESEND_FROM_EMAIL),
      hasSmtpConfig: Boolean(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS),
      industry,
      hasReferral: Boolean(referralOwner),
    });

    // 检查是否配置了邮件服务
    const hasEmailConfig = (
      (resend && process.env.RESEND_FROM_EMAIL) || 
      (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS)
    );

    if (!hasEmailConfig) {
      logApiEvent('send-contact-email', requestId, 'fallback-no-email-config');
      return successWithFallback();
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeCompany = escapeHtml(company);
    const safeIndustry = escapeHtml(industry);
    const safeMessage = escapeHtmlWithLineBreaks(message);
    const safeReferralCode = escapeHtml(referralOwner?.referralCode ?? referralCode ?? '');
    const safeReferralOwnerName = escapeHtml(referralOwner?.name ?? '');
    const submittedAt = new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0;">Climate Seal - 新的联系表单提交</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px;">
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0;">客户信息</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">姓名:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">邮箱:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                  <a href="mailto:${safeEmail}" style="color: #667eea; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">电话:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">
                  <a href="tel:${safePhone}" style="color: #667eea; text-decoration: none;">${safePhone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">公司:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">行业:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${safeIndustry}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">推荐码:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${safeReferralCode || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">推荐人:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${safeReferralOwnerName || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">留言:</td>
                <td style="padding: 10px 0; color: #333;">${safeMessage}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #e8f2ff; border-left: 4px solid #667eea; border-radius: 4px;">
              <p style="margin: 0; color: #555; font-size: 14px;">
                📅 提交时间: ${submittedAt}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
            <p>此邮件由 Climate Seal 网站自动发送</p>
          </div>
        </div>
      </div>
    `;

    // 如果配置了Resend，使用Resend发送
    if (resend && process.env.RESEND_FROM_EMAIL) {
      try {
        const { data, error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: [
            process.env.EMAIL_TO || 'xuguang.ma@climateseal.net',
            'michaelmaplus@gmail.com' // 同时发送到Gmail备份
          ],
          subject: `新的联系表单提交 - ${safeName}`,
          html: emailTemplate,
        });

        if (error) {
          logApiEvent('send-contact-email', requestId, 'resend-error', {
            message: error.message,
          });
          throw new Error('Failed to send with Resend');
        }

        logApiEvent('send-contact-email', requestId, 'sent-via-resend');
        return NextResponse.json(
          { success: true, data },
          { status: 200 }
        );
      } catch (resendError) {
        logApiEvent('send-contact-email', requestId, 'resend-fallback-to-smtp', {
          message: resendError instanceof Error ? resendError.message : 'unknown error',
        });
      }
    }

    // 回退到原来的nodemailer方式
    try {
      const nodemailer = await import('nodemailer');
      
      // 创建邮件传输器
      const transporter = nodemailer.default.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 邮件内容
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO || 'xuguang.ma@climateseal.net',
        subject: `新的联系表单提交 - ${safeName}`,
        html: emailTemplate,
      };

      // 发送邮件
      await transporter.sendMail(mailOptions);

      logApiEvent('send-contact-email', requestId, 'sent-via-smtp');
      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    } catch (nodemailerError) {
      logApiEvent('send-contact-email', requestId, 'smtp-fallback-response', {
        message: nodemailerError instanceof Error ? nodemailerError.message : 'unknown error',
      });
      return successWithFallback();
    }

  } catch (error) {
    logApiEvent('send-contact-email', requestId, 'unhandled-fallback-response', {
      message: error instanceof Error ? error.message : 'unknown error',
    });
    return successWithFallback();
  }
}
