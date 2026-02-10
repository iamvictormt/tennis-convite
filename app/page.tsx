import { TrophyIcon } from "@/components/trophy-icon"
import { RegistrationForm } from "@/components/registration-form"

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <header className="mb-10 flex flex-col items-center gap-5 text-center">
          <div className="animate-scale-in">
            <TrophyIcon />
          </div>

          <p
            className="animate-fade-in text-sm font-medium tracking-wider text-primary"
            style={{ animationDelay: "0.15s" }}
          >
            {"✨ CONVITE EXCLUSIVO ✨"}
          </p>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              Algo Grandioso
              <br />
              <span className="text-primary">{"Esta Sendo Criado"}</span>
            </h1>
          </div>

          <div
            className="animate-fade-in-up flex flex-col gap-1"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="text-base text-muted-foreground">
              Participe dos maiores torneios do tenis mundial
            </p>
            <p className="text-sm text-muted-foreground/70">
              Exclusivo para apaixonados pelo esporte
            </p>
          </div>
        </header>

        {/* Form */}
        <RegistrationForm />

        {/* Footer */}
        <footer
          className="animate-fade-in mt-6 text-center text-xs text-muted-foreground/60"
          style={{ animationDelay: "1.1s" }}
        >
          {"© 2025 \u2022 Torneios de Tenis"}
        </footer>
      </div>
    </main>
  )
}
