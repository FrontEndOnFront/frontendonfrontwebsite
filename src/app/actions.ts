'use server'

import { Resend } from 'resend';

const resend = new Resend('re_AZLqrnY1_F2c3Tz7pD7SZnFgHGEyGkPuG');

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const { name, company, email, phone, service, message } = data;

    const { data: emailData, error } = await resend.emails.send({
      from: 'FrontEndonFront <onboarding@resend.dev>',
      to: ['hello@frontendonfront.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Interested In:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { error: error.message || 'Failed to send email' };
  }
} 