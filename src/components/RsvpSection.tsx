import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Users, HeartHandshake, CheckCircle2 } from "lucide-react";
import { RsvpWish } from "../types";

const INITIAL_WISHES: RsvpWish[] = [
  {
    id: "wish-1",
    name: "Rian & Amel",
    attendance: "hadir",
    guests: 2,
    message: "Selamat Armed dan Tasya! Semoga dilancarkan semua persiapannya sampai hari H nanti. Sangat bahagia melihat kalian berdua bersatu. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Amin!",
    timestamp: "2026-07-04T08:30:00Z"
  },
  {
    id: "wish-2",
    name: "Dito Raharjo",
    attendance: "hadir",
    guests: 1,
    message: "Barakallah Armed! Akhirnya melangkah ke jenjang pelaminan juga bro. Selamat ya untuk Armed & Tasya, semoga dilancarkan ibadah terpanjangnya dan dikaruniai keturunan yang soleh/solehah.",
    timestamp: "2026-07-03T14:15:00Z"
  },
  {
    id: "wish-3",
    name: "Sarah Amanda",
    attendance: "hadir",
    guests: 2,
    message: "Tasyaaa! Ya ampun cantik banget pre-wedding nya! Selamat ya sayang, lancar terus sampai hari H yaa. Semoga bahagia selamanya bersama Armed. Peluk jauh dari Jakarta!",
    timestamp: "2026-07-03T10:05:00Z"
  },
  {
    id: "wish-4",
    name: "Hendra Wijaya",
    attendance: "tidak_hadir",
    guests: 0,
    message: "Selamat Armed & Tasya! Mohon maaf sekali belum bisa hadir karena bertepatan dengan tugas luar kota. Doa terbaik saya panjatkan dari jauh agar acara dilancarkan dan kalian berdua selalu dalam lindungan-Nya.",
    timestamp: "2026-07-02T19:40:00Z"
  }
];

