
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Truck {
  id: string;
  licensePlate: string;
  label: string;
  type: string;
  status: "Actif" | "En maintenance" | "Indisponible";
  carrier: string;
}

const TRUCKS_DATA: Truck[] = [
  { id: "1", licensePlate: "AB-123-CD", label: "Camion 1", type: "Semi-remorque", status: "Actif", carrier: "Express Air Freight" },
  { id: "2", licensePlate: "EF-456-GH", label: "Camion 2", type: "Porteur", status: "Actif", carrier: "Heavy Haulers Co." },
  { id: "3", licensePlate: "IJ-789-KL", label: "Camion 3", type: "Benne", status: "En maintenance", carrier: "Transport SIM" },
  { id: "4", licensePlate: "MN-012-OP", label: "Camion 4", type: "Frigorifique", status: "Actif", carrier: "MARTEL" },
  { id: "5", licensePlate: "QR-345-ST", label: "Camion 5", type: "Citerne", status: "Indisponible", carrier: "CARR TEST TRANS" },
  { id: "6", licensePlate: "UV-678-WX", label: "Camion 6", type: "Semi-remorque", status: "Actif", carrier: "Express Air Freight" },
  { id: "7", licensePlate: "YZ-901-AB", label: "Camion 7", type: "Porteur", status: "Actif", carrier: "Heavy Haulers Co." },
  { id: "8", licensePlate: "CD-234-EF", label: "Camion 8", type: "Benne", status: "En maintenance", carrier: "Transport SIM" },
  { id: "9", licensePlate: "GH-567-IJ", label: "Camion 9", type: "Frigorifique", status: "Actif", carrier: "MARTEL" },
  { id: "10", licensePlate: "KL-890-MN", label: "Camion 10", type: "Citerne", status: "Indisponible", carrier: "CARR TEST TRANS" },
  { id: "11", licensePlate: "OP-123-QR", label: "Camion 11", type: "Semi-remorque", status: "Actif", carrier: "Express Air Freight" },
  { id: "12", licensePlate: "ST-456-UV", label: "Camion 12", type: "Porteur", status: "Actif", carrier: "Heavy Haulers Co." },
  { id: "13", licensePlate: "WX-789-YZ", label: "Camion 13", type: "Benne", status: "En maintenance", carrier: "Transport SIM" },
  { id: "14", licensePlate: "AB-012-CD", label: "Camion 14", type: "Frigorifique", status: "Actif", carrier: "MARTEL" },
  { id: "15", licensePlate: "EF-345-GH", label: "Camion 15", type: "Citerne", status: "Indisponible", carrier: "CARR TEST TRANS" },
  { id: "16", licensePlate: "IJ-678-KL", label: "Camion 16", type: "Semi-remorque", status: "Actif", carrier: "Express Air Freight" },
  { id: "17", licensePlate: "MN-901-OP", label: "Camion 17", type: "Porteur", status: "Actif", carrier: "Heavy Haulers Co." },
  { id: "18", licensePlate: "QR-234-ST", label: "Camion 18", type: "Benne", status: "En maintenance", carrier: "Transport SIM" },
  { id: "19", licensePlate: "UV-567-WX", label: "Camion 19", type: "Frigorifique", status: "Actif", carrier: "MARTEL" },
  { id: "20", licensePlate: "YZ-890-AB", label: "Camion 20", type: "Citerne", status: "Indisponible", carrier: "CARR TEST TRANS" },
];

const Trucks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const filteredTrucks = TRUCKS_DATA.filter(
    truck => 
      truck.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTrucks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTrucks.length / itemsPerPage);

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Camions</h1>
        <p className="text-muted-foreground">
          Gérez votre flotte de véhicules et suivez leur statut
        </p>
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Liste des Camions</CardTitle>
              <CardDescription>
                {filteredTrucks.length} camions enregistrés
              </CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un camion
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un camion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  <TableHead>Plaque d'immatriculation</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Transporteur</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((truck) => (
                  <TableRow key={truck.id} className="hover-scale">
                    <TableCell className="font-medium">{truck.licensePlate}</TableCell>
                    <TableCell>{truck.label}</TableCell>
                    <TableCell>{truck.type}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          truck.status === "Actif" 
                            ? "default" 
                            : truck.status === "En maintenance" 
                              ? "secondary" 
                              : "destructive"
                        }
                      >
                        {truck.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{truck.carrier}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Détails</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Affichage de {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredTrucks.length)} sur {filteredTrucks.length} camions
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trucks;
