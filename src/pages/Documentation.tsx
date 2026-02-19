import { useState } from "react";
import { Book, Database, Shield, Users, CreditCard, Server, Mail, Globe, ChevronRight, Download, FileText, Smartphone, Monitor, Code, Layers, Lock, Bell, Truck, ShoppingCart, BarChart3, MessageSquare, Star, Settings } from "lucide-react";
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
    { id: "architecture", icon: <Layers size={18} />, title: "2. Architecture technique", titleEn: "2. Technical Architecture" },
    { id: "database", icon: <Database size={18} />, title: "3. Base de données", titleEn: "3. Database" },
    { id: "admin", icon: <Shield size={18} />, title: "4. Guide Administrateur", titleEn: "4. Admin Guide" },
    { id: "roles", icon: <Users size={18} />, title: "5. Rôles & Permissions", titleEn: "5. Roles & Permissions" },
    { id: "client", icon: <ShoppingCart size={18} />, title: "6. Guide Client", titleEn: "6. Client Guide" },
    { id: "payment", icon: <CreditCard size={18} />, title: "7. Système de paiement", titleEn: "7. Payment System" },
    { id: "edge", icon: <Server size={18} />, title: "8. Edge Functions & API", titleEn: "8. Edge Functions & API" },
    { id: "security", icon: <Lock size={18} />, title: "9. Sécurité", titleEn: "9. Security" },
    { id: "deployment", icon: <Globe size={18} />, title: "10. Déploiement", titleEn: "10. Deployment" },
    { id: "developer", icon: <Code size={18} />, title: "11. Développeur", titleEn: "11. Developer" },
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
                { icon: <ShoppingCart size={20} />, title: "Boutique en ligne", desc: "Catalogue complet de produits scolaires et bureautiques" },
                { icon: <Truck size={20} />, title: "Livraison gratuite", desc: "Livraison offerte partout en Côte d'Ivoire" },
                { icon: <CreditCard size={20} />, title: "Paiement Mobile Money", desc: "Orange Money, MTN, Moov, Wave via KkiaPay" },
                { icon: <Bell size={20} />, title: "Notifications en temps réel", desc: "Suivi de commande et alertes automatiques" },
                { icon: <Globe size={20} />, title: "Multilingue", desc: "Français, Anglais, Allemand, Espagnol" },
                { icon: <MessageSquare size={20} />, title: "Assistant IA (ScIA)", desc: "Chatbot intelligent pour l'aide aux utilisateurs" },
                { icon: <FileText size={20} />, title: "Actualités", desc: "Blog avec articles éducatifs et scolaires" },
                { icon: <Star size={20} />, title: "Programme de fidélité", desc: "Points et récompenses pour les clients fidèles" },
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

            <h3 className="text-xl font-semibold text-foreground mt-8">Catégories de Produits</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Scoly Primaire", "Scoly Secondaire", "Scoly Universitaire", "Scoly Bureautique", "Scoly Librairie"].map((cat, i) => (
                <div key={i} className="bg-primary/10 text-primary rounded-lg px-4 py-3 text-center font-medium text-sm">
                  {cat}
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
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <Monitor size={20} /> Stack Frontend
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "React 18 avec TypeScript",
                    "Vite (build ultra-rapide)",
                    "Tailwind CSS + Shadcn/ui",
                    "React Query (gestion des données)",
                    "React Router v6 (navigation)",
                    "Framer Motion (animations)",
                    "i18n (internationalisation 4 langues)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <Server size={20} /> Stack Backend (Supabase)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "PostgreSQL (base de données)",
                    "Row Level Security (RLS)",
                    "Edge Functions (Deno/TypeScript)",
                    "Realtime (notifications temps réel)",
                    "Storage (fichiers et images)",
                    "Auth (authentification sécurisée)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-primary" />
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
                  <p className="text-xs text-muted-foreground mt-1">Passerelle de paiement Mobile Money & Cartes bancaires</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">Email Transactionnel</h4>
                  <p className="text-xs text-muted-foreground mt-1">Notifications de commande, réinitialisation de mot de passe</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">IA Générative</h4>
                  <p className="text-xs text-muted-foreground mt-1">Assistant ScIA, génération de contenu et traduction</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "database":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Base de Données & Schéma</h2>
            
            <h3 className="text-xl font-semibold text-foreground">Tables Principales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "profiles", desc: "Profils utilisateurs" },
                { name: "user_roles", desc: "Rôles (admin, moderator, vendor, delivery, user)" },
                { name: "products", desc: "Catalogue de produits" },
                { name: "categories", desc: "Catégories de produits" },
                { name: "orders", desc: "Commandes clients" },
                { name: "order_items", desc: "Articles de commande" },
                { name: "payments", desc: "Transactions de paiement" },
                { name: "cart_items", desc: "Panier d'achat" },
                { name: "wishlist", desc: "Liste de souhaits" },
                { name: "reviews", desc: "Avis clients" },
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

            <h3 className="text-xl font-semibold text-foreground mt-8">Tables de Contenu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: "articles", desc: "Articles et actualités" },
                { name: "article_comments", desc: "Commentaires d'articles" },
                { name: "article_likes", desc: "Likes d'articles" },
                { name: "article_reactions", desc: "Réactions (emoji)" },
                { name: "advertisements", desc: "Bannières publicitaires" },
                { name: "faq", desc: "Questions fréquentes" },
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
                { name: "get_admin_stats()", desc: "Retourne les statistiques pour le dashboard admin" },
                { name: "validate_coupon(code, total)", desc: "Valide un coupon de réduction" },
                { name: "check_rate_limit()", desc: "Vérifie les limites de taux de requêtes" },
                { name: "get_delivery_stats()", desc: "Statistiques du livreur" },
                { name: "get_user_loyalty_points()", desc: "Points de fidélité de l'utilisateur" },
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
              <h3 className="text-lg font-semibold text-primary mb-2">Accès Administrateur</h3>
              <p className="text-sm text-muted-foreground">
                URL : <code className="bg-muted px-2 py-0.5 rounded">/admin</code><br />
                Le compte admin est <strong>scoly.ci@gmail.com</strong> avec le rôle "admin" dans la table <code>user_roles</code>.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Fonctionnalités du Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <BarChart3 size={20} />, title: "Statistiques", desc: "Vue d'ensemble : produits, commandes, revenus, utilisateurs" },
                { icon: <ShoppingCart size={20} />, title: "Gestion des produits", desc: "Ajouter, modifier, supprimer des produits et catégories" },
                { icon: <Users size={20} />, title: "Gestion des utilisateurs", desc: "Rôles, permissions, blocage de comptes" },
                { icon: <CreditCard size={20} />, title: "Gestion des paiements", desc: "Suivi des transactions, confirmations manuelles" },
                { icon: <FileText size={20} />, title: "Gestion des articles", desc: "Publication, modération, statistiques de vues" },
                { icon: <Settings size={20} />, title: "Paramètres", desc: "Configuration plateforme, coupons, promotions, FAQ" },
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
                  <tr>
                    <th className="text-left p-3">Rôle</th>
                    <th className="text-left p-3">Accès</th>
                    <th className="text-left p-3">Permissions</th>
                  </tr>
                </thead>
                <tbody className="bg-card">
                  {[
                    { role: "Admin", access: "/admin", perms: "Accès total : produits, commandes, utilisateurs, paramètres, articles, statistiques" },
                    { role: "Modérateur", access: "/moderator", perms: "Modération des articles, commentaires, notes de modération" },
                    { role: "Vendeur", access: "/vendor", perms: "Gestion de ses propres produits, commissions, statistiques de ventes" },
                    { role: "Livreur", access: "/delivery", perms: "Commandes assignées, preuves de livraison, statistiques" },
                    { role: "Client", access: "/account", perms: "Profil, commandes, wishlist, avis, fidélité" },
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
          </div>
        );

      case "client":
        return (
          <div className="space-y-6">
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
                "Parcourez le catalogue ou utilisez la recherche",
                "Ajoutez des produits au panier",
                "Accédez au panier et vérifiez votre commande",
                "Procédez au paiement avec Mobile Money",
                "Suivez votre commande en temps réel",
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

      case "payment":
        return (
          <div className="space-y-6">
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
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        );

      case "edge":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Edge Functions & API</h2>
            
            <div className="space-y-3">
              {[
                { name: "bootstrap-admin", desc: "Initialisation du compte super administrateur" },
                { name: "seed-products", desc: "Import initial du catalogue de produits" },
                { name: "send-order-email", desc: "Envoi d'emails transactionnels de commande" },
                { name: "send-article-notification", desc: "Notifications de publication d'articles" },
                { name: "process-payment", desc: "Traitement des paiements KkiaPay" },
                { name: "confirm-payment", desc: "Confirmation du statut de paiement" },
                { name: "check-payment-status", desc: "Vérification du statut en temps réel" },
                { name: "kkiapay-webhook", desc: "Réception des webhooks KkiaPay" },
                { name: "translate-product", desc: "Traduction automatique des produits (4 langues)" },
                { name: "generate-article", desc: "Génération de contenu par IA" },
                { name: "generate-ad-cta", desc: "Génération de publicités par IA" },
                { name: "cloud-backup", desc: "Sauvegarde automatique de la base de données" },
                { name: "create-user", desc: "Création d'utilisateurs avec rôles" },
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
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Sécurité & Authentification</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <Lock size={20} />, title: "Row Level Security (RLS)", desc: "Chaque table possède des politiques de sécurité strictes isolant les données entre utilisateurs." },
                { icon: <Shield size={20} />, title: "CAPTCHA Mathématique", desc: "Protection anti-bot lors de la connexion et l'inscription avec défi mathématique aléatoire." },
                { icon: <Users size={20} />, title: "Rôles séparés", desc: "Les rôles sont stockés dans une table dédiée user_roles (jamais dans le profil) pour prévenir l'escalade de privilèges." },
                { icon: <Bell size={20} />, title: "Rate Limiting", desc: "Limitation du nombre de tentatives de connexion (5 max / 5 min, blocage 15 min)." },
                { icon: <Settings size={20} />, title: "Security Definer", desc: "Les fonctions sensibles utilisent SECURITY DEFINER pour contourner les RLS de manière contrôlée." },
                { icon: <FileText size={20} />, title: "Audit Logs", desc: "Journalisation complète de toutes les actions administratives." },
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
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-foreground">Déploiement & Maintenance</h2>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Hébergement</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Frontend : Lovable Cloud / Vercel</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Backend : Supabase (PostgreSQL, Edge Functions, Auth)</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> CDN : Cloudflare pour les assets statiques</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-primary" /> Domaine : scoly.ci</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Environnements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">Test</h4>
                  <p className="text-xs text-muted-foreground mt-1">Environnement de développement et tests. Les modifications sont appliquées ici en premier.</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground text-sm">Production (Live)</h4>
                  <p className="text-xs text-muted-foreground mt-1">Environnement accessible aux utilisateurs réels. Déployé via « Publier ».</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "developer":
        return (
          <div className="space-y-6">
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
                  web modernes avec React, TypeScript et Supabase.
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
                <div><span className="text-muted-foreground">Version</span><p className="font-semibold text-foreground">2.0.0</p></div>
                <div><span className="text-muted-foreground">Licence</span><p className="font-semibold text-foreground">Propriétaire</p></div>
                <div><span className="text-muted-foreground">Date</span><p className="font-semibold text-foreground">Février 2026</p></div>
                <div><span className="text-muted-foreground">Statut</span><p className="font-semibold text-foreground">Production</p></div>
              </div>
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
        description="Documentation complète de la plateforme Scoly : architecture, base de données, guides utilisateurs, sécurité et déploiement."
        url="https://scoly.ci/documentation"
      />
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-primary">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <div className="flex justify-center mb-4">
            <div className="bg-white/95 rounded-xl px-4 py-2">
              <Logo size="lg" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2">Documentation Officielle</h1>
          <p className="text-lg opacity-90">Scoly 2.0 — Guide Technique & Utilisateur</p>
          <p className="text-sm opacity-70 mt-1">Version 2.0.0 • Février 2026 • Production</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:w-72 shrink-0">
              <div className="bg-card border border-border rounded-xl p-4 sticky top-20">
                <h3 className="font-semibold text-foreground mb-3 text-sm">Table des matières</h3>
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
              <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                {renderSection()}
              </div>

              {/* Footer info */}
              <div className="mt-8 text-center text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} Scoly — Documentation Officielle</p>
                <p className="mt-1">Plateforme développée par Inocent KOFFI • scoly.ci</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Documentation;
