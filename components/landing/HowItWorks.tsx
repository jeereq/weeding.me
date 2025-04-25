"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MousePointerClick, Send, Paintbrush } from "lucide-react";

const steps = [
  {
    title: "Choisissez un design",
    description: "Parcourez notre galerie et sélectionnez le design qui correspond à votre événement.",
    icon: MousePointerClick,
  },
  {
    title: "Personnalisez",
    description: "Modifiez les couleurs, les polices, ajoutez vos propres textes et images pour le rendre unique.",
    icon: Paintbrush,
  },
  {
    title: "Prévisualisez",
    description: "Assurez-vous que tout est parfait en visualisant votre invitation exactement comme vos invités la verront.",
    icon: CheckCircle2,
  },
  {
    title: "Partagez",
    description: "Envoyez vos invitations par email, message ou réseaux sociaux et suivez les réponses en temps réel.",
    icon: Send,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Créer et envoyer votre invitation n'a jamais été aussi simple.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-1/2 h-[calc(100%-8rem)] w-px bg-border hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-y-24 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={`relative ${idx % 2 === 1 ? "md:translate-y-12" : ""}`}>

                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="bg-primary text-primary-foreground rounded-full p-4 z-10 mb-6">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      <span className="inline-block bg-muted px-2.5 py-0.5 rounded-full text-sm font-medium mr-2">
                        {idx + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}