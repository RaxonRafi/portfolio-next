import type { Metadata } from "next"
import Hero from "@/components/hero"
import About from "@/components/about"
import TechStack from "@/components/tech-stack"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ExperienceAndEducation from "@/components/ExperienceAndEducation"
import ProjectsPage from "./projects/page"
import BlogPage from "./blogs/page"

export const metadata: Metadata = {
  title: "Muhammad Rafi | Portfolio",
  description: "Professional portfolio of Muhammad Rafi - Software Developer",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <ExperienceAndEducation/>
        <TechStack />
        <ProjectsPage />
        <Testimonials />
        <BlogPage/>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
