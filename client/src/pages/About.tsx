import { motion } from "framer-motion";
import { Link } from "wouter";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Target, Lightbulb, Users, Heart, Zap, Globe } from "lucide-react";

export default function About() {
    const values = [
        {
            icon: <Lightbulb className="w-6 h-6 text-primary" />,
            title: "Innovation First",
            description: "We don't just follow trends; we define them. Our team is constantly pushing the boundaries of what Voice AI can achieve."
        },
        {
            icon: <Heart className="w-6 h-6 text-primary" />,
            title: "Empathy at Core",
            description: "Technology should feel human. We build agents that understand not just words, but context, tone, and emotion."
        },
        {
            icon: <Target className="w-6 h-6 text-primary" />,
            title: "Obsessive Quality",
            description: "Good enough isn't in our vocabulary. From latency to accent recognition, we strive for perfection in every interaction."
        }
    ];

    const stats = [
        { value: "Zero", label: "Wait Times" },
        { value: "99.9%", label: "Uptime Reliability" },
        { value: "24/7", label: "Support Coverage" },
        { value: "10+", label: "Languages Supported" }
    ];

    return (
        <div className="min-h-screen bg-background selection:bg-primary/30">
            {/* Navigation */}
            <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex items-center gap-2 cursor-pointer">
                            <img src="/brain.png" alt="CuriousAnt Labs" className="h-8 w-auto" />
                            <span className="font-display font-bold text-xl tracking-tight">CuriousAnt Labs</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Home</Link>
                            <Link href="/blogs" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Insights</Link>
                            <ContactModal>
                                <Button variant="glow" size="sm">Book Demo</Button>
                            </ContactModal>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                            Humanizing AI for a <br /> <span className="text-gradient">Connected World</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            We are engineers, researchers, and dreamers building the next generation of conversational intelligence. Our mission is to make technology speak your language.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-white/5 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Origins Story */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
                            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                                <p>
                                    CuriousAnt Labs was born from a simple yet frustrating question: <span className="text-white italic">"Why is talking to a computer still so difficult?"</span>
                                </p>
                                <p>
                                    In a world of supercomputers and instant connectivity, customer interactions were still stuck in the era of rigid IVR menus and frustratingly robotic chatbots. We saw a gap between human intent and machine understanding.
                                </p>
                                <p>
                                    We set out to bridge that gap. Starting as a small research team, we focused on not just speech recognition, but <strong>intent understanding</strong>. Today, CuriousAnt Labs is empowering businesses globally, helping them scale empathy and efficiency simultaneously.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-card/50 backdrop-blur-sm p-4">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2600"
                                    alt="Team Collaboration"
                                    className="rounded-2xl w-full h-auto object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-black/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold mb-4">Our Core Values</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            The principles that guide every line of code we write and every product we build.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/20 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
                        <Globe className="w-4 h-4" /> Global Vision
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Building the Interface of the Future</h2>
                    <p className="text-xl text-muted-foreground mb-12">
                        We believe that in the next decade, voice will become the primary way humans interact with technology. We are building the infrastructure to make that future secure, scalable, and surprisingly human.
                    </p>
                    <ContactModal>
                        <Button size="lg" className="h-14 px-8 text-lg">
                            Join Our Journey
                        </Button>
                    </ContactModal>
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
