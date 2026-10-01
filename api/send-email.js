import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const {
      type,
      name,
      email,
      company,
      projectType,
      budget,
      timeline,
      description,
      role,
      engagement,
      details,
    } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required',
      });
    }

    if (type !== 'project' && type !== 'talent') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request type',
      });
    }

    const isProject = type === 'project';

    const subject = isProject
      ? `New Build a Solution enquiry from ${name}`
      : `New Hire Talent request from ${name}`;

    const internalEmail = isProject
      ? `
        <h2>New Build a Solution Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not provided'}</p>
        <p><strong>Budget:</strong> ${budget || 'Not provided'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not provided'}</p>
        <p><strong>Description:</strong></p>
        <p>${description || 'Not provided'}</p>
      `
      : `
        <h2>New Hire Talent Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Role:</strong> ${role || 'Not provided'}</p>
        <p><strong>Engagement:</strong> ${engagement || 'Not provided'}</p>
        <p><strong>Details:</strong></p>
        <p>${details || 'Not provided'}</p>
      `;

    // Send internal notification
    const { data: internalData, error: internalError } =
      await resend.emails.send({
        from: 'Dceetechbro <onboarding@resend.dev>',
        to: ['dceetechbro@gmail.com'],
        subject,
        html: internalEmail,
      });

    if (internalError) {
      console.error('Internal email error:', internalError);

      return res.status(500).json({
        success: false,
        message: 'Unable to send internal email notification',
        error: internalError.message,
      });
    }

    console.log('Internal email sent:', internalData);

    // Send visitor confirmation
    const { data: visitorData, error: visitorError } =
      await resend.emails.send({
        from: 'Dceetechbro <onboarding@resend.dev>',
        to: [email],
        subject: 'We received your request — Dceetechbro',
        html: `
          <h2>Thanks for reaching out to Dceetechbro, ${name}.</h2>

          <p>We've received your request and our team will review it shortly.</p>

          <p>We'll get back to you using the contact information you provided.</p>

          <br>

          <p>— Dceetechbro</p>
        `,
      });

    if (visitorError) {
      console.error('Visitor email error:', visitorError);

      return res.status(500).json({
        success: false,
        message: 'Internal notification sent, but visitor confirmation failed',
        error: visitorError.message,
      });
    }

    console.log('Visitor email sent:', visitorData);

    return res.status(200).json({
      success: true,
      message: 'Emails sent successfully',
      internalEmailId: internalData?.id,
      visitorEmailId: visitorData?.id,
    });
  } catch (error) {
    console.error('Email error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to send email',
    });
  }
}