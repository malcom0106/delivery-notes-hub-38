
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import DeliveryNoteDetails from "./pages/DeliveryNoteDetails";
import Carriers from "./pages/Carriers";
import CarrierDetails from "./pages/CarrierDetails";
import Trucks from "./pages/Trucks";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/delivery-note/:id" element={<DeliveryNoteDetails />} />
          <Route path="/carriers" element={<Carriers />} />
          <Route path="/carrier/:id" element={<CarrierDetails />} />
          <Route path="/trucks" element={<Trucks />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
