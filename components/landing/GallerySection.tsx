"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const designs = {
  wedding: [
    {
      title: "Élégance Florale",
      imageUrl: "https://images.pexels.com/photos/1589216/pexels-photo-1589216.jpeg",
      style: "Élégant & Romantique"
    },
    {
      title: "Minimaliste Moderne",
      imageUrl: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
      style: "Contemporain & Épuré"
    },
    {
      title: "Champêtre Vintage",
      imageUrl: "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg",
      style: "Rustique & Chaleureux"
    },
  ],
  birthday: [
    {
      title: "Célébration Festive",
      imageUrl: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
      style: "Coloré & Joyeux"
    },
    {
      title: "Sophistication Élégante",
      imageUrl: "https://images.pexels.com/photos/3875080/pexels-photo-3875080.jpeg",
      style: "Chic & Raffiné"
    },
    {
      title: "Thématique Ludique",
      imageUrl: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg",
      style: "Amusant & Personnalisé"
    },
  ],
  other: [
    {
      title: "Réception Élégante",
      imageUrl: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
      style: "Formel & Distingué"
    },
    {
      title: "Fête Saisonnière",
      imageUrl: "https://images.pexels.com/photos/5905492/pexels-photo-5905492.jpeg",
      style: "Thématique & Festif"
    },
    {
      title: "Événement Professionnel",
      imageUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      style: "Business & Structuré"
    },
  ]
};

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("wedding");

  return (
    <section id="gallery" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Des designs qui impressionnent
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Parcourez notre collection de designs élégants et personnalisables pour tous vos événements.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="wedding" className="mb-8" onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-10">
            <TabsList className="bg-background/80 backdrop-blur-sm">
              <TabsTrigger value="wedding">Mariages</TabsTrigger>
              <TabsTrigger value="birthday">Anniversaires</TabsTrigger>
              <TabsTrigger value="other">Autres Événements</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(designs).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((design, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Card className="overflow-hidden group h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-background/50 backdrop-blur-sm">
                      <div className="aspect-[4/5] relative overflow-hidden">
                        <img
                          src={design.imageUrl}
                          alt={design.title}
                          className="object-cover bg-grey-100 h-full w-full transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <Button variant="secondary" className="w-full backdrop-blur-sm">
                            Utiliser ce design
                          </Button>
                        </div>
                      </div>
                      <CardContent className="pt-6">
                        <h3 className="font-medium text-lg">{design.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{design.style}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <Link href={"/templates"} className=" border px-4 hover:scale-110 hover:bg-black hover:text-white py-3 rounded-lg">
            Voir tous nos designs
          </Link>
        </div>
      </div>
    </section>
  );
}