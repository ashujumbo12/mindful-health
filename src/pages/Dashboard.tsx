import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useMemo, useState } from "react";

const weightData = [
  { d: "Mon", v: 76.8 },
  { d: "Tue", v: 76.6 },
  { d: "Wed", v: 76.4 },
  { d: "Thu", v: 76.2 },
  { d: "Fri", v: 76.3 },
  { d: "Sat", v: 76.1 },
  { d: "Sun", v: 76.0 },
];

const stepsData = [
  { d: "Mon", v: 8200 },
  { d: "Tue", v: 6000 },
  { d: "Wed", v: 10400 },
  { d: "Thu", v: 7200 },
  { d: "Fri", v: 9000 },
  { d: "Sat", v: 12000 },
  { d: "Sun", v: 7800 },
];

const adherence = 0.72;
const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

export default function Dashboard() {
  const [week, setWeek] = useState("current");
  const adherenceData = useMemo(() => [
    { name: "Done", value: Math.round(adherence * 100) },
    { name: "Missed", value: 100 - Math.round(adherence * 100) },
  ], []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Weekly trends</h1>
        <Select value={week} onValueChange={setWeek}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Week" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="current">This week</SelectItem>
            <SelectItem value="last">Last week</SelectItem>
          </SelectContent>
        </Select>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Weight trend</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted) / 0.5)" />
                <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" />
                <YAxis domain={[75.5, 77]} stroke="hsl(var(--muted-foreground))" />
                <Tooltip cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }} />
                <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Steps</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepsData} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted) / 0.5)" />
                <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="v" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Adherence</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={adherenceData} innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {adherenceData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <p className="mt-2 text-sm text-muted-foreground">{Math.round(adherence * 100)}% of habits completed</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
