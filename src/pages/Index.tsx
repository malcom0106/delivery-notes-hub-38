
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Filter, Truck, ChevronLeft, ChevronRight, Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const deliveryNotes = [
  { id: "BL001", date: "15/03/2024", status: "En Transit", destination: "Hangar 7, Aéroport Ouest", items: "Pièces d'avion", carrier: "Express Air Freight" },
  { id: "BL002", date: "14/03/2024", status: "Livré", destination: "Site B, Projet Centre-Ville", items: "Matériaux de construction", carrier: "Heavy Haulers Co." },
  { id: "BL003", date: "13/03/2024", status: "Livré", destination: "Zone Industrielle Nord", items: "Équipements électroniques", carrier: "Transport SIM" },
  { id: "BL004", date: "12/03/2024", status: "Annulé", destination: "Entrepôt Principal", items: "Fournitures de bureau", carrier: "MARTEL" },
  { id: "BL005", date: "11/03/2024", status: "Livré", destination: "Bureaux Centraux", items: "Mobilier", carrier: "CARR TEST TRANS" },
  { id: "BL006", date: "10/03/2024", status: "En Transit", destination: "Site de Construction Est", items: "Matériaux isolants", carrier: "Heavy Haulers Co." },
  { id: "BL007", date: "09/03/2024", status: "Livré", destination: "Centre de Recherche", items: "Équipement scientifique", carrier: "Express Air Freight" },
  { id: "BL008", date: "08/03/2024", status: "Livré", destination: "Siège Social", items: "Serveurs informatiques", carrier: "Transport SIM" },
  { id: "BL009", date: "07/03/2024", status: "En Transit", destination: "Hôpital Central", items: "Équipement médical", carrier: "MARTEL" },
  { id: "BL010", date: "06/03/2024", status: "Livré", destination: "Campus Universitaire", items: "Matériel pédagogique", carrier: "CARR TEST TRANS" },
  { id: "BL011", date: "05/03/2024", status: "Livré", destination: "Centre Commercial", items: "Produits électroniques", carrier: "Express Air Freight" },
  { id: "BL012", date: "04/03/2024", status: "Annulé", destination: "Zone Industrielle Sud", items: "Pièces détachées", carrier: "Heavy Haulers Co." },
  { id: "BL013", date: "03/03/2024", status: "Livré", destination: "Complexe Sportif", items: "Équipement sportif", carrier: "Transport SIM" },
  { id: "BL014", date: "02/03/2024", status: "En Transit", destination: "Résidence Étudiante", items: "Mobilier", carrier: "MARTEL" },
  { id: "BL015", date: "01/03/2024", status: "Livré", destination: "Centre Technique", items: "Outils spécialisés", carrier: "CARR TEST TRANS" },
  { id: "BL016", date: "28/02/2024", status: "Livré", destination: "Laboratoire Pharmaceutique", items: "Produits chimiques", carrier: "Express Air Freight" },
  { id: "BL017", date: "27/02/2024", status: "En Transit", destination: "Ferme Agricole", items: "Équipement agricole", carrier: "Heavy Haulers Co." },
  { id: "BL018", date: "26/02/2024", status: "Livré", destination: "Bibliothèque Municipale", items: "Livres et médias", carrier: "Transport SIM" },
  { id: "BL019", date: "25/02/2024", status: "Livré", destination: "Centre d'Art", items: "Œuvres d'art", carrier: "MARTEL" },
  { id: "BL020", date: "24/02/2024", status: "Annulé", destination: "École Primaire", items: "Fournitures scolaires", carrier: "CARR TEST TRANS" },
  { id: "BL021", date: "23/02/2024", status: "Livré", destination: "Centre de Conférence", items: "Équipement audiovisuel", carrier: "Express Air Freight" },
  { id: "BL022", date: "22/02/2024", status: "En Transit", destination: "Station de Radio", items: "Équipement de diffusion", carrier: "Heavy Haulers Co." },
  { id: "BL023", date: "21/02/2024", status: "Livré", destination: "Studio de Cinéma", items: "Équipement de tournage", carrier: "Transport SIM" },
  { id: "BL024", date: "20/02/2024", status: "Livré", destination: "Centre Logistique", items: "Systèmes d'emballage", carrier: "MARTEL" },
  { id: "BL025", date: "19/02/2024", status: "En Transit", destination: "Musée d'Histoire", items: "Artefacts historiques", carrier: "CARR TEST TRANS" },
  { id: "BL026", date: "18/02/2024", status: "Livré", destination: "Stade Municipal", items: "Équipement d'éclairage", carrier: "Express Air Freight" },
  { id: "BL027", date: "17/02/2024", status: "Livré", destination: "Parc d'Attractions", items: "Pièces mécaniques", carrier: "Heavy Haulers Co." },
  { id: "BL028", date: "16/02/2024", status: "Annulé", destination: "Aquarium Public", items: "Équipement de filtration", carrier: "Transport SIM" },
  { id: "BL029", date: "15/02/2024", status: "Livré", destination: "Centre de Données", items: "Serveurs et stockage", carrier: "MARTEL" },
  { id: "BL030", date: "14/02/2024", status: "En Transit", destination: "Jardin Botanique", items: "Système d'irrigation", carrier: "CARR TEST TRANS" },
];

const statusOptions = [
  { value: "all", label: "Tous les statuts" },
  { value: "Livré", label: "Livré" },
  { value: "En Transit", label: "En Transit" },
  { value: "Annulé", label: "Annulé" },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrer les bons de livraison selon la recherche et le statut
  const filteredDeliveryNotes = deliveryNotes.filter(
    note =>
      (searchQuery === "" || 
        note.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.carrier.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || note.status === statusFilter)
  );

  // Calculer les indices pour la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeliveryNotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDeliveryNotes.length / itemsPerPage);

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Suivi des livraisons</h1>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filtres
                  {statusFilter !== "all" && (
                    <Badge className="ml-1 bg-blue-100 text-blue-800">
                      {statusFilter}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="end">
                <Command>
                  <CommandInput placeholder="Filtrer par statut..." />
                  <CommandList>
                    <CommandEmpty>Aucun résultat.</CommandEmpty>
                    <CommandGroup>
                      {statusOptions.map((status) => (
                        <CommandItem
                          key={status.value}
                          value={status.value}
                          onSelect={(value) => {
                            setStatusFilter(value);
                            setCurrentPage(1);
                          }}
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${
                              statusFilter === status.value 
                                ? "opacity-100" 
                                : "opacity-0"
                            }`}
                          />
                          {status.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
                {currentItems.map((note) => (
                  <TableRow
                    key={note.id}
                    className="hover-scale cursor-pointer"
                    onClick={() => navigate(`/delivery-note/${note.id}`)}
                  >
                    <TableCell className="font-medium">{note.id}</TableCell>
                    <TableCell>{note.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={`
                          ${note.status === "Livré" 
                            ? "bg-teal-100 text-teal-800 hover:bg-teal-200" 
                            : note.status === "Annulé" 
                              ? "bg-rose-100 text-rose-800 hover:bg-rose-200" 
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"}
                        `}
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Affichage de {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDeliveryNotes.length)} sur {filteredDeliveryNotes.length} bons de livraison
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

export default Index;
