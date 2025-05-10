"use client";
import { Camera, Heart, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import InvitationFormInvitation from "../ui/invitation-form";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic'
import TemplateImages from "../ui/templateImages";
import { createHeart } from "@/lib/utils";
const MapModal = dynamic(
    () => import('@/components/ui/map-modal'),
    { ssr: false }
)

export default function TemplateGreen({ template, data, hide = false }: any) {
    const router = useRouter();
    const [openForm, setOpenForm] = useState(false);
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
        12: 'décembre',
    })
    const [image, setImage] = useState<any>(null);
    const [formData, setFormData] = useState<any>({
        template: template.id,
        ...data
    });
    const onChange = (e: any) => {
        const { files } = e.target;
        if (files && files.length > 0) {
            setImage(URL.createObjectURL(files[0]))
            setFormData(function (state: any) {
                return {
                    ...state,
                    image: URL.createObjectURL(files[0])
                }
            })
        }
    }
    const closeModalForm = () => {
        setOpenForm(false);
    }

    useEffect(function () {
        if (formData.heart) {
            const id = setInterval(createHeart, 50);
            return () => clearInterval(id);
        }
    }, [formData.heart])

    return <>
        {hide && <TemplateImages setImage={function (url: string) {
            setImage(url)
            setFormData(function (state: any) {
                return {
                    ...state,
                    image: url
                }
            })
        }} />}
        <div className="w-full grid grid-cols-1 py-5 gap-2 relative shadow-lg mb-10 mx-auto rounded-xl overflow-hidden bg-white">
            <div className="w-full px-5 grid grid-cols-1 gap-2">
                <div
                    onClick={function () {
                        setOpenForm(true)
                    }}
                    className={`w-full cursor-pointer text-center font-bold h-fit py-2 rounded-lg bg-black text-white`}>
                    Personnaliser le model
                </div>

                <div
                    onClick={function () {
                        reactToPrintFn()
                    }}
                    className={`w-full hidden cursor-pointer text-center font-bold h-fit py-2 rounded-lg bg-black text-white`}>
                    Imprimer
                </div>
            </div>
            <div className="w-full grid lg:grid-cols-3 gap-2 flex items-center text-xs lg:text-md px-5">
                <div
                    className={`text-white w-full font-bold text-center px-5 py-3 cursor-pointer  rounded-lg bg-black`}
                    onClick={function () {
                        router.push('/templates')
                    }}
                >
                    Retour
                </div>
                <div className="w-full flex items-center justify-center  rounded-lg">
                    <div style={{
                        color: formData.color
                    }} className={`w-fit text-center w-full py-3 rounded-lg text-white uppercase font-bold`}>
                        {formData.color}
                    </div>
                </div>
                <input type="color" name="custome"
                    value={formData.color}
                    onChange={function (e) {
                       
                        setFormData(function (state: any) {
                            return {
                                ...state,
                                color: e.target.value
                            }
                        })

                    }}
                    className="h-[40px] w-full cursor-pointer border-2 border-black rounded-lg" placeholder="Couleur"
                />
            </div>
        </div>
        <div ref={contentRef} className="w-fit h-fit relative shadow-lg mx-auto rounded-xl overflow-hidden bg-white">
            <div className="aspect-[3/5] lg:aspect-[3.25/5] z-30 relative rounded-b-full overflow-hidden">
                <div className="absolute top-[30px] z-20 text-3xl lg:text-4xl font-bold text-white text-center w-full p-5">
                    <div style={{
                        background: formData.color
                    }} className={`w-fit px-5 py-3  mx-auto`}>
                        Save the date
                    </div>
                    <span className="mt-5 w-fit mx-auto block">
                        {formData.day} / {formData.month}
                    </span>
                </div>
                <img
                    src={image || template.imageUrl}
                    alt={template.title}
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div style={{
                    background: formData.color,
                    opacity: 0.30
                }} className={`absolute top-0 bottom-0 left-0 right-0 group flex items-center justify-center bg-opacity-50`}>
                    <input type="file" hidden id="camera" className="hidden" accept="image/*" onChange={onChange} />
                    <label htmlFor="camera" className={`group-hover:block text-white hidden cursor-pointer text-3xl`}>
                        <Camera size={48} className="text-2xl" />
                    </label>
                </div>
                <div className="absolute bottom-[90px] z-20 text-5xl font-bold lg:text-7xl text-white text-center w-full p-5">
                    {formData.men}
                    <br />
                    &
                    <br />
                    {formData.women}
                </div>
            </div>
            <div className="w-full -translate-y-[15%] relative z-20 text-xs lg:text-sm overflow-hidden p-5 h-fit rounded-t-full">
                <div style={{
                    background: formData.color,

                }} className={`w-full text-white p-10 pt-[170px] lg:pt-[150px] h-full rounded-t-full`}>
                    <p className="text-center text-sm px-5">
                        Deux âmes qui se sont trouvées, deux chemins qui n'en feront plus qu'un... C'est avec des étoiles plein les yeux et le cœur débordant d'amour que  <span className="font-bold">{formData.men}</span> & <span className="font-bold">{formData.women}</span> vous convient à la célébration de leur union.
                    </p>
                    <div className="w-full flex items-center justify-center mt-10">
                        <div className="w-fit border-t-2  border-dashed border-b-2 px-5 py-2">
                            le
                        </div>
                        <div className="w-fit font-bold border-dashed text-5xl px-5">
                            {formData.day}
                        </div>
                        <div className="w-fit border-t-2 border-b-2 border-dashed px-5 py-2">
                            {months[formData.month]}
                        </div>
                    </div>
                    <div className="w-full text-center mb-10">
                        {formData.year}
                    </div>
                    <p className="text-center text-sm px-5">
                        Rendez-vous le <b>{formData.day}/{formData.month}/{formData.year}</b> à <b>{formData.time}</b> sur le(la)(l') {formData.address} pour être témoins de notre <b> "oui"</b> pour la vie.
                        Votre amour et votre soutien sont les plus beaux cadeaux que nous puissions espérer.
                    </p>
                    <p onClick={function () {
                        setIsMapOpen(true)
                    }}
                        className="text-center cursor-pointer text-sm px-5 mt-10 w-fit mx-auto"
                    >

                        <MapPinned className="h-12 w-12 mx-auto " />
                        <div className="w-full">
                            {formData.lat && formData.lng && (
                                <p className="text-sm text-white mt-2">
                                    Coordonnées : {formData.lat}, {formData.lng}
                                </p>
                            )}
                        </div>
                    </p>
                    <p className="text-center text-sm px-5 mt-10 w-fit mx-auto text-center">
                        Vous nous trouverez sur l'avenue de la paix, à Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS).
                    </p>
                    <p className="text-center text-sm px-5 mt-10 w-fit mx-auto">
                        <Heart className="h-12 w-12 coeur-battant" />
                    </p>
                    <div className={`text-lg lg:text-xl font-bold mt-5 pb-2 text-center w-full p-5 pb-0`}>
                        {formData.nameInvitation}
                    </div>
                    <p className="text-center text-sm px-5 w-fit mx-auto text-center">
                        Préparez-vous à célébrer l'amour ! <span className="font-bold">{formData.men}</span> & <span className="font-bold">{formData.women}</span> vont se dire  <b>"oui"</b> pour la vie.
                    </p>
                </div>
            </div>
            <div className={`w-full -translate-y-[35%] z-10 text-xs lg:text-sm relative  h-[700px]`}>
                <img
                    src={image || template.imageUrl}
                    alt={template.title}
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute bg-[url('/bgYellow.png')] bg-cover bg-no-repeat h-[150px] -bottom-[5px] left-0 right-0 z-20 p-5 pt-10`}>
                </div>
                <div className="absolute top-0 bottom-0 left-0 right-0 "></div>

            </div>
        </div>
        <MapModal
            isOpen={isMapOpen}
            onClose={() => setIsMapOpen(false)}
            onLocationSelect={() => { }}
            initialLocation={{ lat: formData.lat, lng: formData.lng }}
        />
        <InvitationFormInvitation openModal={openForm} closeModalForm={closeModalForm} formData={formData} setFormData={setFormData}
            onSubmit={function () {
            }} invitationTypes={[]} />
    </>
}