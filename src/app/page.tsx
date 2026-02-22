import { CreateGroupForm } from "@/components/create-group-form";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight">
            🍺 Me Tira Daqui!
          </h1>
          <p className="text-muted-foreground text-lg">
            Vote anonimamente pra sair do role.
            <br />
            Quando a maioria votar, todo mundo fica sabendo!
          </p>
        </div>

        <CreateGroupForm />

        <div className="text-sm text-muted-foreground/60 space-y-1">
          <p>Sem cadastro. Sem julgamento. Sem culpa.</p>
          <p>Ninguem vai saber que foi voce 🤫</p>
        </div>
      </div>
    </main>
  );
}
