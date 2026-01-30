"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Binary, ChevronDown, Code2, Database, Layout, Server, Wrench } from "lucide-react"
import { useState } from "react"

// ═══════════════════════════════════════════════════════════════════════════
// 🛠️ TECH STACK - NEO-TERMINAL STYLE
// Consistent design with the About section
// ═══════════════════════════════════════════════════════════════════════════

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const technologies = {
    languages: {
      icon: <Code2 className="h-5 w-5" />,
      title: "Languages",
      skills: ["C/C++", "PHP", "Python", "TypeScript", "JavaScript"],
    },
    concepts: {
      icon: <Binary className="h-5 w-5" />,
      title: "Engineering",
      skills: ["Data Structures", "Algorithms", "OOP", "Design Patterns", "System Design"],
    },
    frontend: {
      icon: <Layout className="h-5 w-5" />,
      title: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "Redux", "Shadcn UI"],
    },
    backend: {
      icon: <Server className="h-5 w-5" />,
      title: "Backend",
      skills: ["Node.js", "Express", "Laravel"],
    },
    database: {
      icon: <Database className="h-5 w-5" />,
      title: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL"],
    },
    tools: {
      icon: <Wrench className="h-5 w-5" />,
      title: "Tools",
      skills: ["Git", "Docker", "Linux", "VS Code"],
    },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section 
      id="tech-stack" 
      className="py-32 relative"
      style={{ backgroundColor: '#121212' }}
    >
      {/* Subtle top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(138, 43, 226, 0.2), transparent)'
        }}
      />
      
      <div className="container mx-auto px-6">
        {/* Section Header - Consistent with About */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeIn}
          className="max-w-3xl mb-20"
        >
          <span 
            className="font-mono text-[0.65rem] uppercase tracking-[0.15em] mb-4 block"
            style={{ color: '#8A2BE2' }}
          >
            02 — Skills
          </span>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-mono text-white"
          >
            Technical{' '}
            <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #8A2BE2 0%, #b24bff 100%)',
                textShadow: '0 0 30px rgba(138, 43, 226, 0.5)'
              }}
            >
              Expertise
            </span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            With extensive experience in both low-level systems programming and modern web development, 
            I bring a comprehensive understanding of software engineering.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(technologies).map(([key, category], index) => (
            <motion.div
              key={key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <button
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                className="neo-card w-full p-6 text-left transition-all"
                style={{
                  borderColor: selectedCategory === key ? 'rgba(138, 43, 226, 0.4)' : undefined,
                  boxShadow: selectedCategory === key ? '0 0 20px rgba(138, 43, 226, 0.2)' : undefined
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(138, 43, 226, 0.1)',
                        color: '#8A2BE2'
                      }}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white font-mono">
                      {category.title}
                    </h3>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-white/40 transition-transform ${
                      selectedCategory === key ? 'rotate-180' : ''
                    }`} 
                  />
                </div>

                <AnimatePresence>
                  {selectedCategory === key ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2 pt-2">
                        {category.skills.map((skill, i) => (
                          <span 
                            key={i}
                            className="skill-tag px-3 py-1.5 text-sm font-mono"
                            style={{ color: '#8A2BE2' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex gap-2 flex-wrap">
                      {category.skills.slice(0, 3).map((skill, i) => (
                        <span 
                          key={i}
                          className="text-sm text-white/40 font-mono"
                        >
                          {skill}{i < 2 && category.skills.length > 1 ? ', ' : ''}
                        </span>
                      ))}
                      {category.skills.length > 3 && (
                        <span 
                          className="text-sm font-mono"
                          style={{ color: '#8A2BE2' }}
                        >
                          +{category.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
