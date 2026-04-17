import { SiteFooter } from "@/components/site-footer";
import { SectionTitle } from "@/components/section-title";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const committee = [
  { name: "Dr. A. Sen", role: "Faculty Coordinator" },
  { name: "Riya Ghosh", role: "Student Convener" },
  { name: "Arjun Roy", role: "Sponsorship Lead" },
  { name: "Nandini Das", role: "Operations Lead" },
];

export default function AboutPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="section-shell space-y-8 py-10">
        <SectionTitle
          badge="About Us"
          title="PRABUDDHA 2026"
          description="A tech fest built to inspire innovation, collaboration, and problem-solving culture across campuses."
        />

        <Card>
          <CardHeader>
            <CardTitle>Fest Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              PRABUDDHA is the flagship tech fest of Techno International New Town, bringing together
              students, educators, and industry leaders for competitions, workshops, and talks.
            </p>
            <p>
              The purpose of the fest is to create a practical innovation space where participants build,
              present, and collaborate on real-world ideas.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Started as a departmental initiative, PRABUDDHA evolved into an inter-college platform.</p>
              <p>Each edition introduces new tracks such as AI, robotics, full-stack development, and design innovation.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Organizing Committee</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {committee.map((member) => (
                <p key={member.name} className="rounded-md bg-muted p-2">
                  <span className="font-semibold">{member.name}</span> | {member.role}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Promo Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-md border border-border">
              <iframe
                title="PRABUDDHA Promo"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
