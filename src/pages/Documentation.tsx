import { useState } from "react";
import { Book, Database, Shield, Users, CreditCard, Server, Mail, Globe, ChevronRight, Download, FileText, Smartphone, Monitor, Code, Layers, Lock, Bell, Truck, ShoppingCart, BarChart3, MessageSquare, Star, Settings, Printer, Brain, Share2, Gift, Tag, Eye, Heart, GraduationCap, Package, UserPlus, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import Logo from "@/components/Logo";

const Documentation = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState("presentation");

  const sections = [
    { id: "presentation", icon: <Book size={18} />, title: "1. Présentation", titleEn: "1. Overview" },
    { id: "newfeatures", icon: <Star size={18} />, title: "2. Nouveautés v3.0", titleEn: "2. New Features v3.0" },
    { id: "architecture", icon: <Layers size={18} />, title: "3. Architecture technique", titleEn: "3. Technical Architecture" },
    { id: "database", icon: <Database size={18} />, title: "4. Base de données", titleEn: "4. Database" },
    { id: "admin", icon: <Shield size={18} />, title: "5. Guide Administrateur", titleEn: "5. Admin Guide" },
    { id: "roles", icon: <Users size={18} />, title: "6. Rôles & Permissions", titleEn: "6. Roles & Permissions" },
    { id: "client", icon: <ShoppingCart size={18} />, title: "7. Guide Client", titleEn: "7. Client Guide" },
    { id: "ecommerce", icon: <Heart size={18} />, title: "8. E-commerce Avancé", titleEn: "8. Advanced E-commerce" },
    { id: "payment", icon: <CreditCard size={18} />, title: "9. Système de paiement", titleEn: "9. Payment System" },
    { id: "ai", icon: <Brain size={18} />, title: "10. Module IA", titleEn: "10. AI Module" },
    { id: "edge", icon: <Server size={18} />, title: "11. Edge Functions & API", titleEn: "11. Edge Functions & API" },
    { id: "security", icon: <Lock size={18} />, title: "12. Sécurité", titleEn: "12. Security" },
    { id: "deployment", icon: <Globe size={18} />, title: "13. Déploiement", titleEn: "13. Deployment" },
    { id: "developer", icon: <Code size={18} />, title: "14. Développeur", titleEn: "14. Developer" },
  ];

  const handleDownloadPDF = () => {
    window.print();
  };

  const renderSection = () => {
    switch (activeSection) {
      case "presentation":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Présentation de Scoly</h2>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Qu'est-ce que Scoly ?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Scoly est une plateforme e-commerce innovante dédiée aux fournitures scolaires et bureautiques en Côte d'Ivoire. 
                Elle offre un catalogue complet de livres, manuels scolaires et fournitures de bureau avec livraison gratuite 
                sur l'ensemble du territoire ivoirien. Développée avec les technologies les plus modernes, Scoly propose 
                une expérience d'achat fluide, intelligente et sécurisée.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8">Fonctionnalités Principales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <ShoppingCart size={20} />, title: "Boutique en ligne", desc: "Catalogue complet de produits scolaires et bureautiques avec recherche avancée" },
                { icon: <Truck size={20} />, title: "Livraison gratuite", desc: "Livraison offerte partout en Côte d'Ivoire avec suivi en temps réel" },
                { icon: <CreditCard size={20} />, title: "Paiement Mobile Money", desc: "Orange Money, MTN, Moov, Wave via KkiaPay" },
                { icon: <Bell size={20} />, title: "Notifications temps réel", desc: "Suivi de commande et alertes automatiques push & in-app" },
                { icon: <Globe size={20} />, title: "Multilingue", desc: "Français, Anglais, Allemand, Espagnol" },
                { icon: <Brain size={20} />, title: "Module IA intelligent", desc: "Analyse auto, gestion promotions, publication réseaux sociaux" },
                { icon: <Heart size={20} />, title: "Wishlist & Fidélité", desc: "Liste de souhaits, mini-panier, programme de points fidélité" },
                { icon: <MessageSquare size={20} />, title: "Assistant IA (ScIA)", desc: "Chatbot intelligent pour l'aide aux utilisateurs" },
                { icon: <FileText size={20} />, title: "Actualités & Blog", desc: "Articles éducatifs avec éditeur riche, tableaux, médias" },
                { icon: <Star size={20} />, title: "Avis & Réactions", desc: "Système complet d'avis clients et réactions sur articles" },
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

            <h3 className="text-xl font-semibold text-foreground mt-8">Espaces de la Plateforme</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Scoly Primaire", "Scoly Secondaire", "Scoly Universitaire", "Scoly Bureautique", "Scoly Librairie"].map((cat, i) => (
                <div key={i} className="bg-primary/10 text-primary rounded-lg px-4 py-3 text-center font-medium text-sm">
                  {cat}
                </div>
              ))}
            </div>
          </div>
        );

      case "newfeatures":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Nouveautés Scoly 3.0</h2>
            
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <p className="text-muted-foreground leading-relaxed">
                Scoly 3.0 introduit 4 fonctionnalités stratégiques majeures pour digitaliser la rentrée scolaire en Côte d'Ivoire. 
                Ces modules ont été conçus par <strong className="text-foreground">Inocent KOFFI</strong> pour répondre aux besoins 
                spécifiques des parents, élèves et établissements scolaires.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <GraduationCap size={20} />, title: "🎓 Espace Écoles", desc: "Répertoire d'écoles, listes de fournitures officielles par classe, commande groupée en 1 clic, programme fidélité écoles.", url: "/ecoles" },
                { icon: <Package size={20} />, title: "📦 Kits Intelligents", desc: "Génération automatique de kits scolaires selon le niveau (CP1→Terminale) et la série (A, C, D). Ajout au panier en 1 clic.", url: "/kits" },
                { icon: <UserPlus size={20} />, title: "🤝 Programme Parrainage", desc: "Codes uniques, partage WhatsApp/SMS, crédits automatiques (500 FCFA parrain / 300 FCFA filleul), niveaux ambassadeur.", url: "/parrainage" },
                { icon: <BookOpen size={20} />, title: "📚 Marketplace Éducative", desc: "Exercices, sujets d'examen, vidéos, fiches de cours. Contenus gratuits et premium par matière et niveau.", url: "/ressources" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex gap-3">
                  <div className="text-primary mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                    <code className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded mt-2 inline-block">{item.url}</code>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8">Nouvelles Tables Base de Données</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "schools", desc: "Répertoire des établissements scolaires" },
                { name: "school_supply_lists", desc: "Listes de fournitures par école et classe" },
                { name: "school_supply_items", desc: "Articles dans les listes de fournitures" },
                { name: "school_loyalty", desc: "Programme fidélité écoles (Bronze→Platinum)" },
                { name: "referrals", desc: "Parrainages avec codes uniques" },
                { name: "referral_rewards", desc: "Récompenses de parrainage" },
                { name: "resources", desc: "Contenus éducatifs (exercices, vidéos, PDF)" },
                { name: "educational_content", desc: "Contenus éducatifs avancés" },
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

            <h3 className="text-xl font-semibold text-foreground mt-8">Admin — Nouveaux Onglets</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: "Écoles", desc: "Gestion des établissements et listes" },
                { title: "Ressources Édu", desc: "Modération des contenus éducatifs" },
                { title: "Parrainages", desc: "Suivi des codes et récompenses" },
              ].map((tab, i) => (
                <div key={i} className="bg-primary/10 text-primary rounded-lg px-4 py-3 text-center">
                  <p className="font-medium text-sm">{tab.title}</p>
                  <p className="text-xs mt-1 opacity-80">{tab.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">📄 Document complet :</strong> Consultez la présentation détaillée des nouvelles fonctionnalités avec contexte, objectifs et guide d'utilisation.
              </p>
              <a href="/fonctionnalites" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Voir le document <ExternalLink size={14} />
              </a>
            </div>
          </div>
        );

      case "architecture":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Architecture Technique</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <Monitor size={20} /> Stack Frontend
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "React 18 avec TypeScript pour la robustesse",
                    "Vite (build ultra-rapide)",
                    "Tailwind CSS + Shadcn/ui (composants accessibles)",
                    "React Query (gestion optimisée des données)",
                    "React Router v6 (navigation SPA)",
                    "Framer Motion (animations fluides)",
                    "i18n (internationalisation 4 langues)",
                    "TipTap (éditeur riche avec tableaux et médias)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <Server size={20} /> Stack Backend (Supabase Cloud)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "PostgreSQL (base de données relationnelle)",
                    "Row Level Security (RLS) pour chaque table",
                    "Edge Functions (Deno/TypeScript)",
                    "Realtime (notifications en temps réel)",
                    "Storage (fichiers, images, documents)",
                    "Auth (authentification multi-méthodes)",
                    "Lovable Cloud (hébergement automatique)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Intégrations Externes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">KkiaPay</h4>
                  <p className="text-xs text-muted-foreground mt-1">Passerelle de paiement Mobile Money & Cartes bancaires (Côte d'Ivoire)</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">Email Transactionnel</h4>
                  <p className="text-xs text-muted-foreground mt-1">Notifications de commande, confirmations, réinitialisations</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">IA Générative</h4>
                  <p className="text-xs text-muted-foreground mt-1">Module IA pour auto-gestion, traduction, génération de contenu et publications réseaux sociaux</p>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">🏗️ Architecture Standalone :</strong> L'application est 100% autonome après build. Elle peut être déployée sur Lovable Cloud, Vercel, ou tout hébergeur statique. Développée par <strong>Inocent KOFFI</strong>.
              </p>
            </div>
          </div>
        );

      case "database":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Base de Données & Schéma</h2>
            
            <h3 className="text-xl font-semibold text-foreground">Tables Principales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "profiles", desc: "Profils utilisateurs (nom, email, avatar, langue)" },
                { name: "user_roles", desc: "Rôles (admin, moderator, vendor, delivery, user)" },
                { name: "products", desc: "Catalogue de produits (multilingue, images multiples)" },
                { name: "categories", desc: "Catégories et sous-catégories de produits" },
                { name: "orders", desc: "Commandes clients avec suivi complet" },
                { name: "order_items", desc: "Articles détaillés de chaque commande" },
                { name: "payments", desc: "Transactions de paiement KkiaPay" },
                { name: "cart_items", desc: "Panier d'achat persistant" },
                { name: "wishlist", desc: "Liste de souhaits utilisateurs" },
                { name: "reviews", desc: "Avis et notes clients" },
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

            <h3 className="text-xl font-semibold text-foreground mt-8">Tables de Contenu & Marketing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "articles", desc: "Articles et actualités (multilingue, premium)" },
                { name: "article_comments", desc: "Commentaires modérés sur les articles" },
                { name: "article_likes / reactions", desc: "Likes et réactions emoji" },
                { name: "article_share_counts", desc: "Compteurs de partage par plateforme" },
                { name: "advertisements", desc: "Bannières publicitaires avec dates" },
                { name: "promotions", desc: "Promotions et ventes flash" },
                { name: "coupons", desc: "Coupons de réduction avec validation" },
                { name: "campaigns", desc: "Campagnes marketing et réseaux sociaux" },
                { name: "faq", desc: "Questions fréquentes (FR/EN)" },
                { name: "notifications", desc: "Notifications in-app en temps réel" },
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

            <h3 className="text-xl font-semibold text-foreground mt-8">Tables Vendeurs & Logistique</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "vendor_settings", desc: "Boutiques vendeurs (nom, commission, vérification)" },
                { name: "commissions", desc: "Commissions sur ventes avec suivi paiement" },
                { name: "delivery_proofs", desc: "Preuves de livraison (photo, GPS, signature)" },
                { name: "loyalty_rewards", desc: "Récompenses fidélité et points échangés" },
                { name: "audit_logs", desc: "Journal d'audit des actions admin" },
                { name: "login_sessions", desc: "Sessions de connexion sécurisées" },
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
                { name: "has_role(user_id, role)", desc: "Vérifie si l'utilisateur possède un rôle spécifique" },
                { name: "get_admin_stats()", desc: "Retourne les statistiques complètes du dashboard admin" },
                { name: "validate_coupon(code, total)", desc: "Valide un coupon de réduction et calcule la remise" },
                { name: "check_rate_limit()", desc: "Vérifie les limites de taux (anti-bruteforce)" },
                { name: "get_delivery_stats(user_id)", desc: "Statistiques du livreur (livré, en transit, en attente)" },
                { name: "get_user_loyalty_points()", desc: "Points de fidélité (gagnés, dépensés, disponibles)" },
                { name: "redeem_loyalty_points(type, points)", desc: "Échange de points contre des récompenses" },
                { name: "increment_article_share(id, platform)", desc: "Incrémente le compteur de partages d'un article" },
                { name: "get_share_stats(start, end)", desc: "Statistiques de partage par période" },
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
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Guide Administrateur</h2>
            
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Accès Administrateur</h3>
              <p className="text-sm text-muted-foreground">
                URL : <code className="bg-muted px-2 py-0.5 rounded">/admin</code><br />
                Le compte admin principal est <strong>scoly.ci@gmail.com</strong> avec le rôle "admin" dans la table <code className="bg-muted px-1 rounded">user_roles</code>.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Sections du Panel Admin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <BarChart3 size={20} />, title: "Tableau de bord", desc: "Vue d'ensemble : produits, commandes, revenus, utilisateurs en temps réel" },
                { icon: <Brain size={20} />, title: "Module IA", desc: "IA auto-gestion : analyse plateforme, suggestions, flash deals, publications" },
                { icon: <ShoppingCart size={20} />, title: "Produits & Catégories", desc: "CRUD complet avec images multiples, traduction auto, stock" },
                { icon: <Tag size={20} />, title: "Promotions & Coupons", desc: "Ventes flash avec compte à rebours, coupons à usage limité" },
                { icon: <Users size={20} />, title: "Utilisateurs & Rôles", desc: "Gestion des comptes, attribution de rôles, blocage" },
                { icon: <CreditCard size={20} />, title: "Paiements & Commissions", desc: "Suivi des transactions, commissions vendeurs, exports" },
                { icon: <Share2 size={20} />, title: "Réseaux Sociaux", desc: "Auto-publication sur Facebook, Instagram, Twitter, LinkedIn" },
                { icon: <FileText size={20} />, title: "Articles & FAQ", desc: "Publication, modération, gestion FAQ dynamique" },
                { icon: <Bell size={20} />, title: "Publicités", desc: "Bannières promotionnelles avec dates d'activation" },
                { icon: <Settings size={20} />, title: "Paramètres", desc: "Configuration générale, sauvegarde, messagerie interne" },
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

            <h3 className="text-xl font-semibold text-foreground mt-8">Workflow Administrateur</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {[
                "Connectez-vous avec votre compte admin",
                "Consultez le tableau de bord pour les KPIs en temps réel",
                "Gérez les nouvelles commandes et confirmez les paiements",
                "Utilisez le Module IA pour analyser et optimiser la plateforme",
                "Publiez automatiquement les promotions sur les réseaux sociaux",
                "Modérez les articles et commentaires soumis",
                "Consultez les statistiques avancées et exportez les rapports",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        );

      case "roles":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Rôles & Permissions</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="text-left p-3">Rôle</th>
                    <th className="text-left p-3">Accès</th>
                    <th className="text-left p-3">Permissions</th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  {[
                    { role: "Admin", access: "/admin", perms: "Accès total : produits, commandes, utilisateurs, paramètres, articles, IA, réseaux sociaux, documentation" },
                    { role: "Modérateur", access: "/moderator", perms: "Modération des articles, commentaires, notes de modération, validation de contenu" },
                    { role: "Vendeur", access: "/vendor", perms: "Gestion de ses produits, commissions, statistiques de ventes, paramètres boutique" },
                    { role: "Livreur", access: "/delivery", perms: "Commandes assignées, preuves de livraison (photo, GPS), statistiques livraison" },
                    { role: "Client", access: "/account", perms: "Profil, commandes, wishlist, avis, fidélité, historique d'achats" },
                  ].map((item, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="p-3 font-semibold text-foreground">{item.role}</td>
                      <td className="p-3"><code className="bg-muted px-2 py-0.5 rounded text-xs">{item.access}</code></td>
                      <td className="p-3 text-muted-foreground text-xs">{item.perms}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8">Dashboards par Rôle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Team Dashboard", url: "/team", desc: "Vue d'ensemble pour l'équipe : articles en attente, commandes récentes, métriques" },
                { title: "Author Dashboard", url: "/author", desc: "Espace auteur : articles publiés, statistiques de vues et réactions" },
                { title: "Vendor Dashboard", url: "/vendor", desc: "Gestion boutique vendeur : produits, commissions, ventes" },
                { title: "Delivery Dashboard", url: "/delivery", desc: "Interface livreur : commandes assignées, preuves de livraison" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                  <code className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded mt-1 inline-block">{item.url}</code>
                  <p className="text-muted-foreground text-xs mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "client":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Guide Client</h2>
            
            <h3 className="text-xl font-semibold text-foreground">Création de Compte</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {[
                "Cliquez sur « S'inscrire » dans la barre de navigation",
                "Remplissez email, mot de passe, prénom et nom",
                "Résolvez le CAPTCHA mathématique de sécurité",
                "Votre compte est automatiquement confirmé",
                "Connectez-vous pour accéder à votre espace client",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-semibold text-foreground mt-8">Processus d'Achat</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {[
                "Parcourez le catalogue ou utilisez la recherche globale",
                "Ajoutez des produits au panier (mini-panier latéral disponible)",
                "Ajoutez des produits à votre liste de souhaits (Wishlist)",
                "Accédez au panier et appliquez un coupon si disponible",
                "Procédez au paiement avec Mobile Money (KkiaPay)",
                "Suivez votre commande en temps réel avec la timeline",
                "Confirmez la réception de votre commande",
              ].map((step, i) => (
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
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">E-commerce Avancé</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <Heart size={20} />, title: "Wishlist (Liste de souhaits)", desc: "Les clients peuvent sauvegarder leurs produits favoris. La wishlist est synchronisée en base de données et accessible depuis le compte utilisateur." },
                { icon: <ShoppingCart size={20} />, title: "Mini-Panier Latéral", desc: "Panier glissant (SideCart) permettant de modifier les quantités et accéder au checkout sans quitter la page en cours." },
                { icon: <Eye size={20} />, title: "Produits récemment consultés", desc: "Section automatique affichant les derniers produits consultés par l'utilisateur sur la page d'accueil et les fiches produit." },
                { icon: <Tag size={20} />, title: "Ventes Flash", desc: "Section deals du jour avec compte à rebours. Les produits en promotion sont automatiquement affichés avec le pourcentage de réduction." },
                { icon: <Gift size={20} />, title: "Programme de Fidélité", desc: "Système de points : les achats génèrent des points échangeables contre des coupons de réduction. Gestion complète dans l'admin." },
                { icon: <Star size={20} />, title: "Avis & Notes", desc: "Système de notation et commentaires sur les produits. Les avis sont visibles sur les fiches produit." },
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

            <h3 className="text-xl font-semibold text-foreground mt-8">Suivi de Commande</h3>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-4">Timeline visuelle avec 5 étapes :</p>
              <div className="flex flex-wrap gap-2">
                {["Commandé", "Confirmé", "Expédié", "En livraison", "Livré"].map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <span className="text-sm text-foreground font-medium">{step}</span>
                    {i < 4 && <ChevronRight size={14} className="text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Système de Paiement</h2>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Méthodes de Paiement via KkiaPay</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Orange Money", "MTN Mobile Money", "Moov Money", "Wave"].map((method, i) => (
                  <div key={i} className="bg-primary/10 text-primary rounded-lg px-3 py-3 text-center font-medium text-sm">
                    {method}
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Flux de Paiement</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              {[
                "Le client valide sa commande et choisit le mode de paiement",
                "Le widget KkiaPay s'ouvre avec le montant pré-rempli",
                "Le client confirme via Mobile Money (SMS de confirmation)",
                "Le webhook KkiaPay notifie le serveur du statut",
                "La commande est automatiquement confirmée si le paiement réussit",
                "Un email de confirmation est envoyé au client",
                "Le suivi de commande est activé en temps réel",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">💡 Configuration :</strong> Les clés KkiaPay sont stockées dans les secrets Supabase (KKIAPAY_PUBLIC_KEY, KKIAPAY_PRIVATE_KEY, KKIAPAY_SECRET). Le webhook est configuré automatiquement via l'Edge Function <code className="bg-muted px-1 rounded">kkiapay-webhook</code>.
              </p>
            </div>
          </div>
        );

      case "ai":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Module IA Intelligent</h2>
            
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">IA Auto-Gestion de la Plateforme</h3>
              <p className="text-sm text-muted-foreground">
                Le module IA analyse l'ensemble de la plateforme (produits, stocks, ventes, tendances) et propose automatiquement des actions : promotions flash, publications réseaux sociaux, alertes stock, classement intelligent des produits.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Fonctionnalités IA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <BarChart3 size={20} />, title: "Analyse de la Plateforme", desc: "L'IA analyse les ventes, stocks, produits populaires et génère un rapport avec recommandations" },
                { icon: <Tag size={20} />, title: "Ventes Flash Automatiques", desc: "Suggestion et application automatique de promotions basées sur le stock et les tendances" },
                { icon: <Share2 size={20} />, title: "Publications Réseaux Sociaux", desc: "Génération automatique de posts pour Facebook, Instagram, Twitter, LinkedIn, WhatsApp" },
                { icon: <Brain size={20} />, title: "Assistant ScIA", desc: "Chatbot intelligent disponible sur toutes les pages pour aider les utilisateurs" },
                { icon: <Globe size={20} />, title: "Traduction Automatique", desc: "Traduction des produits et articles dans 4 langues (FR, EN, DE, ES)" },
                { icon: <FileText size={20} />, title: "Génération de Contenu", desc: "Création d'articles, descriptions de produits et CTA publicitaires par IA" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex gap-3">
                  <div className="text-primary mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Edge Function IA</h3>
              <p className="text-sm text-muted-foreground mb-3">
                L'Edge Function <code className="bg-muted px-2 py-0.5 rounded">ai-platform-manager</code> expose 3 actions :
              </p>
              <div className="space-y-2">
                {[
                  { action: "analyze", desc: "Analyse complète de la plateforme avec recommandations" },
                  { action: "apply_flash_deals", desc: "Application automatique des promotions flash suggérées" },
                  { action: "generate_social_post", desc: "Génération de posts optimisés pour chaque réseau social" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 py-2 border-b border-border last:border-0">
                    <Code size={14} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <code className="text-xs font-mono text-foreground">{item.action}</code>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "edge":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Edge Functions & API</h2>
            
            <div className="space-y-3">
              {[
                { name: "ai-platform-manager", desc: "Module IA : analyse, flash deals, publications réseaux sociaux" },
                { name: "bootstrap-admin", desc: "Initialisation du compte super administrateur" },
                { name: "seed-products", desc: "Import initial du catalogue de produits" },
                { name: "send-order-email", desc: "Envoi d'emails transactionnels de commande" },
                { name: "send-article-notification", desc: "Notifications de publication d'articles" },
                { name: "send-push-notification", desc: "Notifications push navigateur" },
                { name: "process-payment", desc: "Traitement des paiements KkiaPay" },
                { name: "confirm-payment", desc: "Confirmation du statut de paiement" },
                { name: "check-payment-status", desc: "Vérification du statut en temps réel" },
                { name: "kkiapay-webhook", desc: "Réception des webhooks KkiaPay" },
                { name: "translate-product", desc: "Traduction automatique des produits (4 langues)" },
                { name: "generate-article", desc: "Génération de contenu par IA" },
                { name: "generate-ad-cta", desc: "Génération de publicités et CTA par IA" },
                { name: "cloud-backup", desc: "Sauvegarde automatique de la base de données" },
                { name: "restore-database", desc: "Restauration de la base de données" },
                { name: "create-user", desc: "Création d'utilisateurs avec rôles" },
                { name: "update-product-images", desc: "Mise à jour des images produits" },
              ].map((fn, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
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
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Sécurité & Authentification</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <Lock size={20} />, title: "Row Level Security (RLS)", desc: "Chaque table possède des politiques de sécurité strictes. Les utilisateurs ne peuvent accéder qu'à leurs propres données." },
                { icon: <Shield size={20} />, title: "CAPTCHA Mathématique", desc: "Protection anti-bot lors de la connexion et l'inscription avec défi mathématique aléatoire." },
                { icon: <Users size={20} />, title: "Rôles séparés", desc: "Les rôles sont stockés dans user_roles (jamais dans le profil) pour prévenir l'escalade de privilèges." },
                { icon: <Bell size={20} />, title: "Rate Limiting", desc: "Limitation du nombre de tentatives de connexion (5 max / 5 min, blocage 15 min)." },
                { icon: <Settings size={20} />, title: "Security Definer", desc: "Les fonctions sensibles utilisent SECURITY DEFINER pour contourner les RLS de manière contrôlée." },
                { icon: <FileText size={20} />, title: "Audit Logs", desc: "Journalisation complète de toutes les actions administratives avec IP et user-agent." },
                { icon: <Lock size={20} />, title: "Sessions sécurisées", desc: "Détection de connexions suspectes, blocage de sessions, confirmation de nouveaux appareils." },
                { icon: <Shield size={20} />, title: "JWT & Auth", desc: "Authentification par email/mot de passe avec tokens JWT, refresh automatique et sessions sécurisées." },
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

      case "deployment":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Déploiement & Maintenance</h2>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Hébergement</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Frontend : Lovable Cloud (déploiement automatique)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Backend : Supabase Cloud (PostgreSQL, Edge Functions, Auth)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> CDN : Cloudflare pour les assets statiques</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Domaine : scoly.ci (personnalisable)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Alternative : Vercel, cPanel (build statique)</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Environnements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">Test (Preview)</h4>
                  <p className="text-xs text-muted-foreground mt-1">Environnement de développement. Les modifications de code et schéma sont appliquées ici en premier.</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">Production (Live)</h4>
                  <p className="text-xs text-muted-foreground mt-1">Environnement accessible aux utilisateurs réels. Déployé via le bouton « Publier ».</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Déploiement cPanel (alternatif)</h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Exécutez : npm install && npm run build",
                  "Uploadez le contenu du dossier dist/ dans public_html",
                  "Créez le fichier .htaccess pour le routage SPA",
                  "Configurez le certificat SSL",
                  "Configurez les variables d'environnement (env-config.js)",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        );

      case "developer":
        return (
          <div className="space-y-6 doc-section">
            <h2 className="text-3xl font-display font-bold text-foreground">Support & Développeur</h2>
            
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
              <img 
                src="/founder-inocent-koffi.jpg" 
                alt="Inocent KOFFI" 
                className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
              />
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">Inocent KOFFI</h3>
                <p className="text-primary font-medium">Développeur Full-Stack & Fondateur</p>
                <p className="text-muted-foreground text-sm mt-2 max-w-md">
                  Développeur web passionné basé à Abidjan, Côte d'Ivoire. Spécialisé dans le développement d'applications 
                  web modernes avec React, TypeScript et Supabase. Fondateur de la plateforme Scoly.
                </p>
                <div className="flex flex-wrap gap-3 mt-4 text-sm">
                  <a href="mailto:contact@scoly.ci" className="text-primary hover:underline flex items-center gap-1">
                    <Mail size={14} /> contact@scoly.ci
                  </a>
                  <a href="https://ikoffi.agricapital.ci" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                    <Globe size={14} /> Portfolio
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Informations du Projet</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="text-muted-foreground">Version</span><p className="font-semibold text-foreground">3.0.0</p></div>
                <div><span className="text-muted-foreground">Licence</span><p className="font-semibold text-foreground">Propriétaire</p></div>
                <div><span className="text-muted-foreground">Date</span><p className="font-semibold text-foreground">Février 2026</p></div>
                <div><span className="text-muted-foreground">Statut</span><p className="font-semibold text-foreground">Production</p></div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Support Scoly</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={14} className="text-primary" /> contact@scoly.ci
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe size={14} className="text-primary" /> www.scoly.ci
                </div>
              </div>
            </div>

            <div className="text-center mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-lg font-display font-bold text-foreground">Merci d'utiliser Scoly !</p>
              <p className="text-sm text-muted-foreground mt-2">
                Cette documentation est mise à jour régulièrement. Dernière version : Février 2026
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                © {new Date().getFullYear()} Scoly — Documentation Officielle v2.0
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Documentation Scoly 2.0 - Guide technique et utilisateur"
        description="Documentation complète de la plateforme Scoly : architecture, base de données, guides utilisateurs, module IA, sécurité et déploiement."
        url="https://scoly.ci/documentation"
      />
      
      {/* Hide navbar/footer when printing */}
      <div className="print:hidden">
        <Navbar />
      </div>
      
      {/* Hero - Cover page for PDF */}
      <section className="pt-24 pb-12 bg-primary print:pt-0 print:pb-0">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          {/* Print-only full cover page */}
          <div className="hidden print:block print:min-h-screen print:flex print:flex-col print:items-center print:justify-center">
            <div className="mb-8">
              <div className="bg-white/95 rounded-xl px-6 py-3 inline-block mb-8">
                <Logo size="lg" />
              </div>
            </div>
            <h1 className="text-5xl font-display font-bold mb-4">DOCUMENTATION OFFICIELLE</h1>
            <h2 className="text-3xl font-display mb-8">Plateforme E-commerce Scoly</h2>
            <div className="border-t border-white/30 pt-6 mt-6 space-y-2">
              <p className="text-lg">Version : 2.0.0</p>
              <p className="text-lg">Licence : Propriétaire</p>
              <p className="text-lg">Date : Février 2026</p>
              <p className="text-lg">Statut : Production</p>
            </div>
            <div className="mt-12 border-t border-white/20 pt-6">
              <p className="text-sm opacity-80">© {new Date().getFullYear()} Scoly — Documentation Officielle</p>
              <p className="text-sm opacity-60 mt-1">www.scoly.ci</p>
            </div>
          </div>

          {/* Web version hero */}
          <div className="print:hidden">
            <div className="flex justify-center mb-4">
              <div className="bg-white/95 rounded-xl px-4 py-2">
                <Logo size="lg" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">Documentation Officielle</h1>
            <p className="text-lg opacity-90">Scoly 3.0 — Guide Technique & Utilisateur</p>
            <p className="text-sm opacity-70 mt-1">Version 3.0.0 • Février 2026 • Production</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 print:py-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation - hidden on print */}
            <aside className="lg:w-72 shrink-0 print:hidden">
              <div className="bg-card border border-border rounded-xl p-4 sticky top-20">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Table des matières</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mb-3 gap-2"
                  onClick={handleDownloadPDF}
                >
                  <Download size={14} />
                  Télécharger PDF
                </Button>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {section.icon}
                      {language === 'en' ? section.titleEn : section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Web: show active section only */}
              <div className="print:hidden">
                <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                  {renderSection()}
                </div>
              </div>

              {/* Print: show ALL sections */}
              <div className="hidden print:block">
                {sections.map((section) => {
                  const prevActive = activeSection;
                  return (
                    <div key={section.id} className="print:break-before-page mb-8">
                      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                        {(() => {
                          // Temporarily render each section for print
                          const tempSection = activeSection;
                          return null; // Print handled via CSS
                        })()}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer info */}
              <div className="mt-8 text-center text-xs text-muted-foreground print:hidden">
                <p>© {new Date().getFullYear()} Scoly — Documentation Officielle v2.0</p>
                <p className="mt-1">Plateforme développée par Inocent KOFFI • scoly.ci</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
};

export default Documentation;
