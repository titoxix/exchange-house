import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const host_url = process.env.HOST_URL;

export const sendEmail = async (
  to: string[],
  userName: string,
  token: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Currency Exchange <onboarding@resend.dev>",
      to,
      subject: "Activación de cuenta",
      html: `Hola <strong>${userName}!</strong>, por favor haz click en el siguiente enlace para activar tu cuenta: <a href="${host_url}/activate/${token}">Activar cuenta</a>`,
      text: `Hola ${userName}!, por favor haz click en el siguiente enlace para activar tu cuenta: ${host_url}/activate/${token}`,
    });
    if (error) {
      console.error({ error });
      return { error, data: null };
    }
    console.log({ data });
    return { data, error: null };
  } catch (error) {
    throw error;
  }
};
