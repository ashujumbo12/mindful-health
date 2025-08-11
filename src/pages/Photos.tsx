import { useMemo, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PhotoItem { id: string; src: string; date: string; }

export default function Photos() {
  const [items, setItems] = useState<PhotoItem[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const empty = items.length === 0;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Photos</h1>
          <p className="text-sm text-muted-foreground">Visual progress over time</p>
        </div>
        <div className="hidden md:block">
          <Button onClick={() => fileRef.current?.click()}>Upload</Button>
        </div>
      </header>

      {empty ? (
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>No photos yet</CardTitle>
            <CardDescription>Add your first progress photo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => fileRef.current?.click()} className="w-full md:w-auto">Upload photo</Button>
          </CardContent>
        </Card>
      ) : (
        <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {items.map((p) => (
            <figure key={p.id} className="overflow-hidden rounded-md border">
              <img src={p.src} alt={`Progress photo ${p.date}`} className="aspect-[3/4] w-full object-cover" loading="lazy" />
              <figcaption className="px-2 py-1 text-xs text-muted-foreground">{p.date}</figcaption>
            </figure>
          ))}
        </section>
      )}

      <Input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          setItems((prev) => [...prev, { id: crypto.randomUUID(), src: reader.result as string, date: new Date().toISOString().slice(0,10) }]);
        };
        reader.readAsDataURL(file);
      }} />

      <div className="md:hidden sticky bottom-16 z-30">
        <Button className="w-full" onClick={() => fileRef.current?.click()}>Upload</Button>
      </div>
    </div>
  );
}
