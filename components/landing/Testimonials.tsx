"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sophie Martin",
    event: "Mariage",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    testimonial: "Nous avons économisé tellement de temps et d'argent avec ces invitations électroniques ! Le design était superbe et nos invités ont adoré le côté pratique pour répondre.",
    rating: 5,
  },
  {
    name: "Thomas Durand",
    event: "Anniversaire 40 ans",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    testimonial: "J'avais besoin d'invitations de dernière minute pour mon anniversaire et en 30 minutes tout était prêt et envoyé. Un service qui m'a vraiment sauvé !",
    rating: 5,
  },
  {
    name: "Marie Petit",
    event: "Baby Shower",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    testimonial: "La possibilité de personnaliser les couleurs et d'ajouter nos propres photos a rendu nos invitations vraiment spéciales. Le suivi des réponses était un bonus incroyable.",
    rating: 5,
  },
];

export default function Testimonials() {
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Ce que nos clients disent
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez les expériences de personnes qui ont utilisé nos invitations électroniques.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} variants={item} >
                <Card className="h-full bg-background/50 backdrop-blur-sm border-muted">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="italic text-muted-foreground mb-6">"{testimonial.testimonial}"</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4 ring-2 ring-primary/10">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}