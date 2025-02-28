
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Building, 
  CreditCard, 
  Users, 
  Lock, 
  Bell, 
  Globe, 
  Mail, 
  ShieldCheck,
  Smartphone,
  Moon,
  Sun,
  Palette,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  
  const handleSaveSettings = () => {
    setLoading(true);
    // Simulation d'une sauvegarde
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Configurez votre application et gérez vos préférences
        </p>
      </header>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-6 md:w-[600px] lg:w-[800px]">
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="organization">Organisation</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
        </TabsList>
        
        {/* Paramètres du compte */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Profil utilisateur</CardTitle>
              <CardDescription>
                Gérez vos informations personnelles et vos préférences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Jean" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Dupont" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" type="tel" defaultValue="+33 6 12 34 56 78" />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-4">Communication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emails marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des offres et mises à jour
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emails activité</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications d'activité
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Annuler</Button>
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de l'organisation */}
        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organisation</CardTitle>
              <CardDescription>
                Gérez les informations de votre entreprise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input id="companyName" defaultValue="SDEMAT Logistics" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <Input id="website" type="url" defaultValue="https://sdemat.fr" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Secteur d'activité</Label>
                    <Select defaultValue="logistics">
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Sélectionner un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logistics">Logistique</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="manufacturing">Fabrication</SelectItem>
                        <SelectItem value="retail">Commerce</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="size">Taille de l'entreprise</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Sélectionner une taille" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">1-10 employés</SelectItem>
                        <SelectItem value="medium">11-50 employés</SelectItem>
                        <SelectItem value="large">51-200 employés</SelectItem>
                        <SelectItem value="enterprise">200+ employés</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-4">Adresse</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" defaultValue="123 Rue de la Logistique" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville</Label>
                      <Input id="city" defaultValue="Paris" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postCode">Code postal</Label>
                      <Input id="postCode" defaultValue="75001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Select defaultValue="france">
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="france">France</SelectItem>
                          <SelectItem value="belgium">Belgique</SelectItem>
                          <SelectItem value="switzerland">Suisse</SelectItem>
                          <SelectItem value="germany">Allemagne</SelectItem>
                          <SelectItem value="spain">Espagne</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Annuler</Button>
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de facturation */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Facturation</CardTitle>
              <CardDescription>
                Gérez vos options de paiement et votre abonnement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-4">Plan actuel</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Standard Plan</p>
                      <p className="text-sm text-muted-foreground">
                        €49.00 / mois
                      </p>
                    </div>
                    <Button variant="outline">Changer de plan</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-4">Mode de paiement</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">
                          Expire le 12/2025
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Modifier</Button>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Ajouter une carte
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-4">Historique de facturation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border-b">
                    <div>
                      <p className="font-medium">Facture #2024-003</p>
                      <p className="text-sm text-muted-foreground">
                        10 Mars 2024
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">€49.00</p>
                      <Button variant="ghost" size="sm">PDF</Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b">
                    <div>
                      <p className="font-medium">Facture #2024-002</p>
                      <p className="text-sm text-muted-foreground">
                        10 Févr 2024
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">€49.00</p>
                      <Button variant="ghost" size="sm">PDF</Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b">
                    <div>
                      <p className="font-medium">Facture #2024-001</p>
                      <p className="text-sm text-muted-foreground">
                        10 Janv 2024
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">€49.00</p>
                      <Button variant="ghost" size="sm">PDF</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de sécurité */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez les paramètres de sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Mot de passe</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="w-fit">Changer le mot de passe</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Authentification à deux facteurs</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>Activer l'authentification à deux facteurs</p>
                    <p className="text-sm text-muted-foreground">
                      Renforce la sécurité de votre compte avec une vérification supplémentaire
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Smartphone className="h-6 w-6 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Application d'authentification</p>
                      <p className="text-sm text-muted-foreground">
                        Configurée le 15/01/2024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Sessions actives</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Globe className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Chrome sur Windows</p>
                        <p className="text-sm text-muted-foreground">
                          Paris, France • Actif maintenant
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-green-600">Actuelle</p>
                  </div>
                  <div className="flex justify-between items-center p-3 border-b">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Smartphone className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Application mobile sur iPhone</p>
                        <p className="text-sm text-muted-foreground">
                          Paris, France • Il y a 2 heures
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Déconnecter</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres de notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configurez vos préférences de notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Préférences par email</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Livraisons</Label>
                      <p className="text-sm text-muted-foreground">
                        Notifications concernant les mises à jour de livraison
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Transporteurs</Label>
                      <p className="text-sm text-muted-foreground">
                        Informations sur les changements de transporteurs
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Facturation</Label>
                      <p className="text-sm text-muted-foreground">
                        Factures et informations de paiement
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Système</Label>
                      <p className="text-sm text-muted-foreground">
                        Informations importantes sur le système
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Préférences de l'application</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications push</Label>
                      <p className="text-sm text-muted-foreground">
                        Recevoir des notifications push sur vos appareils
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sons de notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Jouer un son lors de la réception d'une notification
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Réinitialiser</Button>
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Paramètres d'apparence */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Thème</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative border rounded-lg p-4 cursor-pointer bg-white">
                    <div className="absolute top-2 right-2">
                      <div className="h-4 w-4 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Sun className="h-6 w-6 text-yellow-500" />
                      <p className="text-sm font-medium">Clair</p>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer bg-gray-950">
                    <div className="flex flex-col items-center space-y-2">
                      <Moon className="h-6 w-6 text-blue-400" />
                      <p className="text-sm font-medium text-white">Sombre</p>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer bg-gradient-to-b from-white to-gray-900">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex">
                        <Sun className="h-6 w-6 text-yellow-500" />
                        <Moon className="h-6 w-6 text-blue-400 ml-1" />
                      </div>
                      <p className="text-sm font-medium text-gray-800">Système</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Couleurs</h3>
                <div className="grid grid-cols-6 gap-4">
                  <div className="relative border rounded-lg p-4 cursor-pointer">
                    <div className="absolute top-2 right-2">
                      <div className="h-4 w-4 rounded-full bg-primary"></div>
                    </div>
                    <div className="h-10 w-full rounded-md bg-blue-600"></div>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="h-10 w-full rounded-md bg-purple-600"></div>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="h-10 w-full rounded-md bg-green-600"></div>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="h-10 w-full rounded-md bg-red-600"></div>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="h-10 w-full rounded-md bg-amber-600"></div>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer">
                    <div className="h-10 w-full rounded-md bg-pink-600"></div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Autres préférences d'affichage</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Activer les animations de l'interface
                      </p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Réduction du mouvement</Label>
                      <p className="text-sm text-muted-foreground">
                        Réduire les animations pour améliorer l'accessibilité
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mode compact</Label>
                      <p className="text-sm text-muted-foreground">
                        Diminuer l'espacement dans l'interface
                      </p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button variant="outline">Réinitialiser</Button>
                <Button onClick={handleSaveSettings} disabled={loading}>
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer les modifications"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
