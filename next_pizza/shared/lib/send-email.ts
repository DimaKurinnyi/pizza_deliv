import { Resend } from 'resend';

export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {
  const resend = new Resend('re_VdffvT6e_Dvsn5Rih2FYiRd9NeTpLAmmD');

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    react: template,
  });
  if (error) {
    throw error;
  }
  return data;
};
