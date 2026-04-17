import { SiteFooter } from "@/components/site-footer";
import { SectionTitle } from "@/components/section-title";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const committee = [
  { name: "Institution's Innovation Council (IIC-TINT)", role: "Strategic direction and execution" },
  { name: "Faculty Members", role: "Planning and academic support" },
  { name: "Student Organizers", role: "On-ground delivery and operations" },
  { name: "Industry Experts & Sponsors", role: "Expert sessions and support" },
];

const overview = [
  "Prabuddha is the flagship annual technology festival organized by Techno International New Town (TINT), Kolkata.",
  "The fest encourages innovation, creativity, and knowledge-sharing among students to empower future tech leaders.",
  'It is designed as an inter-college battleground where intellect and technology converge through high-stakes competitions, hands-on workshops, and electrifying experiences.',
  'Its core philosophy is captured by the tagline: "Compete. Create. Conquer."',
];

const activities = [
  "Coding competitions and hackathons",
  "Robotics challenges and live builds",
  "Design contests and creative showcases",
  "Workshops on AI, Machine Learning, and Robotics",
];

const history = [
  "Prabuddha has been a recurring event at TINT for several years.",
  'Records show that "Prabuddha - The Tech Fest at TINT" was held as early as March 27, 2019.',
  "The 2025 edition ran from February 27th to March 1st and was recognized as a Level 4 Calendar Activity by the Institution's Innovation Council (IIC-TINT).",
  "Prabuddha 2026 continued the annual cadence and was presented as the edition where ideas turn into reality.",
];

export default function AboutPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="section-shell space-y-8 py-10">
        <SectionTitle
          badge="About Us"
          title="PRABUDDHA 2026"
          description="The flagship annual tech festival of TINT, Kolkata, built to showcase innovation and future technology leaders."
        />

        <Card>
          <CardHeader>
            <CardTitle>Overview of the Tech Fest and Its Purpose</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {overview.map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-muted/70 p-4 text-slate-200">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>History of the Fest</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {history.map((item) => (
                <p key={item} className="rounded-md bg-muted p-3">
                  {item}
                </p>
              ))}
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
            <CardTitle>Events and Learning Tracks</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {activities.map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-muted/70 p-4 text-slate-200">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organizer Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Inquiries for the fest can be directed to: <span className="font-semibold text-foreground">prabuddha@tint.edu.in</span></p>
            <p>The fest is organized under the aegis of the Institution&apos;s Innovation Council (IIC) of TINT.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promo Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video overflow-hidden rounded-md border border-border">
              <iframe
                title="PRABUDDHA Promo"
                src="https://www.youtube.com/shorts/95lLaJBvg-U"
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
