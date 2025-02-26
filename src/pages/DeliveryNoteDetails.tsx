
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Truck, Calendar, MapPin, FileText, User } from "lucide-react";

// Mock data for demonstration
const getDeliveryNote = (id: string) => ({
  id,
  date: "15/03/2024",
  client: "Aérotech Solutions",
  project: "Hangar 7, Aéroport Ouest",
  status: "En Transit",
  carrier: "Express Air Freight",
  vehicle: "CV258MN",
  timelineEvents: [
    { time: "10/01 19:00", label: "Production", type: "production" },
    { time: "10/01 17:55", label: "Arrivée chantier réelle", type: "arrival" },
    { time: "10/01 17:56", label: "Signature du client", type: "signature" },
    { time: "10/01 17:56", label: "Départ chantier", type: "departure" },
  ],
  items: [
    { quantity: "22.5", unit: "T", description: "Béton armé" },
    { quantity: "1", unit: "U", description: "Transport" },
  ],
  signature: {
    name: "Richard Test",
    date: "10/01/2024 17:56",
  }
});

const DeliveryNoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getDeliveryNote(id || "");

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-b from-blue-50 to-white">
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </Button>

      <div className="space-y-6">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Bon de Livraison {note.id}</h1>
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour le {note.signature.date}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Informations Client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-medium">{note.client}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Projet</p>
                <p className="font-medium">{note.project}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-500" />
                Informations Transport
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Transporteur</p>
                <p className="font-medium">{note.carrier}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Immatriculation</p>
                <p className="font-medium">{note.vehicle}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Temps de livraison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {note.timelineEvents.map((event, index) => (
                  <div
                    key={event.time}
                    className="mb-8 flex gap-4 items-start"
                  >
                    <div className="flex h-2 w-2 rounded-full bg-blue-500 mt-2">
                      {index < note.timelineEvents.length - 1 && (
                        <div className="absolute w-0.5 bg-blue-200 h-8 left-1 top-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{event.label}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Liste des produits commandés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm text-muted-foreground">
                    <th className="text-left py-2">Quantité</th>
                    <th className="text-left py-2">Unité</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {note.items.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3">{item.quantity}</td>
                      <td className="py-3">{item.unit}</td>
                      <td className="py-3">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Carte de la livraison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
                <p className="text-muted-foreground">Carte en cours de chargement...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeliveryNoteDetails;
