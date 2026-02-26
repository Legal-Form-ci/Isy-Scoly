import { useState } from "react";
import { Link } from "react-router-dom";
import { School, Search, BookOpen, Users, ShoppingCart, ChevronRight, Star, MapPin, GraduationCap, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const Schools = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const { data: schools = [], isLoading } = useQuery({
    queryKey: ["schools", search, selectedCity],
    queryFn: async () => {
      let query = supabase
        .from("schools")
        .select("*")
        .eq("is_verified", true)
        .order("name");
      
      if (search) {
        query = query.ilike("name", `%${search}%`);
      }
      if (selectedCity) {
        query = query.eq("city", selectedCity);
      }
      
      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data || [];
    },
  });

  const { data: supplyLists = [] } = useQuery({
    queryKey: ["public-supply-lists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("school_supply_lists")
        .select("*, schools(name, city), school_supply_items(count)")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(12);
      if (error) throw error;
      return data || [];
    },
  });

  const cities = ["Abidjan", "Bouaké", "Yamoussoukro", "Daloa", "San-Pédro", "Korhogo", "Man"];

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Espace Écoles — Fournitures scolaires par établissement | Scoly"
        description="Trouvez les listes de fournitures de votre école. Commandez tout en un clic avec livraison gratuite."
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16" style={{ background: "var(--gradient-hero)" }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30">
              <School className="w-4 h-4 mr-1" />
              Espace Écoles & Établissements
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
              Trouvez la liste de fournitures
              <span className="block text-secondary"> de votre école</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Plus de recherche fastidieuse. Sélectionnez l'école, la classe, et commandez tout en un clic.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Rechercher un établissement..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-12 bg-card text-foreground"
                />
              </div>
            </div>

            {/* City filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Button
                variant={selectedCity === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCity("")}
                className={selectedCity === "" ? "" : "bg-card/20 text-primary-foreground border-primary-foreground/20 hover:bg-card/30"}
              >
                Toutes les villes
              </Button>
              {cities.map((city) => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCity(city)}
                  className={selectedCity === city ? "" : "bg-card/20 text-primary-foreground border-primary-foreground/20 hover:bg-card/30"}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {city}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-10">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: School, title: "1. Trouvez votre école", desc: "Recherchez votre établissement parmi nos partenaires" },
              { icon: ClipboardList, title: "2. Choisissez la classe", desc: "Sélectionnez le niveau et la série de votre enfant" },
              { icon: ShoppingCart, title: "3. Commandez en 1 clic", desc: "Toute la liste ajoutée au panier, prête à être livrée" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schools list */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8">
            <GraduationCap className="inline w-6 h-6 mr-2 text-primary" />
            Établissements partenaires
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-6 animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : schools.length === 0 ? (
            <div className="text-center py-20">
              <School className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Aucun établissement trouvé</h3>
              <p className="text-muted-foreground mb-6">
                {search ? "Essayez une autre recherche" : "Les établissements seront bientôt disponibles"}
              </p>
              {user && (
                <p className="text-sm text-muted-foreground">
                  Vous êtes directeur d'école ?{" "}
                  <Link to="/contact" className="text-primary underline">Inscrivez votre établissement</Link>
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school: any) => (
                <motion.div
                  key={school.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {school.name}
                    </h3>
                    {school.is_verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1" /> Vérifié
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4" /> {school.city}
                    {school.address && ` — ${school.address}`}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    {school.type === "primary" ? "Primaire" :
                     school.type === "secondary" ? "Secondaire" :
                     school.type === "both" ? "Primaire & Secondaire" : school.type}
                  </p>
                  <Link to={`/ecoles/${school.id}`}>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Voir les listes <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Published supply lists */}
      {supplyLists.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              <ClipboardList className="inline w-6 h-6 mr-2 text-primary" />
              Listes de fournitures récentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplyLists.map((list: any) => (
                <div key={list.id} className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-foreground mb-1">{list.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {(list as any).schools?.name} — {(list as any).schools?.city}
                  </p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline">{list.grade_level}</Badge>
                    {list.series && <Badge variant="outline">{list.series}</Badge>}
                    <Badge variant="outline">{list.school_year}</Badge>
                  </div>
                  <Link to={`/kits?list=${list.id}`}>
                    <Button variant="hero" size="sm" className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-1" /> Commander cette liste
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA for schools */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-secondary mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
              Vous êtes directeur d'établissement ?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
              Inscrivez votre école sur Scoly et publiez vos listes de fournitures.
              Vos parents d'élèves commanderont en un clic.
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Inscrire mon établissement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Schools;