export default function RsvpSection() {
  const [wishes, setWishes] = useState<RsvpWish[]>([]);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir">("hadir");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load wishes and check user submission status on mount
  useEffect(() => {
    const savedWishes = localStorage.getItem("wedding_wishes_armed_tasya");
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    } else {
      setWishes(INITIAL_WISHES);
      localStorage.setItem("wedding_wishes_armed_tasya", JSON.stringify(INITIAL_WISHES));
    }

    const hasSubscribed = localStorage.getItem("wedding_rsvp_submitted_armed_tasya");
    if (hasSubscribed) {
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg("Mohon masukkan nama Anda.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Mohon berikan ucapan atau pesan indah Anda.");
      return;
    }

    setErrorMsg("");

    const newWish: RsvpWish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      attendance,
      guests: attendance === "hadir" ? guests : 0,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem("wedding_wishes_armed_tasya", JSON.stringify(updatedWishes));
    localStorage.setItem("wedding_rsvp_submitted_armed_tasya", "true");
    
    setIsSubmitted(true);
    
    // Clear form fields
    setName("");
    setMessage("");
    setGuests(1);
  };

  const handleResetRsvp = () => {
    // Allows user to re-submit or edit their RSVP if they wish
    localStorage.removeItem("wedding_rsvp_submitted_armed_tasya");
    setIsSubmitted(false);
  };

  // Format time nicely
  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-white relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="font-script text-4xl text-brand-gold mb-1">Konfirmasi Kehadiran</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-charcoal tracking-wide uppercase font-light">
            RSVP & Love Wishes
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
          {/* RSVP Card (Left 5 cols) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="rsvp-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-brand-cream/40 p-6 sm:p-8 rounded-3xl border border-brand-gold/20 shadow-sm"
                >
                  <h3 className="font-serif text-xl text-brand-charcoal font-semibold mb-2 flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-brand-gold" /> Kirim Kehadiran
                  </h3>
                  <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed mb-6">
                    Beritahu kami ketersediaan waktu Anda untuk menyaksikan momen bahagia kami.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Anda"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-brand-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors text-brand-charcoal placeholder:text-zinc-400"
                      />
                    </div>

                    {/* Attendance selection */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
                        Konfirmasi Kehadiran
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setAttendance("hadir")}
                          className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                            attendance === "hadir"
                              ? "bg-brand-gold border-brand-gold text-white shadow-sm"
                              : "bg-white border-brand-gold/20 text-brand-charcoal/70 hover:bg-brand-cream/50"
                          }`}
                        >
                          Ya, Saya Hadir
                        </button>
                        <button
                          type="button"
                          onClick={() => setAttendance("tidak_hadir")}
                          className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                            attendance === "tidak_hadir"
                              ? "bg-brand-gold border-brand-gold text-white shadow-sm"
                              : "bg-white border-brand-gold/20 text-brand-charcoal/70 hover:bg-brand-cream/50"
                          }`}
                        >
                          Maaf, Tidak Bisa
                        </button>
                      </div>
                    </div>

                    {/* Number of guests (Shown only when Hadir is selected) */}
                    {attendance === "hadir" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
                          Jumlah Tamu
                        </label>
                        <div className="relative">
                          <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="w-full bg-white border border-brand-gold/20 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors appearance-none text-brand-charcoal cursor-pointer"
                          >
                            <option value={1}>1 Orang</option>
                            <option value={2}>2 Orang</option>
                            <option value={3}>3 Orang</option>
                          </select>
                          <Users className="w-4 h-4 text-brand-gold/75 absolute left-3.5 top-3.5 pointer-events-none" />
                        </div>
                      </motion.div>
                    )}

                    {/* Message Textarea */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/70 mb-1.5">
                        Ucapan Hangat & Doa Restu
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tulis ucapan selamat Anda di sini..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-white border border-brand-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-colors text-brand-charcoal placeholder:text-zinc-400 resize-none"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-red-500 text-xs font-medium bg-red-50 p-2.5 rounded-lg border border-red-100">
                        ⚠️ {errorMsg}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-brand-charcoal hover:bg-brand-gold text-white font-serif tracking-widest uppercase text-xs font-semibold py-4 rounded-xl shadow transition-colors duration-300 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Kirim Ucapan & RSVP
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="rsvp-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-brand-cream/40 p-8 rounded-3xl border border-brand-gold/30 text-center shadow-md flex flex-col items-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 border border-brand-gold/20">
                    <CheckCircle2 className="w-8 h-8 text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-brand-charcoal font-semibold mb-2">
                    Terima Kasih Banyak!
                  </h3>
                  <p className="font-sans text-xs text-brand-charcoal/60 leading-relaxed max-w-xs mb-6">
                    Konfirmasi kehadiran dan pesan indah Anda telah kami simpan dengan penuh rasa syukur. Sampai jumpa di hari bahagia kami!
                  </p>
                  
                  <button
                    onClick={handleResetRsvp}
                    className="text-xs font-sans text-brand-gold hover:text-brand-gold-dark underline cursor-pointer"
                  >
                    Kirim Ucapan Lain / Ubah RSVP
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Guest Book Wishes Board (Right 7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-[520px]">
            <div className="bg-brand-cream/20 border border-brand-gold/10 rounded-t-3xl p-4 border-b-0 flex items-center justify-between">
              <span className="font-serif text-sm font-semibold text-brand-charcoal tracking-wide">
                Buku Tamu ({wishes.length} Ucapan)
              </span>
              <div className="flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase font-sans tracking-wider text-brand-charcoal/40 font-semibold">Live Board</span>
              </div>
            </div>

            {/* Scrolling Messages area */}
            <div className="border border-brand-gold/10 rounded-b-3xl overflow-y-auto p-4 sm:p-6 bg-brand-cream/10 space-y-4 flex-1">
              <AnimatePresence initial={false}>
                {wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: -20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-brand-gold/10 hover:border-brand-gold/30 transition-colors duration-300 relative overflow-hidden"
                  >
                    {/* Corner attendance ribbon */}
                    <div className="absolute right-0 top-0 text-[9px] uppercase tracking-wider px-3.5 py-1 rounded-bl-xl font-bold font-sans">
                      {wish.attendance === "hadir" ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-0.5">
                          ✓ Hadir ({wish.guests})
                        </span>
                      ) : (
                        <span className="text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded-md border border-zinc-100">
                          ✗ Berhalangan
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <h4 className="font-serif text-base text-brand-charcoal font-semibold tracking-wide pr-24 truncate">
                        {wish.name}
                      </h4>
                      <span className="text-[9px] text-brand-charcoal/40 font-sans mt-0.5 mb-3">
                        {formatDate(wish.timestamp)}
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed italic border-t border-brand-gold/5 pt-2.5">
                        "{wish.message}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
