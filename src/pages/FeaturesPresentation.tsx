import { GraduationCap, Package, Users, BookOpen, Shield, Zap, Globe, TrendingUp, Download, ArrowRight, CheckCircle, Star, Smartphone, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Logo from "@/components/Logo";

const FeaturesPresentation = () => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Scoly 3.0 — Nouvelles Fonctionnalités Stratégiques"
        description="Présentation des nouvelles fonctionnalités de Scoly : Espace Écoles, Kits Intelligents, Programme de Parrainage, Marketplace Éducative."
        url="https://scoly.ci/fonctionnalites"
      />
      <div className="print:hidden"><Navbar /></div>

      {/* Hero */}
      <section className="pt-24 pb-16 bg-primary print:pt-8">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <div className="hidden print:block print:mb-8">
            <div className="bg-white/95 rounded-xl px-6 py-3 inline-block mb-6">
              <Logo size="lg" />
            </div>
          </div>
          <div className="print:hidden flex justify-center mb-4">
            <div className="bg-white/95 rounded-xl px-4 py-2">
              <Logo size="lg" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-bold mb-3">
            Scoly 3.0 — Nouvelles Fonctionnalités
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-2">
            Solutions stratégiques pour digitaliser la rentrée scolaire en Côte d'Ivoire
          </p>
          <p className="text-sm opacity-70">Par Inocent KOFFI • Février 2026</p>
          <div className="print:hidden mt-6">
            <Button variant="accent" size="lg" onClick={handleDownload} className="gap-2">
              <Download size={18} />
              Télécharger le document
            </Button>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="py-12 print:py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">1. Contexte Général</h2>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              La rentrée scolaire en Côte d'Ivoire représente un moment de forte pression financière et logistique pour les familles.
              Chaque année, plus de <strong className="text-foreground">7 millions d'élèves</strong> nécessitent des fournitures scolaires,
              mais les parents font face à des défis majeurs : listes de fournitures dispersées, prix non standardisés,
              files d'attente dans les librairies et manque de contenus éducatifs numériques.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Scoly 3.0</strong> répond à ces défis en introduisant 4 fonctionnalités stratégiques
              qui transforment l'expérience d'achat scolaire en une expérience 100% digitale, intelligente et communautaire.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-12 bg-muted/30 print:py-6 print:break-before-page">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8">2. Les Solutions</h2>

          {[
            {
              icon: <GraduationCap size={32} />,
              title: "🎓 Espace Écoles & Établissements",
              desc: "Plateforme B2B/B2C permettant aux écoles de publier leurs listes de fournitures officielles et aux parents de commander en un clic.",
              features: [
                "Répertoire d'écoles par ville et type",
                "Listes de fournitures officielles par classe",
                "Commande groupée — ajout de toute une liste au panier",
                "Programme de fidélité écoles (Bronze → Platinum)",
                "Tableau de bord école avec statistiques",
              ],
              url: "/ecoles",
            },
            {
              icon: <Package size={32} />,
              title: "📦 Kits Scolaires Intelligents",
              desc: "Système de génération automatique de kits de fournitures scolaires basé sur le niveau d'étude et la série.",
              features: [
                "Sélection du niveau (CP1 → Terminale)",
                "Filtrage par série (A, C, D pour le lycée)",
                "Composition automatique du kit avec les bons manuels",
                "Ajout du kit complet au panier en un clic",
                "Prix total calculé en temps réel",
              ],
              url: "/kits",
            },
            {
              icon: <Users size={32} />,
              title: "🤝 Programme de Parrainage",
              desc: "Système de parrainage viral permettant aux utilisateurs de gagner des crédits en invitant leurs proches.",
              features: [
                "Code unique par utilisateur (SCOLY-XXXXXX)",
                "Partage via WhatsApp, SMS, copie directe",
                "Récompense : 500 FCFA pour le parrain, 300 FCFA pour le filleul",
                "Système de niveaux : Bronze → Argent → Or → Platinum",
                "Tableau de bord ambassadeur avec statistiques",
              ],
              url: "/parrainage",
            },
            {
              icon: <BookOpen size={32} />,
              title: "📚 Marketplace de Contenus Éducatifs",
              desc: "Place de marché pour les ressources pédagogiques : exercices, sujets d'examen, vidéos, fiches de cours.",
              features: [
                "Contenus par matière et niveau scolaire",
                "Catégories : exercices, examens, vidéos, fiches",
                "Contenus gratuits et premium",
                "Compteur de téléchargements",
                "Filtrage avancé multi-critères",
              ],
              url: "/ressources",
            },
          ].map((solution, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 mb-6 print:break-inside-avoid">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">{solution.icon}</div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">{solution.title}</h3>
                  <p className="text-muted-foreground mt-1">{solution.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-0 sm:ml-16">
                {solution.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="py-12 print:py-6 print:break-before-page">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">3. Objectifs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <TrendingUp size={24} />, title: "Croissance", desc: "+300% d'inscriptions via le parrainage et les écoles partenaires" },
              { icon: <Zap size={24} />, title: "Conversion", desc: "Réduire le temps de commande de 15 min à 2 min avec les kits" },
              { icon: <Globe size={24} />, title: "Couverture", desc: "Couvrir 500+ écoles en Côte d'Ivoire d'ici fin 2026" },
              { icon: <Star size={24} />, title: "Rétention", desc: "+50% de rétention grâce au parrainage et à la fidélité" },
              { icon: <Smartphone size={24} />, title: "Accessibilité", desc: "PWA avec mode hors-ligne pour les zones à faible connectivité" },
              { icon: <Award size={24} />, title: "Éducation", desc: "Devenir la 1ère plateforme de ressources éducatives en CI" },
            ].map((obj, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 flex gap-3">
                <div className="text-primary mt-0.5 shrink-0">{obj.icon}</div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{obj.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{obj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-12 bg-muted/30 print:py-6 print:break-before-page">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">4. Avantages Concurrentiels</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="text-left p-3">Critère</th>
                  <th className="text-left p-3">Concurrents</th>
                  <th className="text-left p-3">Scoly 3.0</th>
                </tr>
              </thead>
              <tbody className="bg-card">
                {[
                  { critere: "Listes de fournitures", concurrent: "Papier / WhatsApp", scoly: "✅ Digitale, 1-clic, officielle" },
                  { critere: "Kits prêts-à-commander", concurrent: "❌ Inexistant", scoly: "✅ Auto-généré par niveau/série" },
                  { critere: "Parrainage viral", concurrent: "❌ Inexistant", scoly: "✅ WhatsApp/SMS, crédits instantanés" },
                  { critere: "Contenus éducatifs", concurrent: "Dispersés, non structurés", scoly: "✅ Marketplace centralisée" },
                  { critere: "Programme fidélité écoles", concurrent: "❌ Inexistant", scoly: "✅ Niveaux Bronze → Platinum" },
                  { critere: "Mode hors-ligne", concurrent: "❌", scoly: "✅ PWA avec cache intelligent" },
                  { critere: "IA intégrée", concurrent: "❌", scoly: "✅ Analyse, auto-promotions, traduction" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-3 font-medium text-foreground">{row.critere}</td>
                    <td className="p-3 text-muted-foreground">{row.concurrent}</td>
                    <td className="p-3 text-primary font-medium">{row.scoly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Usage Guide */}
      <section className="py-12 print:py-6 print:break-before-page">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">5. Guide d'Utilisation Rapide</h2>
          
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">🎓 Commander via l'Espace Écoles</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Allez sur Écoles dans le menu",
                  "Recherchez votre école par ville",
                  "Sélectionnez la classe de votre enfant",
                  "Cliquez sur « Ajouter toute la liste au panier »",
                  "Procédez au paiement via Mobile Money",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">📦 Créer un Kit Intelligent</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Allez sur Kits dans le menu",
                  "Sélectionnez le niveau scolaire (ex: 6ème)",
                  "Choisissez la série si applicable",
                  "Le kit se compose automatiquement",
                  "Ajoutez le kit complet au panier",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">🤝 Parrainer un Ami</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Connectez-vous à votre compte",
                  "Allez sur Parrainage dans le menu",
                  "Copiez votre code unique ou partagez via WhatsApp",
                  "Votre ami s'inscrit avec votre code",
                  "Vous recevez tous les deux vos crédits automatiquement",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Author & Footer */}
      <section className="py-12 bg-primary/5 print:py-6 print:break-before-page">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
            <img
              src="/founder-inocent-koffi.jpg"
              alt="Inocent KOFFI"
              className="w-28 h-28 rounded-full object-cover border-4 border-primary/20"
            />
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">Inocent KOFFI</h3>
              <p className="text-primary font-medium">Développeur Full-Stack & Fondateur de Scoly</p>
              <p className="text-muted-foreground text-sm mt-2">
                Passionné par l'impact du numérique sur l'éducation en Afrique. Scoly est né de la volonté de simplifier
                la rentrée scolaire pour des millions de familles ivoiriennes.
              </p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm">
                <span className="text-muted-foreground">📧 inocent.koffi@agricapital.ci</span>
                <span className="text-muted-foreground">📱 +225 07 58 46 59 33</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Scoly — Document stratégique v3.0 • Février 2026
            </p>
          </div>
        </div>
      </section>

      <div className="print:hidden"><Footer /></div>
    </main>
  );
};

export default FeaturesPresentation;
