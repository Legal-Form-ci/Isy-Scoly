import { useState } from "react";
import { FileText, Download, Eye, BookOpen, Printer, ExternalLink, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const DocumentationManager = () => {
  const [generating, setGenerating] = useState(false);

  const docSections = [
    { id: 1, title: "Présentation de Scoly", pages: "1-2", status: "ready" },
    { id: 2, title: "Architecture Technique", pages: "3", status: "ready" },
    { id: 3, title: "Base de Données & Schéma", pages: "4", status: "ready" },
    { id: 4, title: "Guide Administrateur", pages: "5-6", status: "ready" },
    { id: 5, title: "Rôles & Permissions", pages: "7", status: "ready" },
    { id: 6, title: "Guide Client", pages: "8-9", status: "ready" },
    { id: 7, title: "Système de Paiement", pages: "10", status: "ready" },
    { id: 8, title: "Edge Functions & API", pages: "11", status: "ready" },
    { id: 9, title: "Sécurité & Authentification", pages: "12", status: "ready" },
    { id: 10, title: "Déploiement & Maintenance", pages: "13", status: "ready" },
    { id: 11, title: "Support & Développeur", pages: "14", status: "ready" },
  ];

  const handleGeneratePDF = () => {
    setGenerating(true);
    // Open documentation page in new tab for printing
    const printWindow = window.open("/documentation?print=true", "_blank");
    if (printWindow) {
      printWindow.addEventListener("load", () => {
        setTimeout(() => {
          printWindow.print();
          setGenerating(false);
        }, 1500);
      });
    } else {
      toast.error("Popup bloqué. Autorisez les popups pour générer le PDF.");
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Documentation</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gestion de la documentation officielle Scoly v2.0
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open("/documentation", "_blank")} className="gap-2">
            <Eye size={16} />
            Aperçu
          </Button>
          <Button onClick={handleGeneratePDF} disabled={generating} className="gap-2">
            {generating ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
            {generating ? "Génération..." : "Générer PDF"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-lg">
              <BookOpen size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">11</p>
              <p className="text-xs text-muted-foreground">Sections</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-accent/10 p-2.5 rounded-lg">
              <FileText size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">14</p>
              <p className="text-xs text-muted-foreground">Pages</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-secondary/10 p-2.5 rounded-lg">
              <CheckCircle size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">v2.0</p>
              <p className="text-xs text-muted-foreground">Version</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-primary/10 p-2.5 rounded-lg">
              <Printer size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">PDF</p>
              <p className="text-xs text-muted-foreground">Format export</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            Documentation Scoly v2.0 — Informations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Titre</p>
              <p className="text-sm font-semibold text-foreground">Documentation Officielle Scoly</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Version</p>
              <p className="text-sm font-semibold text-foreground">2.0.0</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Licence</p>
              <p className="text-sm font-semibold text-foreground">Propriétaire</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Statut</p>
              <p className="text-sm font-semibold text-foreground">Production</p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              La documentation est accessible publiquement à l'adresse <code className="bg-muted px-2 py-0.5 rounded text-xs">/documentation</code>. 
              Les utilisateurs peuvent la consulter en ligne ou la télécharger en PDF. Le bouton « Générer PDF » ouvre la page documentation 
              en mode impression optimisé pour créer un PDF professionnel.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sections List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Table des matières</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {docSections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
                    {section.id}
                  </span>
                  <span className="text-sm font-medium text-foreground">{section.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Pages {section.pages}</span>
                  <Badge variant="default" className="text-xs">
                    <CheckCircle size={12} className="mr-1" />
                    Prêt
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => window.open("/documentation", "_blank")}
            >
              <ExternalLink size={20} className="text-primary" />
              <span className="text-sm">Voir la page publique</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={handleGeneratePDF}
            >
              <Download size={20} className="text-primary" />
              <span className="text-sm">Télécharger en PDF</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => {
                navigator.clipboard.writeText(window.location.origin + "/documentation");
                toast.success("Lien copié !");
              }}
            >
              <FileText size={20} className="text-primary" />
              <span className="text-sm">Copier le lien</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationManager;
