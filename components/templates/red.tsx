"use client";
import { Camera, Heart, MapPinned } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import InvitationFormInvitation from "../ui/invitation-form";
import dynamic from 'next/dynamic'
import TemplateImages from "../ui/templateImages";
const MapModal = dynamic(
    () => import('@/components/ui/map-modal'),
    { ssr: false }
)

export default function TemplateRed({ template }: any) {
    const router = useRouter();
    const [openForm, setOpenForm] = useState(false);
    const [colors, setColors] = useState<any>({
        custome: "black"
    })
    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: template.style,
        pageStyle: `
            @page {
                size: 500px;   /* auto is the initial value */
                margin: 0;  /* this affects the margin in the printer settings */
            }
        `});
    const [isMapOpen, setIsMapOpen] = useState(false);

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
        12: 'décembre'
    })

    const [currentColor] = useState<string>('custome');
    const [image, setImage] = useState<any>(null);
    const [formData, setFormData] = useState<any>({
        dateDay: new Date().getDate(),
        dateMonth: new Date().getMonth() + 1,
        dateYear: new Date().getFullYear(),
        date: new Date().toString(),
        dateTime: "18:00",
        template: template.id,
        dateLocation: "Avenue de la paix, Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS)",
        dateLocationLat: 4.323554693688447,
        dateLocationLng: 15.27127504348755,
        dateLocationAddress: "Avenue de la paix, Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS)",
        title: "Jeereq & Medine",
        men: "Jeereq",
        women: "Medine",
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
        <TemplateImages setImage={setImage} />
        <div className="w-full grid grid-cols-1 py-5 gap-2 relative shadow-lg mb-10 mx-auto rounded-xl overflow-hidden bg-white">
            <div className="w-full px-5 grid grid-cols-1 gap-2">
                <div
                    onClick={function () {
                        setOpenForm(true)
                    }}
                    className={`w-full cursor-pointer text-center font-bold h-fit py-2 rounded-lg bg-black text-white`}>
                    Tester
                </div>

                <div
                    onClick={function () {
                        reactToPrintFn()
                    }}
                    className={`w-full lg:block hidden cursor-pointer text-center font-bold h-fit py-2 rounded-lg bg-black text-white`}>
                    Imprimer
                </div>
            </div>
            <div className="w-full grid lg:grid-cols-3 gap-2 flex items-center text-xs lg:text-md px-5">
                <div
                    className={`text-white w-full text-center px-5 py-3 cursor-pointer  rounded-lg bg-black`}
                    onClick={function () {
                        router.push('/templates')
                    }}
                >
                    Retour
                </div>
                <div className="w-full flex items-center justify-center  rounded-lg">
                    <div style={{
                        color: colors[currentColor]
                    }} className={`w-fit text-center w-full py-3 rounded-lg text-white uppercase font-bold`}>
                        {colors[currentColor]}
                    </div>
                </div>
                <input type="color" name="custome"
                    onChange={function (e) {
                        setColors(function (state: any) {
                            return {
                                ...state,
                                custome: e.target.value
                            }
                        })
                    }}
                    className="h-[40px] w-full cursor-pointer border-2 border-black rounded-lg" placeholder="Couleur"
                />
            </div>
        </div>
        <div ref={contentRef} className="w-fit  pb-5 relative shadow-lg mx-auto rounded-xl overflow-hidden bg-white">
            <div className="w-full relative z-20 text-xs lg:text-sm overflow-hidden h-fit">
                <div className={`w-full p-10 h-full `} style={{
                    color: colors[currentColor],
                }}>
                    <p className="text-center text-sm px-5">
                        Deux âmes qui se sont trouvées, deux chemins qui n'en feront plus qu'un... C'est avec des étoiles plein les yeux et le cœur débordant d'amour que <b>Jeereq</b> et <b>Médine</b> vous convient à la célébration de leur union.
                    </p>
                    <div className="w-full flex items-center justify-center mt-10">
                        <div className="w-fit border-t-2  border-dashed border-b-2 px-5 py-2">
                            le
                        </div>
                        <div className="w-fit font-bold border-dashed text-5xl px-5">
                            {formData.dateDay}
                        </div>
                        <div className="w-fit border-t-2 border-b-2 border-dashed px-5 py-2">
                            {months[formData.dateMonth]}
                        </div>
                    </div>
                    <div className="w-full text-center mb-10">
                        {formData.dateYear}
                    </div>
                    <p className="text-center text-sm px-5">
                        Rendez-vous le <b>{formData.dateDay}/{formData.dateMonth}/{formData.dateYear}</b> à <b>{formData.dateTime}</b> sur le(la)(l') {formData.dateLocationAddress} pour être témoins de notre <b> "oui"</b> pour la vie.
                        Votre amour et votre soutien sont les plus beaux cadeaux que nous puissions espérer.
                    </p>

                </div>
            </div>
            <div className="aspect-[3/5] overflow-hidden z-30 relative group bg-white">
                <div className="absolute bg-[url('/bgYellow.png')] rotate-180 z-30 bg-cover bg-no-repeat h-[150px] -top-1 left-0 right-0">

                </div>
                <img
                    src={image || template.imageUrl}
                    alt={template.title}
                    className="object-cover z-10 h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute top-0 bottom-0 left-0 group flex items-center justify-center right-0 z-20 ${colors[currentColor]} bg-opacity-50`}>
                    <input type="file" hidden id="camera" className="hidden" accept="image/*" onChange={onChange} />
                    <label htmlFor="camera" className={`group-hover:block text-white hidden cursor-pointer text-3xl`}>
                        <Camera size={48} className="text-2xl" />
                    </label>
                </div>
                <div className="absolute bg-[url('/reverse.png')] z-30 bg-cover bg-no-repeat h-[150px] -bottom-1 left-0 right-0">

                </div>
            </div>
            <div className={`w-full z-10 text-xs lg:text-sm relative bg-white h-fit `} style={{
                color: colors[currentColor]
            }}>
                <div className="z-20 text-2xl lg:text-3xl font-bold text-white text-center w-full p-5">
                    <div className={`w-fit px-10 py-3  rounded-full mx-auto`} style={{
                        background: colors[currentColor]
                    }}>
                        Save the date
                    </div>
                </div>
                <div className={`text-3xl lg:text-5xl font-bold mt-5 text-center w-full p-5`}>
                    {formData.men}
                    <span className="w-fit px-2"> & </span>
                    {formData.women}
                </div>
                <p onClick={function () {
                    setIsMapOpen(true)
                }}
                    className="text-center cursor-pointer text-sm px-5 mt-5 w-fit mx-auto"
                >
                    <MapPinned className="h-12 w-12 mx-auto" />
                    <div className="w-full">
                        {formData.dateLocationLat && formData.dateLocationLng && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Coordonnées : {formData.dateLocationLat}, {formData.dateLocationLng}
                            </p>
                        )}
                    </div>
                </p>
                <p className="text-center text-sm px-5 mt-5 w-fit mx-auto text-center">
                    Vous nous trouverez sur l'avenue de la paix, à Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS).
                </p>
                <p className="text-center text-sm px-5 mt-5 w-fit mx-auto">
                    <Heart className="h-12 w-12" />
                </p>
                {/* <div className="w-full px-5">
                    <div className={`w-full text-center font-bold  h-fit p-5 mt-5 rounded-full text-white`}
                        style={{
                            background: colors[currentColor]
                        }}>
                        Commander
                    </div>
                </div> */}
            </div>
        </div>
        <MapModal
            isOpen={isMapOpen}
            onClose={() => setIsMapOpen(false)}
            onLocationSelect={() => { }}
            initialLocation={{ lat: formData.dateLocationLat, lng: formData.dateLocationLng }}
        />
        <InvitationFormInvitation openModal={openForm} closeModalForm={closeModalForm} formData={formData} setFormData={setFormData} onSubmit={function (e) {
            e.preventDefault()
            e.stopPropagation()
        }} invitationTypes={[]} />
    </>
}