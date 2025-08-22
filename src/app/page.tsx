import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code2 } from 'lucide-react';
import { redirect } from 'next/navigation';

async function login(formData: FormData) {
  'use server';
  // In a real app, you would validate credentials here.
  // For this demo, we'll just redirect.
  redirect('/chat');
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <form action={login}>
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-3">
                   <Code2 className="h-10 w-10 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-primary">DTable Assist</CardTitle>
              <CardDescription>Sign in to access your AppScript assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required suppressHydrationWarning />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                    </a>
                </div>
                <Input id="password" type="password" required suppressHydrationWarning />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" suppressHydrationWarning>
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </main>
  );
}
