"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SectionTitle } from "@/components/section-title";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLogin } from "@/lib/api";
import { adminLoginFormSchema, getZodErrorMessage } from "@/lib/validation";

const TOKEN_KEY = "admin_token";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = adminLoginFormSchema.safeParse({ username, password });
    if (!parsed.success) {
      setError(getZodErrorMessage(parsed.error));
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await adminLogin(parsed.data.username, parsed.data.password);
      localStorage.setItem(TOKEN_KEY, response.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="section-shell py-10 space-y-6">
        <SectionTitle
          badge="Admin"
          title="Administrator Login"
          description="Authenticate with your backend admin credentials to access analytics and registrations."
        />
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? "Signing in..." : "Login"}
              </Button>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
            </form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
