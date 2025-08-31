"use client"
import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import ExperienceAndEducationTab from './Tabs'
const ExperienceAndEducation = () => {

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  }

  return (

    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
         <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Experience & Education
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>
        <div className="flex justify-center">
            <ExperienceAndEducationTab />
        </div>
      </div>
    </section>
  )
}

export default ExperienceAndEducation