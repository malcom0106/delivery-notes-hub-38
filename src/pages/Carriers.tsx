
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
import { Search } from "lucide-react";

interface Carrier {
  id: string;
  name: string;
  reference: string;
  type: string;
  email?: string;
}

const CARRIERS_DATA: Carrier[] = [
  { 
    id: "1", 
    name: "CARR TEST TRANS", 
    reference: "06453f9f-4886-4bb1-9bf7-bf0882446dc1", 
    type: "Transporteur" 
  },
  { 
    id: "2", 
    name: "MARTEL", 
    reference: "61ace171-5839-454a-bb89-737638f3dd61", 
    type: "Transporteur" 
  },
  { 
    id: "3", 
    name: "Transport SIM", 
    reference: "6f93569f-7709-49c2-85f0-113859f257c5", 
    type: "Transporteur" 
  },
  { 
    id: "4", 
    name: "Transporteur / Carrier A", 
    reference: "TRANSPA", 
    type: "Transporteur",
    email: "rmitha@synaxe.com"
  },
  { 
    id: "5", 
    name: "Transporteur / Carrier B", 
    reference: "TRANSPB", 
    type: "Transporteur",
    email: "rmitha@synaxe.com et 1 autre(s)"
  },
  { 
    id: "6", 
    name: "Transporteur / Carrier C", 
    reference: "TRANSPC", 
    type: "Transporteur" 
  },
];

const Carriers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCarriers = CARRIERS_DATA.filter(
    carrier => carrier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCarriers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCarriers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="h-full w-full p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Transporteurs</h1>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Chercher un transporteur"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-500">
            {filteredCarriers.length}/{CARRIERS_DATA.length} résultats
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Ajouter un chauffeur
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Actions</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Emails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell>
                    <div className="flex gap-2 text-blue-600">
                      <a href="#" className="text-xs hover:underline">Voir les BL</a>
                      <span className="text-gray-300">|</span>
                      <a href="#" className="text-xs hover:underline">Voir les détails</a>
                    </div>
                  </TableCell>
                  <TableCell>{carrier.name}</TableCell>
                  <TableCell className="text-gray-600 text-sm font-mono">{carrier.reference}</TableCell>
                  <TableCell>{carrier.type}</TableCell>
                  <TableCell className="text-blue-600">{carrier.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCarriers.length)} sur {filteredCarriers.length}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Par page:</span>
            <select className="border rounded px-2 py-1 text-sm">
              <option>20</option>
            </select>
            
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => paginate(1)} 
                disabled={currentPage === 1}
              >
                &lt;&lt;
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                &lt;
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
              >
                &gt;
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => paginate(totalPages)} 
                disabled={currentPage === totalPages}
              >
                &gt;&gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carriers;
