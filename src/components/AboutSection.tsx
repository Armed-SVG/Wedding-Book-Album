import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Delicate floral patterns (CSS background) */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern-roses" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 C40 10, 50 10, 60 20 C50 30, 40 30, 30 40 C20 30, 10 30, 0 20 C10 10, 20 10, 30 0" fill="none" stroke="#c5a880" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern-roses)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Holy Scripture / Romantic Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl mx-auto px-4"
        >
          <p className="font-serif italic text-base sm:text-lg text-brand-charcoal/80 leading-relaxed mb-4">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <span className="font-serif text-xs uppercase tracking-widest text-brand-gold font-semibold">
            — Ar-Rum: 21
          </span>
        </motion.div>

        {/* Section Heading */}
        <div className="mb-14">
          <p className="font-script text-4xl text-brand-gold mb-1">Mempelai Wanita & Pria</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal tracking-wide uppercase font-light">
            Armed & Tasya
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto mt-4" />
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center mt-6">
          {/* Groom Profile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center p-6 bg-brand-cream/50 border border-brand-gold/10 rounded-3xl"
          >
            {/* Elegant Circular Image Frame */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-brand-gold/20 p-1 mb-6 shadow-md">
              <img
                src="/src/assets/images/armed_profile.jpg"
                alt="Armed Profile"
                className="w-full h-full object-cover rounded-full filter brightness-95 saturate-[85%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-gold/10 mix-blend-color-burn" />
            </div>

            <h3 className="font-serif text-2xl text-brand-charcoal font-semibold mb-6 tracking-wide">
              Armed
            </h3>
            
            <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed max-w-xs">
              Putra tercinta dari:
            </p>
            <p className="font-serif text-sm font-semibold text-brand-charcoal mt-1">
              Bapak Ahmad Malik
            </p>
            <p className="font-serif text-sm font-semibold text-brand-charcoal">
              & Ibu Siti Aminah
            </p>
          </motion.div>

          {/* Bride Profile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center p-6 bg-brand-cream/50 border border-brand-gold/10 rounded-3xl"
          >
            {/* Elegant Circular Image Frame */}
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-brand-gold/20 p-1 mb-6 shadow-md">
              <img
                src="/src/assets/images/tasya_profile.jpg"
                alt="Tasya Profile"
                className="w-full h-full object-cover rounded-full filter brightness-95 saturate-[85%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-gold/10 mix-blend-color-burn" />
            </div>

            <h3 className="font-serif text-2xl text-brand-charcoal font-semibold mb-6 tracking-wide">
              Tasya
            </h3>
            
            <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed max-w-xs">
              Putri tercinta dari:
            </p>
            <p className="font-serif text-sm font-semibold text-brand-charcoal mt-1">
              Bapak Irfan Hermawan
            </p>
            <p className="font-serif text-sm font-semibold text-brand-charcoal">
              & Ibu Rosita Hermawan
            </p>
          </motion.div>
        </div>

        {/* Centered Decorative heart spacer */}
        <div className="flex items-center justify-center gap-3 mt-16 text-brand-gold/40">
          <div className="h-[1px] w-20 bg-brand-gold/20" />
          <Heart className="w-5 h-5 fill-brand-gold/10" />
          <div className="h-[1px] w-20 bg-brand-gold/20" />
        </div>
      </div>
    </section>
  );
}
