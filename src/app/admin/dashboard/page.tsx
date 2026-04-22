"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { SectionTitle } from "@/components/section-title";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AdminStats,
  createEvent,
  getAdminRecent,
  getAdminRegistrations,
  getAdminStats,
  getQueries,
  QueryRow,
  RecentDashboardData,
  RegistrationRow,
  respondToQuery,
  updateQueryStatus,
} from "@/lib/api";

const TOKEN_KEY = "admin_token";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recent, setRecent] = useState<RecentDashboardData | null>(null);
  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [queries, setQueries] = useState<QueryRow[]>([]);
  const [queryFilter, setQueryFilter] = useState<"new" | "in-progress" | "resolved" | "">("");
  const [responseById, setResponseById] = useState<Record<number, string>>({});
  const [eventForm, setEventForm] = useState({
    title: "",
    category: "",
    description: "",
    rules: "",
    eligibility: "",
    prize_details: "",
    date: "",
    time: "",
    venue: "",
    max_participants: "",
    registration_fee: "",
    image_url: "",
  });
  const [eventStatus, setEventStatus] = useState("");
  const [eventSubmitting, setEventSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    Promise.all([getAdminStats(token), getAdminRecent(token), getAdminRegistrations(token)])
      .then(([statsData, recentData, registrationData]) => {
        setStats(statsData);
        setRecent(recentData);
        setRows(registrationData);
      })
      .catch((err: Error) => setError(err.message));
  }, [router]);

  useEffect(() => {
    getQueries(queryFilter || undefined).then(setQueries).catch(() => setQueries([]));
  }, [queryFilter]);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    router.push("/admin/login");
  };

  const handleStatusUpdate = async (id: number, status: "new" | "in-progress" | "resolved") => {
    try {
      await updateQueryStatus(id, status);
      const updated = await getQueries(queryFilter || undefined);
      setQueries(updated);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleRespond = async (id: number) => {
    const text = responseById[id];
    if (!text) {
      return;
    }
    try {
      await respondToQuery(id, text);
      setResponseById((prev) => ({ ...prev, [id]: "" }));
      const updated = await getQueries(queryFilter || undefined);
      setQueries(updated);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCreateEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.category || !eventForm.description || !eventForm.date || !eventForm.time) {
      setEventStatus("Please fill title, category, description, date, and time.");
      return;
    }

    try {
      setEventSubmitting(true);
      setEventStatus("");
      const created = await createEvent({
        title: eventForm.title.trim(),
        category: eventForm.category.trim(),
        description: eventForm.description.trim(),
        rules: eventForm.rules.trim() || undefined,
        eligibility: eventForm.eligibility.trim() || undefined,
        prize_details: eventForm.prize_details.trim() || undefined,
        date: eventForm.date,
        time: eventForm.time,
        venue: eventForm.venue.trim() || undefined,
        max_participants: eventForm.max_participants ? Number(eventForm.max_participants) : undefined,
        registration_fee: eventForm.registration_fee ? Number(eventForm.registration_fee) : undefined,
        image_url: eventForm.image_url.trim() || undefined,
      });

      setEventForm({
        title: "",
        category: "",
        description: "",
        rules: "",
        eligibility: "",
        prize_details: "",
        date: "",
        time: "",
        venue: "",
        max_participants: "",
        registration_fee: "",
        image_url: "",
      });
      setEventStatus(`Event created successfully (ID: ${created.id}).`);

      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const statsData = await getAdminStats(token);
        setStats(statsData);
      }
    } catch (err) {
      setEventStatus((err as Error).message);
    } finally {
      setEventSubmitting(false);
    }
  };

  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="section-shell py-10 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <SectionTitle
            badge="Control Center"
            title="Admin Dashboard"
            description="Protected analytics and activity feeds from your backend admin endpoints."
          />
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>

        {error ? (
          <Card>
            <CardContent className="p-6 text-sm text-red-600">{error}</CardContent>
          </Card>
        ) : null}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Users" value={stats?.totalUsers} />
          <StatCard label="Events" value={stats?.totalEvents} />
          <StatCard label="Registrations" value={stats?.totalRegistrations} />
          <StatCard label="Queries" value={stats?.totalQueries} />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {recent?.users?.slice(0, 5).map((user) => (
                <p key={user.id} className="rounded-md bg-muted p-2">
                  {user.name} ({user.email})
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {recent?.registrations?.slice(0, 5).map((item) => (
                <p key={item.id} className="rounded-md bg-muted p-2">
                  {item.name} to {item.title}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Queries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {recent?.queries?.slice(0, 5).map((query) => (
                <p key={query.id} className="rounded-md bg-muted p-2">
                  {query.name}: {query.subject} ({query.status})
                </p>
              ))}
              <Link href="/contact" className="inline-block text-primary hover:underline">
                Submit test query
              </Link>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateEvent} className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Event title"
                value={eventForm.title}
                onChange={(e) => setEventForm((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
              <Input
                placeholder="Category"
                value={eventForm.category}
                onChange={(e) => setEventForm((prev) => ({ ...prev, category: e.target.value }))}
                required
              />
              <div className="sm:col-span-2">
                <Textarea
                  placeholder="Description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <Input
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm((prev) => ({ ...prev, date: e.target.value }))}
                required
              />
              <Input
                type="time"
                value={eventForm.time}
                onChange={(e) => setEventForm((prev) => ({ ...prev, time: e.target.value }))}
                required
              />
              <Input
                placeholder="Venue"
                value={eventForm.venue}
                onChange={(e) => setEventForm((prev) => ({ ...prev, venue: e.target.value }))}
              />
              <Input
                placeholder="Max participants"
                type="number"
                min={1}
                value={eventForm.max_participants}
                onChange={(e) => setEventForm((prev) => ({ ...prev, max_participants: e.target.value }))}
              />
              <Input
                placeholder="Registration fee"
                type="number"
                min={0}
                step="0.01"
                value={eventForm.registration_fee}
                onChange={(e) => setEventForm((prev) => ({ ...prev, registration_fee: e.target.value }))}
              />
              <Input
                placeholder="Banner image URL"
                value={eventForm.image_url}
                onChange={(e) => setEventForm((prev) => ({ ...prev, image_url: e.target.value }))}
              />
              <Input
                placeholder="Eligibility (optional)"
                value={eventForm.eligibility}
                onChange={(e) => setEventForm((prev) => ({ ...prev, eligibility: e.target.value }))}
              />
              <div className="sm:col-span-2">
                <Textarea
                  placeholder="Rules (optional)"
                  value={eventForm.rules}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, rules: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea
                  placeholder="Prize details (optional)"
                  value={eventForm.prize_details}
                  onChange={(e) => setEventForm((prev) => ({ ...prev, prize_details: e.target.value }))}
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-3">
                <Button type="submit" disabled={eventSubmitting}>
                  {eventSubmitting ? "Creating..." : "Create Event"}
                </Button>
                {eventStatus ? <p className="text-sm text-muted-foreground">{eventStatus}</p> : null}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-2 py-2">User</th>
                    <th className="px-2 py-2">Email</th>
                    <th className="px-2 py-2">Event</th>
                    <th className="px-2 py-2">Status</th>
                    <th className="px-2 py-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 25).map((row) => (
                    <tr key={row.id} className="border-b border-border/60">
                      <td className="px-2 py-2">{row.name}</td>
                      <td className="px-2 py-2">{row.email}</td>
                      <td className="px-2 py-2">{row.title}</td>
                      <td className="px-2 py-2">{row.status}</td>
                      <td className="px-2 py-2">{new Date(row.registration_date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Query Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button variant={queryFilter === "" ? "default" : "outline"} onClick={() => setQueryFilter("")}>All</Button>
              <Button variant={queryFilter === "new" ? "default" : "outline"} onClick={() => setQueryFilter("new")}>New</Button>
              <Button variant={queryFilter === "in-progress" ? "default" : "outline"} onClick={() => setQueryFilter("in-progress")}>In Progress</Button>
              <Button variant={queryFilter === "resolved" ? "default" : "outline"} onClick={() => setQueryFilter("resolved")}>Resolved</Button>
            </div>

            <div className="space-y-3">
              {queries.slice(0, 20).map((query) => (
                <div key={query.id} className="rounded-md border border-border p-3">
                  <p className="font-semibold">{query.subject}</p>
                  <p className="text-sm text-muted-foreground">{query.name} | {query.email}</p>
                  <p className="mt-2 text-sm">{query.message}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(query.id, "in-progress")}>Mark In Progress</Button>
                    <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(query.id, "resolved")}>Mark Resolved</Button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Input
                      placeholder="Write response to send via email..."
                      value={responseById[query.id] || ""}
                      onChange={(e) => setResponseById((prev) => ({ ...prev, [query.id]: e.target.value }))}
                    />
                    <Button size="sm" onClick={() => handleRespond(query.id)}>Send</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value?: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-display text-3xl font-bold">{value ?? "--"}</p>
      </CardContent>
    </Card>
  );
}
