import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sample = [
  { date: "2025-08-07", metrics: ["Weight", "Steps", "Wellbeing"] },
  { date: "2025-08-06", metrics: ["Weight", "Steps"] },
];

export default function History() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">History</h1>
      </header>

      {sample.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No entries yet</CardTitle>
            <CardDescription>Log your first entry on Today.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild><a href="/">Go to Today</a></Button>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-3">
          {sample.map((d) => (
            <Card key={d.date} className="card-hover">
              <CardHeader>
                <CardTitle className="text-base">{d.date}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {d.metrics.map((m) => (
                  <Badge key={m} variant="secondary">{m}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
