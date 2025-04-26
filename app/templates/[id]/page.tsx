
import TemplateContent from "./components/content";
import { templates } from "@/lib/utils";

export function generateStaticParams() {
    return templates.map((template: any) => ({
        id: `${template.id}`,
    }));
}

export default function Template({ params }: { params: { id: string } }) {

    const template = templates.find((template) => template.id == params.id) || templates[0];
    if (!template) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Invitation non trouvée</p>
            </div>
        );
    }
    return (
        <TemplateContent template={template} />
    );
}