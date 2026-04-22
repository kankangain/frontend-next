"use client";

import { FormEvent, useState } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SectionTitle } from "@/components/section-title";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userLogin } from "@/lib/api";
import { getZodErrorMessage, userLoginFormSchema } from "@/lib/validation";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = userLoginFormSchema.safeParse({ email, password });
    if (!parsed.success) {
      setStatus(getZodErrorMessage(parsed.error));
      return;
    }

    try {
      setLoading(true);
      setStatus("");
      const data = await userLogin(parsed.data.email, parsed.data.password);
      if (!data) {
        throw new Error("Unable to login.");
      }
      localStorage.setItem("user_token", data.token);
      setStatus(`Welcome ${data.user.name}. Role: ${data.user.role}.`);
    } catch (err) {
      setStatus((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="section-shell py-10 space-y-6">
        <SectionTitle
          badge="User Login"
          title="Participant, Volunteer, Faculty, Organizer"
          description="Use your account credentials to access your role-aware experience."
        />
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </Button>
              {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
            </form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
