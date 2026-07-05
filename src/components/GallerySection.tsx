import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GalleryItem } from "../types";

const ALBUM_GALLERY: GalleryItem[] = [
  {
    id: "img-1",
    url: "/src/assets/images/mempelai_field.jpg",
    title: "Vast Love",
    caption: "Melangkah bersama menyusuri padang mimpi, menyatukan rasa dan asa di bawah cakrawala cinta.",
  },
  {
    id: "img-2",
    url: "/src/assets/images/mempelai_gaze.jpg",
    title: "Soul Gaze",
    caption: "Dalam tatap yang teduh, kutemukan pelabuhan terakhir bagi hatiku yang selama ini mencari.",
  },
  {
    id: "img-3",
    url: "/src/assets/images/mempelai_kiss.jpg",
    title: "Sweet Kiss",
    caption: "Sebuah kecupan manis sebagai pengingat abadi akan janji suci kita yang segera terucap.",
  }
];

export default function GallerySection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIdx(index);
  };

  const closeLightbox = () => {
    setActivePhotoIdx(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx + 1) % ALBUM_GALLERY.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((activePhotoIdx - 1 + ALBUM_GALLERY.length) % ALBUM_GALLERY.length);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-white relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="font-script text-4xl text-brand-gold mb-1">Galeri Foto Bahagia</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal tracking-wide uppercase font-light">
            Our Pre-Wedding Album
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto mt-4" />
        </div>

        {/* Polaroid/Fine-Art Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {ALBUM_GALLERY.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer bg-brand-cream/40 p-4 border border-brand-gold/15 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-brand-cream flex items-center justify-center mb-4">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/90 text-brand-charcoal p-3 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-brand-gold-dark" />
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="px-1 text-center">
                <span className="font-script text-2xl text-brand-gold-dark block mb-1">
                  {photo.title}
                </span>
                <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed italic line-clamp-2">
                  "{photo.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activePhotoIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-charcoal/95 p-4 sm:p-6 select-none backdrop-blur-sm"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer z-50"
                title="Tutup Galeri"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Carousel Element */}
              <div className="relative max-w-4xl w-full flex items-center justify-center h-[70vh]">
                {/* Prev Trigger */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 sm:-left-12 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer z-25"
                  title="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <motion.div
                  key={activePhotoIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-[65vh] max-w-full flex justify-center items-center rounded-xl overflow-hidden shadow-2xl border border-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={ALBUM_GALLERY[activePhotoIdx].url}
                    alt={ALBUM_GALLERY[activePhotoIdx].title}
                    className="max-h-[65vh] max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Next Trigger */}
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 sm:-right-12 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer z-25"
                  title="Foto Selanjutnya"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption Overlay */}
              <motion.div
                key={`caption-${activePhotoIdx}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-center text-white mt-6 max-w-xl px-4 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="font-script text-3xl text-brand-gold-light block mb-2">
                  {ALBUM_GALLERY[activePhotoIdx].title}
                </span>
                <p className="font-serif italic text-sm sm:text-base text-white/80 leading-relaxed">
                  "{ALBUM_GALLERY[activePhotoIdx].caption}"
                </p>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold-light/40 mt-3 font-semibold">
                  Foto {activePhotoIdx + 1} dari {ALBUM_GALLERY.length}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
