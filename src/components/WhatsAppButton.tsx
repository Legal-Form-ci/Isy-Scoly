import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const WHATSAPP_NUMBER = "2250758465933";

const WhatsAppButton = () => {
  const { language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const messages: Record<string, { tooltip: string; text: string }> = {
    fr: {
      tooltip: "Besoin d'aide ? Écrivez-nous !",
      text: "Bonjour Scoly ! J'aimerais avoir des informations sur vos fournitures scolaires et bureautiques. Merci !",
    },
    en: {
      tooltip: "Need help? Chat with us!",
      text: "Hello Scoly! I'd like to get information about your school and office supplies. Thank you!",
    },
    de: {
      tooltip: "Brauchen Sie Hilfe? Schreiben Sie uns!",
      text: "Hallo Scoly! Ich möchte Informationen über Ihre Schul- und Büroartikel erhalten. Danke!",
    },
    es: {
      tooltip: "¿Necesitas ayuda? ¡Escríbenos!",
      text: "¡Hola Scoly! Me gustaría obtener información sobre sus artículos escolares y de oficina. ¡Gracias!",
    },
  };

  const current = messages[language] || messages.fr;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(current.text)}`;

  // Show tooltip after 5 seconds
  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setShowTooltip(true), 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Auto-hide tooltip after 8 seconds
  useEffect(() => {
    if (!showTooltip) return;
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, [showTooltip]);

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-end gap-2">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            className="relative bg-card border border-border rounded-xl px-4 py-3 shadow-lg max-w-[200px] mb-1"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDismissed(true);
                setShowTooltip(false);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X size={12} />
            </button>
            <p className="text-xs font-medium text-foreground leading-snug">
              {current.tooltip}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter via WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center shadow-lg transition-colors"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.962A15.91 15.91 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.338 22.614c-.394 1.108-1.946 2.028-3.2 2.296-.86.182-1.982.326-5.76-1.238-4.836-2.002-7.944-6.912-8.186-7.232-.232-.32-1.952-2.6-1.952-4.96s1.234-3.52 1.672-4.002c.438-.482.958-.602 1.276-.602.316 0 .636.002.912.016.294.016.686-.112 1.074.818.394.95 1.346 3.278 1.466 3.516.118.238.198.516.038.836-.158.32-.238.518-.478.798-.238.278-.502.622-.716.834-.238.238-.486.498-.208.976.278.478 1.234 2.036 2.65 3.298 1.82 1.622 3.354 2.126 3.832 2.364.478.238.756.198 1.034-.118.278-.32 1.194-1.392 1.512-1.872.316-.478.636-.398 1.074-.238.438.158 2.766 1.304 3.244 1.542.478.238.796.358.914.556.118.198.118 1.148-.276 2.256z" />
        </svg>
        {/* Pulse indicator */}
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-[#25D366] rounded-full animate-ping opacity-75" />
        <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-[#25D366] rounded-full" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
