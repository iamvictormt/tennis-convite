"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitRegistration(formData: FormData) {
  const nome = formData.get("nome") as string
  const clube = formData.get("clube") as string
  const whatsapp = formData.get("whatsapp") as string
  const email = formData.get("email") as string

  if (!nome || !clube || !email) {
    return { success: false, message: "Preencha todos os campos obrigatorios." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: "E-mail invalido." }
  }

  try {
    await resend.emails.send({
      from: "Torneios de Tenis <onboarding@resend.dev>",
      to: "bolaocadastro@gmail.com",
      subject: `Novo Cadastro - ${nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #d4910a; border-bottom: 2px solid #d4910a; padding-bottom: 10px;">
            Novo Cadastro - Torneios de Tenis
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 8px; font-weight: bold; color: #555;">Nome:</td>
              <td style="padding: 12px 8px;">${nome}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 8px; font-weight: bold; color: #555;">Clube:</td>
              <td style="padding: 12px 8px;">${clube}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 12px 8px; font-weight: bold; color: #555;">WhatsApp:</td>
              <td style="padding: 12px 8px;">${whatsapp || "Nao informado"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 8px; font-weight: bold; color: #555;">E-mail:</td>
              <td style="padding: 12px 8px;">${email}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">
            Enviado automaticamente pelo formulario de cadastro.
          </p>
        </div>
      `,
    })

    return { success: true, message: "Cadastro realizado com sucesso!" }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return {
      success: false,
      message: "Erro ao enviar cadastro. Tente novamente.",
    }
  }
}
