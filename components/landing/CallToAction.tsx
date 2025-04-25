"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BadgeCheck, ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                Prêt à créer des invitations inoubliables ?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Rejoignez des milliers d'utilisateurs satisfaits et commencez à créer vos invitations électroniques dès aujourd'hui.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex  flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center mb-12">
              <Button size="lg" variant="secondary" className="rounded-full text-md px-8">
                Créer mon invitation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="secondary" size="lg" className="rounded-full text-md px-8 border-white/30 ">
                Voir les exemples
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">

              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Satisfaction garantie ou remboursé</span>
              </div>
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Support client 7/7</span>
              </div>
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Designs modifiables à l'infini</span>
              </div>
              <div className="flex items-center">
                <BadgeCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Suivi des réponses en temps réel</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}