import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const body = await req.json();
    const { fullName, rollNumber, department, position, contact, statement } = body;

    if (!fullName || !contact) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fallback/Mock Mode if API Key is missing (for local testing)
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('⚠️ RESEND_API_KEY is missing. Application received (MOCKED):', body);
      // We return success so the user can see the "Application Sent" screen during development
      return NextResponse.json({ 
        success: true, 
        mock: true,
        message: 'Development Mock: Application would be sent here if API key was present.' 
      });
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      // NOTE: Update 'from' once you have a verified domain in Resend
      from: 'Sanjivani FC <onboarding@resend.dev>',
      to: ['tanmaygawali68@gmail.com'],
      subject: `New Player Application: ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #1e40af; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Player Application Received</h1>
          </div>
          <div style="padding: 32px; color: #1e293b;">
            <h2 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-bottom: 24px;">Applicant Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Full Name:</td>
                <td style="padding: 8px 0; font-weight: 600;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Roll Number:</td>
                <td style="padding: 8px 0;">${rollNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Department:</td>
                <td style="padding: 8px 0;">${department}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Position:</td>
                <td style="padding: 8px 0; color: #1e40af; font-weight: bold;">${position}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Contact No:</td>
                <td style="padding: 8px 0; font-weight: 600;">${contact}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #f1f5f9;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Statement of Interest</h3>
              <p style="line-height: 1.6; margin-bottom: 0;">${statement}</p>
            </div>
            
            <div style="margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center;">
              This email was generated automatically by the Sanjivani FC recruitment portal.
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message || 'Email service error' }, { status: 500 });
    }

    console.log('✅ Application email sent successfully:', data?.id);
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
