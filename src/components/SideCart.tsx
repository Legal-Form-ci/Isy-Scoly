import { ShoppingCart, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import SmartImage from "@/components/SmartImage";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const SideCart = () => {
  const { items, itemCount, total, updateQuantity, removeFromCart } = useCart();
  const { language, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const getProductName = (product: any) => {
    if (!product) return "Produit";
    switch (language) {
      case 'en': return product.name_en;
      case 'de': return product.name_de;
      case 'es': return product.name_es;
      default: return product.name_fr;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + t.common.currency;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
          <ShoppingCart size={22} className="text-foreground" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-secondary text-secondary-foreground">
              {itemCount}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            Panier ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Votre panier est vide</p>
            <SheetClose asChild>
              <Link to="/shop">
                <Button variant="outline">Parcourir la boutique</Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-muted/30 rounded-lg p-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <SmartImage
                      src={item.product?.image_url}
                      alt={getProductName(item.product)}
                      className="w-full h-full object-cover"
                      fallbackSrc="/placeholder.svg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2">
                      {getProductName(item.product)}
                    </h4>
                    <p className="text-sm font-bold text-primary mt-1">
                      {formatPrice(item.product?.price || 0)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-auto text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
              <div className="flex gap-2">
                <SheetClose asChild>
                  <Link to="/cart" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Voir le panier
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/checkout" className="flex-1">
                    <Button className="w-full gap-2">
                      Commander
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </SheetClose>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                🚚 Livraison gratuite sur toutes les commandes
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SideCart;