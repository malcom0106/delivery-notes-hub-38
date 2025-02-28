
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

const USERS_DATA: User[] = [
  { id: "1", firstName: "Jean", lastName: "Dupont", email: "jean.dupont@sdemat.fr", isAdmin: true },
  { id: "2", firstName: "Marie", lastName: "Martin", email: "marie.martin@sdemat.fr", isAdmin: false },
  { id: "3", firstName: "Pierre", lastName: "Durand", email: "pierre.durand@sdemat.fr", isAdmin: false },
  { id: "4", firstName: "Sophie", lastName: "Lefevre", email: "sophie.lefevre@sdemat.fr", isAdmin: true },
  { id: "5", firstName: "Thomas", lastName: "Moreau", email: "thomas.moreau@sdemat.fr", isAdmin: false },
  { id: "6", firstName: "Clara", lastName: "Bernard", email: "clara.bernard@sdemat.fr", isAdmin: false },
  { id: "7", firstName: "Lucas", lastName: "Dubois", email: "lucas.dubois@sdemat.fr", isAdmin: false },
  { id: "8", firstName: "Emma", lastName: "Petit", email: "emma.petit@sdemat.fr", isAdmin: false },
  { id: "9", firstName: "Hugo", lastName: "Rousseau", email: "hugo.rousseau@sdemat.fr", isAdmin: true },
  { id: "10", firstName: "Chloé", lastName: "Girard", email: "chloe.girard@sdemat.fr", isAdmin: false },
  { id: "11", firstName: "Léo", lastName: "Roux", email: "leo.roux@sdemat.fr", isAdmin: false },
  { id: "12", firstName: "Manon", lastName: "Vincent", email: "manon.vincent@sdemat.fr", isAdmin: false },
  { id: "13", firstName: "Jules", lastName: "Faure", email: "jules.faure@sdemat.fr", isAdmin: true },
  { id: "14", firstName: "Inès", lastName: "Andre", email: "ines.andre@sdemat.fr", isAdmin: false },
  { id: "15", firstName: "Louis", lastName: "Mercier", email: "louis.mercier@sdemat.fr", isAdmin: false }
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const filteredUsers = USERS_DATA.filter(
    user => 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez les utilisateurs et leurs droits d'accès
        </p>
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Liste des Utilisateurs</CardTitle>
              <CardDescription>
                {filteredUsers.length} utilisateurs enregistrés
              </CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>

          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Droits</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((user) => (
                  <TableRow key={user.id} className="hover-scale">
                    <TableCell className="font-medium">{user.lastName}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.isAdmin ? "default" : "secondary"}>
                        {user.isAdmin ? "Admin" : "Utilisateur"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Éditer</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Affichage de {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredUsers.length)} sur {filteredUsers.length} utilisateurs
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

export default Users;
