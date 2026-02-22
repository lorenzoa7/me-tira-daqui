import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm text-center space-y-6">
        <div className="space-y-2">
          <p className="text-8xl font-bold text-primary/20">404</p>
          <h1 className="text-2xl font-bold">
            Parece que você já vazou demais 😅
          </h1>
          <p className="text-muted-foreground">
            Essa página não existe. Talvez alguém já tenha te tirado daqui antes de você chegar.
          </p>
        </div>

        <p className="text-sm text-muted-foreground/50">
          A galera foi embora e esqueceu de te avisar 🫠
        </p>

        <Button variant="secondary" className="gap-2" asChild>
          <a href="/">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </a>
        </Button>
      </div>
    </main>
  );
}
