"use client";
import { motion } from "framer-motion";
import { CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import TemplateGreen from "@/components/templates/green";
import TemplateYellow from "@/components/templates/yellow";
import TemplateRed from "@/components/templates/red";

export default function TemplateContent({ template, id }: any) {

    return (
        <main className="min-h-screen bg-gray-100">
            <Header />
            <section className="pt-32 pb-20 container mx-auto">
                <CardContent className="p-6">
                    <h3 className="font-medium text-lg text-center">{template.title}</h3>
                    <p className="text-muted-foreground text-sm text-center">{template.style}</p>
                </CardContent>
                <div className="w-full 0 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-full lg:w-[500px] mx-auto">
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {id == 1 && <TemplateGreen template={template} />}
                            {id == 2 && <TemplateYellow template={template} />}
                            {id == 3 && <TemplateRed template={template} />}
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer />
        </main >
    );
}