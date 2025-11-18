import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

type WhitepaperConfig = {
  id: string;
  downloadUrl?: string;
  formRecipient?: string;
  title?: string;
};

type ArticlesData = {
  whitepapers?: WhitepaperConfig[];
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, jobTitle, phone, whitepaperId, whitepaperTitle } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Name, email, and company are required' },
        { status: 400 }
      );
    }

    console.log('=== Whitepaper Download Request ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Company:', company);
    console.log('Job Title:', jobTitle || 'N/A');
    console.log('Phone:', phone || 'N/A');
    console.log('Whitepaper:', whitepaperTitle);
    console.log('Time:', new Date().toLocaleString());

    // Get download URL from articles.json
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'src', 'data', 'articles.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const articlesData = JSON.parse(fileContents) as ArticlesData;
    const whitepaper = articlesData.whitepapers?.find((entry) => entry.id === whitepaperId);
    const downloadUrl = whitepaper?.downloadUrl || '#';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://climate-seal.com';
    const fullDownloadUrl = downloadUrl.startsWith('http') ? downloadUrl : `${baseUrl}${downloadUrl}`;

    const hasEmailConfig = (
      (resend && process.env.RESEND_FROM_EMAIL) || 
      (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS)
    );

    if (hasEmailConfig) {
      const emailTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Climate Seal - Whitepaper Download</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #333; margin-top: 0;">Thank you for your interest!</h3>
              <p style="color: #555; line-height: 1.6;">
                Hi ${name},
              </p>
              <p style="color: #555; line-height: 1.6;">
                Thank you for requesting our whitepaper: <strong>${whitepaperTitle}</strong>
              </p>
              <p style="color: #555; line-height: 1.6;">
                You can download it using the link below:
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${fullDownloadUrl}" 
                   style="display: inline-block; background: #9ef894; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                  Download Whitepaper
                </a>
              </div>
              <p style="color: #555; line-height: 1.6; font-size: 12px;">
                If the button doesn't work, copy and paste this link into your browser:<br/>
                <a href="${fullDownloadUrl}" style="color: #667eea; word-break: break-all;">${fullDownloadUrl}</a>
              </p>
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
            subject: `Download: ${whitepaperTitle}`,
            html: emailTemplate,
          });

          // Also send notification to admin
          const adminEmail = whitepaper?.formRecipient || process.env.EMAIL_TO || 'xuguang.ma@climateseal.net';
          const adminTemplate = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>New Whitepaper Download Request</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Job Title:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${jobTitle || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Whitepaper:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${whitepaperTitle}</td></tr>
              </table>
            </div>
          `;

          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: adminEmail,
            subject: `New Whitepaper Download: ${whitepaperTitle}`,
            html: adminTemplate,
          });

          return NextResponse.json({ success: true }, { status: 200 });
        } catch (resendError) {
          console.error('Resend failed, falling back to nodemailer:', resendError);
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
          subject: `Download: ${whitepaperTitle}`,
          html: emailTemplate,
        });

        // Send admin notification
        const adminEmail = whitepaper?.formRecipient || process.env.EMAIL_TO || 'xuguang.ma@climateseal.net';
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: adminEmail,
          subject: `New Whitepaper Download: ${whitepaperTitle}`,
          html: `
            <h2>New Whitepaper Download Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Job Title:</strong> ${jobTitle || 'N/A'}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Whitepaper:</strong> ${whitepaperTitle}</p>
          `,
        });

        return NextResponse.json({ success: true }, { status: 200 });
      } catch (nodemailerError) {
        console.error('Nodemailer failed:', nodemailerError);
      }
    }

    // If no email config, still return success (download link will be shown on page)
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Whitepaper request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

