import { useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import jsPDF from "jspdf";

const DocumentationManager = () => {
  const [generating, setGenerating] = useState(false);

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const W = 210;
      const H = 297;
      const M = 20;
      const CW = W - 2 * M;
      let y = 0;

      // ===== SCOLY COLOR PALETTE =====
      const NAVY: [number, number, number] = [16, 36, 76];       // Primary navy blue
      const ORANGE: [number, number, number] = [242, 105, 13];    // Secondary orange
      const DARK: [number, number, number] = [30, 30, 30];
      const GRAY: [number, number, number] = [100, 100, 100];
      const LIGHT_BG: [number, number, number] = [245, 247, 250];
      const WHITE: [number, number, number] = [255, 255, 255];
      const NAVY_LIGHT: [number, number, number] = [40, 70, 130];
      const ORANGE_BG: [number, number, number] = [255, 243, 230];

      const docSections = [
        { id: 1, title: "Présentation de la Plateforme", pages: "2" },
        { id: 2, title: "Architecture Technique", pages: "3" },
        { id: 3, title: "Base de Données & Schéma", pages: "4-5" },
        { id: 4, title: "Guide Administrateur", pages: "6" },
        { id: 5, title: "Rôles & Permissions", pages: "7" },
        { id: 6, title: "Guide Client", pages: "8" },
        { id: 7, title: "E-commerce Avancé", pages: "9" },
        { id: 8, title: "Système de Paiement KkiaPay", pages: "10" },
        { id: 9, title: "Module IA", pages: "11" },
        { id: 10, title: "Edge Functions & API", pages: "12" },
        { id: 11, title: "Sécurité & Authentification", pages: "13" },
        { id: 12, title: "Déploiement & Maintenance", pages: "14" },
        { id: 13, title: "Support & Contact Développeur", pages: "15" },
      ];

      // ===== HELPER FUNCTIONS =====
      const addTopBar = () => {
        doc.setFillColor(...NAVY);
        doc.rect(0, 0, W, 4, "F");
        // Orange accent line below navy
        doc.setFillColor(...ORANGE);
        doc.rect(0, 4, W, 1, "F");
      };

      const addFooter = (pageNum: number) => {
        doc.setFontSize(8);
        doc.setTextColor(...GRAY);
        doc.text("© 2025 Scoly — Documentation Officielle", M, H - 10);
        doc.text(`Page ${pageNum}`, W / 2, H - 10, { align: "center" });
        doc.text("www.scoly.ci", W - M, H - 10, { align: "right" });
        // Bottom line
        doc.setDrawColor(...NAVY);
        doc.setLineWidth(0.3);
        doc.line(M, H - 14, W - M, H - 14);
        addTopBar();
      };

      const addHeader = () => {
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        doc.text("SCOLY", M, 12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...GRAY);
        doc.text("Documentation Technique & Guide Utilisateur", W - M, 12, { align: "right" });
        doc.setDrawColor(220, 220, 220);
        doc.line(M, 15, W - M, 15);
      };

      const newPage = (pageNum: number) => {
        doc.addPage();
        addFooter(pageNum);
        addHeader();
        return 22;
      };

      const checkPage = (currentY: number, needed: number, pg: { v: number }) => {
        if (currentY + needed > H - 20) {
          pg.v++;
          return newPage(pg.v);
        }
        return currentY;
      };

      const sectionTitle = (text: string, currentY: number) => {
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        doc.text(text, M, currentY);
        currentY += 2;
        doc.setDrawColor(...ORANGE);
        doc.setLineWidth(1);
        doc.line(M, currentY, M + 55, currentY);
        doc.setLineWidth(0.3);
        return currentY + 8;
      };

      const subTitle = (text: string, currentY: number) => {
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY_LIGHT);
        doc.text(text, M, currentY);
        return currentY + 7;
      };

      const bodyText = (text: string, currentY: number, maxWidth?: number) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...DARK);
        const lines = doc.splitTextToSize(text, maxWidth || CW);
        doc.text(lines, M, currentY);
        return currentY + lines.length * 5;
      };

      const bulletList = (items: string[], currentY: number, pg: { v: number }) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...DARK);
        items.forEach((item) => {
          currentY = checkPage(currentY, 6, pg);
          doc.setFillColor(...ORANGE);
          doc.circle(M + 2, currentY - 1.5, 1.2, "F");
          const lines = doc.splitTextToSize(item, CW - 8);
          doc.text(lines, M + 7, currentY);
          currentY += lines.length * 5 + 1;
        });
        return currentY;
      };

      const infoBox = (text: string, currentY: number) => {
        doc.setFillColor(...ORANGE_BG);
        const lines = doc.splitTextToSize(text, CW - 16);
        const boxH = lines.length * 5 + 10;
        doc.roundedRect(M, currentY - 4, CW, boxH, 2, 2, "F");
        // Orange left border
        doc.setFillColor(...ORANGE);
        doc.rect(M, currentY - 4, 3, boxH, "F");
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 50, 10);
        doc.text(lines, M + 10, currentY + 2);
        return currentY + boxH + 4;
      };

      const tableRow = (name: string, desc: string, currentY: number, pg: { v: number }) => {
        currentY = checkPage(currentY, 9, pg);
        doc.setFillColor(...LIGHT_BG);
        doc.roundedRect(M, currentY - 4, CW, 9, 1, 1, "F");
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        doc.text(name, M + 4, currentY + 1.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...DARK);
        const xAfter = M + 4 + doc.getTextWidth(name) + 3;
        const remaining = Math.max(W - M - 4 - xAfter, 60);
        const descLines = doc.splitTextToSize("— " + desc, remaining);
        doc.text(descLines[0], xAfter, currentY + 1.5);
        return currentY + 11;
      };

      // ==================== PAGE 1: COVER ====================
      addFooter(1);
      // Navy header block
      doc.setFillColor(...NAVY);
      doc.rect(0, 0, W, 105, "F");
      // Orange accent stripe
      doc.setFillColor(...ORANGE);
      doc.rect(0, 105, W, 3, "F");

      // Logo text on cover
      doc.setTextColor(...WHITE);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("SCOLY", W / 2, 25, { align: "center" });
      doc.setFontSize(10);
      doc.text("Documentation Technique & Guide Utilisateur", W / 2, 33, { align: "center" });

      doc.setFontSize(32);
      doc.setFont("helvetica", "bold");
      doc.text("DOCUMENTATION", W / 2, 58, { align: "center" });
      doc.text("OFFICIELLE", W / 2, 72, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(255, 200, 150);
      doc.text("Plateforme E-commerce Scolaire & Bureautique", W / 2, 88, { align: "center" });
      doc.setTextColor(...WHITE);
      doc.setFontSize(10);
      doc.text("Côte d'Ivoire", W / 2, 96, { align: "center" });

      // Cover info boxes
      y = 120;
      const coverItems = [
        ["Version", "2.0.0"],
        ["Licence", "Propriétaire"],
        ["Date", new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })],
        ["Statut", "Production"],
      ];
      coverItems.forEach(([label, value]) => {
        doc.setFillColor(...LIGHT_BG);
        doc.roundedRect(M, y, CW, 10, 2, 2, "F");
        doc.setFontSize(9);
        doc.setTextColor(...GRAY);
        doc.setFont("helvetica", "normal");
        doc.text(label, M + 4, y + 6.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        doc.text(value, W - M - 4, y + 6.5, { align: "right" });
        y += 13;
      });

      // Table of contents
      y += 8;
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...NAVY);
      doc.text("TABLE DES MATIÈRES", M, y);
      doc.setDrawColor(...ORANGE);
      doc.setLineWidth(0.8);
      doc.line(M, y + 2, M + 45, y + 2);
      doc.setLineWidth(0.3);
      y += 10;
      docSections.forEach((s) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...DARK);
        const label = `${s.id}. ${s.title}`;
        doc.text(label, M + 4, y);
        doc.setTextColor(...ORANGE);
        doc.setFont("helvetica", "bold");
        doc.text(s.pages, W - M - 4, y, { align: "right" });
        doc.setDrawColor(200, 200, 200);
        doc.setLineDashPattern([1, 1], 0);
        const tw = doc.getTextWidth(label);
        const pw = doc.getTextWidth(s.pages);
        doc.line(M + 6 + tw, y - 1, W - M - 6 - pw, y - 1);
        doc.setLineDashPattern([], 0);
        y += 7;
      });

      const pg = { v: 1 };

      // ==================== PAGE 2: PRÉSENTATION ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("1. PRÉSENTATION DE LA PLATEFORME", y);

      y = subTitle("Qu'est-ce que Scoly ?", y);
      y = bodyText(
        "Scoly (scoly.ci) est une plateforme e-commerce innovante dédiée aux fournitures scolaires et bureautiques en Côte d'Ivoire. Elle offre un catalogue complet de livres, manuels scolaires et fournitures de bureau avec livraison gratuite sur l'ensemble du territoire ivoirien. Développée avec les technologies les plus modernes, Scoly propose une expérience d'achat fluide, intelligente et sécurisée.",
        y
      );
      y += 4;

      y = subTitle("Fonctionnalités Principales", y);
      y = bulletList(
        [
          "Boutique en ligne avec catalogue complet de produits scolaires et bureautiques",
          "Livraison gratuite partout en Côte d'Ivoire avec suivi en temps réel",
          "Paiement sécurisé Mobile Money (Orange, MTN, Moov, Wave) via KkiaPay",
          "Notifications en temps réel (push & in-app) pour le suivi de commande",
          "Support multilingue : Français, Anglais, Allemand, Espagnol",
          "Module IA intelligent : analyse auto, gestion promotions, publications réseaux sociaux",
          "Wishlist, mini-panier latéral et programme de fidélité avec points",
          "Assistant IA conversationnel (ScIA) pour l'aide aux utilisateurs",
          "Blog et actualités éducatives avec éditeur riche IA (tableaux, médias, vidéos)",
          "Système d'avis clients et réactions sur articles",
        ],
        y,
        pg
      );
      y += 4;

      y = subTitle("Espaces de la Plateforme", y);
      y = bulletList(
        [
          "Scoly Primaire — Fournitures et manuels du primaire",
          "Scoly Secondaire — Manuels et fournitures du secondaire",
          "Scoly Universitaire — Ouvrages et fournitures universitaires",
          "Scoly Bureautique — Fournitures de bureau professionnelles",
          "Scoly Librairie — Littérature, contes et œuvres intégrales",
          "ScoOffice Plus — Marque premium de fournitures",
        ],
        y,
        pg
      );

      // ==================== PAGE 3: ARCHITECTURE ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("2. ARCHITECTURE TECHNIQUE", y);

      y = subTitle("Stack Frontend", y);
      y = bulletList(
        [
          "React 18 avec TypeScript pour la robustesse et la maintenabilité",
          "Vite comme bundler (build ultra-rapide, Hot Module Replacement)",
          "Tailwind CSS + Shadcn/ui pour un design moderne et accessible",
          "React Query pour la gestion optimisée des données côté client",
          "React Router v6 pour la navigation SPA (Single Page Application)",
          "Framer Motion pour les animations fluides et professionnelles",
          "Système i18n intégré pour l'internationalisation en 4 langues",
          "TipTap pour l'éditeur riche avec support tableaux et médias",
        ],
        y,
        pg
      );
      y += 3;

      y = subTitle("Stack Backend (Supabase Cloud)", y);
      y = bulletList(
        [
          "PostgreSQL pour la base de données relationnelle haute performance",
          "Row Level Security (RLS) pour la sécurité de chaque table",
          "Edge Functions (Deno/TypeScript) pour la logique métier serveur",
          "Realtime pour les notifications et mises à jour en temps réel",
          "Storage pour les fichiers, images et documents",
          "Auth pour l'authentification multi-méthodes sécurisée",
          "Lovable Cloud pour l'hébergement automatique et les déploiements",
        ],
        y,
        pg
      );
      y += 3;

      y = subTitle("Intégrations Externes", y);
      y = bulletList(
        [
          "KkiaPay — Passerelle de paiement Mobile Money & Cartes bancaires (Côte d'Ivoire)",
          "Email Transactionnel — Notifications de commande, confirmations, réinitialisations",
          "IA Générative (Gemini/GPT) — Module IA pour auto-gestion, traduction, génération de contenu et images",
        ],
        y,
        pg
      );
      y += 3;
      y = infoBox(
        "Architecture Standalone : L'application est 100% autonome après build. Elle peut être déployée sur Lovable Cloud, Vercel, ou tout hébergeur statique. Développée par Inocent KOFFI.",
        y
      );

      // ==================== PAGE 4-5: BASE DE DONNÉES ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("3. BASE DE DONNÉES & SCHÉMA", y);

      y = subTitle("Tables Principales", y);
      const mainTables = [
        ["profiles", "Profils utilisateurs (nom, email, avatar, langue préférée)"],
        ["user_roles", "Rôles : admin, moderator, vendor, delivery, user"],
        ["products", "Catalogue de produits multilingue avec images multiples"],
        ["categories", "Catégories et sous-catégories hiérarchiques"],
        ["orders", "Commandes clients avec suivi complet du cycle de vie"],
        ["order_items", "Articles détaillés de chaque commande"],
        ["payments", "Transactions de paiement KkiaPay"],
        ["cart_items", "Panier d'achat persistant par utilisateur"],
        ["wishlist", "Liste de souhaits des utilisateurs"],
        ["reviews", "Avis et notes clients sur les produits"],
      ];
      mainTables.forEach(([name, desc]) => {
        y = tableRow(name, desc, y, pg);
      });

      y += 3;
      y = checkPage(y, 30, pg);
      y = subTitle("Tables de Contenu & Marketing", y);
      const contentTables = [
        ["articles", "Articles et actualités multilingues (premium/gratuit)"],
        ["article_comments", "Commentaires modérés sur les articles"],
        ["article_likes / reactions", "Likes et réactions emoji par utilisateur"],
        ["article_share_counts", "Compteurs de partage par plateforme sociale"],
        ["advertisements", "Bannières publicitaires avec dates de début/fin"],
        ["promotions", "Promotions et ventes flash avec compte à rebours"],
        ["coupons", "Coupons de réduction avec validation automatique"],
        ["campaigns", "Campagnes marketing et réseaux sociaux"],
        ["faq", "Questions fréquentes bilingues (FR/EN)"],
        ["notifications", "Notifications in-app en temps réel"],
      ];
      contentTables.forEach(([name, desc]) => {
        y = tableRow(name, desc, y, pg);
      });

      y += 3;
      y = checkPage(y, 30, pg);
      y = subTitle("Tables Vendeurs & Logistique", y);
      const vendorTables = [
        ["vendor_settings", "Boutiques vendeurs (nom, commission, vérification)"],
        ["commissions", "Commissions sur ventes avec suivi paiement"],
        ["delivery_proofs", "Preuves de livraison (photo, GPS, signature)"],
        ["loyalty_rewards", "Récompenses fidélité et points échangés"],
        ["audit_logs", "Journal d'audit des actions administrateur"],
        ["login_sessions", "Sessions de connexion sécurisées"],
      ];
      vendorTables.forEach(([name, desc]) => {
        y = tableRow(name, desc, y, pg);
      });

      y += 4;
      y = checkPage(y, 40, pg);
      y = subTitle("Fonctions Database", y);
      const dbFunctions = [
        ["has_role(user_id, role)", "Vérifie si l'utilisateur possède un rôle spécifique"],
        ["get_admin_stats()", "Retourne les statistiques complètes du dashboard admin"],
        ["validate_coupon(code, total)", "Valide un coupon de réduction et calcule la remise"],
        ["check_rate_limit()", "Vérifie les limites de taux (anti-bruteforce)"],
        ["get_delivery_stats(user_id)", "Statistiques du livreur (livré, en transit, en attente)"],
        ["get_user_loyalty_points()", "Points de fidélité (gagnés, dépensés, disponibles)"],
        ["redeem_loyalty_points(type, points)", "Échange de points contre des récompenses"],
        ["increment_article_share(id, platform)", "Incrémente les compteurs de partage par réseau"],
        ["get_share_stats(start, end)", "Statistiques de partage par période"],
      ];
      dbFunctions.forEach(([name, desc]) => {
        y = checkPage(y, 7, pg);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        doc.text(name, M + 4, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...GRAY);
        doc.text(" — " + desc, M + 4 + doc.getTextWidth(name) + 1, y);
        y += 6;
      });

      // ==================== PAGE 6: GUIDE ADMIN ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("4. GUIDE ADMINISTRATEUR", y);

      y = subTitle("Accès Administrateur", y);
      y = infoBox("URL : /admin — Le compte admin principal est scoly.ci@gmail.com avec le rôle \"admin\" dans la table user_roles.", y);
      y += 2;

      y = subTitle("Sections du Panel Admin", y);
      y = bulletList(
        [
          "Tableau de bord — Vue d'ensemble : produits, commandes, revenus, utilisateurs en temps réel",
          "Module IA — IA auto-gestion : analyse plateforme, suggestions flash deals, publications sociales",
          "Produits & Catégories — CRUD complet avec images multiples, traduction auto, gestion de stock",
          "Promotions & Coupons — Ventes flash avec compte à rebours, coupons à usage limité",
          "Utilisateurs & Rôles — Gestion des comptes, attribution de rôles, blocage de comptes",
          "Paiements & Commissions — Suivi des transactions, commissions vendeurs, export Excel",
          "Livraisons — Assignation livreurs, preuves de livraison avec photo et GPS",
          "Articles & Actualités — Modération, éditeur riche avec IA, contenu premium",
          "Publicités — Gestion des bannières pub avec dates et priorités",
          "FAQ — Gestion bilingue des questions fréquentes",
          "Documentation — Génération PDF de la documentation officielle",
          "Paramètres — Configuration de la plateforme, clés API, maintenance",
        ],
        y,
        pg
      );

      // ==================== PAGE 7: RÔLES ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("5. RÔLES & PERMISSIONS", y);

      const roles = [
        { role: "Admin", perms: "Accès complet à toutes les fonctionnalités. Gestion utilisateurs, produits, commandes, paiements, paramètres. Module IA et réseaux sociaux." },
        { role: "Moderator", perms: "Modération des articles et commentaires. Validation des publications. Gestion du contenu éditorial." },
        { role: "Vendor", perms: "Gestion de sa propre boutique. Ajout/modification de produits. Suivi des ventes et commissions. Dashboard vendeur dédié." },
        { role: "Delivery", perms: "Réception des commandes assignées. Suivi et livraison avec preuve (photo, GPS, signature). Dashboard livreur." },
        { role: "User (Client)", perms: "Navigation et achat. Panier, wishlist, commandes. Avis et commentaires. Espace compte personnel. Programme de fidélité." },
      ];
      roles.forEach((r) => {
        y = checkPage(y, 20, pg);
        doc.setFillColor(...LIGHT_BG);
        doc.roundedRect(M, y - 4, CW, 18, 2, 2, "F");
        // Orange left accent
        doc.setFillColor(...ORANGE);
        doc.rect(M, y - 4, 3, 18, "F");
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        doc.text(r.role, M + 8, y + 2);
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...DARK);
        const lines = doc.splitTextToSize(r.perms, CW - 14);
        doc.text(lines, M + 8, y + 8);
        y += 22;
      });

      // ==================== PAGE 8: GUIDE CLIENT ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("6. GUIDE CLIENT", y);

      y = subTitle("Création de Compte", y);
      y = bulletList(
        [
          "Cliquez sur \"Inscription\" dans la barre de navigation",
          "Remplissez email et mot de passe (minimum 6 caractères)",
          "Confirmez votre email (lien envoyé automatiquement)",
          "Connectez-vous à votre espace personnel",
        ],
        y, pg
      );
      y += 3;

      y = subTitle("Processus d'Achat", y);
      y = bulletList(
        [
          "Parcourez le catalogue par catégorie ou utilisez la recherche",
          "Ajoutez des produits au panier (mini-panier latéral disponible)",
          "Consultez votre panier et ajustez les quantités",
          "Procédez au checkout avec votre adresse de livraison",
          "Payez par Mobile Money ou carte bancaire via KkiaPay",
          "Recevez la confirmation par email et notification push",
          "Suivez votre commande en temps réel depuis votre espace",
        ],
        y, pg
      );
      y += 3;

      y = subTitle("Espace Client", y);
      y = bulletList(
        [
          "Historique des commandes avec timeline visuelle de suivi",
          "Gestion de la wishlist (liste de souhaits)",
          "Modification du profil et avatar",
          "Programme de fidélité : gagnez des points à chaque achat",
          "Notifications personnalisées (commandes, promotions)",
        ],
        y, pg
      );

      // ==================== PAGE 9: E-COMMERCE AVANCÉ ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("7. E-COMMERCE AVANCÉ", y);

      y = subTitle("Mini-Panier Latéral (SideCart)", y);
      y = bodyText("Un panier latéral coulissant permet aux utilisateurs de visualiser et gérer leur panier sans quitter la page en cours. Modification des quantités, suppression d'articles et accès direct au checkout.", y);
      y += 4;

      y = subTitle("Wishlist (Liste de Souhaits)", y);
      y = bodyText("Les utilisateurs connectés peuvent sauvegarder des produits dans leur liste de souhaits. Icône cœur sur chaque produit, page dédiée /wishlist avec gestion complète.", y);
      y += 4;

      y = subTitle("Ventes Flash & Promotions", y);
      y = bodyText("Système de ventes flash avec compte à rebours en temps réel. Les produits en promotion apparaissent automatiquement sur la page d'accueil. L'IA peut suggérer des promotions basées sur l'analyse des stocks et des ventes.", y);
      y += 4;

      y = subTitle("Produits Récemment Consultés", y);
      y = bodyText("Historique automatique des produits consultés, affiché sur la page d'accueil et les pages produits. Stockage local côté navigateur, sans données personnelles en base.", y);
      y += 4;

      y = subTitle("Programme de Fidélité", y);
      y = bulletList(
        [
          "Accumulation de points à chaque commande validée",
          "Échange de points contre des coupons de réduction",
          "Suivi des points disponibles dans l'espace client",
          "Gestion admin des récompenses et seuils de points",
        ],
        y, pg
      );

      // ==================== PAGE 10: PAIEMENT ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("8. SYSTÈME DE PAIEMENT KKIAPAY", y);

      y = subTitle("Configuration", y);
      y = bodyText("Les clés KkiaPay sont stockées dans les secrets Supabase :", y);
      y += 2;
      y = bulletList(
        [
          "KKIAPAY_PUBLIC_KEY — Clé publique (frontend, widget de paiement)",
          "KKIAPAY_PRIVATE_KEY — Clé privée (backend, vérification)",
          "KKIAPAY_SECRET — Secret pour la validation des webhooks",
        ],
        y, pg
      );
      y += 3;

      y = subTitle("Modes de Paiement Supportés", y);
      y = bulletList(
        [
          "Mobile Money : MTN Mobile Money, Orange Money, Moov Money, Wave",
          "Cartes bancaires : Visa, Mastercard",
        ],
        y, pg
      );
      y += 3;

      y = subTitle("Flux de Paiement", y);
      y = bulletList(
        [
          "Le client valide son panier et passe au checkout",
          "Le widget KkiaPay s'ouvre avec le montant total",
          "Le client choisit son mode de paiement préféré",
          "Paiement effectué (code OTP si Mobile Money)",
          "Webhook reçu par l'Edge Function kkiapay-webhook",
          "Statut de la commande mis à jour automatiquement en base",
          "Email de confirmation + notification push envoyés au client",
        ],
        y, pg
      );
      y += 4;
      y = infoBox("Important : Configurez l'URL du webhook dans votre dashboard KkiaPay pour recevoir les notifications de paiement en temps réel.", y);

      // ==================== PAGE 11: MODULE IA ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("9. MODULE IA", y);

      y = subTitle("Fonctionnalités IA", y);
      y = bulletList(
        [
          "Analyse automatique de la plateforme : stock, ventes, tendances",
          "Suggestions intelligentes de ventes flash basées sur les données",
          "Détection automatique des alertes de stock bas",
          "Génération de publications pour les réseaux sociaux (Facebook, Instagram, Twitter, LinkedIn, WhatsApp)",
          "Assistant conversationnel ScIA pour l'aide aux utilisateurs",
          "Génération automatique de contenu d'articles avec l'IA",
          "Génération d'images réalistes en contexte africain/ivoirien",
          "Traduction automatique des produits en 4 langues",
        ],
        y, pg
      );
      y += 4;

      y = subTitle("Éditeur d'Articles Assisté par IA", y);
      y = bodyText("L'éditeur d'articles intègre une intelligence artificielle contextuelle avancée capable d'analyser un texte libre (même un simple mot) et de générer automatiquement un article complet structuré : titre impactant, résumé accrocheur, contenu aéré avec sous-titres, tableaux, listes à puces. L'IA génère aussi des images réalistes en contexte ivoirien si demandé.", y);
      y += 4;

      y = subTitle("Edge Function : ai-platform-manager", y);
      y = bodyText("Cette fonction Edge centralise toutes les opérations IA de la plateforme :", y);
      y += 3;
      y = bulletList(
        [
          "analyze — Analyse complète : produits, stocks, ventes, recommandations IA",
          "apply_flash_deals — Application automatique des ventes flash suggérées",
          "generate_social_post — Génération de posts optimisés par plateforme sociale",
        ],
        y, pg
      );

      // ==================== PAGE 12: EDGE FUNCTIONS ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("10. EDGE FUNCTIONS & API", y);

      y = subTitle("Edge Functions Déployées", y);
      const edgeFns = [
        ["process-payment", "Initialise un paiement KkiaPay"],
        ["confirm-payment", "Confirme et finalise un paiement"],
        ["check-payment-status", "Vérifie le statut d'un paiement en cours"],
        ["kkiapay-webhook", "Reçoit les webhooks KkiaPay"],
        ["send-order-email", "Envoie les emails transactionnels de commande"],
        ["send-push-notification", "Envoie des notifications push"],
        ["send-article-notification", "Notification de nouvel article publié"],
        ["ai-platform-manager", "Module IA : analyse, flash deals, publications"],
        ["generate-article", "Génération IA de contenu et images d'articles"],
        ["generate-ad-cta", "Génération IA de call-to-action publicitaires"],
        ["translate-product", "Traduction automatique des produits (4 langues)"],
        ["seed-products", "Peuplement initial du catalogue produits"],
        ["create-user", "Création de compte utilisateur (admin)"],
        ["bootstrap-admin", "Création du premier compte administrateur"],
        ["cloud-backup", "Sauvegarde automatique de la base de données"],
        ["restore-database", "Restauration depuis une sauvegarde"],
        ["update-product-images", "Mise à jour des images produits en lot"],
      ];
      edgeFns.forEach(([name, desc]) => {
        y = checkPage(y, 7, pg);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        doc.text(name, M + 4, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...DARK);
        doc.text(" — " + desc, M + 4 + doc.getTextWidth(name) + 1, y);
        y += 6;
      });

      // ==================== PAGE 13: SÉCURITÉ ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("11. SÉCURITÉ & AUTHENTIFICATION", y);

      y = subTitle("Authentification", y);
      y = bulletList(
        [
          "Inscription par email/mot de passe avec confirmation par email",
          "Réinitialisation de mot de passe sécurisée par lien temporaire",
          "Sessions JWT avec refresh automatique",
          "Détection de connexions suspectes avec alerte de sécurité",
          "Rate limiting anti-bruteforce sur les tentatives de connexion",
          "CAPTCHA mathématique sur les formulaires sensibles",
        ],
        y, pg
      );
      y += 4;

      y = subTitle("Row Level Security (RLS)", y);
      y = bodyText("Toutes les tables sont protégées par RLS. Chaque utilisateur ne peut accéder qu'à ses propres données. Les vérifications s'appuient sur les fonctions has_role() et auth.uid().", y);
      y += 4;

      y = subTitle("Bonnes Pratiques Appliquées", y);
      y = bulletList(
        [
          "Clés privées stockées exclusivement en variables d'environnement serveur",
          "HTTPS obligatoire en production",
          "Validation de toutes les entrées utilisateur côté client et serveur",
          "Journalisation des actions sensibles dans audit_logs",
          "Séparation stricte des rôles et permissions",
        ],
        y, pg
      );

      // ==================== PAGE 14: DÉPLOIEMENT ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("12. DÉPLOIEMENT & MAINTENANCE", y);

      y = subTitle("Build de Production", y);
      y = bulletList(
        [
          "Exécutez : npm install (installation des dépendances)",
          "Exécutez : npm run build (compilation optimisée)",
          "Le dossier dist/ contient les fichiers statiques à déployer",
        ],
        y, pg
      );
      y += 3;

      y = subTitle("Options de Déploiement", y);
      y = bulletList(
        [
          "Lovable Cloud — Déploiement automatique en un clic depuis l'éditeur",
          "Vercel — Import du repository Git, déploiement continu automatique",
          "cPanel — Upload manuel du contenu dist/ dans public_html avec .htaccess",
          "Nginx / Apache — Configuration du serveur pour le routing SPA",
        ],
        y, pg
      );
      y += 3;

      y = subTitle("Maintenance", y);
      y = bulletList(
        [
          "Sauvegardes automatiques via Edge Function cloud-backup",
          "Monitoring des logs dans le dashboard Supabase",
          "Analytics disponibles dans le panel admin",
          "Mise à jour : rebuild + redéploiement des fichiers dist/",
        ],
        y, pg
      );
      y += 3;
      y = infoBox("Configuration .htaccess pour cPanel : RewriteEngine On / RewriteBase / / RewriteRule ^index\\.html$ - [L] / RewriteCond %{REQUEST_FILENAME} !-f / RewriteCond %{REQUEST_FILENAME} !-d / RewriteRule . /index.html [L]", y);

      // ==================== PAGE 15: SUPPORT & DÉVELOPPEUR ====================
      pg.v++;
      y = newPage(pg.v);
      y = sectionTitle("13. SUPPORT & CONTACT DÉVELOPPEUR", y);

      // Developer card with navy background
      doc.setFillColor(...NAVY);
      doc.roundedRect(M, y - 2, CW, 50, 3, 3, "F");

      // Photo placeholder circle
      doc.setFillColor(...WHITE);
      doc.circle(M + 25, y + 20, 16, "F");
      doc.setFillColor(200, 200, 200);
      doc.circle(M + 25, y + 20, 15, "F");
      // Text in circle
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...NAVY);
      doc.text("IK", M + 25, y + 22, { align: "center" });

      // Developer info
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...WHITE);
      doc.text("Inocent KOFFI", M + 50, y + 10);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(255, 200, 150);
      doc.text("Développeur Freelance Full Stack", M + 50, y + 18);

      doc.setFontSize(10);
      doc.setTextColor(200, 210, 230);
      doc.text("+225 07 59 56 60 87", M + 50, y + 27);
      doc.text("inocent.koffi@agricapital.ci", M + 50, y + 34);
      doc.text("www.ikoffi.agricapital.ci", M + 50, y + 41);
      y += 58;

      y = subTitle("Support Scoly", y);
      y = bulletList(
        [
          "Email : contact@scoly.ci",
          "Téléphone : +225 07 59 56 60 87",
          "Site web : www.scoly.ci",
        ],
        y, pg
      );
      y += 4;

      y = subTitle("Hébergement", y);
      y = bulletList(
        [
          "Frontend : Lovable Cloud (déploiement automatique)",
          "Backend : Supabase Cloud (PostgreSQL + Edge Functions)",
          "CDN : Cloudflare (optionnel, performance et sécurité)",
        ],
        y, pg
      );

      y += 10;
      // Final thank you box with navy background
      doc.setFillColor(...NAVY);
      doc.roundedRect(M, y, CW, 22, 3, 3, "F");
      // Orange accent
      doc.setFillColor(...ORANGE);
      doc.rect(M, y + 19, CW, 3, "F");
      // Round bottom corners over orange
      doc.setFillColor(...NAVY);
      doc.roundedRect(M, y, CW, 22, 3, 3, "S");

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...WHITE);
      doc.text("Merci d'utiliser Scoly !", W / 2, y + 9, { align: "center" });
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Documentation mise à jour le ${new Date().toLocaleDateString("fr-FR")} — Version 2.0`,
        W / 2,
        y + 16,
        { align: "center" }
      );

      // Save
      doc.save("Documentation_Scoly_v2.0.pdf");
      toast.success("Documentation téléchargée avec succès !");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la génération du PDF");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Documentation</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Documentation officielle Scoly v2.0 — Téléchargement PDF
          </p>
        </div>
        <Button onClick={generatePDF} disabled={generating} className="gap-2" size="lg">
          {generating ? <RefreshCw size={18} className="animate-spin" /> : <Download size={18} />}
          {generating ? "Génération en cours..." : "Télécharger la documentation"}
        </Button>
      </div>
    </div>
  );
};

export default DocumentationManager;
