import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ContactModal } from "@/components/ContactModal";

export default function Contact() {
    return (
        <div className="min-h-screen bg-background selection:bg-primary/30">
            {/* Navigation */}
            <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 cursor-pointer">
                            <img src="/brain.png" alt="CuriousAnt Labs" className="h-8 w-auto" />
                            <span className="font-display font-bold text-xl tracking-tight">CuriousAnt Labs</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Home</Link>
                            <ContactModal>
                                <Button variant="glow" size="sm">Book Demo</Button>
                            </ContactModal>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Contact Us</h1>
                        <p className="text-lg text-muted-foreground mb-12">
                            Get in touch with us for any inquiries or support. We're here to help you scale your business with AI.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Building2 className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Company Information</h3>
                                    <p className="text-muted-foreground">CuriousAnt Labs Pvt Ltd</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        EWS-371, INDIRANAGAR,<br />
                                        MANDIDEEP, DIST.-RAISEN,<br />
                                        PIN-462046
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                    <a href="mailto:contact@curiousant.tech" className="text-muted-foreground hover:text-white transition-colors">
                                        contact@curiousant.tech
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive Map (Placeholder/Static Image could go here) or Booking CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="bg-card border border-white/10 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                            <p className="text-muted-foreground mb-6">
                                Schedule a personalized demo with our team to see how our voice AI can transform your customer experience.
                            </p>
                            <ContactModal>
                                <Button size="lg" className="w-full">
                                    Book a Meeting
                                </Button>
                            </ContactModal>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <img src="/brain.png" alt="CuriousAnt Labs" className="h-6 w-auto" />
                            <span className="font-display font-bold text-lg">CuriousAnt Labs</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} CuriousAnt Labs. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
