"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const designs: any = {
  wedding: [
    {
      id: 1,
      title: "Mariage 1",
      category: "wedding",
      active: true,
      style: "Classique & Raffiné",
      imageUrl: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
    },
    {
      id: 2,
      title: "Mariage 2",
      category: "wedding",
      active: true,
      style: "Moderne & Coloré",
      imageUrl: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
    },
    {
      id: 3,
      title: "Mariage 3",
      category: "wedding",
      active: true,
      style: "Doux & Poétique",
      imageUrl: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
    },
  ],
  birthday: [
    {
      title: "Célébration Festive",
      active: false,
      imageUrl: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
      style: "Coloré & Joyeux"
    },
    {
      title: "Sophistication Élégante",
      active: false,
      imageUrl: "https://images.pexels.com/photos/3875080/pexels-photo-3875080.jpeg",
      style: "Chic & Raffiné"
    },
    {
      title: "Thématique Ludique",
      active: false,
      imageUrl: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg",
      style: "Amusant & Personnalisé"
    },
  ],
  other: [
    {
      title: "Réception Élégante",
      active: false,
      imageUrl: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
      style: "Formel & Distingué"
    },
    {
      title: "Fête Saisonnière",
      active: false,
      imageUrl: "https://images.pexels.com/photos/5905492/pexels-photo-5905492.jpeg",
      style: "Thématique & Festif"
    },
    {
      title: "Événement Professionnel",
      active: false,
      imageUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      style: "Business & Structuré"
    },
  ]
};

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("wedding");

  const router = useRouter();
  const handleTemplateSelect = (templateId: any) => {
    // In a real application, this would create a new invitation with the selected template
    // For now, we'll just navigate to the admin invitations page
    router.push(`/contact?template=${templateId}`);
  };
  const viewTemplateSelect = (templateId: number, category: string) => {
    // In a real application, this would create a new invitation with the selected template
    // For now, we'll just navigate to the admin invitations page
    router.push(`/templates/${templateId}?title=${encodeURIComponent(designs[category].find((t: any) => t.id === templateId)?.title || '')}`);
    // This will navigate to the template page with the selected template ID
  };

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
              {/* <TabsTrigger value="birthday">Anniversaires</TabsTrigger>
              <TabsTrigger value="other">Autres Événements</TabsTrigger> */}
            </TabsList>
          </div>

          {Object.entries(designs).map(([category, items]: any) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.filter(function (template: any) { return template.active }).map((design: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Card className="overflow-hidden group h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-background/50 backdrop-blur-sm">
                      <div className="aspect-[4.5/5] relative overflow-hidden">
                        <img
                          src={design.imageUrl}
                          alt={design.title}
                          className="object-cover bg-grey-100 h-full w-full transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div className="w-full grid gap-2">
                            <Button
                              variant="secondary"
                              className="w-full backdrop-blur-sm"
                              onClick={() => viewTemplateSelect(design.id, category)}
                            >
                              Tester le model
                            </Button>
                          </div>
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