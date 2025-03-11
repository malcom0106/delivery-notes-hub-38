import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Truck, 
  FileText, 
  User, 
  Calendar,
  Wrench,
  Gauge,
  Building,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Ban
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TruckDetails {
  id: string;
  licensePlate: string;
  label: string;
  type: string;
  status: "Actif" | "En maintenance" | "Indisponible";
  carrier: string;
  model?: string;
  year?: number;
  lastMaintenance?: string;
  nextMaintenance?: string;
  assignedDriver?: string;
  maxLoad?: string;
  location?: string;
  registrationDate?: string;
  fuelType?: string;
  mileage?: number;
}

const TRUCKS_DETAILS: TruckDetails[] = [
  { 
    id: "1", 
    licensePlate: "AB-123-CD", 
    label: "Camion 1", 
    type: "Semi-remorque", 
    status: "Actif", 
    carrier: "Express Air Freight",
    model: "Volvo FH16",
    year: 2021,
    lastMaintenance: "12/02/2024",
    nextMaintenance: "12/05/2024",
    assignedDriver: "Martin Dubois",
    maxLoad: "40 tonnes",
    location: "Dépôt central",
    registrationDate: "05/06/2021",
    fuelType: "Diesel",
    mileage: 45280
  },
  { 
    id: "2", 
    licensePlate: "EF-456-GH", 
    label: "Camion 2", 
    type: "Porteur", 
    status: "Actif", 
    carrier: "Heavy Haulers Co.",
    model: "Mercedes-Benz Actros",
    year: 2020,
    lastMaintenance: "03/03/2024",
    nextMaintenance: "03/06/2024",
    assignedDriver: "Sophie Martin",
    maxLoad: "26 tonnes",
    location: "Site client",
    registrationDate: "15/11/2020",
    fuelType: "Diesel",
    mileage: 78500
  },
  { 
    id: "3", 
    licensePlate: "IJ-789-KL", 
    label: "Camion 3", 
    type: "Benne", 
    status: "En maintenance", 
    carrier: "Transport SIM",
    model: "Scania R-Series",
    year: 2019,
    lastMaintenance: "01/04/2024",
    nextMaintenance: "01/07/2024",
    assignedDriver: "Thomas Leroy",
    maxLoad: "32 tonnes",
    location: "Atelier mécanique",
    registrationDate: "22/03/2019",
    fuelType: "Diesel",
    mileage: 120350
  },
  { 
    id: "4", 
    licensePlate: "MN-012-OP", 
    label: "Camion 4", 
    type: "Frigorifique", 
    status: "Actif", 
    carrier: "MARTEL",
    model: "Renault Trucks T",
    year: 2022,
    lastMaintenance: "20/01/2024",
    nextMaintenance: "20/04/2024",
    assignedDriver: "Julie Moreau",
    maxLoad: "24 tonnes",
    location: "En livraison",
    registrationDate: "10/01/2022",
    fuelType: "Diesel",
    mileage: 35670
  },
  { 
    id: "5", 
    licensePlate: "QR-345-ST", 
    label: "Camion 5", 
    type: "Citerne", 
    status: "Indisponible", 
    carrier: "CARR TEST TRANS",
    model: "DAF XF",
    year: 2018,
    lastMaintenance: "05/12/2023",
    nextMaintenance: "05/03/2024",
    assignedDriver: "Paul Petit",
    maxLoad: "36 tonnes",
    location: "Garage",
    registrationDate: "18/07/2018",
    fuelType: "Diesel",
    mileage: 156780
  },
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

const TruckDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const truck = TRUCKS_DETAILS.find(t => t.id === id);
  
  if (!truck) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Camion introuvable</h2>
              <p className="text-muted-foreground">Le camion avec l'ID {id} n'existe pas</p>
              <Button onClick={() => navigate('/trucks')}>
                Retour à la liste
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Actif": 
        return <CheckCircle className="h-5 w-5 text-purple-600" />;
      case "En maintenance": 
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "Indisponible": 
        return <Ban className="h-5 w-5 text-red-600" />;
      default: 
        return null;
    }
  };
  
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/trucks')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Camion {truck.label}</h1>
        <Badge 
          className={`ml-2 ${
            truck.status === "Actif" 
              ? "bg-purple-100 text-purple-800 hover:bg-purple-200" 
              : truck.status === "En maintenance" 
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" 
                : "bg-red-100 text-red-800 hover:bg-red-200"
          }`}
        >
          {truck.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
            <CardDescription>Détails du camion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Plaque d'immatriculation</p>
                  <p className="text-sm text-muted-foreground">{truck.licensePlate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Type</p>
                  <p className="text-sm text-muted-foreground">{truck.type}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Transporteur</p>
                  <p className="text-sm text-muted-foreground">{truck.carrier}</p>
                </div>
              </div>
              
              {truck.model && (
                <div className="flex items-start gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Modèle</p>
                    <p className="text-sm text-muted-foreground">
                      {truck.model} {truck.year && `(${truck.year})`}
                    </p>
                  </div>
                </div>
              )}
              
              {truck.maxLoad && (
                <div className="flex items-start gap-2">
                  <Gauge className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Charge maximale</p>
                    <p className="text-sm text-muted-foreground">{truck.maxLoad}</p>
                  </div>
                </div>
              )}
              
              {truck.fuelType && (
                <div className="flex items-start gap-2">
                  <Gauge className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Type de carburant</p>
                    <p className="text-sm text-muted-foreground">{truck.fuelType}</p>
                  </div>
                </div>
              )}
            </div>
            
            {truck.mileage && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">État du véhicule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Gauge className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Kilométrage</p>
                        <p className="text-sm text-muted-foreground">{truck.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                    
                    {truck.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Localisation</p>
                          <p className="text-sm text-muted-foreground">{truck.location}</p>
                        </div>
                      </div>
                    )}
                    
                    {truck.registrationDate && (
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Date d'immatriculation</p>
                          <p className="text-sm text-muted-foreground">{truck.registrationDate}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            
            {truck.lastMaintenance && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Maintenance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Dernière maintenance</p>
                        <p className="text-sm text-muted-foreground">{truck.lastMaintenance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Prochaine maintenance</p>
                        <p className="text-sm text-muted-foreground">{truck.nextMaintenance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Statut et Assignation</CardTitle>
            <CardDescription>Informations sur l'état actuel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(truck.status)}
                <p className="text-sm font-medium">{truck.status}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                {truck.status === "Actif" 
                  ? "Le véhicule est en état de marche et disponible pour les opérations." 
                  : truck.status === "En maintenance" 
                    ? "Le véhicule est actuellement en maintenance et temporairement indisponible." 
                    : "Le véhicule est hors service pour une durée indéterminée."}
              </p>
            </div>
            
            {truck.assignedDriver && (
              <>
                <h3 className="text-sm font-medium">Chauffeur assigné</h3>
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{truck.assignedDriver}</p>
                    <p className="text-xs text-muted-foreground">Chauffeur principal</p>
                  </div>
                </div>
              </>
            )}
            
            <Separator />
            
            <div className="pt-2 space-y-2">
              <Button className="w-full" variant="outline">
                <Wrench className="mr-2 h-4 w-4" />
                Programmer une maintenance
              </Button>
              
              <Button className="w-full" variant="outline">
                <User className="mr-2 h-4 w-4" />
                Changer le chauffeur
              </Button>
              
              <Button 
                className="w-full" 
                variant={truck.status === "Actif" ? "outline" : "default"}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {truck.status === "Actif" ? "Marquer comme indisponible" : "Marquer comme actif"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TruckDetails;
