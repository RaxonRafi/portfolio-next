"use client";

import client1 from "@/public/clients/client1.jpeg";
import client2 from "@/public/clients/client2.jpeg";
import client3 from "@/public/clients/client3.webp";
import client4 from "@/public/clients/client4.webp";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// 💬 TESTIMONIALS - NEO-TERMINAL STYLE
// Consistent design with About section
// ═══════════════════════════════════════════════════════════════════════════

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "nrweastman",
      position: "Founder of A Higher Note",
      content:
        "Rafi is always helpful and communicative. This time, he collaborated with me to solve a mystery of my completely-deleted business website. I did not have the comfort level to proceed with solving the problem on my own. I provided him with what appeared to be older backups in my cpanel and he sorted through everything and restored my site fully.",
      rating: 5,
      image: client1,
    },
    {
      id: 2,
      name: "Emmanuel Sandoval",
      position: "Founder of Global Technologies Pakal",
      content:
        "It is a genuine pleasure to recommend Rafi as an exceptional web developer. During the time we worked together, I was amazed by his talent and dedication to the world of web development. Rafi is a valuable addition to any web development team.",
      rating: 5,
      image: client2,
    },
    {
      id: 3,
      name: "Tammy Lyn",
      position: "Founder of SpinListingSeo",
      content:
        "Thanks great job as always!",
      rating: 5,
      image: client3,
    },
    {
      id: 4,
      name: "randy schwartz",
      position: "Founder of Mosi Premium Cleaning",
      content:
        "Awesome, great at his work, knowledge, Highly recommend!",
      rating: 5,
      image: client4,
    },
    {
      id: 5,
      name: "cyphernet",
      position: "CEO of Cyphernet",
      content:
        "Quick, and respectful throughout the entire process. Will be working with them again!",
      rating: 5,
      image: null,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star 
            key={i} 
            className="h-4 w-4" 
            style={{ color: '#8A2BE2', fill: '#8A2BE2' }}
          />
        ))}
      </div>
    );
  };

  return (
    <section 
      id="testimonials" 
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: '#121212' }}
    >
      {/* Top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(138, 43, 226, 0.2), transparent)'
        }}
      />

      {/* Background glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.05), transparent 70%)'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - Consistent with About */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="max-w-3xl mb-16"
        >
          <span 
            className="font-mono text-[0.65rem] uppercase tracking-[0.15em] mb-4 block"
            style={{ color: '#8A2BE2' }}
          >
            04 — Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-mono text-white">
            Client{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #8A2BE2 0%, #b24bff 100%)',
              }}
            >
              Satisfaction
            </span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            What my clients say about working with me and the results we achieved together.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
          className="relative"
        >
          {/* Main testimonial */}
          <div className="neo-card p-8 md:p-12 max-w-4xl mx-auto relative">
            {/* Quote icon */}
            <Quote 
              className="absolute top-6 right-6 w-12 h-12 opacity-20"
              style={{ color: '#8A2BE2' }}
            />

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="shrink-0">
                <div 
                  className="w-20 h-20 rounded-full overflow-hidden"
                  style={{
                    border: '2px solid #8A2BE2',
                    boxShadow: '0 0 20px rgba(138, 43, 226, 0.3)'
                  }}
                >
                  {testimonials[currentIndex].image ? (
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center text-2xl font-mono"
                      style={{ backgroundColor: 'rgba(138, 43, 226, 0.2)', color: '#8A2BE2' }}
                    >
                      {testimonials[currentIndex].name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-white/70 text-lg leading-relaxed mb-6 italic">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="text-white font-semibold font-mono">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-white/40 text-sm">
                      {testimonials[currentIndex].position}
                    </p>
                  </div>
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="neo-button w-12 h-12 flex items-center justify-center"
              style={{ color: '#8A2BE2' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: index === currentIndex ? '#8A2BE2' : 'rgba(255, 255, 255, 0.2)',
                    transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)'
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="neo-button w-12 h-12 flex items-center justify-center"
              style={{ color: '#8A2BE2' }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
