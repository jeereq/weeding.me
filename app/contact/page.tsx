"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Card, CardContent } from "@/components/ui/card";

// Mock templates data - Replace with Supabase data
const templates = [
  {
    id: '1',
    title: 'Élégance Florale',
    description: 'Un design élégant avec des motifs floraux délicats',
    imageUrl: 'https://images.pexels.com/photos/1589216/pexels-photo-1589216.jpeg',
  },
  {
    id: '2',
    title: 'Corporate Classic',
    description: 'Design professionnel pour événements d\'entreprise',
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
  },
  {
    id: '3',
    title: 'Célébration Festive',
    description: 'Design coloré et joyeux pour les célébrations',
    imageUrl: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg',
  }
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    templateId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formState);
  };

  const selectedTemplate = templates.find(t => t.id === formState.templateId);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4">Contactez-nous</h1>
              <p className="text-lg text-muted-foreground">
                Une question ? Un projet ? N'hésitez pas à nous contacter.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Sujet
                    </label>
                    <Input
                      id="subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="template" className="block text-sm font-medium mb-2">
                      Template souhaité (optionnel)
                    </label>
                    <Select
                      value={formState.templateId}
                      onValueChange={(value) => setFormState({ ...formState, templateId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Envoyer le message
                  </Button>
                </form>
              </div>

              <div className="space-y-6">
                <div className="sticky top-8">
                  {selectedTemplate ? (
                    <Card className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={selectedTemplate.imageUrl}
                          alt={selectedTemplate.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{selectedTemplate.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedTemplate.description}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card
                          key={template.id}
                          className="overflow-hidden cursor-pointer transition-transform hover:scale-105"
                          onClick={() => setFormState({ ...formState, templateId: template.id })}
                        >
                          <div className="aspect-video relative">
                            <img
                              src={template.imageUrl}
                              alt={template.title}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="text-sm font-medium">{template.title}</h3>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}