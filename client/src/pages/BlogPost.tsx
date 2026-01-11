import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Calendar, User, Tag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import { blogPosts } from "@/lib/blog-data";
import NotFound from "@/pages/not-found";

export default function BlogPost() {
    const [match, params] = useRoute("/blog/:id");
    const post = blogPosts.find((p) => p.id === params?.id);

    if (!match || !post) {
        return <NotFound />;
    }

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
                            <Link href="/blogs" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Insights</Link>
                            <ContactModal>
                                <Button variant="glow" size="sm">Book Demo</Button>
                            </ContactModal>
                        </div>
                    </div>
                </div>
            </nav>

            <article className="pt-32 pb-24 relative">
                <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-primary/10 to-background pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/blogs">
                        <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary transition-colors">
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Insights
                        </Button>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <span className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                                <Tag className="w-3 h-3" /> {post.category}
                            </span>
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-3 mb-12 border-b border-white/10 pb-8">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-white">{post.author}</p>
                                <p className="text-xs text-muted-foreground">Editor, CuriousAnt Labs</p>
                            </div>
                        </div>

                        <div className="rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-muted-foreground prose-strong:text-white prose-a:text-primary hover:prose-a:underline">
                            {post.content}
                        </div>

                        {/* CTA */}
                        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 text-center">
                            <h3 className="text-2xl font-bold mb-4">Want to see this in action?</h3>
                            <p className="text-muted-foreground mb-6">
                                Experience the future of voice AI today. Book a personalized demo with our team.
                            </p>
                            <ContactModal>
                                <Button size="lg" variant="glow">Book a Demo</Button>
                            </ContactModal>
                        </div>
                    </motion.div>
                </div>
            </article>

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
