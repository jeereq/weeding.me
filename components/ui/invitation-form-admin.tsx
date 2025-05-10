"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic'
import { useFetchData } from '@/hooks/useFetchData';
import { templates } from '@/lib/utils';
import { useData } from '@/lib/data';

const MapModal = dynamic(
    () => import('@/components/ui/map-modal'),
    { ssr: false }
)

const InvitationFormInvitationAdmin = ({ onSubmit, formData, setFormData, openModal, closeModalForm }: {
    onSubmit: (e: React.FormEvent) => void,
    formData: any,
    setFormData: (data: any) => void,
    openModal: boolean,
    closeModalForm: any
}) => {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const { user, pushInvitation } = useData()
    const { loading, fetch } = useFetchData({ uri: "auth/invitations/commanderWithoutUser" })

    const handleMapLocationSelect = (location: { lat: number; lng: number }) => {
        setFormData({
            ...formData,
            lat: location.lat,
            lng: location.lng
        });
    };
    function Calcule(): number {
        if (formData.invitations >= 10000) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 50)
        } else if (formData.invitations >= 1000) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 40)
        } else if (formData.invitations >= 500) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 30)
        } else if (formData.invitations >= 400) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 25)
        } else if (formData.invitations >= 300) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 20)
        } else if (formData.invitations >= 200) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 15)
        } else {
            return (formData.invitations * 0.7)
        }
    }
    function CalculeSansReduction(): number {
        return (formData.invitations * 0.7)
    }
    if (!openModal) return <div className="w-fit"></div>
    return (<>
        <div className="w-full fixed top-0 bottom-0 left-0 right-0 flex items-center bg-black bg-opacity-30 justify-center z-50">
            <div className="w-11/12 md:w-[500px] h-fit bg-white relative shadow-lg rounded-xl p-5">
                <h1 className="font-bold text-xl">Ajouter une invitation</h1>
                <form
                    onSubmit={function (e: any) {
                        e.preventDefault()
                        const { id } = user
                        fetch({ ...formData, user: id }, "POST")
                            .then(function ({ data: { data, message } }: any) {
                                if (message) {
                                    alert(message)
                                    onSubmit(e)
                                    pushInvitation(data, user)
                                    closeModalForm()
                                }
                            })
                    }} className="space-y-4 w-full h-[70vh] overflow-y-scroll">
                    <div className="w-full space-y-2">
                        <Label htmlFor="typeInvitation">Animation</Label>
                        <select name="typeInvitation" id="typeInvitation" className='w-full py-2'
                            value={formData.heart}
                            onChange={(e) => setFormData({
                                ...formData,
                                heart: e.target.value == "true",
                            })}>
                            <option value={"true"}>
                                Coeur
                            </option>
                            <option value={"false"}>
                                Pas de coeur
                            </option>
                        </select>
                    </div>
                    <div className="w-full space-y-2">
                        <Label htmlFor="template">Template</Label>
                        <select name="template" required id="template" className='w-full py-2'
                            value={formData.template}
                            onChange={(e) => setFormData({
                                ...formData,
                                template: e.target.value
                            })}>
                            {templates.filter(function ({ active }) {
                                return active
                            }).map(function (item: any) {
                                return <option value={item.id}>
                                    {item.title}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre de l'invitation</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ex: Mariage de Medine et Jeereq"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="men">Nom du maris</Label>
                        <Input
                            id="men"
                            value={formData.men}
                            onChange={(e) => setFormData({ ...formData, men: e.target.value })}
                            placeholder="Ex: Jeereq"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="women">Nom de la femme</Label>
                        <Input
                            id="women"
                            value={formData.women}
                            onChange={(e) => setFormData({ ...formData, women: e.target.value })}
                            placeholder="Ex: Medine"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date de l'événement</Label>
                        <Input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({
                                ...formData,
                                date: e.target.value,
                                day: new Date(e.target.value).getDate(),
                                month: new Date(e.target.value).getMonth() + 1,
                                year: new Date(e.target.value).getFullYear(),
                            })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time">Heure et minute</Label>
                        <div className="w-full gap-1">
                            <Input
                                id="time"
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <div className="flex gap-2 grid-cols-1 grid  mb-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsMapOpen(true)}
                            >
                                Choisir sur la carte
                            </Button>
                        </div>
                        <Textarea
                            placeholder="Adresse complète"
                            value={formData.address}
                            onChange={(e) => setFormData({
                                ...formData,
                                address: e.target.value
                            })}
                            required
                        />
                        {formData.lat && formData.lng && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Coordonnées : {formData.lat}, {formData.lng}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="initiateurDeLaDemande">Nom complet du demandeur</Label>
                        <Input
                            id="initiateurDeLaDemande"
                            value={formData.initiateurDeLaDemande}
                            onChange={(e) => setFormData({ ...formData, initiateurDeLaDemande: e.target.value })}
                            placeholder="Ex: Mariage de Jeereq et Medine"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Numéro de téléphone</Label>
                        <Input
                            type='tel'
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Ex: +243 817 125 577"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="invitations">Nombre d'invitations (Minimum de 50)</Label>
                        <Input
                            id="invitations"
                            minLength={50}
                            min={50}
                            type='number'
                            value={formData.invitations}
                            onChange={(e) => setFormData({ ...formData, invitations: e.target.value })}
                            placeholder="Ex: 200$"
                            required
                        />
                    </div>

                    <div className="w-full space-y-2">
                        <Label >
                            Le coût unitaire d'une invitation est de  <b>0.7$</b>
                        </Label>
                        <p>
                            <span className="font-bold pr-2">Coût :</span> <b>{Calcule().toFixed(2)}$</b> <span className="px-1 line-through">{CalculeSansReduction().toFixed(2)}$</span>
                        </p>
                        {(formData.invitations >= 200 && formData.invitations <= 299) && <Label className='pr-2' >
                            Pour plus de 200 invitations la reduction est de 15%
                        </Label>}
                        {(formData.invitations >= 300 && formData.invitations <= 399) && <Label className='pr-2' >
                            Pour plus de 300 invitations la reduction est de 20%
                        </Label>}
                        {(formData.invitations >= 400 && formData.invitations <= 499) && <Label className='pr-2' >
                            Pour plus de 400 invitations la reduction est de 25%
                        </Label>}
                        {(formData.invitations >= 500 && formData.invitations <= 999) && <Label className='pr-2' >
                            Pour plus de 500 invitations la reduction est de 30%
                        </Label>}
                        {(formData.invitations >= 1000 && formData.invitations <= 9999) && <Label className='pr-2' >
                            Pour plus de 1000 invitations la reduction est de 40%
                        </Label>}
                        {(formData.invitations >= 10000) && <Label className='pr-2' >
                            Pour plus de 10000 invitations la reduction est de 50%
                        </Label>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({
                                ...formData,
                                city: e.target.value,
                            })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Pays</Label>
                        <Input
                            id="country"
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({
                                ...formData,
                                country: e.target.value,
                            })}
                            required
                        />
                    </div>
                    <div className="w-full gap-2 grid grid-cols-2 mt-2 border-t">
                        <Button onClick={closeModalForm} type="submit" className="w-full">
                            Annuler
                        </Button>
                        <Button type="submit" className="w-full bg-green-900">
                            {loading ? "...Chargement" : "Envoyer"}
                        </Button>
                    </div>
                </form>
                <MapModal
                    isOpen={isMapOpen}
                    onClose={() => setIsMapOpen(false)}
                    onLocationSelect={handleMapLocationSelect}
                    initialLocation={{ lat: formData.lat, lng: formData.lng }}
                />
            </div>
        </div>
    </>
    );
}
export default InvitationFormInvitationAdmin;