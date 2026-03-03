import { useState } from "react";
import { Book, Database, Shield, Users, CreditCard, Server, Mail, Globe, ChevronRight, Download, FileText, Smartphone, Monitor, Code, Layers, Lock, Bell, Truck, ShoppingCart, BarChart3, MessageSquare, Star, Settings, Printer, Brain, Share2, Gift, Tag, Eye, Heart, GraduationCap, Package, UserPlus, BookOpen, ExternalLink, Zap, CheckCircle2, Clock, Sparkles, Image } from "lucide-react";
import { generateAuditPDF, generateScoringPDF, generateNouveautesPDF, generateRoadmapPDF } from "@/utils/pdfGenerators";
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
            <h3 className="text-xl font-semibold text-foreground">Tables Principales (30+)</h3>
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
                { name: "schools", desc: "Répertoire des établissements" }, { name: "school_supply_lists", desc: "Listes fournitures" },
                { name: "school_loyalty", desc: "Fidélité B2B écoles" }, { name: "referrals", desc: "Parrainages" },
                { name: "referral_rewards", desc: "Récompenses parrainage" }, { name: "resources", desc: "Ressources éducatives" },
                { name: "educational_content", desc: "Contenus avancés" }, { name: "rate_limits", desc: "Anti-bruteforce" },
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
                { icon: <BarChart3 size={20} />, title: "Tableau de bord", desc: "KPIs temps réel, graphiques, engagement" },
                { icon: <Brain size={20} />, title: "Module IA", desc: "Auto-analyse, promotions, publications réseaux sociaux" },
                { icon: <ShoppingCart size={20} />, title: "Produits & Catégories", desc: "CRUD avec images multiples, traduction" },
                { icon: <Zap size={20} />, title: "Ventes Flash", desc: "Gestion promotions, images, remises, dates" },
                { icon: <Tag size={20} />, title: "Coupons", desc: "Codes promo avec limites et suivi" },
                { icon: <Users size={20} />, title: "Utilisateurs & Rôles", desc: "Gestion comptes, attribution rôles" },
                { icon: <GraduationCap size={20} />, title: "Écoles", desc: "Vérification, contacts, inscription, fidélité" },
                { icon: <BookOpen size={20} />, title: "Ressources Édu", desc: "Modération contenus éducatifs" },
                { icon: <UserPlus size={20} />, title: "Parrainages", desc: "Suivi codes, récompenses, stats" },
                { icon: <Eye size={20} />, title: "Engagement", desc: "Vues, likes, réactions, partages articles" },
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
                { title: "RLS (Row Level Security)", desc: "Politiques sur 30+ tables, accès anon bloqué sur tables sensibles" },
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
                { title: "Audit Complet & Bilan Technique", desc: "Score 95/100 — Architecture, sécurité, fonctionnalités, recommandations", icon: <Shield size={24} />, action: generateAuditPDF, format: "PDF" },
                { title: "Fiche de Notation & Grille d'Audit", desc: "Grille détaillée avec 14 critères pondérés et légende", icon: <FileText size={24} />, action: generateScoringPDF, format: "PDF" },
                { title: "Document Nouveautés v3.0", desc: "Présentation des 4 nouvelles fonctionnalités stratégiques", icon: <Star size={24} />, action: generateNouveautesPDF, format: "PDF" },
                { title: "Roadmap Stratégique 2026", desc: "Vision, plan de développement et objectifs par trimestre", icon: <Sparkles size={24} />, action: generateRoadmapPDF, format: "PDF" },
                { title: "Flyer Freelance — Inocent KOFFI", desc: "Flyer de présentation du développeur freelance", icon: <Image size={24} />, action: () => window.open("/flyer-freelance-inocent-koffi.jpg", "_blank"), format: "JPG" },
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={doc.action}
                  >
                    <Download size={14} /> Télécharger {doc.format}
                  </Button>
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
            <Printer size={14} /> Imprimer / PDF
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
  const [activeSection, setActiveSection] = useState("recap");

  const sections = [
    { id: "recap", icon: <Sparkles size={18} />, title: "🆕 Résumé des changements" },
    { id: "context", icon: <Globe size={18} />, title: "1. Contexte Scoly 3.0" },
    { id: "schools", icon: <GraduationCap size={18} />, title: "2. Espace Écoles" },
    { id: "kits", icon: <Package size={18} />, title: "3. Kits Intelligents" },
    { id: "referral", icon: <UserPlus size={18} />, title: "4. Programme Parrainage" },
    { id: "resources", icon: <BookOpen size={18} />, title: "5. Marketplace Éducative" },
    { id: "admin-upgrades", icon: <Settings size={18} />, title: "6. Admin — Améliorations" },
    { id: "engagement", icon: <BarChart3 size={18} />, title: "7. Statistiques & Engagement" },
    { id: "flash-deals", icon: <Zap size={18} />, title: "8. Ventes Flash" },
    { id: "security-rls", icon: <Lock size={18} />, title: "9. Sécurité & RLS" },
    { id: "ui-fixes", icon: <Monitor size={18} />, title: "10. UI & Corrections" },
    { id: "objectives", icon: <Star size={18} />, title: "11. Objectifs Stratégiques" },
    { id: "advantages", icon: <Shield size={18} />, title: "12. Avantages Concurrentiels" },
    { id: "downloads", icon: <Download size={18} />, title: "📥 Documents" },
    { id: "author", icon: <Code size={18} />, title: "Auteur" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "recap":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">🆕 Résumé des Implémentations Récentes</h2>
            <p className="text-muted-foreground">Liste complète de toutes les fonctionnalités implémentées lors des dernières sessions de développement (72h).</p>
            
            <div className="space-y-3">
              {[
                { status: "done", title: "Espace Écoles (/ecoles)", desc: "Répertoire complet, fiches détaillées, listes de fournitures, commande groupée 1 clic" },
                { status: "done", title: "Formulaire d'Inscription Écoles", desc: "Formulaire complet (nom, ville, type, téléphone, email) — is_verified=false par défaut, validation admin" },
                { status: "done", title: "Kits Scolaires Intelligents (/kits)", desc: "Sélection CP1→Terminale, séries A/C/D, composition auto, ajout panier 1 clic" },
                { status: "done", title: "Programme de Parrainage (/parrainage)", desc: "Code SCOLY-XXXXXX, partage WhatsApp/SMS, 500 FCFA parrain / 300 FCFA filleul, niveaux ambassadeur" },
                { status: "done", title: "Marketplace Éducative (/ressources)", desc: "Exercices, sujets d'examen, vidéos, fiches — filtrage multi-critères, gratuit/premium" },
                { status: "done", title: "Page Fonctionnalités (/fonctionnalites)", desc: "Présentation complète de toutes les fonctionnalités de Scoly" },
                { status: "done", title: "Admin — Onglet Écoles amélioré", desc: "Recherche, compteur en attente, boutons Valider/Retirer/Supprimer, affichage contacts" },
                { status: "done", title: "Admin — Onglet Parrainages amélioré", desc: "Stats cards (total, complétés, récompenses FCFA), tableau détaillé" },
                { status: "done", title: "Admin — Onglet Ressources amélioré", desc: "Tableau avec catégorie, matière, prix, téléchargements, suppression" },
                { status: "done", title: "Admin — Ventes Flash (FlashDealsManagement)", desc: "CRUD complet : gestion remises, images, stocks, activation/désactivation" },
                { status: "done", title: "Admin — Statistiques Engagement", desc: "4 cards : vues articles, likes/réactions, partages, articles publiés (temps réel)" },
                { status: "done", title: "Compteurs actifs (vues, likes, partages)", desc: "increment_article_views, increment_product_views, increment_article_share — RPC Supabase" },
                { status: "done", title: "Espacement paragraphes articles", desc: "Classes prose-p:mb-4, prose-headings:mt-8, CSS global pour spacing" },
                { status: "done", title: "Migration RLS — Inscription écoles", desc: "Politiques : inscription authenticated (is_verified=false), gestion admin (update/delete)" },
                { status: "done", title: "Documentation restructurée", desc: "2 sous-pages : Documentation v2.5 (technique) + Nouveautés 1.0 (stratégie)" },
                { status: "done", title: "Documents téléchargeables", desc: "Audit technique, fiche de notation, document nouveautés v3.0, flyer freelance" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "context":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Contexte Scoly 3.0</h2>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                La rentrée scolaire en Côte d'Ivoire représente un moment de forte pression financière et logistique pour les familles.
                Chaque année, plus de <strong className="text-foreground">7 millions d'élèves</strong> nécessitent des fournitures scolaires,
                mais les parents font face à des défis majeurs : listes dispersées, prix non standardisés, files d'attente.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Scoly 3.0</strong> répond à ces défis en introduisant <strong className="text-foreground">4 fonctionnalités stratégiques</strong> qui transforment l'expérience d'achat scolaire en une expérience 100% digitale, intelligente et communautaire.
              </p>
            </div>
          </div>
        );
      case "schools":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">🎓 Espace Écoles & Établissements</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">URL : <code className="bg-muted px-2 py-0.5 rounded">/ecoles</code> • Détail : <code className="bg-muted px-2 py-0.5 rounded">/ecoles/:id</code> • Inscription : <code className="bg-muted px-2 py-0.5 rounded">/ecoles#inscription</code></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Répertoire complet d'écoles par ville, type et zone",
                "Fiches détaillées avec contacts et localisation",
                "Listes de fournitures officielles par classe et série",
                "Commande groupée de toute la liste en 1 clic",
                "Programme de fidélité B2B : Bronze → Argent → Or → Platinum",
                "Formulaire d'inscription pour les établissements",
                "Validation par l'administrateur (is_verified = false)",
                "RLS : inscription authenticated, gestion admin",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-semibold text-foreground text-sm mb-2">Tables DB associées</h4>
              <div className="flex flex-wrap gap-2">
                {["schools", "school_supply_lists", "school_supply_items", "school_loyalty"].map((t) => (
                  <code key={t} className="bg-muted px-2 py-1 rounded text-xs font-mono">{t}</code>
                ))}
              </div>
            </div>
          </div>
        );
      case "kits":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">📦 Kits Scolaires Intelligents</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">URL : <code className="bg-muted px-2 py-0.5 rounded">/kits</code></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Sélection du niveau scolaire (CP1 → Terminale)",
                "Filtrage par série (A, C, D) pour le secondaire",
                "Composition automatique du kit avec fournitures requises",
                "Ajout complet au panier en 1 clic",
                "Prix total calculé en temps réel",
                "Suggestions de produits complémentaires",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "referral":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">🤝 Programme de Parrainage</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">URL : <code className="bg-muted px-2 py-0.5 rounded">/parrainage</code></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Code unique par utilisateur : SCOLY-XXXXXX",
                "Partage via WhatsApp, SMS, copie directe",
                "500 FCFA pour le parrain, 300 FCFA pour le filleul",
                "Niveaux ambassadeur : Bronze (1-4) → Argent (5-14) → Or (15-29) → Platinum (30+)",
                "Dashboard ambassadeur avec suivi en temps réel",
                "Historique complet des récompenses",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-semibold text-foreground text-sm mb-2">Tables DB</h4>
              <div className="flex flex-wrap gap-2">
                {["referrals", "referral_rewards"].map((t) => (
                  <code key={t} className="bg-muted px-2 py-1 rounded text-xs font-mono">{t}</code>
                ))}
              </div>
            </div>
          </div>
        );
      case "resources":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">📚 Marketplace Éducative</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">URL : <code className="bg-muted px-2 py-0.5 rounded">/ressources</code></p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Catégories : Exercices, Sujets d'examen, Vidéos, Fiches, Programmes",
                "Filtrage par matière, niveau scolaire, type",
                "Contenus gratuits et premium avec prix",
                "Compteur de téléchargements",
                "Système de notation et avis",
                "Modération admin avec suppression",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-semibold text-foreground text-sm mb-2">Tables DB</h4>
              <div className="flex flex-wrap gap-2">
                {["resources", "educational_content"].map((t) => (
                  <code key={t} className="bg-muted px-2 py-1 rounded text-xs font-mono">{t}</code>
                ))}
              </div>
            </div>
          </div>
        );
      case "admin-upgrades":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Admin — Améliorations</h2>
            <p className="text-muted-foreground">Tous les nouveaux modules ajoutés au panel d'administration (/admin).</p>
            <div className="space-y-4">
              {[
                { title: "🎓 Onglet Écoles — Amélioré", features: ["Recherche par nom d'école", "Compteur d'écoles en attente de validation", "Boutons Valider / Retirer / Supprimer", "Affichage contacts (téléphone, email)", "Badge « en attente » pour les non vérifiées"] },
                { title: "📚 Onglet Ressources — Amélioré", features: ["Tableau complet avec catégorie, matière, prix", "Compteur de téléchargements", "Bouton de suppression", "Distinction gratuit/premium"] },
                { title: "🤝 Onglet Parrainages — Amélioré", features: ["Stats cards : total, complétés, récompenses FCFA", "Tableau détaillé des parrainages", "Suivi des codes et statuts"] },
                { title: "⚡ Onglet Ventes Flash — Nouveau", features: ["CRUD complet des promotions produits", "Gestion remises (%), images, stocks", "Activation/Désactivation rapide", "Stats : remise moyenne, stock total"] },
              ].map((module, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{module.title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {module.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm">
                        <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "engagement":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Statistiques & Engagement</h2>
            <p className="text-muted-foreground">Système complet de métriques d'engagement activé sur la plateforme.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <Eye size={20} />, title: "Compteur de Vues", desc: "Articles & produits — increment_article_views / increment_product_views via RPC Supabase" },
                { icon: <Heart size={20} />, title: "Likes & Réactions", desc: "Réactions emoji sur articles (❤️ 👍 😮 😢 😡) — table article_reactions" },
                { icon: <Share2 size={20} />, title: "Partages", desc: "Compteur par plateforme (WhatsApp, Facebook, Twitter, LinkedIn, Telegram) — table article_share_counts" },
                { icon: <BarChart3 size={20} />, title: "Dashboard Engagement Admin", desc: "4 cards temps réel : vues totales, likes/réactions, partages, articles publiés" },
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
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <h4 className="font-semibold text-primary text-sm mb-2">Fonctions RPC associées</h4>
              <div className="flex flex-wrap gap-2">
                {["increment_article_views(id)", "increment_product_views(id)", "increment_article_share(id, platform)"].map((fn) => (
                  <code key={fn} className="bg-muted px-2 py-1 rounded text-xs font-mono">{fn}</code>
                ))}
              </div>
            </div>
          </div>
        );
      case "flash-deals":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">⚡ Gestion Ventes Flash</h2>
            <p className="text-muted-foreground">Module complet de gestion des promotions flash dans l'admin.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Listing de tous les produits avec remise active",
                "Modification du pourcentage de remise",
                "Changement d'image promotionnelle",
                "Activation / Désactivation en un clic",
                "Stats : nombre de deals, remise moyenne, stock",
                "Intégration avec la page d'accueil (FlashDeals)",
                "Compte à rebours automatique côté client",
                "Composant FlashDealsManagement.tsx dédié",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case "security-rls":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">🔒 Sécurité & Migrations RLS</h2>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-lg font-semibold text-foreground mb-3">Nouvelles Politiques RLS</h3>
                <div className="space-y-2">
                  {[
                    { policy: "Inscription écoles (INSERT)", desc: "Utilisateurs authentifiés peuvent inscrire une école — is_verified = false par défaut" },
                    { policy: "Gestion admin écoles (UPDATE/DELETE)", desc: "Seuls les admins peuvent valider, modifier ou supprimer des écoles" },
                    { policy: "Lecture écoles (SELECT)", desc: "Lecture publique des écoles vérifiées" },
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2 py-2 border-b border-border last:border-0">
                      <Lock size={14} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <code className="text-xs font-mono text-foreground">{p.policy}</code>
                        <p className="text-xs text-muted-foreground">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-destructive mb-2">⚠️ Action Manuelle Requise</h3>
                <p className="text-sm text-muted-foreground">Activer la <strong>protection des mots de passe compromis</strong> dans Supabase Auth Settings → Security → Leaked Password Protection.</p>
              </div>
            </div>
          </div>
        );
      case "ui-fixes":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">UI & Corrections</h2>
            <div className="space-y-3">
              {[
                { title: "Espacement paragraphes articles", desc: "Ajout de classes prose-p:mb-4 et prose-headings:mt-8 + CSS global pour le spacing des contenus riches" },
                { title: "Descriptions publicités", desc: "Utilisation de whitespace-pre-line pour respecter les retours à la ligne dans les descriptions de pub" },
                { title: "Documentation restructurée", desc: "2 sous-pages avec navigation latérale, impression PDF, et documents téléchargeables" },
                { title: "Responsive mobile", desc: "Menu sheet mobile, breakpoints adaptés sur toutes les nouvelles pages" },
                { title: "Flyer freelance corrigé", desc: "Le mot 'covicion' corrigé en 'conviction' — nécessite remplacement du fichier JPG" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "objectives":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Objectifs Stratégiques</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead className="bg-primary text-primary-foreground">
                  <tr><th className="text-left p-3">Objectif</th><th className="text-left p-3">Cible</th><th className="text-left p-3">Horizon</th></tr>
                </thead>
                <tbody className="bg-card">
                  {[
                    { obj: "Inscriptions via parrainage", target: "+300%", time: "6 mois" },
                    { obj: "Temps de commande", target: "15 min → 2 min", time: "Immédiat" },
                    { obj: "Écoles partenaires", target: "500+ en CI", time: "Fin 2026" },
                    { obj: "Taux de rétention", target: "+50%", time: "12 mois" },
                    { obj: "Ressources éducatives", target: "1ère plateforme en CI", time: "2026" },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-3 font-medium text-foreground">{row.obj}</td>
                      <td className="p-3 text-primary font-semibold">{row.target}</td>
                      <td className="p-3 text-muted-foreground">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    { c: "IA intégrée", co: "❌", s: "✅ Analyse, auto-promotions, chatbot" },
                    { c: "Statistiques engagement", co: "Basique", s: "✅ Vues, likes, partages temps réel" },
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
      case "downloads":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">📥 Documents Téléchargeables</h2>
            <p className="text-muted-foreground">Documents officiels Scoly — consultation, impression ou archivage.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Document Nouveautés v3.0", desc: "Les 4 fonctionnalités stratégiques : Écoles, Kits, Parrainage, Ressources", icon: <Star size={24} />, action: generateNouveautesPDF, format: "PDF" },
                { title: "Audit Complet & Bilan Technique", desc: "Score 95/100 — Bilan complet de la plateforme Scoly", icon: <Shield size={24} />, action: generateAuditPDF, format: "PDF" },
                { title: "Fiche de Notation & Grille d'Audit", desc: "Grille détaillée avec 14 critères pondérés", icon: <FileText size={24} />, action: generateScoringPDF, format: "PDF" },
                { title: "Roadmap Stratégique 2026", desc: "Vision et plan de développement par trimestre", icon: <Sparkles size={24} />, action: generateRoadmapPDF, format: "PDF" },
                { title: "Flyer Freelance — Inocent KOFFI", desc: "Présentation du développeur Full-Stack & Fondateur", icon: <Image size={24} />, action: () => window.open("/flyer-freelance-inocent-koffi.jpg", "_blank"), format: "JPG" },
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={doc.action}
                  >
                    <Download size={14} /> Télécharger {doc.format}
                  </Button>
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
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Scoly — Nouveautés 1.0 • Mars 2026</p>
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
            <Printer size={14} /> Imprimer / PDF
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
          <p className="text-sm opacity-70 mt-1">Par Inocent KOFFI • Version 3.0 • Mars 2026</p>
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
                <Sparkles size={16} />
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
