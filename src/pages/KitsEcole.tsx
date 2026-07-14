import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const KitsEcole = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Kits École — Scoly</title>
        <meta name="description" content="Kits scolaires prêts à l'emploi par niveau : Maternelle, Primaire, Secondaire et Universitaire." />
      </Helmet>
      <Navbar />
      <main id="main-content" className="flex-1 container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Kits École
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Découvrez nos kits scolaires par niveau. Contenu en cours de préparation.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default KitsEcole;
