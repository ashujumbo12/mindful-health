import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile & Units</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-1.5">
              <Label>Units</Label>
              <Select defaultValue="kg">
                <SelectTrigger><SelectValue placeholder="Units" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms</SelectItem>
                  <SelectItem value="lb">Pounds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" inputMode="numeric" />
            </div>
            <Button className="mt-2 w-full md:w-auto">Save</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="time">Daily reminder (HH:MM)</Label>
              <Input id="time" type="time" />
            </div>
            <Button className="mt-2 w-full md:w-auto">Save</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
