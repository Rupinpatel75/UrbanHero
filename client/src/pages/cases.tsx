import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, FileDown } from "lucide-react";
import { type Case } from "@shared/schema";

const mockCases: Case[] = [
  {
    id: 1230,
    title: "Pothole on road",
    description: "Large pothole causing traffic issues",
    category: "road",
    status: "completed",
    priority: "high",
    location: "Main Street",
    latitude: "23.2156",
    longitude: "72.6369",
    userId: 1,
    createdAt: new Date("2022-08-15"),
  },
  {
    id: 1231,
    title: "Broken street light",
    description: "Street light not working at night",
    category: "lighting",
    status: "completed",
    priority: "medium",
    location: "Park Avenue",
    latitude: "23.2256",
    longitude: "72.6469",
    userId: 1,
    createdAt: new Date("2022-08-07"),
  },
];

export default function Cases() {
  const { data: cases = mockCases } = useQuery({
    queryKey: ["/api/cases"],
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Cases</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track all reported cases
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search issues..." className="pl-8" />
          </div>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export to Excel
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((case_) => (
              <TableRow key={case_.id}>
                <TableCell>#{case_.id}</TableCell>
                <TableCell>{case_.title}</TableCell>
                <TableCell>
                  {new Date(case_.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={case_.status === "completed" ? "default" : "secondary"}
                  >
                    {case_.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      case_.priority === "high"
                        ? "destructive"
                        : case_.priority === "medium"
                        ? "warning"
                        : "default"
                    }
                  >
                    {case_.priority}
                  </Badge>
                </TableCell>
                <TableCell>{case_.category}</TableCell>
                <TableCell>{case_.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
