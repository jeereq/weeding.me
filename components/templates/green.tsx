"use client";

import { Heart, MapPinned } from "lucide-react";
import MapModal from "../ui/map-modal";
import { useState } from "react";

export default function TemplateGreen({ template }: any) {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [formData, setFormData] = useState<any>({
        title: '',
        event_date: '',
        template_id: '',
        type: 'autre',
        location: {
            lat: 4.323554693688447,
            lng: 15.27127504348755,
            address: '',
        },
    });
    const handleMapLocationSelect = (location: { lat: number; lng: number }) => {
        setFormData({
            ...formData,
            location: {
                ...formData.location,
                lat: location.lat,
                lng: location.lng,
            },
        });
    };
    return <>
        <div className="w-fit relative shadow-lg mx-auto rounded-xl overflow-hidden bg-white">
            <div className="aspect-[3.5/5] z-30 relative rounded-b-full overflow-hidden">
                <div className="absolute top-[30px] z-20 text-4xl text-white text-center w-full p-5">
                    <div className="w-fit px-5 py-3 bg-green-900 mx-auto">
                        Save the date
                    </div>
                    <span className="mt-5 w-fit mx-auto block">
                        18/06
                    </span>
                </div>
                <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-green-900 bg-opacity-50"></div>
                <div className="absolute bottom-[90px] z-20 text-5xl text-white text-center w-full p-5">
                    Jeereq
                    <br />
                    &
                    <br />
                    Medine
                </div>
            </div>
            <div className="w-full -translate-y-[17.5%] relative z-20  overflow-hidden p-5 h-fit rounded-t-full">
                <div className="w-full text-white p-10 pt-[150px] h-full bg-green-900  rounded-t-full">
                    <p className="text-center text-sm px-5">
                        Deux âmes qui se sont trouvées, deux chemins qui n'en feront plus qu'un... C'est avec des étoiles plein les yeux et le cœur débordant d'amour que <b>Jeereq</b> et <b>Médine</b> vous convient à la célébration de leur union.
                    </p>
                    <div className="w-full flex items-center justify-center mt-10">
                        <div className="w-fit border-t border-b px-5 py-2">
                            le
                        </div>
                        <div className="w-fit font-bold text-5xl px-5">
                            18
                        </div>
                        <div className="w-fit border-t border-b  px-5 py-2">
                            juin
                        </div>
                    </div>
                    <div className="w-full text-center mb-10">
                        2025
                    </div>
                    <p className="text-center text-sm px-5">
                        Rendez-vous le <b>18/06/2025</b> à <b>18 Heure 00</b> sur le fleuve congo pour être témoins de notre <b> "oui"</b> pour la vie. Votre amour et votre soutien sont les plus beaux cadeaux que nous puissions espérer.
                    </p>
                    <p
                        onClick={() => setIsMapOpen(true)} className="text-center cursor-pointer text-sm px-5 mt-10 w-fit mx-auto">
                        <MapPinned className="h-12 w-12" />
                    </p>
                    <p className="text-center text-sm px-5 mt-10 w-fit mx-auto text-center">
                        Vous nous trouverez sur l'avenue de la paix, à Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS).
                    </p>
                    <p className="text-center text-sm px-5 mt-10 w-fit mx-auto">
                        <Heart className="h-12 w-12" />
                    </p>
                </div>
            </div>
            <div className="w-full -translate-y-[38%] z-10 relative bg-green-900 h-[600px]">
                <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-green-900 bg-opacity-10"></div>
            </div>
            <div className="w-full text-green-950 -translate-y-[40%] z-20 relative bg-white min-h-[500px] p-10">
                <h1 className="text-center text-2xl font-bold">DRESS CODE</h1>
                <div className="w-full py-5">
                    <h2 className="font-medium text-xl text-center">
                        Voici le themes choisis
                    </h2>
                    <div className="w-11/12 mx-auto flex justify-between pt-5">
                        <div className="w-[60px] border-2 h-[60px] bg-red-500 rounded-full"></div>
                        <div className="w-[60px] border-2 h-[60px] bg-green-500 rounded-full"></div>
                        <div className="w-[60px] border-2 h-[60px] bg-yellow-500 rounded-full"></div>
                        <div className="w-[60px] border-2 h-[60px] bg-blue-700 rounded-full"></div>
                        <div className="w-[60px] border-2 h-[60px] bg-red-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
        <MapModal
            isOpen={isMapOpen}
            onClose={() => setIsMapOpen(false)}
            onLocationSelect={handleMapLocationSelect}
            initialLocation={
                formData.location.latitude && formData.location.longitude
                    ? { lat: formData.location.latitude, lng: formData.location.longitude }
                    : { lat: 4.323554693688447, lng: 15.27127504348755 }
            }
        />
    </>
}