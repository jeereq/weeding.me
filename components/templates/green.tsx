"use client";

import { Heart } from "lucide-react";

export default function TemplateGreen({ template }: any) {

    return <>
        <div className="w-fit relative">
            <div className="aspect-[3.5/5] z-30 relative rounded-b-full overflow-hidden">
                <div className="absolute top-[30px] z-20 text-4xl text-white text-center w-full p-5">
                    <div className="w-fit px-5 py-3 bg-green-900 mx-auto">
                        Save the date
                    </div>
                    <span className="mt-5 w-fit mx-auto block">
                        18/06/2025
                    </span>
                </div>
                <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-green-900 bg-opacity-50"></div>
                <div className="absolute bottom-[100px] z-20 text-5xl text-white text-center w-full p-5">
                    Jeereq
                    <br />
                    &
                    <br />
                    Medine
                </div>
            </div>
            <div className="w-full -translate-y-[15%] relative z-20  overflow-hidden p-5 h-fit rounded-t-full">
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
                    <p className="text-center text-sm px-5 mt-10 w-fit mx-auto">
                        <Heart className="h-12 w-12" />
                    </p>
                </div>
            </div>
            <div className="w-full -translate-y-[28%] z-10 relative bg-green-900 h-[600px]">
                <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-green-900 bg-opacity-10"></div>
            </div>
            <div className="w-full -translate-y-[28%] z-20 relative bg-green-900 h-[600px]">

            </div>
        </div>

    </>
}