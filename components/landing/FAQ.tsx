"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Combien coûtent vos invitations électroniques ?",
    answer: "Nous proposons plusieurs formules adaptées à vos besoins. Notre formule de base commence à 19,99€ et vous permet de créer et d'envoyer jusqu'à 50 invitations. Des forfaits plus importants sont disponibles pour les événements avec plus d'invités."
  },
  {
    question: "Comment mes invités recevront-ils l'invitation ?",
    answer: "Vos invités recevront un lien par email ou SMS qui les dirigera vers votre invitation personnalisée. Ils pourront y accéder sur leur téléphone, tablette ou ordinateur sans avoir besoin de télécharger quoi que ce soit."
  },
  {
    question: "Puis-je suivre qui a consulté mon invitation ?",
    answer: "Absolument ! Notre plateforme vous permet de voir qui a ouvert votre invitation et qui a répondu. Vous recevrez également des notifications en temps réel lorsque quelqu'un consulte votre invitation ou y répond."
  },
  {
    question: "Est-il possible d'ajouter des fonctionnalités interactives ?",
    answer: "Oui, selon la formule choisie, vous pouvez ajouter des éléments interactifs comme des cartes, des galeries photos, des liens vers des listes de cadeaux, ou même des formulaires personnalisés pour recueillir des informations spécifiques auprès de vos invités."
  },
  {
    question: "Puis-je modifier mon invitation après l'avoir envoyée ?",
    answer: "Oui, vous pouvez modifier votre invitation à tout moment, même après l'avoir envoyée. Les changements seront immédiatement visibles pour tous vos invités. C'est l'un des grands avantages des invitations électroniques !"
  },
  {
    question: "Proposez-vous des designs personnalisés pour mon événement ?",
    answer: "En plus de notre vaste bibliothèque de designs, nous proposons un service de personnalisation sur mesure pour créer un design unique qui correspond parfaitement à votre événement. Contactez-nous pour en savoir plus sur ce service premium."
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Questions fréquentes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour commencer avec nos invitations électroniques.
            </p>
          </motion.div>
        </div>

        <div className="w-full mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <AccordionItem value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}