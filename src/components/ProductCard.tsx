import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SmartImage from "@/components/SmartImage";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/hooks/useWishlist";
import { useLanguage } from "@/i18n/LanguageContext";

export interface ProductCardData {
  id: string;
  name_fr: string;
  name_en?: string | null;
  name_de?: string | null;
  name_es?: string | null;
  price: number;
  original_price?: number | null;
  discount_percent?: number;
  stock: number;
  image_url: string | null;
  is_featured?: boolean;
  free_shipping?: boolean;
}

interface ProductCardProps {
  product: ProductCardData;
  compact?: boolean;
}

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const name =
    (language === "en" && product.name_en) ||
    (language === "de" && product.name_de) ||
    (language === "es" && product.name_es) ||
    product.name_fr;

  const formatPrice = (p: number) =>
    `${new Intl.NumberFormat("fr-FR").format(p)} ${t.common.currency}`;

  const inWishlist = isInWishlist(product.id);
  const outOfStock = product.stock === 0;

  return (
    <article className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link
        to={`/shop/product/${product.id}`}
        className="relative aspect-square block overflow-hidden bg-muted/30"
        aria-label={name}
      >
        <SmartImage
          src={product.image_url}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          fallbackSrc="/placeholder.svg"
          priority={false}
        />

        {/* Top-left badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {product.discount_percent && product.discount_percent > 0 && (
            <Badge className="bg-destructive text-destructive-foreground font-bold text-[10px] sm:text-xs px-2 py-0.5 shadow-sm">
              -{product.discount_percent}%
            </Badge>
          )}
          {product.is_featured && (
            <Badge className="bg-accent text-accent-foreground text-[10px] sm:text-xs px-2 py-0.5 shadow-sm">
              ★ Top
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={inWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-card/95 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={16}
            className={inWishlist ? "fill-destructive text-destructive" : "text-foreground/70"}
          />
        </button>

        {/* Free shipping */}
        {product.free_shipping !== false && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-secondary/95 text-secondary-foreground text-[10px] px-1.5 py-0.5 backdrop-blur-sm">
              <Truck size={10} className="mr-1" />
              Gratuit
            </Badge>
          </div>
        )}

        {outOfStock && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-foreground/90 text-background text-xs font-semibold">
              Épuisé
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${compact ? "p-2.5" : "p-3 sm:p-4"}`}>
        <Link to={`/shop/product/${product.id}`} className="flex-1">
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 text-xs sm:text-sm leading-snug min-h-[2.5em]">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mt-1.5" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < 4 ? "fill-accent text-accent" : "fill-muted text-muted-foreground/40"}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">(4.0)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base sm:text-lg font-bold text-primary tabular-nums">
            {formatPrice(product.price)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        {/* CTA */}
        <Button
          variant="default"
          size="sm"
          className="w-full mt-3 text-xs sm:text-sm h-9"
          onClick={() => addToCart(product.id)}
          disabled={outOfStock}
        >
          <ShoppingCart size={14} />
          <span>{outOfStock ? "Indisponible" : "Ajouter"}</span>
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
