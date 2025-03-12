
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Truck, 
  Calendar, 
  MapPin, 
  Package, 
  User, 
  Phone, 
  Mail,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeliveryNote } from "@/services/deliveryNoteService";

const DeliveryNoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Utiliser notre hook personnalisé pour récupérer le bon de livraison
  const { data: deliveryNote, isLoading, error } = useDeliveryNote(id);
  
  // Afficher un état de chargement
  if (isLoading) {
    return (
      <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 glass-card">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Skeleton className="h-5 w-5 mt-0.5" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="h-5 w-5 mt-0.5" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Afficher une erreur
  if (error || !deliveryNote) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
              <h2 className="text-2xl font-bold">Bon de livraison introuvable</h2>
              <p className="text-muted-foreground">Le bon de livraison n°{id} n'existe pas ou une erreur s'est produite</p>
              <Button onClick={() => navigate('/')}>
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
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Bon de Livraison #{deliveryNote.id}</h1>
        <Badge 
          variant={deliveryNote.status === "Livré" ? "default" : "secondary"}
          className="ml-2"
        >
          {deliveryNote.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Détails principaux */}
        <Card className="md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
            <CardDescription>Détails du bon de livraison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Date d'émission</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.date}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Destination</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.destination}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Articles</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.items}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Transporteur</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.carrier}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">N° Tracking</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.trackingNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Chauffeur</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.driverName}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground p-3 bg-gray-50 rounded-md">
                {deliveryNote.notes}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Statut de livraison</h3>
              <div className="flex items-center gap-2">
                {deliveryNote.status === "Livré" ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-green-600">Livré</p>
                      <p className="text-xs text-muted-foreground">
                        Le {deliveryNote.deliveryDate}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Clock className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium text-amber-600">En transit</p>
                      <p className="text-xs text-muted-foreground">
                        Livraison estimée: {deliveryNote.estimatedDelivery}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Informations du client */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Informations Client</CardTitle>
            <CardDescription>Détails du destinataire</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Entreprise</p>
                <p className="text-sm">{deliveryNote.client}</p>
              </div>
              
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Contact</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.clientContact}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Téléphone</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.clientPhone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{deliveryNote.clientEmail}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="pt-2">
              <Button className="w-full" variant="outline">
                Contacter le client
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryNoteDetails;
