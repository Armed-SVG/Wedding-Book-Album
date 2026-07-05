import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Heart, Calendar, MapPin, ChevronDown, Award } from "lucide-react";

// Component imports
import InvitationGate from "./components/InvitationGate";
import MusicPlayer from "./components/MusicPlayer";
import AboutSection from "./components/AboutSection";
import StorySection from "./components/StorySection";
import GallerySection from "./components/GallerySection";
import EventSection from "./components/EventSection";
import RsvpSection from "./components/RsvpSection";
import Footer from "./components/Footer";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [playMusicTrigger, setPlayMusicTrigger] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll Progress indicator from motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setPlayMusicTrigger(true);
    // Add overflow to body once opened
    document.body.style.overflow = "auto";
  };

  // Lock scroll in gate view initially
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  // Monitor active scroll section for side dots
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      const sections = ["hero", "about", "story", "gallery", "event", "rsvp"];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal selection:bg-brand-gold-light/40 font-sans relative antialiased">
      {/* 1. Introductory Envelope Gate */}
      <InvitationGate isOpen={isOpen} onOpen={handleOpenInvitation} />

      {/* Main invitation content (revealed and unlocked when isOpen is true) */}
      {isOpen && (
        <div className="relative">
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-brand-gold origin-left z-50 shadow-sm"
            style={{ scaleX }}
          />

          {/* 2. Floating Romantic Music Player */}
          <MusicPlayer playTrigger={playMusicTrigger} />

          {/* 3. Floating Side Navigation Dots (Anchors) */}
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 bg-brand-charcoal/10 backdrop-blur-sm px-3 py-6 rounded-full border border-brand-gold/15">
            {[
              { id: "hero", label: "Utama" },
              { id: "about", label: "Mempelai" },
              { id: "story", label: "Kisah" },
              { id: "gallery", label: "Galeri" },
              { id: "event", label: "Acara" },
              { id: "rsvp", label: "RSVP" }
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group relative flex items-center justify-center"
                title={section.label}
              >
                {/* Floating tooltips */}
                <span className="absolute right-8 bg-brand-charcoal text-brand-cream text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg pointer-events-none border border-brand-gold/20 font-serif">
                  {section.label}
                </span>
                
                {/* Visual Dot */}
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-brand-gold scale-125 shadow-md shadow-brand-gold/50"
                      : "bg-brand-charcoal/30 group-hover:bg-brand-gold"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* 4. Hero Section (Wedding Book Cover Banner) */}
          <header id="hero" className="relative h-screen flex flex-col justify-between items-center text-center overflow-hidden py-12 px-4">
            {/* Background Image Parallax with sepia filter */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/mempelai_field.jpg"
                alt="Armed & Tasya Pre-Wedding Cover"
                className="w-full h-full object-cover scale-105 animate-[kenburns_45s_ease-in-out_infinite]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-cream/60 to-brand-charcoal/40" />
            </div>

            {/* Top Bar Calligraphy */}
            <div className="relative z-10 pt-4">
              <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-white bg-brand-charcoal/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 font-medium">
                The Wedding Album
              </span>
            </div>

            {/* Center Header Details */}
            <div className="relative z-10 max-w-2xl px-6">
              <p className="font-script text-5xl sm:text-6xl text-brand-gold mb-3 drop-shadow-sm select-none">
                The Wedding of
              </p>
              
              <h1 className="font-serif text-5xl sm:text-7xl text-brand-charcoal tracking-wide uppercase font-light leading-tight">
                Armed & Tasya
              </h1>

              <div className="flex items-center justify-center gap-3 my-6">
                <span className="h-[1px] w-12 bg-brand-gold/60" />
                <Heart className="w-4 h-4 text-brand-gold fill-brand-gold/20 animate-pulse" />
                <span className="h-[1px] w-12 bg-brand-gold/60" />
              </div>

              <p className="font-serif text-sm sm:text-base tracking-[0.25em] uppercase text-brand-charcoal/80 bg-white/35 backdrop-blur-sm px-6 py-2.5 rounded-full inline-block border border-brand-gold/15">
                Sabtu, 10 Oktober 2026
              </p>
            </div>

            {/* Bottom Indicator / Scroll down hint */}
            <div className="relative z-10 flex flex-col items-center">
              <p className="font-serif text-[10px] uppercase tracking-widest text-brand-charcoal/60 mb-2 font-semibold">
                Gulir Kebawah
              </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-brand-gold"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </header>

          {/* 5. About the Couple Section */}
          <AboutSection />

          {/* 6. Romantic Story Timeline */}
          <StorySection />

          {/* 7. Image Album Gallery */}
          <GallerySection />

          {/* 8. Event Card and Countdown */}
          <EventSection />

          {/* 9. RSVP & Live Wishes */}
          <RsvpSection />

          {/* 10. Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
