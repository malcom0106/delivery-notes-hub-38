
import env from "@/config/environment";
import { DeliveryNote, ApiResponse } from "@/types/DeliveryNote";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = `${env.API_HOST}/extranet/${env.CLIENT_ID}/document`;

// Fonction pour récupérer tous les bons de livraison
export const fetchDeliveryNotes = async (): Promise<DeliveryNote[]> => {
  try {
    const response = await fetch(`${BASE_URL}/get`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || "Failed to fetch delivery notes");
    }
    
    return data.data;
  } catch (error) {
    console.error("Error fetching delivery notes:", error);
    // Pour le moment, retourner les données fictives en cas d'erreur
    return deliveryNotes;
  }
};

// Fonction pour récupérer un bon de livraison spécifique
export const fetchDeliveryNoteById = async (id: string): Promise<DeliveryNote | undefined> => {
  try {
    // Dans un cas réel, nous ferions une requête spécifique ici
    // Pour l'instant, nous utilisons la même API et filtrons côté client
    const notes = await fetchDeliveryNotes();
    return notes.find(note => note.id === id);
  } catch (error) {
    console.error(`Error fetching delivery note #${id}:`, error);
    // Retourner le bon de livraison factice correspondant en cas d'erreur
    return deliveryNotes.find(note => note.id === id);
  }
};

// Hook React Query pour récupérer un bon de livraison
export const useDeliveryNote = (id: string | undefined) => {
  return useQuery({
    queryKey: ['deliveryNote', id],
    queryFn: () => fetchDeliveryNoteById(id || ''),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Données fictives pour le développement et en cas d'échec de l'API
const deliveryNotes = [
  {
    id: "BL001",
    date: "15/03/2024",
    status: "En Transit",
    destination: "Hangar 7, Aéroport Ouest",
    items: "Pièces d'avion",
    carrier: "Express Air Freight",
    client: "Aéronautiques Réunies",
    clientContact: "Jean Dupont",
    clientPhone: "+33 6 12 34 56 78",
    clientEmail: "jean.dupont@aero.fr",
    notes: "Livraison prévue avant 14h. Précautions particulières requises pour les composants sensibles.",
    trackingNumber: "EXPR-9872-AIR",
    driverName: "Marc Leblanc",
    estimatedDelivery: "15/03/2024 14:00",
  },
  {
    id: "BL002",
    date: "14/03/2024",
    status: "Livré",
    destination: "Site B, Projet Centre-Ville",
    items: "Matériaux de construction",
    carrier: "Heavy Haulers Co.",
    client: "Construction Urbaine SA",
    clientContact: "Marie Martin",
    clientPhone: "+33 6 98 76 54 32",
    clientEmail: "marie.martin@construction.fr",
    notes: "Signature requise par le chef de chantier uniquement.",
    trackingNumber: "HHC-4567-CON",
    driverName: "Pierre Dubois",
    deliveryDate: "14/03/2024 11:23",
  },
];
