import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MailOpen } from "lucide-react";

interface InvitationGateProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function InvitationGate({ onOpen, isOpen }: InvitationGateProps) {
  const [guestName, setGuestName] = useState("Tamu Undangan");

  useEffect(() => {
    // Read the query parameters for standard custom Indonesian invites (e.g. ?to=Nama+Tamu)
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get("to");
    if (toParam) {
      setGuestName(toParam);
    }
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          id="invitation-gate"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-cream overflow-hidden"
        >
          {/* Background Image with elegant overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/mempelai_field.jpg"
              alt="Armed & Tasya Meadow"
              className="w-full h-full object-cover opacity-25 filter sepia-[20%] scale-105 animate-kenburns"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/80 via-brand-cream/90 to-brand-cream" />
          </div>

          {/* Decorative Corner Borders */}
          <div className="absolute top-8 left-8 right-8 bottom-8 border border-brand-gold/20 pointer-events-none z-10 hidden sm:block">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-gold" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-gold" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold" />
          </div>

          {/* Core Content Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="relative z-10 max-w-md px-6 text-center flex flex-col items-center"
          >
            {/* Elegant Calligraphy script */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-script text-4xl text-brand-gold mb-3"
            >
              The Wedding of
            </motion.p>

            {/* Serif main heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-serif text-5xl sm:text-6xl text-brand-charcoal tracking-wide uppercase leading-tight font-light mb-2"
            >
              Armed & Tasya
            </motion.h1>

            <div className="w-16 h-[1px] bg-brand-gold my-4 flex items-center justify-center">
              <Heart className="w-3 h-3 text-brand-gold fill-brand-gold absolute" />
            </div>

            {/* Date placeholder or real date */}
            <p className="font-serif text-sm tracking-[0.2em] uppercase text-brand-charcoal/70 mb-10">
              Sabtu, 10 Oktober 2026
            </p>

            {/* Guest Invitation Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm border border-brand-gold/30 rounded-2xl p-6 shadow-md w-full max-w-sm mb-8"
            >
              <p className="font-sans text-xs uppercase tracking-widest text-brand-charcoal/60 mb-2">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <h3 className="font-serif text-2xl text-brand-charcoal font-medium tracking-wide mb-1 text-ellipsis overflow-hidden">
                {guestName}
              </h3>
              <p className="font-sans text-[11px] text-brand-charcoal/50 italic mt-3 border-t border-brand-gold/10 pt-2">
                *Tanpa mengurangi rasa hormat, mohon maaf bila ada kesalahan penulisan nama/gelar.
              </p>
            </motion.div>

            {/* Action Button */}
            <motion.button
              id="btn-open-invitation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpen}
              className="flex items-center gap-2.5 bg-brand-charcoal hover:bg-brand-gold text-brand-cream font-serif tracking-widest uppercase text-xs font-semibold px-8 py-4 rounded-full shadow-lg border border-brand-charcoal hover:border-brand-gold transition-all duration-300 group cursor-pointer animate-pulse-subtle"
            >
              <MailOpen className="w-4 h-4 text-brand-cream group-hover:rotate-12 transition-transform duration-300" />
              Buka Album & Musik
            </motion.button>
          </motion.div>

          {/* Subtle elegant footer */}
          <div className="absolute bottom-6 z-10 text-center">
            <p className="font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/40">
              Armed & Tasya Pre-Wedding Book
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
