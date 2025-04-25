"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Clock, Send, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Personnalisation intuitive",
    description: "Modifiez facilement les couleurs, polices et images pour créer une invitation qui vous ressemble, sans compétences techniques.",
    icon: Palette,
  },
  {
    title: "Gain de temps précieux",
    description: "Épargnez-vous le temps d'impression, d'adressage et d'envoi postal. Créez et envoyez en quelques minutes seulement.",
    icon: Clock,
  },
  {
    title: "Envoi instantané",
    description: "Partagez vos invitations instantanément par email, SMS ou réseaux sociaux, avec suivi en temps réel des réponses.",
    icon: Send,
  },
  {
    title: "Engagement écologique",
    description: "Optez pour le zéro papier sans compromettre l'élégance. Une alternative moderne et responsable aux invitations traditionnelles.",
    icon: HeartHandshake,
  },
];

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Pourquoi choisir nos invitations électroniques ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des invitations virtuelles avec l'élégance du papier, mais en mieux.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {features.map((feature, idx) => (
              <motion.div key={idx} variants={item} >
                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}