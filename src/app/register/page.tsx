"use client";

import { FormEvent, useEffect, useState } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SectionTitle } from "@/components/section-title";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EventItem, UserRole, createUser, getEvents, registerForEvent, uploadIdCard } from "@/lib/api";
import { getZodErrorMessage, registerFormSchema, validateIdCardFile } from "@/lib/validation";

export default function RegisterPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    password: "",
    role: "participant" as UserRole,
    eventId: "",
  });

  useEffect(() => {
    getEvents().then(setEvents).catch((err: Error) => setStatus(err.message));
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = registerFormSchema.safeParse(form);
    if (!parsed.success) {
      setStatus(getZodErrorMessage(parsed.error));
      return;
    }

    const fileValidationError = validateIdCardFile(idCardFile);
    if (fileValidationError) {
      setStatus(fileValidationError);
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      let idCardUrl = "";
      if (idCardFile) {
        idCardUrl = await uploadIdCard(idCardFile);
      }

      const user = await createUser({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        college: parsed.data.college,
        year: parsed.data.year,
        password: parsed.data.password,
        role: parsed.data.role as UserRole,
        id_card_url: idCardUrl || undefined,
      });
      await registerForEvent(user.id, Number(parsed.data.eventId));
      setStatus("Registration submitted successfully. Check your email for confirmation.");
      setForm({ name: "", email: "", phone: "", college: "", year: "", password: "", role: "participant", eventId: "" });
      setIdCardFile(null);
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
          badge="Registration"
          title="Join an Event"
          description="Create your attendee profile and reserve your event seat in one flow."
        />

        <Card className="max-w-3xl">
          <CardHeader>
            <CardTitle>Participant Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
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
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="college">College</Label>
                <Input
                  id="college"
                  required
                  value={form.college}
                  onChange={(e) => setForm((p) => ({ ...p, college: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  required
                  value={form.year}
                  onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as UserRole }))}
                  required
                >
                  <option value="participant">Participant</option>
                  <option value="organizer">Organizer</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  minLength={6}
                  required
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="event">Event</Label>
                <select
                  id="event"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.eventId}
                  onChange={(e) => setForm((p) => ({ ...p, eventId: e.target.value }))}
                  required
                >
                  <option value="">Select an event</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} ({event.category})
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="id-card">Student ID Upload (optional)</Label>
                <Input
                  id="id-card"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => setIdCardFile(e.target.files?.[0] || null)}
                />
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Complete Registration"}
                </Button>
                {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
