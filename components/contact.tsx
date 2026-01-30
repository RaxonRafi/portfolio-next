'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { BerylButton } from '@/components/ui/BerylButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowingText, GradientText, TechLabel } from '@/components/ui/GradientText';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Send, Sparkles, Twitter } from 'lucide-react';
import { useState } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 📧 CONTACT SECTION - NEO-TERMINAL STYLE
// Consistent design with About section
// ═══════════════════════════════════════════════════════════════════════════

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'dev.muhammad.rafi@gmail.com',
    link: 'mailto:dev.muhammad.rafi@gmail.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+8801867118351',
    link: 'tel:8801867118351',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Chittagong, Bangladesh',
    link: null,
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/raxonRafi', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/md-mashruul-islam/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/RaxonRafi', label: 'Twitter' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: "Thank you for your message. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#121212' }}>
      {/* Background effects */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(138, 43, 226, 0.2), transparent)'
        }}
      />
      <div className="hero-glow opacity-20" />
      <div className="violet-glow opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <AnimatedSection animation="fade-up-blur" className="max-w-3xl mb-16">
          <TechLabel variant="beryl" className="mb-4 block">
            05 — Contact
          </TechLabel>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-mono"
          >
            Let&apos;s{' '}
            <GradientText gradient="beryl" glow>
              Connect
            </GradientText>
          </h2>
          
          <p className="text-lg text-white/50 leading-relaxed">
            Have a project in mind or want to discuss opportunities? 
            I&apos;d love to hear from you. Let&apos;s build something{' '}
            <GlowingText color="beryl" intensity="low" animated={false}>
              amazing
            </GlowingText>
            {' '}together.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection animation="fade-up-blur" delay={0.1}>
            <GlassCard variant="default" padding="lg" className="h-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5" style={{ color: '#8A2BE2' }} />
                <span className="text-white/70 text-sm font-mono">Send me a message</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/60 text-sm">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="bg-[#1a1a1a]/50 border-white/10 text-white placeholder:text-white/30 
                                 focus:border-[#8A2BE2]/50 focus:ring-[#8A2BE2]/20 h-12 rounded-xl
                                 transition-all duration-300 font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/60 text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="bg-[#1a1a1a]/50 border-white/10 text-white placeholder:text-white/30 
                                 focus:border-[#8A2BE2]/50 focus:ring-[#8A2BE2]/20 h-12 rounded-xl
                                 transition-all duration-300 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white/60 text-sm">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="bg-[#1a1a1a]/50 border-white/10 text-white placeholder:text-white/30 
                               focus:border-[#8A2BE2]/50 focus:ring-[#8A2BE2]/20 h-12 rounded-xl
                               transition-all duration-300 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/60 text-sm">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="bg-[#1a1a1a]/50 border-white/10 text-white placeholder:text-white/30 
                               focus:border-[#8A2BE2]/50 focus:ring-[#8A2BE2]/20 resize-none rounded-xl
                               transition-all duration-300 font-mono"
                  />
                </div>

                <BerylButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </BerylButton>
              </form>
            </GlassCard>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection animation="fade-up-blur" delay={0.2}>
            <div className="space-y-6 h-full flex flex-col">
              {/* Contact Details */}
              <GlassCard variant="default" padding="lg" className="flex-1">
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 group"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300" style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)', color: '#8A2BE2' }}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white/40 text-sm mb-1">{item.title}</p>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-white hover:text-[#8A2BE2] transition-colors duration-300"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white">{item.value}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Social Links */}
              <GlassCard variant="bordered" padding="lg">
                <p className="text-white/40 text-sm mb-4">Follow me</p>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/60 transition-all duration-300"
                      style={{ backgroundColor: 'rgba(26, 26, 26, 0.5)' }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </GlassCard>

              {/* Quick response note */}
              <GlassCard variant="glow" padding="md">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#8A2BE2' }} />
                  <p className="text-white/60 text-sm font-mono">
                    Usually responds within <span style={{ color: '#8A2BE2' }}>24 hours</span>
                  </p>
                </div>
              </GlassCard>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
