import React, { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag, Newspaper, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({ products: 0, articles: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: productsCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      const { count: articlesCount } = await supabase
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      setStats({
        products: productsCount || 0,
        articles: articlesCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const formatNumber = (num: number) => {
    if (num === 0) return "0";
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(".0", "")}K+`;
    }
    return num.toString() + (num > 0 ? "+" : "");
  };

  const scolyCategories = [
    { name: "Scoly Primaire", slug: "scoly-primaire" },
    { name: "Scoly Secondaire", slug: "scoly-secondaire" },
    { name: "Scoly Universitaire", slug: "scoly-universite" },
    { name: "Scoly Bureautique", slug: "scoly-bureautique" },
    { name: "Scoly Librairie", slug: "scoly-librairie" },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-accent/25 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float animation-delay-300" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-primary-foreground/95 text-xs sm:text-sm font-medium tracking-wide">
                Fournitures scolaires & bureautiques • Côte d'Ivoire
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary-foreground mb-5 leading-[1.05]">
              {t.hero.title1}
              <span className="block mt-2 text-accent">{t.hero.title2}</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-8 leading-relaxed">
              Tout ce qu'il faut pour réussir l'année scolaire, livré gratuitement
              partout en Côte d'Ivoire.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/shop">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  <ShoppingBag size={20} />
                  Découvrir la boutique
                </Button>
              </Link>
              <Link to="/kits">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  Kits intelligents
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Categories pills */}
          <div className="animate-slide-up animation-delay-200 mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {scolyCategories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/shop?category=${category.slug}`}
                  className="px-4 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground backdrop-blur-md border border-primary-foreground/20 text-primary-foreground text-xs sm:text-sm font-medium transition-all"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto animate-slide-up animation-delay-300">
            <TrustItem icon={<Truck size={18} />} label="Livraison" value="Gratuite" />
            <TrustItem
              icon={<ShoppingBag size={18} />}
              label="Catalogue"
              value={`${formatNumber(stats.products)} produits`}
            />
            <TrustItem
              icon={<Newspaper size={18} />}
              label="Actualités"
              value={`${formatNumber(stats.articles)} articles`}
            />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

interface TrustItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const TrustItem = ({ icon, label, value }: TrustItemProps) => (
  <div className="flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15">
    <div className="p-2 rounded-lg bg-accent/20 text-accent shrink-0">{icon}</div>
    <div className="min-w-0">
      <p className="text-[10px] sm:text-xs text-primary-foreground/70 uppercase tracking-wider">{label}</p>
      <p className="text-sm sm:text-base font-bold text-primary-foreground truncate">{value}</p>
    </div>
  </div>
);

export default HeroSection;
