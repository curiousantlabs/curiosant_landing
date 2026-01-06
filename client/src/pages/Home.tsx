import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Mic,
  MessageSquare,
  Globe,
  Database,
  Bot,
  Zap,
  Phone,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Play,
  Languages,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { FeatureCard } from "@/components/FeatureCard";
import { Waveform } from "@/components/Waveform";
import { LiveKitDemo } from "@/components/LiveKitDemo";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src="/brain.png" alt="CuriousAnt Labs" className="h-8 w-auto" />
              <span className="font-display font-bold text-xl tracking-tight">CuriousAnt Labs</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Capabilities</a>
              <a href="#use-cases" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Use Cases</a>
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Services</a>
              <ContactModal>
                <Button variant="glow" size="sm">Book Demo</Button>
              </ContactModal>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-muted-foreground">
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-white/5 bg-background">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-muted-foreground">Features</a>
              <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-muted-foreground">Capabilities</a>
              <a href="#use-cases" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-medium text-muted-foreground">Use Cases</a>
              <ContactModal>
                <Button className="w-full">Book Demo</Button>
              </ContactModal>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Now supporting 10+ languages
              </div>

              <h1 className="text-4xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
                Meet <span className="text-gradient">Vaani</span> <br />
                Your Human-like Voice AI Agent
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Automate customer conversations across calls, WhatsApp, web chat, and apps with multilingual intelligence that feels genuinely human.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <ContactModal>
                  <Button size="lg" variant="glow" className="font-semibold text-lg h-14">
                    Book a Free Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </ContactModal>

                <Button size="lg" variant="outline" className="font-semibold text-lg h-14 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white">
                  <Play className="mr-2 w-5 h-5 fill-current" />
                  See Use Cases
                </Button>
              </div>

              {/* Trust Badge */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <p className="text-sm text-muted-foreground mb-4">Trusted by innovative companies</p>
                {/* Company Logos */}
                <div className="flex items-center justify-between w-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 gap-8 sm:gap-12">
                  {/* Logo 1: Acme */}
                  <svg className="h-8 w-auto" viewBox="0 0 100 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10,25 L20,5 L30,25 M5,25 H35" stroke="currentColor" strokeWidth="3" fill="none" />
                    <text x="40" y="22" fontFamily="sans-serif" fontSize="18" fontWeight="bold">ACME</text>
                  </svg>

                  {/* Logo 2: Quantum */}
                  <svg className="h-8 w-auto" viewBox="0 0 140 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="15" cy="15" r="4" fill="currentColor" />
                    <text x="35" y="22" fontFamily="sans-serif" fontSize="18" fontWeight="bold">QUANTUM</text>
                  </svg>

                  {/* Logo 3: Echo */}
                  <svg className="h-8 w-auto" viewBox="0 0 100 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5,15 Q15,5 25,15 T45,15" stroke="currentColor" strokeWidth="3" fill="none" />
                    <text x="50" y="22" fontFamily="sans-serif" fontSize="18" fontWeight="bold">ECHO</text>
                  </svg>

                  {/* Logo 4: Nebula */}
                  <svg className="h-8 w-auto" viewBox="0 0 120 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15,15 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" fill="none" />
                    <text x="35" y="22" fontFamily="sans-serif" fontSize="18" fontWeight="bold">NEBULA</text>
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Visual/Demo Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px] lg:h-[600px] w-full"
            >
              <LiveKitDemo />
            </motion.div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section id="features" className="py-24 bg-black/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Platform Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to build and deploy enterprise-grade voice AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Languages className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multilingual Mastery</h3>
              <p className="text-sm text-muted-foreground">
                Native-sounding conversations in 10+ languages with automatic language detection.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ultra-low Latency</h3>
              <p className="text-sm text-muted-foreground">
                Sub-500ms response times for natural, interruption-handling conversations.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Omnichannel</h3>
              <p className="text-sm text-muted-foreground">
                Deploy the same agent across Phone, Web, WhatsApp, and Mobile Apps instantly.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Custom Knowledge</h3>
              <p className="text-sm text-muted-foreground">
                Train agents on your proprietary data securely for accurate, business-specific answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Autonomous & Collaborative Agents */}
      <section id="how-it-works" className="py-24 relative bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Autonomous & Collaborative
            </h2>
            <p className="text-lg text-muted-foreground">
              Our agents don't just talk; they think, act, and work together to deliver results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left: Autonomous */}
            <div className="bg-card border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Fully Autonomous</h3>
                <p className="text-muted-foreground mb-6">
                  Capable of handling end-to-end workflows without human intervention.
                </p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>Self-Correction:</strong> Detects misunderstandings and rephrases automatically.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>Task Execution:</strong> Can update CRMs, schedule appointments, and send emails.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <span><strong>Context Awareness:</strong> Remembers past interactions across channels.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Collaborative */}
            <div className="bg-card border border-white/10 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Collaborative Swarms</h3>
                <p className="text-muted-foreground mb-6">
                  Agents that work together continuously to resolve complex customer needs.
                </p>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                    <span><strong>Agent Handoffs:</strong> Seamlessly transfer context from Triage to Specialist agents.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                    <span><strong>Human Escalation:</strong> Smartly brings in humans only when empathy or discretion is needed.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                    <span><strong>Unified Memory:</strong> All agents and humans share a central knowledge core.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section id="use-cases" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Built for Every Industry
            </h2>
            <p className="text-muted-foreground">Tailored solutions for your specific needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Customer Support", "Sales Qualification", "Appointment Booking",
              "Healthcare Triage", "Financial Services", "Logistics & Delivery"
            ].map((useCase, i) => (
              <div key={i} className="group p-6 rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-colors">
                <CheckCircle2 className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{useCase}</h3>
                <p className="text-sm text-muted-foreground">
                  Automate standard queries and escalate complex issues instantly.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Other Services We Offer
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive AI and development solutions to power your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Mic}
              title="AI Voice Agents"
              description="Human-like voice AI that handles complex calls, interruptions, and scheduling naturally."
              delay={0}
            />
            <FeatureCard
              icon={MessageSquare}
              title="AI Chat Bot"
              description="Intelligent chatbots for 24/7 support across WhatsApp, Web and Social channels."
              delay={0.1}
            />
            <FeatureCard
              icon={Globe}
              title="Web Development"
              description="Modern, high-performance web applications built with the latest technologies."
              delay={0.2}
            />
            <FeatureCard
              icon={Phone}
              title="Mobile App Dev"
              description="Native Android & iOS applications with seamless AI integrations."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Ready to Scale Conversations <br />
            Without Scaling Teams?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactModal>
              <Button size="lg" className="h-14 text-lg px-8">
                Book a Free Demo
              </Button>
            </ContactModal>
            <Button size="lg" variant="outline" className="h-14 text-lg px-8 bg-transparent border-white/20 hover:bg-white/10 hover:text-white">
              Talk to an Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src="/brain.png" alt="CuriousAnt Labs" className="h-6 w-auto" />
                <span className="font-display font-bold text-lg">CuriousAnt Labs</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Empowering businesses with human-like AI agents for seamless global communication.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary">Voice Agents</a></li>
                <li><a href="#" className="hover:text-primary">Chat Agents</a></li>
                <li><a href="#" className="hover:text-primary">Integrations</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CuriousAnt Labs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
