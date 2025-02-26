
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, Truck, Building, Plane } from "lucide-react";

// Mock data for demonstration
const deliveryNotes = [
  {
    id: "DN001",
    date: "2024-03-15",
    status: "In Transit",
    type: "aerospace",
    destination: "Hangar 7, Airport West",
    items: "Aircraft Parts",
    carrier: "Express Air Freight",
  },
  {
    id: "DN002",
    date: "2024-03-14",
    status: "Delivered",
    type: "construction",
    destination: "Site B, Downtown Project",
    items: "Construction Materials",
    carrier: "Heavy Haulers Co.",
  },
  // Add more mock data as needed
];

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-b from-blue-50 to-white">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Delivery Notes Hub</h1>
        <p className="text-muted-foreground">
          Manage and track your delivery notes for aerospace and construction projects
        </p>
      </header>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Recent Delivery Notes</CardTitle>
              <CardDescription>View and manage your latest deliveries</CardDescription>
            </div>
            <Button
              onClick={() => {
                toast({
                  title: "Creating new delivery note",
                  description: "This feature will be available soon.",
                });
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Create New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search delivery notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Carrier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryNotes.map((note) => (
                  <TableRow
                    key={note.id}
                    className="hover-scale cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Opening delivery note",
                        description: `Details for ${note.id} will be available soon.`,
                      });
                    }}
                  >
                    <TableCell className="font-medium">{note.id}</TableCell>
                    <TableCell>{note.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={note.status === "Delivered" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {note.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {note.type === "aerospace" ? (
                          <Plane className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Building className="h-4 w-4 text-orange-500" />
                        )}
                        <span className="capitalize">{note.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{note.destination}</TableCell>
                    <TableCell>{note.items}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-500" />
                        {note.carrier}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
