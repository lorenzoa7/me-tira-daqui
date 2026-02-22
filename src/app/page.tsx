import { CreateGroupForm } from "@/components/create-group-form";
import { InstallButton } from "@/components/install-button";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <Logo size="lg" />
          <p className="text-muted-foreground text-base">
            Vote anonimamente pra sair do rolê.
            <br />
            Quando a maioria votar, todo mundo fica sabendo!
          </p>
        </div>

        <CreateGroupForm />

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground/60">
            Sem cadastro. Sem julgamento. Ninguém vai saber que foi você 🤫
          </p>
          <div className="flex justify-center">
            <InstallButton />
          </div>
        </div>
      </div>
    </main>
  );
}
