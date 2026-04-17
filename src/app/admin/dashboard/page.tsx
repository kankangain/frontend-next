"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SectionTitle } from "@/components/section-title";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AdminStats,
  QueryRow,
  getAdminRecent,
  getAdminRegistrations,
  getAdminStats,
  getQueries,
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
