import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formState);
  };

  return (
    <div className="relative min-h-screen bg-background noise-overlay">
      <Navigation />
      
      <main className="pt-24">
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
                  Contact
                </span>
                <h1 className="font-display text-5xl md:text-6xl font-medium text-foreground mb-8">
                  Let's work together
                </h1>
                <p className="font-body text-lg text-muted-foreground mb-12 max-w-md">
                  Have a project in mind or just want to chat? 
                  I'm always open to discussing new opportunities and ideas.
                </p>

                {/* Contact info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-sm font-medium text-foreground mb-2">
                      Email
                    </h3>
                    <a 
                      href="mailto:hello@studio.com"
                      className="font-body text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      hello@studio.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-medium text-foreground mb-2">
                      Location
                    </h3>
                    <p className="font-body text-muted-foreground">
                      Available worldwide
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      htmlFor="name"
                      className="block font-body text-sm text-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 font-body text-foreground bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email"
                      className="block font-body text-sm text-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 font-body text-foreground bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message"
                      className="block font-body text-sm text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 font-body text-foreground bg-card border border-border rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full px-8 py-4 font-display text-sm tracking-wide overflow-hidden rounded-lg"
                  >
                    <span className="relative z-10 text-primary-foreground group-hover:text-background transition-colors duration-500">
                      Send Message
                    </span>
                    <div className="absolute inset-0 bg-primary transition-transform duration-500 ease-out" />
                    <div className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;