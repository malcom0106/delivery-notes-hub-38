
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Truck, 
  Building, 
  Phone, 
  Mail,
  FileText,
  MapPin,
  User,
  Users,
  CalendarClock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Carrier {
  id: string;
  name: string;
  reference: string;
  type: string;
  email?: string;
  phone?: string;
  address?: string;
  contactName?: string;
  numberOfDrivers?: number;
  numberOfTrucks?: number;
  createdAt?: string;
  lastDelivery?: string;
}

const CARRIERS_DATA: Carrier[] = [
  { 
    id: "1", 
    name: "CARR TEST TRANS", 
    reference: "06453f9f-4886-4bb1-9bf7-bf0882446dc1", 
    type: "Transporteur",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue de la Livraison, 75001 Paris",
    contactName: "Alexandre Martin",
    numberOfDrivers: 12,
    numberOfTrucks: 8,
    createdAt: "12/05/2020",
    lastDelivery: "15/03/2024"
  },
  { 
    id: "2", 
    name: "MARTEL", 
    reference: "61ace171-5839-454a-bb89-737638f3dd61", 
    type: "Transporteur",
    phone: "+33 1 98 76 54 32",
    address: "45 Avenue du Transport, 69002 Lyon",
    contactName: "Sophie Dubois",
    numberOfDrivers: 8,
    numberOfTrucks: 6,
    createdAt: "03/11/2021",
    lastDelivery: "14/03/2024"
  },
  { 
    id: "3", 
    name: "Transport SIM", 
    reference: "6f93569f-7709-49c2-85f0-113859f257c5", 
    type: "Transporteur",
    phone: "+33 1 45 67 89 01",
    address: "78 Boulevard Logistique, 33000 Bordeaux",
    contactName: "Thomas Leroy",
    numberOfDrivers: 15,
    numberOfTrucks: 12,
    createdAt: "22/07/2019",
    lastDelivery: "13/03/2024"
  },
  { 
    id: "4", 
    name: "Transporteur / Carrier A", 
    reference: "TRANSPA", 
    type: "Transporteur",
    email: "rmitha@synaxe.com",
    phone: "+33 1 23 45 67 89",
    address: "10 Rue des Expéditions, 44000 Nantes",
    contactName: "Juliette Moreau",
    numberOfDrivers: 5,
    numberOfTrucks: 3,
    createdAt: "15/03/2022",
    lastDelivery: "10/03/2024"
  },
  { 
    id: "5", 
    name: "Transporteur / Carrier B", 
    reference: "TRANSPB", 
    type: "Transporteur",
    email: "rmitha@synaxe.com et 1 autre(s)",
    phone: "+33 1 98 76 54 32",
    address: "22 Avenue des Colis, 59000 Lille",
    contactName: "Pierre Dupont",
    numberOfDrivers: 7,
    numberOfTrucks: 5,
    createdAt: "08/09/2021",
    lastDelivery: "09/03/2024"
  },
  { 
    id: "6", 
    name: "Transporteur / Carrier C", 
    reference: "TRANSPC", 
    type: "Transporteur",
    phone: "+33 1 45 67 89 01",
    address: "5 Rue du Fret, 67000 Strasbourg",
    contactName: "Marie Lambert",
    numberOfDrivers: 9,
    numberOfTrucks: 7,
    createdAt: "17/01/2020",
    lastDelivery: "08/03/2024"
  },
  { 
    id: "7", 
    name: "Express Air Freight", 
    reference: "EAF2024", 
    type: "Transporteur",
    email: "contact@expressair.com",
    phone: "+33 1 23 45 67 89",
    address: "30 Boulevard Aérien, 31000 Toulouse",
    contactName: "Jean Roux",
    numberOfDrivers: 18,
    numberOfTrucks: 14,
    createdAt: "05/04/2018",
    lastDelivery: "15/03/2024"
  },
  { 
    id: "8", 
    name: "Heavy Haulers Co.", 
    reference: "HHC2024", 
    type: "Transporteur",
    email: "info@heavyhaulers.com",
    phone: "+33 1 98 76 54 32",
    address: "8 Avenue des Poids Lourds, 13001 Marseille",
    contactName: "Claire Blanc",
    numberOfDrivers: 22,
    numberOfTrucks: 18,
    createdAt: "12/10/2017",
    lastDelivery: "14/03/2024"
  },
  { 
    id: "9", 
    name: "Rapid Transport", 
    reference: "RAPID01", 
    type: "Transporteur",
    phone: "+33 1 45 67 89 01",
    address: "15 Rue de la Vitesse, 35000 Rennes",
    contactName: "Lucas Girard",
    numberOfDrivers: 10,
    numberOfTrucks: 8,
    createdAt: "21/05/2020",
    lastDelivery: "12/03/2024"
  },
  { 
    id: "10", 
    name: "Global Logistics", 
    reference: "GL2024", 
    type: "Transporteur",
    email: "contact@globallogistics.com",
    phone: "+33 1 23 45 67 89",
    address: "42 Boulevard International, 06000 Nice",
    contactName: "Emma Martin",
    numberOfDrivers: 25,
    numberOfTrucks: 20,
    createdAt: "03/07/2016",
    lastDelivery: "13/03/2024"
  },
  { 
    id: "11", 
    name: "City Deliveries", 
    reference: "CITY2024", 
    type: "Transporteur",
    phone: "+33 1 98 76 54 32",
    address: "17 Rue Urbaine, 34000 Montpellier",
    contactName: "Hugo Bernard",
    numberOfDrivers: 15,
    numberOfTrucks: 12,
    createdAt: "14/11/2019",
    lastDelivery: "11/03/2024"
  },
  { 
    id: "12", 
    name: "International Freight", 
    reference: "INTL2024", 
    type: "Transporteur",
    email: "support@intlfreight.com",
    phone: "+33 1 45 67 89 01",
    address: "25 Avenue Mondiale, 57000 Metz",
    contactName: "Léa Petit",
    numberOfDrivers: 30,
    numberOfTrucks: 24,
    createdAt: "19/03/2015",
    lastDelivery: "15/03/2024"
  }
];

const CarrierDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Recherche du transporteur
  const carrier = CARRIERS_DATA.find(c => c.id === id);
  
  if (!carrier) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Transporteur introuvable</h2>
              <p className="text-muted-foreground">Le transporteur avec l'ID {id} n'existe pas</p>
              <Button onClick={() => navigate('/carriers')}>
                Retour à la liste
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/carriers')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{carrier.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Informations principales */}
        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
            <CardDescription>Détails du transporteur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Nom</p>
                  <p className="text-sm text-muted-foreground">{carrier.name}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Référence</p>
                  <p className="text-sm text-muted-foreground font-mono">{carrier.reference}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">{carrier.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{carrier.email || "Non renseigné"}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Adresse</p>
                  <p className="text-sm text-muted-foreground">{carrier.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Contact principal</p>
                  <p className="text-sm text-muted-foreground">{carrier.contactName}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-600">Chauffeurs</p>
                </div>
                <p className="text-lg font-bold mt-1">{carrier.numberOfDrivers}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-600">Véhicules</p>
                </div>
                <p className="text-lg font-bold mt-1">{carrier.numberOfTrucks}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-600">Création</p>
                </div>
                <p className="text-sm font-bold mt-1">{carrier.createdAt}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-600">Dernière livraison</p>
                </div>
                <p className="text-sm font-bold mt-1">{carrier.lastDelivery}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Statistiques */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Options disponibles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" variant="default">
              <Mail className="mr-2 h-4 w-4" />
              Contacter
            </Button>
            
            <Button className="w-full" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Voir les bons de livraison
            </Button>
            
            <Button className="w-full" variant="outline">
              <Truck className="mr-2 h-4 w-4" />
              Voir les camions
            </Button>
            
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Voir les chauffeurs
            </Button>
            
            <Separator />
            
            <Button className="w-full" variant="destructive">
              Désactiver le compte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarrierDetails;
