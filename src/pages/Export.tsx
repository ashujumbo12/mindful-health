import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMemo, useState } from "react";

function download(filename: string, text: string) {
  const element = document.createElement('a');
  const file = new Blob([text], { type: 'text/csv' });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
}

export default function Export() {
  const [format, setFormat] = useState("pdf");
  const [range, setRange] = useState("this");

  const csv = useMemo(() => {
    const rows = [
      ["date","weight","steps","mood","energy","stress","sleep"],
      ["2025-08-05","76.4","8240","4","4","2","4"],
      ["2025-08-06","76.2","6900","3","3","3","3"],
      ["2025-08-07","76.1","12000","4","4","2","4"],
    ];
    return rows.map(r => r.join(",")).join("\n");
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Export</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Options</CardTitle>
            <CardDescription>Choose format and date range</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="mb-1 text-sm">Format</div>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue placeholder="Select format" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF (weekly summary)</SelectItem>
                  <SelectItem value="csv">CSV (raw data)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="mb-1 text-sm">Range</div>
              <Select value={range} onValueChange={setRange}>
                <SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="this">This week</SelectItem>
                  <SelectItem value="last">Last week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={() => alert('PDF generated (mock)')}>Generate</Button>
              <Button variant="secondary" onClick={() => download('export.csv', csv)}>Download CSV</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Report preview</CardTitle>
            <CardDescription>PDF layout (mock)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[3/4] w-full rounded-md border bg-muted" aria-label="PDF preview" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
