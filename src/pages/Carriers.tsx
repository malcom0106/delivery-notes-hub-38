
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Search, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Carrier {
  id: string;
  name: string;
  reference: string;
  type: string;
  email?: string;
}

const CARRIERS_DATA: Carrier[] = [
  { 
    id: "1", 
    name: "CARR TEST TRANS", 
    reference: "06453f9f-4886-4bb1-9bf7-bf0882446dc1", 
    type: "Transporteur" 
  },
  { 
    id: "2", 
    name: "MARTEL", 
    reference: "61ace171-5839-454a-bb89-737638f3dd61", 
    type: "Transporteur" 
  },
  { 
    id: "3", 
    name: "Transport SIM", 
    reference: "6f93569f-7709-49c2-85f0-113859f257c5", 
    type: "Transporteur" 
  },
  { 
    id: "4", 
    name: "Transporteur / Carrier A", 
    reference: "TRANSPA", 
    type: "Transporteur",
    email: "rmitha@synaxe.com"
  },
  { 
    id: "5", 
    name: "Transporteur / Carrier B", 
    reference: "TRANSPB", 
    type: "Transporteur",
    email: "rmitha@synaxe.com et 1 autre(s)"
  },
  { 
    id: "6", 
    name: "Transporteur / Carrier C", 
    reference: "TRANSPC", 
    type: "Transporteur" 
  },
  { 
    id: "7", 
    name: "Express Air Freight", 
    reference: "EAF2024", 
    type: "Transporteur",
    email: "contact@expressair.com"
  },
  { 
    id: "8", 
    name: "Heavy Haulers Co.", 
    reference: "HHC2024", 
    type: "Transporteur",
    email: "info@heavyhaulers.com"
  },
  { 
    id: "9", 
    name: "Rapid Transport", 
    reference: "RAPID01", 
    type: "Transporteur" 
  },
  { 
    id: "10", 
    name: "Global Logistics", 
    reference: "GL2024", 
    type: "Transporteur",
    email: "contact@globallogistics.com"
  },
  { 
    id: "11", 
    name: "City Deliveries", 
    reference: "CITY2024", 
    type: "Transporteur" 
  },
  { 
    id: "12", 
    name: "International Freight", 
    reference: "INTL2024", 
    type: "Transporteur",
    email: "support@intlfreight.com"
  },
];

const Carriers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCarriers = CARRIERS_DATA.filter(
    carrier => carrier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCarriers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCarriers.slice(indexOfFirstItem, indexOfLastItem);

  const handleCarrierClick = (carrierId: string) => {
    navigate(`/carrier/${carrierId}`);
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Transporteurs</h1>
        <p className="text-muted-foreground">
          Gérez vos transporteurs et leurs informations
        </p>
      </header>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Liste des Transporteurs</CardTitle>
              <CardDescription>
                {filteredCarriers.length} transporteurs enregistrés
              </CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un transporteur
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Chercher un transporteur"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Référence</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Emails</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((carrier) => (
                  <TableRow 
                    key={carrier.id} 
                    className="hover-scale cursor-pointer"
                    onClick={() => handleCarrierClick(carrier.id)}
                  >
                    <TableCell className="font-medium">{carrier.name}</TableCell>
                    <TableCell className="text-gray-600 text-sm font-mono">{carrier.reference}</TableCell>
                    <TableCell>{carrier.type}</TableCell>
                    <TableCell className="text-blue-600">{carrier.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Affichage de {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCarriers.length)} sur {filteredCarriers.length} transporteurs
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

export default Carriers;
