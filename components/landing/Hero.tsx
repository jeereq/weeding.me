"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const headlines = [
  "Des invitations qui captiveront vos invités",
  "Créez des moments mémorables, sans papier",
  "L'élégance digitale pour vos célébrations"
];

export default function Hero() {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const router = useRouter()
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/10 py-24 md:py-32">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-10"></div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display mb-6 text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              {headlines[currentHeadline]}
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground md:text-xl mb-10">
              Des invitations électroniques élégantes et personnalisables pour vos mariages,
              anniversaires et tous vos événements spéciaux. Simple, écologique et mémorable.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
              <Button size="lg"
                onClick={function () {
                  router.push("/contact")
                }}
                className="rounded-full text-md px-8">
                Créer mon invitation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={function () {
                router.push("/templates")

              }} variant="outline" size="lg" className="rounded-full text-md px-8">
                Découvrir nos designs
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}