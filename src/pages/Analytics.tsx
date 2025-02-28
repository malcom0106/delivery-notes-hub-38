
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const deliveryData = [
  { month: "Jan", completed: 45, inTransit: 8 },
  { month: "Fév", completed: 52, inTransit: 10 },
  { month: "Mars", completed: 61, inTransit: 12 },
  { month: "Avr", completed: 57, inTransit: 14 },
  { month: "Mai", completed: 63, inTransit: 9 },
  { month: "Juin", completed: 59, inTransit: 11 },
  { month: "Juil", completed: 67, inTransit: 13 },
];

const carrierData = [
  { name: "Express Air Freight", deliveries: 78 },
  { name: "Heavy Haulers Co.", deliveries: 65 },
  { name: "Transport SIM", deliveries: 54 },
  { name: "MARTEL", deliveries: 42 },
  { name: "CARR TEST TRANS", deliveries: 38 },
];

const Analytics = () => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground">
          Analysez les performances et l'activité de livraison
        </p>
      </header>

      <Tabs defaultValue="deliveries">
        <TabsList className="mb-4">
          <TabsTrigger value="deliveries">Livraisons</TabsTrigger>
          <TabsTrigger value="carriers">Transporteurs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deliveries">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques des Livraisons</CardTitle>
              <CardDescription>
                Aperçu des livraisons mensuelles terminées et en cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={deliveryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} livraisons`]} />
                    <Legend />
                    <Bar dataKey="completed" name="Livraisons terminées" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="inTransit" name="En transit" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-lg font-semibold">404</p>
                  <p className="text-sm text-gray-500">Livraisons totales</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-lg font-semibold text-green-700">386</p>
                  <p className="text-sm text-gray-500">Livrées</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-lg font-semibold text-amber-700">18</p>
                  <p className="text-sm text-gray-500">En transit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="carriers">
          <Card>
            <CardHeader>
              <CardTitle>Performance des Transporteurs</CardTitle>
              <CardDescription>
                Nombre de livraisons effectuées par transporteur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={carrierData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => [`${value} livraisons`]} />
                    <Bar dataKey="deliveries" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
