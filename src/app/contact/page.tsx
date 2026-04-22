"use client";

import { FormEvent, useState } from "react";
import { useEffect } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SectionTitle } from "@/components/section-title";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FAQItem, getFaq, submitQuery } from "@/lib/api";
import { contactFormSchema, getZodErrorMessage } from "@/lib/validation";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [faqLoading, setFaqLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [faq, setFaq] = useState<FAQItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    getFaq()
      .then(setFaq)
      .catch(() => setFaq([]))
      .finally(() => setFaqLoading(false));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = contactFormSchema.safeParse(form);
    if (!parsed.success) {
      setStatus(getZodErrorMessage(parsed.error));
      return;
    }

    try {
      setLoading(true);
      setStatus("");
      await submitQuery(parsed.data);
      setStatus("Your query has been submitted successfully.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
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
          badge="Help Desk"
          title="Contact Organizers"
          description="Send a question to the event team. Queries are tracked through the admin dashboard."
        />
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Organizer Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>Email: prabuddha@tint.edu.in</p>
            <p>Phone: +91 98300 00000</p>
            <p>Venue: Techno International New Town, Kolkata</p>
          </CardContent>
        </Card>
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Submit a Query</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                />
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Submit Query"}
                </Button>
                {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {faqLoading ? (
              <p className="text-muted-foreground">Loading FAQs from the database...</p>
            ) : faq.length === 0 ? (
              <p className="text-muted-foreground">No FAQs found in the database yet.</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {faq.map((item) => (
                  <div key={item.id} className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(88,28,135,.12),rgba(31,41,55,.65))] p-4 shadow-sm">
                    <p className="font-display text-base font-bold text-slate-100">{item.question}</p>
                    <p className="mt-2 leading-6 text-slate-300">{item.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
