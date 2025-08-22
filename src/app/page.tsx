import { Code2 } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
          <Code2 className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary">Welcome to DTable Assist</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your AI assistant for DTable Analytics and AppScript is ready.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Click the chat icon in the bottom right corner to get started.
        </p>
      </div>
    </main>
  );
}
