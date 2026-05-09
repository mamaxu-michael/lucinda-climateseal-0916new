import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  badRequest,
  escapeHtml,
  getRequestId,
  isValidEmail,
  isValidPhone,
  logApiEvent,
  normalizeText,
  serverError,
  validateRequiredFields,
} from '@/lib/api';
import { getWhitepaperById } from '@/lib/content';
import { getWhitepaperDownloadUrl, hasWhitepaperDownloadAsset } from '@/lib/whitepaper-assets';
import { saveWhitepaperSubmission } from '@/lib/admin-store';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  const requestId = getRequestId();

  try {
    const body = await request.json();
    const name = normalizeText(body?.name);
    const email = normalizeText(body?.email).toLowerCase();
    const company = normalizeText(body?.company);
    const jobTitle = normalizeText(body?.jobTitle);
    const phone = normalizeText(body?.phone);
    const whitepaperId = normalizeText(body?.whitepaperId);
    const whitepaperTitle = normalizeText(body?.whitepaperTitle);

    const missingFields = validateRequiredFields(
      { name, email, company, whitepaperId },
      ['name', 'email', 'company', 'whitepaperId']
    );

    if (missingFields.length > 0) {
      return badRequest(requestId, `Missing required fields: ${missingFields.join(', ')}`);
    }

    if (!isValidEmail(email)) {
      return badRequest(requestId, 'Please provide a valid email address');
    }

    if (phone && !isValidPhone(phone)) {
      return badRequest(requestId, 'Please provide a valid phone number');
    }

    const whitepaper = getWhitepaperById(whitepaperId);
    if (!whitepaper) {
      return badRequest(requestId, 'Whitepaper not found');
    }

    const resolvedWhitepaperTitle = whitepaperTitle || whitepaper.title;
    const downloadUrl = getWhitepaperDownloadUrl(whitepaper);
    const instantDownloadAvailable = hasWhitepaperDownloadAsset(whitepaper);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';
    const hasEmailConfig = (
      (resend && process.env.RESEND_FROM_EMAIL) || 
      (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS)
    );
    const fullDownloadUrl = downloadUrl
      ? (downloadUrl.startsWith('http') ? downloadUrl : `${baseUrl}${downloadUrl}`)
      : null;
    const deliveryMode = instantDownloadAvailable ? 'download' : hasEmailConfig ? 'email' : 'manual';

    await saveWhitepaperSubmission({
      id: requestId,
      submittedAt: new Date().toISOString(),
      name,
      email,
      company,
      jobTitle,
      phone,
      whitepaperId,
      whitepaperTitle: resolvedWhitepaperTitle,
      instantDownloadAvailable,
      deliveryMode,
    });

    logApiEvent('send-whitepaper-request', requestId, 'received', {
      whitepaperId,
      hasResendConfig: Boolean(resend && process.env.RESEND_FROM_EMAIL),
      hasSmtpConfig: Boolean(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS),
    });

    if (hasEmailConfig) {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeCompany = escapeHtml(company);
      const safeJobTitle = escapeHtml(jobTitle || 'N/A');
      const safePhone = escapeHtml(phone || 'N/A');
      const safeWhitepaperTitle = escapeHtml(resolvedWhitepaperTitle);
      const safeDownloadUrl = fullDownloadUrl ? escapeHtml(fullDownloadUrl) : '';
      const deliveryCopy = instantDownloadAvailable
        ? `
              <p style="color: #555; line-height: 1.6;">
                You can download it using the link below:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${safeDownloadUrl}" 
                   style="display: inline-block; background: #9ef894; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                  Download Whitepaper
                </a>
              </div>
              <p style="color: #555; line-height: 1.6; font-size: 12px;">
                If the button doesn't work, copy and paste this link into your browser:<br/>
                <a href="${safeDownloadUrl}" style="color: #667eea; word-break: break-all;">${safeDownloadUrl}</a>
              </p>
          `
        : `
              <p style="color: #555; line-height: 1.6;">
                Our team is preparing the latest download file and will send it to you shortly.
              </p>
          `;

      const emailTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Climate Seal - Whitepaper Download</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin-top: 0;">Thank you for your interest!</h3>
              <p style="color: #555; line-height: 1.6;">
                Hi ${safeName},
              </p>
              <p style="color: #555; line-height: 1.6;">
                Thank you for requesting our whitepaper: <strong>${safeWhitepaperTitle}</strong>
              </p>
              ${deliveryCopy}
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #999; font-size: 12px; margin: 0;">
                Best regards,<br/>
                Climate Seal Team
              </p>
            </div>
          </div>
        </div>
      `;

      // Try Resend first
        if (resend && process.env.RESEND_FROM_EMAIL) {
        try {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: email,
            subject: `Download: ${safeWhitepaperTitle}`,
            html: emailTemplate,
          });

          // Also send notification to admin
          const adminEmail = whitepaper?.formRecipient || process.env.EMAIL_TO || 'xuguang.ma@climateseal.net';
          const adminTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Whitepaper Download Request</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeName}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeEmail}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeCompany}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Job Title:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeJobTitle}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safePhone}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Whitepaper:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${safeWhitepaperTitle}</td></tr>
              </table>
            </div>
          `;

          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: adminEmail,
            subject: `New Whitepaper Download: ${safeWhitepaperTitle}`,
            html: adminTemplate,
          });

          logApiEvent('send-whitepaper-request', requestId, 'sent-via-resend', {
            whitepaperId,
            instantDownloadAvailable,
          });
          return NextResponse.json(
            { success: true, deliveryMode },
            { status: 200 }
          );
        } catch (resendError) {
          logApiEvent('send-whitepaper-request', requestId, 'resend-fallback-to-smtp', {
            whitepaperId,
            message: resendError instanceof Error ? resendError.message : 'unknown error',
          });
        }
      }

      // Fallback to nodemailer
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Download: ${resolvedWhitepaperTitle}`,
          html: emailTemplate,
        });

        // Send admin notification
        const adminEmail = whitepaper?.formRecipient || process.env.EMAIL_TO || 'xuguang.ma@climateseal.net';
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: adminEmail,
          subject: `New Whitepaper Download: ${resolvedWhitepaperTitle}`,
          html: `
            <h2>New Whitepaper Download Request</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Company:</strong> ${safeCompany}</p>
            <p><strong>Job Title:</strong> ${safeJobTitle}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Whitepaper:</strong> ${safeWhitepaperTitle}</p>
          `,
        });

        logApiEvent('send-whitepaper-request', requestId, 'sent-via-smtp', {
          whitepaperId,
          instantDownloadAvailable,
        });
        return NextResponse.json(
          { success: true, deliveryMode },
          { status: 200 }
        );
      } catch (nodemailerError) {
        logApiEvent('send-whitepaper-request', requestId, 'smtp-send-failed', {
          whitepaperId,
          message: nodemailerError instanceof Error ? nodemailerError.message : 'unknown error',
        });
      }
    }

    // If no email config is available, only direct downloads can be fulfilled instantly.
    logApiEvent('send-whitepaper-request', requestId, 'success-without-email-config', {
      whitepaperId,
      instantDownloadAvailable,
    });
    return NextResponse.json(
      { success: true, deliveryMode },
      { status: 200 }
    );

  } catch (error) {
    logApiEvent('send-whitepaper-request', requestId, 'unhandled-error', {
      message: error instanceof Error ? error.message : 'unknown error',
    });
    return serverError(requestId);
  }
}
