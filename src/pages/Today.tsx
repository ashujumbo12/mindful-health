import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

const habitsSeed = [
  { id: 1, name: "10k steps" },
  { id: 2, name: "Protein with meals" },
  { id: 3, name: "Hydrate" },
];

export default function Today() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [weight, setWeight] = useState<string>("");
  const [steps, setSteps] = useState<string>("");
  const [mood, setMood] = useState<string>("3");
  const [energy, setEnergy] = useState<number[]>([3]);
  const [stress, setStress] = useState<number[]>([3]);
  const [sleep, setSleep] = useState<number[]>([3]);
  const [notes, setNotes] = useState<string>("");
  const [habits, setHabits] = useState<Record<number, boolean>>({});
  const [measureOpen, setMeasureOpen] = useState(false);
  const [waist, setWaist] = useState<string>("");
  const [chest, setChest] = useState<string>("");
  const [hips, setHips] = useState<string>("");
  const [arm, setArm] = useState<string>("");
  const [thigh, setThigh] = useState<string>("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const onSaveAll = () => {
    toast({
      title: "Saved",
      description: "Your daily log was saved.",
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Quick log</h1>
          <p className="text-sm text-muted-foreground">{date ? format(date, "EEEE, MMM d, yyyy") : "Pick a date"}</p>
        </div>
        <Button variant="secondary" onClick={() => setDate(new Date())}>Jump to today</Button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Weight</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="number" inputMode="decimal" placeholder="Enter weight" value={weight} onChange={(e) => setWeight(e.target.value)} aria-label="Weight" />
            <Button className="w-full">Save</Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="number" inputMode="numeric" placeholder="Enter steps" value={steps} onChange={(e) => setSteps(e.target.value)} aria-label="Steps" />
            <Button className="w-full">Save</Button>
          </CardContent>
        </Card>

        <Card className="card-hover md:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Wellbeing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Mood</div>
              <ToggleGroup type="single" value={mood} onValueChange={(v) => v && setMood(v)} className="justify-between">
                <ToggleGroupItem value="1" aria-label="Very low">😞</ToggleGroupItem>
                <ToggleGroupItem value="2" aria-label="Low">😐</ToggleGroupItem>
                <ToggleGroupItem value="3" aria-label="Neutral">🙂</ToggleGroupItem>
                <ToggleGroupItem value="4" aria-label="Good">😁</ToggleGroupItem>
                <ToggleGroupItem value="5" aria-label="Great">🥳</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Energy</span><span>{energy[0]}</span></div>
              <Slider min={1} max={5} step={1} value={energy} onValueChange={setEnergy} aria-label="Energy" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Stress</span><span>{stress[0]}</span></div>
              <Slider min={1} max={5} step={1} value={stress} onValueChange={setStress} aria-label="Stress" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Sleep quality</span><span>{sleep[0]}</span></div>
              <Slider min={1} max={5} step={1} value={sleep} onValueChange={setSleep} aria-label="Sleep quality" />
            </div>
            <Textarea placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} aria-label="Notes" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Adherence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {habitsSeed.map((h) => (
              <div key={h.id} className="flex items-center justify-between">
                <span>{h.name}</span>
                <Switch checked={!!habits[h.id]} onCheckedChange={(v) => setHabits((prev) => ({ ...prev, [h.id]: v }))} aria-label={`Mark ${h.name} as done`} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Measurements</span>
              <Button size="sm" variant="secondary" onClick={() => setMeasureOpen((v) => !v)}>{measureOpen ? "Hide" : "Add"}</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!measureOpen && <p className="text-sm text-muted-foreground">Add waist, chest, hips, arm, thigh</p>}
            {measureOpen && (
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Waist" value={waist} onChange={(e) => setWaist(e.target.value)} />
                <Input placeholder="Chest" value={chest} onChange={(e) => setChest(e.target.value)} />
                <Input placeholder="Hips" value={hips} onChange={(e) => setHips(e.target.value)} />
                <Input placeholder="Arm" value={arm} onChange={(e) => setArm(e.target.value)} />
                <Input placeholder="Thigh" value={thigh} onChange={(e) => setThigh(e.target.value)} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Progress photo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setPhotoPreview(reader.result as string);
              reader.readAsDataURL(file);
            }} />
            {photoPreview && (
              <img src={photoPreview} alt="Latest progress preview" className="h-40 w-full rounded-md object-cover" loading="lazy" />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="rounded-md border p-3">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium">Date</h2>
            <p className="text-sm text-muted-foreground">Select the date you want to log for.</p>
          </div>
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus aria-label="Select date" />
        </div>
      </section>

      <div className="sticky bottom-16 md:bottom-0 z-30 md:z-auto md:static">
        <div className="rounded-md border bg-background/80 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:bg-transparent md:p-0 md:border-0">
          <Button className="w-full" onClick={onSaveAll}>Save all</Button>
        </div>
      </div>

      <Separator />
      <p className="text-xs text-muted-foreground">Tip: Fields auto-save on blur. Use “Save all” to confirm changes.</p>
    </div>
  );
}
