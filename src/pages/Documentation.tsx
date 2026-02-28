import { useState } from "react";
import { Book, Database, Shield, Users, CreditCard, Server, Mail, Globe, ChevronRight, Download, FileText, Smartphone, Monitor, Code, Layers, Lock, Bell, Truck, ShoppingCart, BarChart3, MessageSquare, Star, Settings, Printer, Brain, Share2, Gift, Tag, Eye, Heart, GraduationCap, Package, UserPlus, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Logo from "@/components/Logo";

// ─── Sub-page: Documentation Scoly v2.5 ───
const DocumentationV25 = ({ language }: { language: string }) => {
  const [activeSection, setActiveSection] = useState("presentation");

  const sections = [
    { id: "presentation", icon: <Book size={18} />, title: "1. Présentation" },
    { id: "architecture", icon: <Layers size={18} />, title: "2. Architecture technique" },
    { id: "database", icon: <Database size={18} />, title: "3. Base de données" },
    { id: "admin", icon: <Shield size={18} />, title: "4. Guide Administrateur" },
    { id: "roles", icon: <Users size={18} />, title: "5. Rôles & Permissions" },
    { id: "client", icon: <ShoppingCart size={18} />, title: "6. Guide Client" },
    { id: "ecommerce", icon: <Heart size={18} />, title: "7. E-commerce Avancé" },
    { id: "payment", icon: <CreditCard size={18} />, title: "8. Système de paiement" },
    { id: "ai", icon: <Brain size={18} />, title: "9. Module IA" },
    { id: "edge", icon: <Server size={18} />, title: "10. Edge Functions & API" },
    { id: "security", icon: <Lock size={18} />, title: "11. Sécurité" },
    { id: "deployment", icon: <Globe size={18} />, title: "12. Déploiement" },
    { id: "developer", icon: <Code size={18} />, title: "13. Développeur" },
    { id: "downloads", icon: <Download size={18} />, title: "📥 Documents" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "presentation":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Présentation de Scoly</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Qu'est-ce que Scoly ?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Scoly est une plateforme e-commerce innovante dédiée aux fournitures scolaires et bureautiques en Côte d'Ivoire. 
                Elle offre un catalogue complet de livres, manuels scolaires et fournitures de bureau avec livraison gratuite 
                sur l'ensemble du territoire ivoirien.
              </p>
            </div>
            <h3 className="text-xl font-semibold text-foreground mt-8">Fonctionnalités Principales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <ShoppingCart size={20} />, title: "Boutique en ligne", desc: "Catalogue complet avec recherche avancée" },
                { icon: <Truck size={20} />, title: "Livraison gratuite", desc: "Partout en Côte d'Ivoire avec suivi" },
                { icon: <CreditCard size={20} />, title: "Paiement Mobile Money", desc: "Orange Money, MTN, Moov, Wave via KkiaPay" },
                { icon: <Bell size={20} />, title: "Notifications temps réel", desc: "Push & in-app automatiques" },
                { icon: <Globe size={20} />, title: "Multilingue", desc: "FR, EN, DE, ES" },
                { icon: <Brain size={20} />, title: "Module IA intelligent", desc: "Analyse, promotions auto, publications" },
                { icon: <Heart size={20} />, title: "Wishlist & Fidélité", desc: "Liste de souhaits, programme de points" },
                { icon: <MessageSquare size={20} />, title: "Assistant IA (ScIA)", desc: "Chatbot intelligent" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex gap-3">
                  <div className="text-primary mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "architecture":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Architecture Technique</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2"><Monitor size={20} /> Stack Frontend</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {["React 18 + TypeScript", "Vite (build ultra-rapide)", "Tailwind CSS + Shadcn/ui", "React Query", "React Router v6", "Framer Motion", "i18n (4 langues)", "TipTap (éditeur riche)"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><ChevronRight size={14} className="text-primary shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2"><Server size={20} /> Stack Backend</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {["PostgreSQL + RLS", "Edge Functions (Deno)", "Realtime", "Storage", "Auth multi-méthodes"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><ChevronRight size={14} className="text-primary shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case "database":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Base de Données & Schéma</h2>
            <h3 className="text-xl font-semibold text-foreground">Tables Principales (22+)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "profiles", desc: "Profils utilisateurs" }, { name: "user_roles", desc: "Rôles (admin, moderator, vendor, delivery, user)" },
                { name: "products", desc: "Catalogue multilingue" }, { name: "categories", desc: "Catégories et sous-catégories" },
                { name: "orders / order_items", desc: "Commandes et articles" }, { name: "payments", desc: "Transactions KkiaPay" },
                { name: "articles", desc: "Actualités multilingues" }, { name: "article_reactions", desc: "Réactions emoji" },
                { name: "article_share_counts", desc: "Compteurs de partage" }, { name: "advertisements", desc: "Bannières pub" },
                { name: "promotions / coupons", desc: "Promos et coupons" }, { name: "notifications", desc: "Notifications in-app" },
                { name: "commissions", desc: "Commissions vendeurs" }, { name: "delivery_proofs", desc: "Preuves livraison (photo, GPS)" },
                { name: "audit_logs", desc: "Journal d'audit" }, { name: "login_sessions", desc: "Sessions sécurisées" },
              ].map((table, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
                  <Database size={16} className="text-primary shrink-0" />
                  <div>
                    <code className="text-sm font-mono font-semibold text-foreground">{table.name}</code>
                    <p className="text-xs text-muted-foreground">{table.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-foreground mt-8">Fonctions Database</h3>
            <div className="bg-card border border-border rounded-xl p-4 space-y-2">
              {[
                { name: "has_role(user_id, role)", desc: "Vérifie le rôle utilisateur" },
                { name: "get_admin_stats()", desc: "Statistiques dashboard admin" },
                { name: "validate_coupon(code, total)", desc: "Valide un coupon" },
                { name: "check_rate_limit()", desc: "Anti-bruteforce" },
                { name: "increment_article_views(id)", desc: "Compteur de vues articles" },
                { name: "increment_product_views(id)", desc: "Compteur de vues produits" },
                { name: "increment_article_share(id, platform)", desc: "Compteur de partages" },
                { name: "get_user_loyalty_points()", desc: "Points de fidélité" },
                { name: "generate_referral_code()", desc: "Code parrainage unique" },
              ].map((fn, i) => (
                <div key={i} className="flex items-start gap-2 py-2 border-b border-border last:border-0">
                  <Code size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <code className="text-xs font-mono text-foreground">{fn.name}</code>
                    <p className="text-xs text-muted-foreground">{fn.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Guide Administrateur</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Accès Admin</h3>
              <p className="text-sm text-muted-foreground">URL : <code className="bg-muted px-2 py-0.5 rounded">/admin</code> — Compte : <strong>scoly.ci@gmail.com</strong></p>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Sections du Panel (25+ onglets)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <BarChart3 size={20} />, title: "Tableau de bord", desc: "KPIs temps réel, graphiques, commandes récentes" },
                { icon: <Brain size={20} />, title: "Module IA", desc: "Auto-analyse, promotions, publications réseaux sociaux" },
                { icon: <ShoppingCart size={20} />, title: "Produits & Catégories", desc: "CRUD avec images multiples, traduction" },
                { icon: <Tag size={20} />, title: "Ventes Flash & Coupons", desc: "Promotions avec compte à rebours" },
                { icon: <Users size={20} />, title: "Utilisateurs & Rôles", desc: "Gestion comptes, attribution rôles" },
                { icon: <GraduationCap size={20} />, title: "Écoles", desc: "Vérification établissements, listes fournitures" },
                { icon: <BookOpen size={20} />, title: "Ressources Édu", desc: "Modération contenus éducatifs" },
                { icon: <UserPlus size={20} />, title: "Parrainages", desc: "Suivi codes, récompenses, stats" },
                { icon: <Settings size={20} />, title: "Paramètres", desc: "Configuration générale, sauvegarde" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex gap-3">
                  <div className="text-primary mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "roles":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Rôles & Permissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead className="bg-primary text-primary-foreground">
                  <tr><th className="text-left p-3">Rôle</th><th className="text-left p-3">Accès</th><th className="text-left p-3">Permissions</th></tr>
                </thead>
                <tbody className="bg-card">
                  {[
                    { role: "Admin", access: "/admin", perms: "Accès total" },
                    { role: "Modérateur", access: "/moderator", perms: "Modération articles, commentaires" },
                    { role: "Vendeur", access: "/vendor", perms: "Ses produits, commissions" },
                    { role: "Livreur", access: "/delivery", perms: "Commandes assignées, preuves" },
                    { role: "Client", access: "/account", perms: "Profil, commandes, wishlist, fidélité" },
                  ].map((item, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-3 font-semibold">{item.role}</td>
                      <td className="p-3"><code className="bg-muted px-2 py-0.5 rounded text-xs">{item.access}</code></td>
                      <td className="p-3 text-muted-foreground text-xs">{item.perms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "client":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Guide Client</h2>
            <h3 className="text-xl font-semibold text-foreground">Processus d'Achat</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {["Parcourez le catalogue ou recherchez", "Ajoutez au panier (mini-panier latéral)", "Appliquez un coupon si disponible", "Payez via Mobile Money (KkiaPay)", "Suivez votre commande en temps réel", "Confirmez la réception"].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        );
      case "ecommerce":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">E-commerce Avancé</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <Heart size={20} />, title: "Wishlist", desc: "Liste de souhaits synchronisée" },
                { icon: <ShoppingCart size={20} />, title: "Mini-Panier", desc: "SideCart glissant" },
                { icon: <Eye size={20} />, title: "Récemment consultés", desc: "Tracking automatique" },
                { icon: <Tag size={20} />, title: "Ventes Flash", desc: "Deals avec compte à rebours" },
                { icon: <Gift size={20} />, title: "Programme Fidélité", desc: "Points échangeables" },
                { icon: <Star size={20} />, title: "Avis & Notes", desc: "Notation sur produits" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex gap-3">
                  <div className="text-primary mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "payment":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Système de Paiement</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Orange Money", "MTN MoMo", "Moov Money", "Wave"].map((m, i) => (
                <div key={i} className="bg-primary/10 text-primary rounded-lg px-3 py-3 text-center font-medium text-sm">{m}</div>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-foreground">Flux de Paiement</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {["Client valide la commande", "Widget KkiaPay s'ouvre", "Confirmation via Mobile Money", "Webhook KkiaPay notifie le serveur", "Commande confirmée automatiquement", "Email de confirmation envoyé"].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        );
      case "ai":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Module IA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Analyse Plateforme", desc: "Analyse complète des KPIs et recommandations" },
                { title: "Ventes Flash Auto", desc: "Création de promotions basée sur les données" },
                { title: "Publication Réseaux", desc: "Auto-publication sur Facebook, Instagram, X, LinkedIn" },
                { title: "Traduction Auto", desc: "Traduction des produits et articles en 4 langues" },
                { title: "Génération de Contenu", desc: "Articles, descriptions, CTA publicitaires" },
                { title: "Assistant ScIA", desc: "Chatbot intelligent pour les utilisateurs" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "edge":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Edge Functions & API</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "process-payment", desc: "Traitement des paiements KkiaPay" },
                { name: "kkiapay-webhook", desc: "Webhook de confirmation" },
                { name: "send-order-email", desc: "Emails transactionnels" },
                { name: "ai-platform-manager", desc: "Module IA backend" },
                { name: "generate-content", desc: "Génération de contenu IA" },
                { name: "translate-product", desc: "Traduction automatique" },
                { name: "seed-products", desc: "Import de produits en masse" },
                { name: "bootstrap-admin", desc: "Initialisation admin" },
              ].map((fn, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
                  <Server size={16} className="text-primary shrink-0" />
                  <div>
                    <code className="text-sm font-mono font-semibold text-foreground">{fn.name}</code>
                    <p className="text-xs text-muted-foreground">{fn.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Sécurité</h2>
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-destructive mb-3">Score Audit : 95/100</h3>
              <p className="text-sm text-muted-foreground">Sécurité renforcée avec RLS sur toutes les tables, anti-bruteforce, CAPTCHA mathématique, protection sessions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "RLS (Row Level Security)", desc: "Politiques sur 22+ tables, accès anon bloqué sur 13 tables sensibles" },
                { title: "Anti-Bruteforce", desc: "Rate limiting via check_rate_limit() — 5 tentatives / 5 min" },
                { title: "CAPTCHA Mathématique", desc: "Vérification humaine à l'inscription" },
                { title: "Sessions Sécurisées", desc: "login_sessions avec confirmation, expiration, blocage" },
                { title: "Audit Logs", desc: "Journalisation de toutes les actions admin" },
                { title: "Vue Tracking", desc: "Anti-spam : 1 vue/heure/session via fingerprint SHA-256" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "deployment":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Déploiement</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Lovable Cloud", desc: "Déploiement automatique intégré" },
                { title: "Vercel", desc: "Déploiement via vercel.json inclus" },
                { title: "PWA", desc: "Mode hors-ligne avec Service Worker" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 text-center">
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "developer":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Développeur</h2>
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
              <img src="/founder-inocent-koffi.jpg" alt="Inocent KOFFI" className="w-28 h-28 rounded-full object-cover border-4 border-primary/20" />
              <div>
                <h3 className="text-xl font-display font-bold text-foreground">Inocent KOFFI</h3>
                <p className="text-primary font-medium">Développeur Full-Stack & Fondateur de Scoly</p>
                <p className="text-muted-foreground text-sm mt-2">Passionné par l'impact du numérique sur l'éducation en Afrique.</p>
                <div className="flex flex-wrap gap-3 mt-3 text-sm">
                  <span className="text-muted-foreground">📧 inocent.koffi@agricapital.ci</span>
                  <span className="text-muted-foreground">📱 +225 07 58 46 59 33</span>
                </div>
              </div>
            </div>
          </div>
        );
      case "downloads":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">📥 Documents Téléchargeables</h2>
            <p className="text-muted-foreground">Téléchargez les documents officiels de Scoly pour consultation hors-ligne, impression ou archivage.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Audit Complet & Bilan Technique", desc: "Score 95/100 — Architecture, sécurité, fonctionnalités, recommandations", icon: <Shield size={24} />, url: "/documents/audit-technique-scoly-v25.html", format: "HTML" },
                { title: "Fiche de Notation & Grille d'Audit", desc: "Grille détaillée avec 14 critères pondérés et légende", icon: <FileText size={24} />, url: "/documents/fiche-notation-audit-scoly.html", format: "HTML" },
                { title: "Flyer Freelance — Inocent KOFFI", desc: "Flyer de présentation du développeur freelance", icon: <ExternalLink size={24} />, url: "/flyer-freelance-inocent-koffi.jpg", format: "JPG" },
                { title: "Document Nouveautés v3.0", desc: "Présentation des 4 nouvelles fonctionnalités stratégiques", icon: <Star size={24} />, url: "/documents/nouveautes-scoly-v3.html", format: "HTML" },
              ].map((doc, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">{doc.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">{doc.title}</h4>
                      <p className="text-muted-foreground text-xs mt-1">{doc.desc}</p>
                      <span className="text-xs text-primary font-mono mt-1 inline-block">Format : {doc.format}</span>
                    </div>
                  </div>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" download>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Download size={14} /> Télécharger
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-64 shrink-0">
        <div className="bg-card border border-border rounded-xl p-4 sticky top-20">
          <h3 className="font-semibold text-foreground mb-3 text-sm">Table des matières</h3>
          <Button variant="outline" size="sm" className="w-full mb-3 gap-2" onClick={() => window.print()}>
            <Download size={14} /> Télécharger PDF
          </Button>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                  activeSection === section.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

// ─── Sub-page: Nouveautés 1.0 ───
const Nouveautes10 = () => {
  const [activeSection, setActiveSection] = useState("context");

  const sections = [
    { id: "context", icon: <Globe size={18} />, title: "1. Contexte Général" },
    { id: "solutions", icon: <Package size={18} />, title: "2. Les Solutions" },
    { id: "objectives", icon: <Star size={18} />, title: "3. Objectifs" },
    { id: "advantages", icon: <Shield size={18} />, title: "4. Avantages Concurrentiels" },
    { id: "guide", icon: <Book size={18} />, title: "5. Guide d'Utilisation" },
    { id: "database", icon: <Database size={18} />, title: "6. Nouvelles Tables DB" },
    { id: "admin", icon: <Settings size={18} />, title: "7. Admin — Nouveaux Onglets" },
    { id: "downloads", icon: <Download size={18} />, title: "📥 Documents" },
    { id: "author", icon: <Code size={18} />, title: "8. Auteur" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "context":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Contexte Général</h2>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                La rentrée scolaire en Côte d'Ivoire représente un moment de forte pression financière et logistique pour les familles.
                Chaque année, plus de <strong className="text-foreground">7 millions d'élèves</strong> nécessitent des fournitures scolaires,
                mais les parents font face à des défis majeurs : listes dispersées, prix non standardisés, files d'attente.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Scoly 3.0</strong> répond à ces défis en introduisant 4 fonctionnalités stratégiques
                qui transforment l'expérience d'achat scolaire en une expérience 100% digitale, intelligente et communautaire.
              </p>
            </div>
          </div>
        );
      case "solutions":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Les 4 Solutions</h2>
            {[
              { icon: <GraduationCap size={28} />, title: "🎓 Espace Écoles & Établissements", desc: "Plateforme B2B/B2C pour les écoles.", features: ["Répertoire d'écoles par ville et type", "Listes de fournitures officielles par classe", "Commande groupée en 1 clic", "Programme de fidélité écoles (Bronze → Platinum)", "Formulaire d'inscription pour les établissements"], url: "/ecoles" },
              { icon: <Package size={28} />, title: "📦 Kits Scolaires Intelligents", desc: "Génération automatique de kits par niveau et série.", features: ["Sélection du niveau (CP1 → Terminale)", "Filtrage par série (A, C, D)", "Composition automatique du kit", "Ajout complet au panier en 1 clic", "Prix total calculé en temps réel"], url: "/kits" },
              { icon: <Users size={28} />, title: "🤝 Programme de Parrainage", desc: "Système de parrainage viral.", features: ["Code unique par utilisateur (SCOLY-XXXXXX)", "Partage via WhatsApp, SMS", "500 FCFA parrain / 300 FCFA filleul", "Niveaux : Bronze → Or → Platinum", "Dashboard ambassadeur"], url: "/parrainage" },
              { icon: <BookOpen size={28} />, title: "📚 Marketplace Éducative", desc: "Ressources pédagogiques par matière et niveau.", features: ["Exercices, sujets d'examen, vidéos, fiches", "Contenus gratuits et premium", "Compteur de téléchargements", "Filtrage multi-critères"], url: "/ressources" },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">{s.icon}</div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground mt-1">{s.desc}</p>
                    <code className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded mt-2 inline-block">{s.url}</code>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-0 sm:ml-16">
                  {s.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm">
                      <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case "objectives":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Objectifs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "📈 Croissance", desc: "+300% d'inscriptions via parrainage et écoles partenaires" },
                { title: "⚡ Conversion", desc: "Réduire le temps de commande de 15 min à 2 min avec les kits" },
                { title: "🌍 Couverture", desc: "500+ écoles en CI d'ici fin 2026" },
                { title: "⭐ Rétention", desc: "+50% via parrainage et fidélité" },
                { title: "📱 Accessibilité", desc: "PWA hors-ligne pour zones à faible connectivité" },
                { title: "🎓 Éducation", desc: "1ère plateforme de ressources éducatives en CI" },
              ].map((obj, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5">
                  <h4 className="font-semibold text-foreground text-sm">{obj.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "advantages":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Avantages Concurrentiels</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead className="bg-primary text-primary-foreground">
                  <tr><th className="text-left p-3">Critère</th><th className="text-left p-3">Concurrents</th><th className="text-left p-3">Scoly 3.0</th></tr>
                </thead>
                <tbody className="bg-card">
                  {[
                    { c: "Listes de fournitures", co: "Papier / WhatsApp", s: "✅ Digitale, 1-clic" },
                    { c: "Kits prêts-à-commander", co: "❌ Inexistant", s: "✅ Auto-généré par niveau" },
                    { c: "Parrainage viral", co: "❌ Inexistant", s: "✅ WhatsApp/SMS, crédits instantanés" },
                    { c: "Contenus éducatifs", co: "Dispersés", s: "✅ Marketplace centralisée" },
                    { c: "Fidélité écoles", co: "❌", s: "✅ Bronze → Platinum" },
                    { c: "Mode hors-ligne", co: "❌", s: "✅ PWA avec cache" },
                    { c: "IA intégrée", co: "❌", s: "✅ Analyse, auto-promotions" },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">{row.c}</td>
                      <td className="p-3 text-muted-foreground">{row.co}</td>
                      <td className="p-3 text-primary font-medium">{row.s}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "guide":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Guide d'Utilisation Rapide</h2>
            {[
              { title: "🎓 Commander via l'Espace Écoles", steps: ["Allez sur Écoles dans le menu", "Recherchez votre école par ville", "Sélectionnez la classe de votre enfant", "Cliquez « Ajouter toute la liste au panier »", "Payez via Mobile Money"] },
              { title: "📦 Créer un Kit Intelligent", steps: ["Allez sur Kits dans le menu", "Sélectionnez le niveau scolaire", "Choisissez la série si applicable", "Le kit se compose automatiquement", "Ajoutez le kit complet au panier"] },
              { title: "🤝 Parrainer un Ami", steps: ["Connectez-vous à votre compte", "Allez sur Parrainage", "Copiez votre code ou partagez via WhatsApp", "Votre ami s'inscrit avec votre code", "Vous recevez tous les deux vos crédits"] },
            ].map((guide, g) => (
              <div key={g} className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">{guide.title}</h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {guide.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        );
      case "database":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Nouvelles Tables Base de Données</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "schools", desc: "Répertoire des établissements scolaires" },
                { name: "school_supply_lists", desc: "Listes de fournitures par école et classe" },
                { name: "school_supply_items", desc: "Articles dans les listes de fournitures" },
                { name: "school_loyalty", desc: "Programme fidélité écoles" },
                { name: "referrals", desc: "Parrainages avec codes uniques" },
                { name: "referral_rewards", desc: "Récompenses de parrainage" },
                { name: "resources", desc: "Contenus éducatifs" },
                { name: "educational_content", desc: "Contenus avancés" },
              ].map((table, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
                  <Database size={16} className="text-primary shrink-0" />
                  <div>
                    <code className="text-sm font-mono font-semibold text-foreground">{table.name}</code>
                    <p className="text-xs text-muted-foreground">{table.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Admin — Nouveaux Onglets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: "🎓 Écoles", desc: "Vérification établissements, contacts, inscription" },
                { title: "📚 Ressources Édu", desc: "Modération contenus, catégories, téléchargements" },
                { title: "🤝 Parrainages", desc: "Suivi codes, récompenses FCFA, statistiques" },
              ].map((tab, i) => (
                <div key={i} className="bg-primary/10 text-primary rounded-lg px-4 py-4 text-center">
                  <p className="font-medium text-sm">{tab.title}</p>
                  <p className="text-xs mt-1 opacity-80">{tab.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "downloads":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">📥 Documents Téléchargeables</h2>
            <p className="text-muted-foreground">Documents officiels des nouveautés Scoly v3.0.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Document Nouveautés v3.0", desc: "Les 4 fonctionnalités stratégiques : Écoles, Kits, Parrainage, Ressources", icon: <Star size={24} />, url: "/documents/nouveautes-scoly-v3.html", format: "HTML" },
                { title: "Audit Complet & Bilan Technique", desc: "Score 95/100 — Bilan complet de la plateforme", icon: <Shield size={24} />, url: "/documents/audit-technique-scoly-v25.html", format: "HTML" },
                { title: "Fiche de Notation", desc: "Grille d'audit détaillée avec 14 critères pondérés", icon: <FileText size={24} />, url: "/documents/fiche-notation-audit-scoly.html", format: "HTML" },
                { title: "Flyer Freelance", desc: "Présentation Inocent KOFFI — Développeur Full-Stack", icon: <ExternalLink size={24} />, url: "/flyer-freelance-inocent-koffi.jpg", format: "JPG" },
              ].map((doc, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">{doc.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm">{doc.title}</h4>
                      <p className="text-muted-foreground text-xs mt-1">{doc.desc}</p>
                      <span className="text-xs text-primary font-mono mt-1 inline-block">Format : {doc.format}</span>
                    </div>
                  </div>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" download>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Download size={14} /> Télécharger
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      case "author":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Auteur</h2>
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
              <img src="/founder-inocent-koffi.jpg" alt="Inocent KOFFI" className="w-28 h-28 rounded-full object-cover border-4 border-primary/20" />
              <div>
                <h3 className="text-xl font-display font-bold text-foreground">Inocent KOFFI</h3>
                <p className="text-primary font-medium">Développeur Full-Stack & Fondateur de Scoly</p>
                <p className="text-muted-foreground text-sm mt-2">Passionné par l'impact du numérique sur l'éducation en Afrique.</p>
                <div className="flex flex-wrap gap-3 mt-3 text-sm">
                  <span className="text-muted-foreground">📧 inocent.koffi@agricapital.ci</span>
                  <span className="text-muted-foreground">📱 +225 07 58 46 59 33</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Scoly — Nouveautés 1.0 • Février 2026</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-64 shrink-0">
        <div className="bg-card border border-border rounded-xl p-4 sticky top-20">
          <h3 className="font-semibold text-foreground mb-3 text-sm">Sommaire</h3>
          <Button variant="outline" size="sm" className="w-full mb-3 gap-2" onClick={() => window.print()}>
            <Download size={14} /> Télécharger PDF
          </Button>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                  activeSection === section.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

// ─── Main Documentation Page ───
const Documentation = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("doc");

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Documentation Scoly — Guide Technique & Nouveautés"
        description="Documentation officielle Scoly : guide technique v2.5, présentation des nouvelles fonctionnalités 1.0, architecture, sécurité."
        url="https://scoly.ci/documentation"
      />
      <div className="print:hidden"><Navbar /></div>

      {/* Hero */}
      <section className="pt-24 pb-8 bg-primary text-primary-foreground print:pt-8 print:pb-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4 print:hidden">
            <div className="bg-white/95 rounded-xl px-4 py-2">
              <Logo size="lg" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">Documentation Officielle</h1>
          <p className="text-lg opacity-90">Scoly — Guide Technique & Nouveautés</p>
          <p className="text-sm opacity-70 mt-1">Par Inocent KOFFI • Version 3.0 • Février 2026</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 print:py-0">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-2 mb-8 print:hidden">
              <TabsTrigger value="doc" className="gap-2">
                <Book size={16} />
                Documentation v2.5
              </TabsTrigger>
              <TabsTrigger value="nouveautes" className="gap-2">
                <Star size={16} />
                Nouveautés 1.0
              </TabsTrigger>
            </TabsList>

            <TabsContent value="doc">
              <DocumentationV25 language={language} />
            </TabsContent>

            <TabsContent value="nouveautes">
              <Nouveautes10 />
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center text-xs text-muted-foreground print:hidden">
            <p>© {new Date().getFullYear()} Scoly — Documentation Officielle</p>
            <p className="mt-1">Plateforme développée par Inocent KOFFI • scoly.ci</p>
          </div>
        </div>
      </section>

      <div className="print:hidden"><Footer /></div>
    </main>
  );
};

export default Documentation;
