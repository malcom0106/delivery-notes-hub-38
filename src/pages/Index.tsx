import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Search, Filter, Truck } from "lucide-react";

const deliveryNotes = [
  {
    id: "BL001",
    date: "15/03/2024",
    status: "En Transit",
    destination: "Hangar 7, Aéroport Ouest",
    items: "Pièces d'avion",
    carrier: "Express Air Freight",
  },
  {
    id: "BL002",
    date: "14/03/2024",
    status: "Livré",
    destination: "Site B, Projet Centre-Ville",
    items: "Matériaux de construction",
    carrier: "Heavy Haulers Co.",
  },
];

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-b from-blue-50 to-white">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Centre des Bons de Livraison</h1>
        <p className="text-muted-foreground">
          Gérez et suivez vos bons de livraison pour les projets aérospatiaux et de construction
        </p>
      </header>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Bons de Livraison Récents</CardTitle>
              <CardDescription>Consultez et gérez vos dernières livraisons</CardDescription>
            </div>
            <Button
              onClick={() => {
                toast({
                  title: "Création d'un nouveau bon de livraison",
                  description: "Cette fonctionnalité sera bientôt disponible.",
                });
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Créer Nouveau
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des bons de livraison..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° BL</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Transporteur</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryNotes.map((note) => (
                  <TableRow
                    key={note.id}
                    className="hover-scale cursor-pointer"
                    onClick={() => navigate(`/delivery-note/${note.id}`)}
                  >
                    <TableCell className="font-medium">{note.id}</TableCell>
                    <TableCell>{note.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={note.status === "Livré" ? "default" : "secondary"}
                        className="capitalize"
                      >
                        {note.status}
                      </Badge>
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
