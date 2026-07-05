import React from "react";
import { motion } from "motion/react";
import { Heart, Compass, Camera, CalendarClock } from "lucide-react";
import { StoryItem } from "../types";

const LOVE_STORY: StoryItem[] = [
  {
    id: "story-1",
    year: "2021",
    title: "Pertemuan Pertama",
    description: "Takdir mempertemukan kami di sebuah sore di perpustakaan kampus. Berawal dari meminjam buku referensi yang sama, obrolan kecil itu berubah menjadi awal dari perjalanan panjang yang tidak pernah kami duga sebelumnya.",
    iconType: "compass",
  },
  {
    id: "story-2",
    year: "2023",
    title: "Menjalin Komitmen",
    description: "Setelah dua tahun saling mengenal, memahami karakter, dan melewati berbagai cerita, kami memutuskan untuk mengikat janji komitmen bersama. Tumbuh beriringan, mendukung mimpi satu sama lain dengan penuh keikhlasan.",
    iconType: "camera",
  },
  {
    id: "story-3",
    year: "2025",
    title: "Momen Lamaran",
    description: "Di depan keluarga besar yang melimpahkan restu, Armed secara resmi meminang Tasya. Pertemuan dua keluarga yang hangat mengunci langkah kami untuk melangkah mantap menuju ikatan pernikahan yang suci.",
    iconType: "ring",
  },
  {
    id: "story-4",
    year: "2026",
    title: "Janji Suci Pernikahan",
    description: "Tahun ini, lembaran baru kami dimulai. Di hadapan saksi-saksi dan Sang Pencipta, kami akan menyatukan jiwa dalam akad nikah, mengarungi bahtera rumah tangga berdua selamanya.",
    iconType: "heart",
  },
];

export default function StorySection() {
  const getIcon = (type: string) => {
    switch (type) {
      case "compass":
        return <Compass className="w-5 h-5 text-brand-gold" />;
      case "camera":
        return <Camera className="w-5 h-5 text-brand-gold" />;
      case "ring":
        return (
          <span className="text-base text-brand-gold font-bold relative -top-[1px]">
            💍
          </span>
        );
      default:
        return <Heart className="w-5 h-5 text-brand-gold fill-brand-gold" />;
    }
  };

  return (
    <section id="story" className="py-20 px-4 bg-brand-cream relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="font-script text-4xl text-brand-gold mb-1">Kisah Cinta Kami</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal tracking-wide uppercase font-light">
            Our Love Story
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto mt-4" />
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-brand-gold/30 md:border-l-0 md:flex md:flex-col items-center">
          {/* Middle dividing line for desktop */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-brand-gold/30 -translate-x-1/2 hidden md:block" />

          {LOVE_STORY.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className="relative mb-12 md:mb-16 w-full flex flex-col md:flex-row items-stretch"
              >
                {/* Timeline Node Badge */}
                <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-brand-gold shadow-md">
                  {getIcon(item.iconType)}
                </div>

                {/* Left side card placeholder for desktop */}
                <div className={`w-full md:w-1/2 pl-12 pr-4 md:px-8 text-right hidden md:flex flex-col justify-center items-end ${isEven ? "md:order-1" : "md:order-3"}`}>
                  {isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-right"
                    >
                      <span className="font-serif text-3xl font-light text-brand-gold/60 block mb-1">
                        {item.year}
                      </span>
                      <h3 className="font-serif text-xl text-brand-charcoal font-medium tracking-wide">
                        {item.title}
                      </h3>
                    </motion.div>
                  )}
                </div>

                {/* Desktop Spacer */}
                <div className="w-10 h-10 hidden md:block md:order-2 shrink-0 pointer-events-none" />

                {/* Right/Active card side */}
                <div className={`w-full md:w-1/2 pl-12 pr-4 md:px-8 ${isEven ? "md:order-3" : "md:order-1"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white border border-brand-gold/20 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative"
                  >
                    {/* Mobile Year Badge */}
                    <span className="font-serif text-2xl font-light text-brand-gold block md:hidden mb-1">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-brand-charcoal font-medium tracking-wide mb-3 md:hidden">
                      {item.title}
                    </h3>

                    <h3 className="font-serif text-xl text-brand-charcoal font-medium tracking-wide mb-3 hidden md:block">
                      {!isEven && item.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Decorative subtle element inside card */}
                    <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
                      <CalendarClock className="w-12 h-12 text-brand-gold" />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
