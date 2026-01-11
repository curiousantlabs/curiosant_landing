import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { blogPosts } from "@/lib/blog-data";

export default function Blogs() {
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
                            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Contact</Link>
                            <ContactModal>
                                <Button variant="glow" size="sm">Book Demo</Button>
                            </ContactModal>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="pt-32 pb-24 relative">
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Insights & News</h1>
                        <p className="text-lg text-muted-foreground">Exploring the frontiers of Voice AI and Autonomous Agents.</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {blogPosts.map((post, idx) => (
                            <Link key={post.id} href={`/blog/${post.id}`}>
                                <motion.article
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="h-full bg-card border border-white/10 rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300 group cursor-pointer flex flex-col"
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10 opacity-60" />
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full text-xs font-semibold">
                                                <Tag className="w-3 h-3 text-primary" /> {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                        </div>

                                        <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-sm text-muted-foreground">{post.readTime}</span>
                                            <div className="flex items-center text-sm font-medium text-white group-hover:text-primary transition-colors">
                                                Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
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
