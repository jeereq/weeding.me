"use client";

import { Heart, MapPinned } from "lucide-react";
import { useState } from "react";
import dynamic from 'next/dynamic'
import { title } from "process";
import { useRouter } from "next/navigation";
import InvitationFormInvitation from "../ui/invitation-form";

const MapModal = dynamic(
    () => import('@/components/ui/map-modal'),
    { ssr: false }
)

export default function TemplateYellow({ template }: any) {
    const router = useRouter();
    const [openForm, setOpenForm] = useState(false);
    const [colors] = useState<any>({
        green: 'bg-green-900',
        yellow: 'bg-yellow-900',
        red: 'bg-red-900',
        purple: 'bg-purple-900',
        indigo: 'bg-indigo-900',
        pink: 'bg-pink-900'
    })
    const [colorsText] = useState<any>({
        green: 'text-green-900',
        yellow: 'text-yellow-900',
        red: 'text-red-900',
        purple: 'text-purple-900',
        indigo: 'text-indigo-900',
        pink: 'text-pink-900'
    })
    const [months] = useState<any>({
        1: 'janvier',
        2: 'février',
        3: 'mars',
        4: 'avril',
        5: 'mai',
        6: 'juin',
        7: 'juillet',
        8: 'août',
        9: 'septembre',
        10: 'octobre',
        11: 'novembre',
        12: 'décembre',
    })
    const [state, setState] = useState<any>({
        dateDay: 18,
        dateMonth: 6,
        dateYear: 2025,
        dateTime: "18:00",
        dateLocation: "Avenue de la paix, Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS)",
        dateLocationLat: 4.323554693688447,
        dateLocationLng: 15.27127504348755,
        dateLocationAddress: "Avenue de la paix, Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS)",
        title: "Jeereq & Medine",
        men: "Jeereq",
        women: "Medine",
    })
    const [currentColor, setCurrentColor] = useState<string>('yellow');
    const [image, setImage] = useState<any>(null);
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
    const onChange = (e: any) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setImage(URL.createObjectURL(files[0]))
        }
    }

    const closeModalForm = () => {
        setOpenForm(false);
    }

    return <>
        <div className="w-fit relative shadow-lg mx-auto rounded-xl bg-white py-5">
            <div className="w-full px-5">
                <div
                    onClick={function () {
                        setOpenForm(true)
                    }}
                    className={`w-full cursor-pointer text-center font-bold h-fit py-3 mt-5 rounded-lg bg-black text-white`}>
                    Tester
                </div>
            </div>
            <div className="w-full flex justify-between items-center text-xs lg:text-md px-5">
                <div
                    className={`text-white w-fit px-5 py-3 cursor-pointer  rounded-full bg-black`}
                    onClick={function () {
                        router.push('/templates')
                    }}
                >
                    Retour
                </div>
                <div className="w-fit flex items-center justify-center p-5  rounded-full">
                    <div className={`w-fit px-5 py-3 ${colors[currentColor]}  rounded-full text-white uppercase`}>
                        {currentColor}
                    </div>
                </div>
                <div className="w-fit flex items-center justify-center">
                    <button
                        onClick={() => {
                            const colorKeys = Object.keys(colors);
                            const nextColorIndex = (colorKeys.indexOf(currentColor) + 1) % colorKeys.length;
                            setCurrentColor(colorKeys[nextColorIndex]);
                        }}
                        className={`w-fit px-5 py-3 ${colors[currentColor]} text-white rounded-full`}
                    >
                        Change Color
                    </button>
                </div>
            </div>
            <div className="aspect-[3.5/5] z-30 relative">
                <div className="absolute bg-[url('/bgYellow.png')] rotate-180 z-30 bg-cover bg-no-repeat h-[150px] top-0 left-0 right-0">

                </div>
                <img
                    src={image || template.imageUrl}
                    alt={template.title}
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute top-0 -bottom-[10px] left-0 right-0 bg-white bg-opacity-20 flex group items-center justify-center`}>
                    <input type="file" className="group-hover:block hidden" accept="image/*" onChange={onChange} />
                </div>
                <div className={`absolute  -bottom-[50px] left-0 right-0 pb-[150px] ${colorsText[currentColor]} text-4xl lg:text-6xl text-center`}>
                    <div className="w-full font-bold ">
                        {state.men}
                        <span className="w-fit px-2">&</span>
                        {state.women}
                    </div>
                    <div className="w-full text-2xl mt-2 flex justify-center">
                        <div className="w-fit px-1">
                            {state.dateDay}
                        </div>  /
                        <div className="w-fit px-1">
                            {state.dateMonth}
                        </div>
                        /
                        <div className="w-fit px-1">
                            {state.dateYear}
                        </div>
                    </div>
                </div>
                <div className={`absolute bg-[url('/bgYellow.png')] bg-cover bg-no-repeat h-[150px] -bottom-[5px] left-0 right-0 z-20 p-5 pt-10`}>
                </div>
            </div>
            <div className="w-full relative z-20 text-xs lg:text-sm overflow-hidden h-fit ">
                <div className={`w-full p-10 pt-5 h-full ${colorsText[currentColor]}`}>
                    <div className={`w-full font-bold  ${colors[currentColor]} text-center text-3xl py-3 rounded-full text-white mb-10`}>
                        Save the date
                    </div>
                    <p className="text-center text-sm px-5">
                        Deux âmes qui se sont trouvées, deux chemins qui n'en feront plus qu'un... C'est avec des étoiles plein les yeux et le cœur débordant d'amour que <b>Jeereq</b> et <b>Médine</b> vous convient à la célébration de leur union.
                    </p>
                    <div className="w-full flex items-center text-2xl  justify-center my-7">
                        <div className="w-fit px-1">
                            {state.dateDay}
                        </div>
                        <div className="w-fit px-1 py-2">
                            {months[state.dateMonth]}
                        </div>
                        <div className="w-fit px-1 py-2">
                            {state.dateYear}
                        </div>
                    </div>
                    <p className="text-center text-sm px-5">
                        Rendez-vous le <b>{state.dateDay}/{state.dateMonth}/{state.dateYear}</b> à <b>{state.dateTime}</b> sur le(l') {state.dateLocationAddress} pour être témoins de notre <b> "oui"</b> pour la vie.
                        Votre amour et votre soutien sont les plus beaux cadeaux que nous puissions espérer.
                    </p>
                    <p
                        className="text-center cursor-pointer text-sm px-5 mt-10 w-fit mx-auto"
                    >
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
            <div className={`w-full z-10 text-xs lg:text-sm relative bg-white`}>
                <div className="w-full p-5">
                    <div className={`w-full text-center font-bold h-fit p-5 mt-5 rounded-full ${colors[currentColor]} text-white`}>
                        Commander
                    </div>
                </div>
            </div>
        </div>
        <InvitationFormInvitation openModal={openForm} closeModalForm={closeModalForm} formData={formData} setFormData={setFormData} title="" onSubmit={function () { }} invitationTypes={[]} />
    </>
}