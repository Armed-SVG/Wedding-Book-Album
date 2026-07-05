import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, MapPin, Calendar, ExternalLink } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventSection() {
  const WEDDING_DATE_STR = "2026-10-10T08:00:00+07:00"; // Saturday, Oct 10, 2026 at 08:00 WIB
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCelebrated, setIsCelebrated] = useState(false);

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATE_STR).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setIsCelebrated(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Google Calendar URL Generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Pernikahan Armed & Tasya");
    const dates = "20261010T010000Z/20261010T080000Z"; // UTC format
    const details = encodeURIComponent("Menghadiri hari bahagia pernikahan Armed & Tasya.");
    const location = encodeURIComponent("Gedung Kota Administrasi, Jakarta Barat No.21");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <section id="event" className="py-20 px-4 bg-brand-cream relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="font-script text-4xl text-brand-gold mb-1">Momen Bahagia</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal tracking-wide uppercase font-light">
            Wedding Event & Countdown
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto mt-4" />
        </div>

        {/* Real-time Countdown Board */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white border border-brand-gold/25 rounded-3xl p-6 sm:p-10 shadow-md text-center max-w-3xl mx-auto mb-16 relative overflow-hidden"
        >
          {/* Subtle floral accents inside */}
          <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-brand-gold/20 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l border-b border-brand-gold/20 rounded-bl-3xl pointer-events-none" />

          <p className="font-serif text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-6">
            {isCelebrated ? "HARI BAHAGIA TELAH TIBA!" : "MENGHITUNG HARI BAHAGIA"}
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-lg mx-auto">
            {/* Days block */}
            <div className="flex flex-col items-center bg-brand-cream/40 rounded-2xl py-4 border border-brand-gold/10">
              <span className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal leading-none">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/50 mt-2">
                Hari
              </span>
            </div>

            {/* Hours block */}
            <div className="flex flex-col items-center bg-brand-cream/40 rounded-2xl py-4 border border-brand-gold/10">
              <span className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal leading-none">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/50 mt-2">
                Jam
              </span>
            </div>

            {/* Minutes block */}
            <div className="flex flex-col items-center bg-brand-cream/40 rounded-2xl py-4 border border-brand-gold/10">
              <span className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal leading-none">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/50 mt-2">
                Menit
              </span>
            </div>

            {/* Seconds block */}
            <div className="flex flex-col items-center bg-brand-cream/40 rounded-2xl py-4 border border-brand-gold/10">
              <span className="font-serif text-2xl sm:text-4xl font-light text-brand-charcoal leading-none">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-brand-charcoal/50 mt-2">
                Detik
              </span>
            </div>
          </div>

          <p className="font-serif italic text-xs sm:text-sm text-brand-charcoal/60 mt-8 max-w-sm mx-auto">
            "Semoga Allah menyatukan kami dalam ketaatan dan kebahagiaan yang senantiasa melimpah."
          </p>

          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold-dark text-white font-serif uppercase tracking-widest text-[10px] font-semibold px-6 py-3 rounded-full mt-6 shadow-sm transition-colors duration-300 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            Simpan Tanggal ke Kalender
          </a>
        </motion.div>

        {/* Event Cards (Akad & Resepsi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Akad Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white border border-brand-gold/15 p-8 rounded-3xl shadow-sm text-center flex flex-col justify-between"
          >
            <div>
              <span className="text-3xl mb-4 block">💍</span>
              <h3 className="font-serif text-2xl text-brand-charcoal font-semibold tracking-wide mb-2">
                Akad Nikah
              </h3>
              <div className="h-[1px] w-12 bg-brand-gold/40 mx-auto mb-6" />

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-brand-charcoal/70 text-sm">
                  <Calendar className="w-4 h-4 text-brand-gold" />
                  <span className="font-serif">Sabtu, 10 Oktober 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-brand-charcoal/70 text-sm">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  <span className="font-sans">Pukul 08:00 - 10:00 WIB</span>
                </div>
                <div className="flex items-start justify-center gap-2 text-brand-charcoal/70 text-sm max-w-xs mx-auto">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span className="font-serif text-left">
                    <strong>Aula Utama Gedung Kota Administrasi</strong>
                    <br />
                    Jakarta Barat No.21
                  </span>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Gedung+Kota+Administrasi+Jakarta+Barat+No.21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-serif uppercase tracking-widest text-[10px] font-semibold py-3.5 px-6 rounded-full transition-all duration-300 w-full cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka Peta Lokasi Akad
            </a>
          </motion.div>

          {/* Resepsi Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white border border-brand-gold/15 p-8 rounded-3xl shadow-sm text-center flex flex-col justify-between"
          >
            <div>
              <span className="text-3xl mb-4 block">🥂</span>
              <h3 className="font-serif text-2xl text-brand-charcoal font-semibold tracking-wide mb-2">
                Resepsi Pernikahan
              </h3>
              <div className="h-[1px] w-12 bg-brand-gold/40 mx-auto mb-6" />

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-brand-charcoal/70 text-sm">
                  <Calendar className="w-4 h-4 text-brand-gold" />
                  <span className="font-serif">Sabtu, 10 Oktober 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-brand-charcoal/70 text-sm">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  <span className="font-sans">Pukul 11:00 - 15:00 WIB</span>
                </div>
                <div className="flex items-start justify-center gap-2 text-brand-charcoal/70 text-sm max-w-xs mx-auto">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span className="font-serif text-left">
                    <strong>Ballroom Gedung Kota Administrasi</strong>
                    <br />
                    Jakarta Barat No.21
                  </span>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Gedung+Kota+Administrasi+Jakarta+Barat+No.21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-serif uppercase tracking-widest text-[10px] font-semibold py-3.5 px-6 rounded-full transition-all duration-300 w-full cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka Peta Lokasi Resepsi
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
