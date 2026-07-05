import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal py-16 px-4 text-center text-brand-cream border-t border-brand-gold/20 relative overflow-hidden">
      {/* Decorative floral elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

      <div className="max-w-md mx-auto relative z-10 flex flex-col items-center">
        {/* Heart logo */}
        <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center mb-6">
          <Heart className="w-4 h-4 text-brand-gold fill-brand-gold/20" />
        </div>

        <p className="font-script text-3xl text-brand-gold mb-2">Terima Kasih</p>
        <h2 className="font-serif text-2xl tracking-[0.15em] uppercase font-light mb-4">
          Armed & Tasya
        </h2>

        <p className="font-serif italic text-xs text-brand-cream/60 max-w-xs leading-relaxed mb-8">
          "Dua jiwa namun satu pikiran, dua hati namun satu ketukan."
        </p>

        <div className="w-8 h-[1px] bg-brand-gold/20 mb-8" />

        <p className="font-sans text-[9px] uppercase tracking-widest text-brand-cream/30">
          Created with love • Armed & Tasya © 2026
        </p>
      </div>
    </footer>
  );
}
