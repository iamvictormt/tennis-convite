"use client"

import { useState, useTransition, type ChangeEvent } from "react"
import { Send } from "lucide-react"
import { submitRegistration } from "@/app/actions"

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)

  if (digits.length === 0) return ""
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function RegistrationForm() {
  const [isPending, startTransition] = useTransition()
  const [whatsapp, setWhatsapp] = useState("")
  const [result, setResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  function handleWhatsAppChange(e: ChangeEvent<HTMLInputElement>) {
    setWhatsapp(formatWhatsApp(e.target.value))
  }

  function handleSubmit(formData: FormData) {
    setResult(null)
    startTransition(async () => {
      const res = await submitRegistration(formData)
      setResult(res)
      if (res.success) {
        const form = document.getElementById("registration-form") as HTMLFormElement
        form?.reset()
        setWhatsapp("")
      }
    })
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary"

  return (
    <form id="registration-form" action={handleSubmit} className="flex flex-col gap-6">
      {/* Nome */}
      <div className="animate-fade-in-up flex flex-col gap-2" style={{ animationDelay: "0.4s" }}>
        <label htmlFor="nome" className="text-sm font-medium text-foreground">
          Nome <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Seu nome completo"
          required
          className={inputClasses}
        />
      </div>

      {/* Clube */}
      <div className="animate-fade-in-up flex flex-col gap-2" style={{ animationDelay: "0.5s" }}>
        <label htmlFor="clube" className="text-sm font-medium text-foreground">
          Clube em que joga tênis <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="clube"
          name="clube"
          placeholder="Nome do clube ou (avulso)"
          required
          className={inputClasses}
        />
      </div>

      {/* WhatsApp */}
      <div className="animate-fade-in-up flex flex-col gap-2" style={{ animationDelay: "0.6s" }}>
        <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
          WhatsApp <span className="text-xs text-muted-foreground">(opcional)</span>
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          placeholder="(00) 00000-0000"
          value={whatsapp}
          onChange={handleWhatsAppChange}
          className={inputClasses}
        />
      </div>

      {/* Email */}
      <div className="animate-fade-in-up flex flex-col gap-2" style={{ animationDelay: "0.7s" }}>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          E-mail <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="seu@email.com"
          required
          className={inputClasses}
        />
      </div>

      {/* Share text */}
      <p className="animate-fade-in text-center text-sm text-primary" style={{ animationDelay: "0.8s" }}>
        Compartilhe este QR Code com seu amigo que tambem ama nosso esporte
      </p>

      {/* Result message */}
      {result && (
        <div
          className={`animate-fade-in-up rounded-lg px-4 py-3 text-center text-sm font-medium ${
            result.success
              ? "bg-green-900/30 text-green-400"
              : "bg-red-900/30 text-red-400"
          }`}
        >
          {result.message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="animate-fade-in-up animate-pulse-glow flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 text-base font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] disabled:opacity-60 disabled:animate-none"
        style={{ animationDelay: "0.9s" }}
      >
        <Send className="h-5 w-5" />
        {isPending ? "Enviando..." : "Quero Participar"}
      </button>

      {/* Required fields notice */}
      <p className="animate-fade-in text-center text-xs text-muted-foreground" style={{ animationDelay: "1s" }}>
        Campos com <span className="text-primary">*</span> são obrigatórios
      </p>
    </form>
  )
}
