"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useRouter } from "next/navigation";
import { templates } from "@/lib/utils";
import { useFetchData } from "@/hooks/useFetchData";
import { useData } from "@/lib/data";


export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { loading } = useFetchData({ uri: "auth/users/templates" })

  const filteredTemplates = templates.filter((template) => (
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.style.toLowerCase().includes(searchTerm.toLowerCase())) && template.active
  );

  const viewTemplateSelect = (templateId: number) => {
    router.push(`/templates/${templateId}?title=${encodeURIComponent(templates.find(t => t.id === templateId)?.title || '')}`);
  };


  if (loading) return <div className="w-full">
    <h1 className="font-bold text-center">
      ...Chargement
    </h1>
  </div>
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-center tracking-tight mb-4">
              Nos Templates
            </h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre collection de templates élégants et personnalisables pour tous vos événements.
            </p>
          </motion.div>
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Rechercher un template..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="overflow-hidden group h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-background/50 backdrop-blur-sm">
                    <div className="aspect-[4.5/5] relative overflow-hidden">
                      <img
                        src={template.imageUrl}
                        alt={template.title}
                        className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute h-full inset-0  bg-gradient-to-t from-background/80 to-transparent lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="w-full h-fit grid gap-2">

                          <Button
                            variant="secondary"
                            className="w-full backdrop-blur-sm"
                            onClick={() => viewTemplateSelect(template.id)}
                          >
                            Tester le model
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg">{template.title}</h3>
                      <p className="text-muted-foreground text-sm">{template.style}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}