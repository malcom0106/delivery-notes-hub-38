
// Types pour les bons de livraison
export interface DeliveryNote {
  id: string;
  date: string;
  status: string;
  destination: string;
  items: string;
  carrier: string;
  client: string;
  clientContact: string;
  clientPhone: string;
  clientEmail: string;
  notes: string;
  trackingNumber: string;
  driverName: string;
  estimatedDelivery?: string;
  deliveryDate?: string;
}

export interface ApiResponse {
  success: boolean;
  data: DeliveryNote[];
  message?: string;
}
