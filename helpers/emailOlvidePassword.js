import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  // Enviar email
  const info = await transporter.sendMail({
    from: "APV- Administrador de Pacientes Veterinarios",
    to: email,
    subject: "Reestablece tu contraseña",
    text: "Reestablece tu contraseña",
    html: `
        <p>Hola ${nombre}, has solicitado reestablecer tu contraseña.</p>

        <p>Sólo debes seguir el siguiente <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">enlace</a></p>

        <p>Si tú no solicitaste cambiar tu contraseña, puedes ignorar este mensaje</p>

    `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
