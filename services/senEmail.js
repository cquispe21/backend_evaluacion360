
export async function sendEmail(toEmail) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY); 

  try {
    const response = await resend.emails.send({
      from: 'delivered@resend.dev',
      to: toEmail,
      subject: 'Hello World from Resend',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    });

    console.log('Email enviado:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw error;
  }
}
