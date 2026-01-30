"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import { useState } from "react"

// ═══════════════════════════════════════════════════════════════════════════
// 💼 EXPERIENCE & EDUCATION - NEO-TERMINAL STYLE
// Consistent design with About section
// ═══════════════════════════════════════════════════════════════════════════

const experiences = [
  {
    id: 1,
    date: "Nov 2025 – Present",
    title: "Software Engineer",
    company: "SOFOF Tech",
    location: "Remote, Jiddah, Saudi Arabia",
    points: [
      "Developed and maintained backend systems using Node.js, Express.js, Nest.js, Laravel, PostgreSQL, and TypeScript.",
      "Built secure, scalable REST APIs and optimized database performance.",
      "Integrated third-party services and collaborated cross-functionally to deliver production-ready features.",
    ],
  },
  {
    id: 2,
    date: "Apr 2022 – Nov 2023",
    title: "Web Developer (Internship)",
    company: "Oxyjon",
    location: "Remote, Gurgaon, India",
    points: [
      "Designed and developed dynamic, responsive websites using HTML, CSS, JavaScript, PHP, and Laravel, achieving a 30% increase in user engagement and a 20% decrease in bounce rates.",
      "Integrated RESTful APIs to fetch and display real-time data from databases, improving user experience with up-to-date information while reducing data access times.",
      "Converted existing web applications into Responsive Progressive Web Apps (PWAs), increasing mobile conversion rates by 25%.",
    ],
  },
  {
    id: 3,
    date: "May 2023 – Aug 2023",
    title: "Backend Developer (Contract)",
    company: "Global Technologies Solutions Pakal",
    location: "Remote, Mexico City, Mexico",
    points: [
      "Developed and deployed 15+ RESTful APIs using Node.js and Express.js, optimizing data retrieval and processing, resulting in a 40% reduction in response times.",
      "Implemented REST APIs to fetch and display real-time data from MySQL databases in React applications, enhancing data accessibility and boosting user engagement by 15%.",
      "Designed and optimized MySQL database schemas, reducing query execution times by 25% and improving overall system efficiency.",
    ],
  },
]

const education = [
  {
    id: 1,
    date: "Dec 2021 – Dec 2025",
    title: "Bachelor of Science in Computer Science and Engineering",
    institution: "Premier University, Chattogram",
    location: "Chattogram, Bangladesh",
  },
  {
    id: 2,
    date: "Jan 2018 – Dec 2020",
    title: "Higher Secondary School Certificate (Science)",
    institution: "Kazem Ali School And College",
    location: "Chattogram, Bangladesh",
  },
]

export default function ExperienceAndEducation() {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience')

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section 
      id="experience" 
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
            06 — Experience & Education
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-mono text-white">
            My{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #8A2BE2 0%, #b24bff 100%)',
              }}
            >
              Journey
            </span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            A timeline of my professional experience and educational background.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          variants={fadeIn}
          className="flex justify-center mb-12"
        >
          <div 
            className="neo-card p-1.5 flex gap-2"
          >
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-3 rounded-lg font-mono text-sm flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'experience' 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white/70'
              }`}
              style={{
                backgroundColor: activeTab === 'experience' ? 'rgba(138, 43, 226, 0.2)' : 'transparent',
                border: activeTab === 'experience' ? '1px solid rgba(138, 43, 226, 0.4)' : '1px solid transparent'
              }}
            >
              <Briefcase className="w-4 h-4" style={{ color: activeTab === 'experience' ? '#8A2BE2' : undefined }} />
              Experience
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-3 rounded-lg font-mono text-sm flex items-center gap-2 transition-all duration-300 ${
                activeTab === 'education' 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white/70'
              }`}
              style={{
                backgroundColor: activeTab === 'education' ? 'rgba(138, 43, 226, 0.2)' : 'transparent',
                border: activeTab === 'education' ? '1px solid rgba(138, 43, 226, 0.4)' : '1px solid transparent'
              }}
            >
              <GraduationCap className="w-4 h-4" style={{ color: activeTab === 'education' ? '#8A2BE2' : undefined }} />
              Education
            </button>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          {/* Experience Timeline */}
          {activeTab === 'experience' && (
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2"
                  style={{ borderColor: 'rgba(138, 43, 226, 0.3)' }}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute -left-[9px] top-0 w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: '#8A2BE2',
                      boxShadow: '0 0 10px rgba(138, 43, 226, 0.5)'
                    }}
                  />

                  {/* Content */}
                  <div className="neo-card p-6">
                    {/* Date */}
                    <span 
                      className="font-mono text-xs uppercase tracking-wider mb-2 block"
                      style={{ color: '#8A2BE2' }}
                    >
                      {exp.date}
                    </span>

                    {/* Title & Company */}
                    <h3 className="text-xl font-semibold text-white font-mono mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-white/60 mb-4">
                      {exp.company} <span className="text-white/30">•</span> {exp.location}
                    </p>

                    {/* Points */}
                    <ul className="space-y-2">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                          <span 
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: '#8A2BE2' }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Education Timeline */}
          {activeTab === 'education' && (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2"
                  style={{ borderColor: 'rgba(138, 43, 226, 0.3)' }}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute -left-[9px] top-0 w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: '#8A2BE2',
                      boxShadow: '0 0 10px rgba(138, 43, 226, 0.5)'
                    }}
                  />

                  {/* Content */}
                  <div className="neo-card p-6">
                    {/* Date */}
                    <span 
                      className="font-mono text-xs uppercase tracking-wider mb-2 block"
                      style={{ color: '#8A2BE2' }}
                    >
                      {edu.date}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white font-mono mb-1">
                      {edu.title}
                    </h3>
                    <p className="text-white/60">
                      {edu.institution}
                    </p>
                    <p className="text-white/40 text-sm">
                      {edu.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}