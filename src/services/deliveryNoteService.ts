
import env from "@/config/environment";
import { DeliveryNote, ApiResponse } from "@/types/DeliveryNote";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = `${env.API_HOST}/extranet/${env.CLIENT_ID}/document`;

// Fonction pour récupérer tous les bons de livraison
export const fetchDeliveryNotes = async (): Promise<DeliveryNote[]> => {
  try {
    const response = await fetch(`${BASE_URL}/get`, {
      credentials: 'include', // Important pour inclure les cookies dans la requête
    });
    
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
    throw error;
  }
};

// Fonction pour récupérer un bon de livraison spécifique
export const fetchDeliveryNoteById = async (id: string): Promise<DeliveryNote | undefined> => {
  try {
    const response = await fetch(`${BASE_URL}/get/${id}`, {
      credentials: 'include', // Important pour inclure les cookies dans la requête
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch delivery note");
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching delivery note #${id}:`, error);
    throw error;
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

