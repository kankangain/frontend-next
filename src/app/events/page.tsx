"use client";

import { CalendarDays, MapPin, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SectionTitle } from "@/components/section-title";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EventItem, getCategories, getEvents } from "@/lib/api";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [term, setTerm] = useState("");
  const [sort, setSort] = useState<"date_asc" | "date_desc">("date_asc");
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    getEvents({ category: category || undefined, term: term || undefined, sort })
      .then(setEvents)
      .catch((err: Error) => setError(err.message));
  }, [category, term, sort]);

  const heading = useMemo(
    () => (category ? `Events in ${category}` : "All Events"),
    [category],
  );

  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="section-shell py-10 space-y-6">
        <SectionTitle
          badge="Discover"
          title={heading}
          description="Filter by category and explore schedule, venue, and participation details."
        />

        <div className="grid gap-3 rounded-lg border border-border bg-card/70 p-4 md:grid-cols-[1fr_auto_auto]">
          <Input
            placeholder="Search by title, category, keyword..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as "date_asc" | "date_desc")}
          >
            <option value="date_asc">Upcoming first</option>
            <option value="date_desc">Latest first</option>
          </select>
          <div className="flex items-center text-sm text-muted-foreground">{events.length} events found</div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              category === "" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            }`}
            onClick={() => setCategory("")}
            type="button"
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                category === item ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge>{event.category}</Badge>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {event.date} at {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {event.venue}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Capacity: {event.max_participants} | Fee: Rs. {event.registration_fee}
                </p>
                {event.rules ? <p><span className="font-semibold text-foreground">Rules:</span> {event.rules}</p> : null}
                {event.eligibility ? <p><span className="font-semibold text-foreground">Eligibility:</span> {event.eligibility}</p> : null}
                {event.prize_details ? <p><span className="font-semibold text-foreground">Prizes:</span> {event.prize_details}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
