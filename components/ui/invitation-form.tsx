"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic'
import CommandFormInvitation from './command-form';
import { useFetchData } from '@/hooks/useFetchData';
import { useData } from '@/lib/data';

const MapModal = dynamic(
    () => import('@/components/ui/map-modal'),
    { ssr: false }
)

const InvitationFormInvitation = ({ onSubmit, formData, setFormData, openModal, closeModalForm }: {
    onSubmit: (e: React.FormEvent) => void,
    formData: any,
    setFormData: (data: any) => void,
    openModal: boolean,
    closeModalForm: any
}) => {
    const { user, updateInvitation } = useData()
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isCommandOpen, setIsCommandOpen] = useState(false);
    const { loading: loadingUpdate, fetch: fetchUpdate } = useFetchData({ uri: "auth/invitations/commandeUpdate" })

    const openCommandForm = (e: any) => {
        if (formData.id) {
            fetchUpdate({ ...formData }, "POST")
                .then(function ({ data: { message, data } }: any) {
                    if (message) {
                        alert(message)
                        onSubmit({ ...e })
                        updateInvitation(data, user)
                        closeModalForm()
                    }
                })
        } else {
            setIsCommandOpen(true)
        }
    }
    const closeCommandForm = () => {
        setIsCommandOpen(false)
    }
    const handleMapLocationSelect = (location: { lat: number; lng: number }) => {
        setFormData(function (formData: any) {
            return {
                ...formData,
                lat: location.lat,
                lng: location.lng
            }
        });
    };
    if (!openModal) return <div className="w-fit"></div>
    return (<>
        <div className="w-full fixed top-0 bottom-0 left-0 right-0 flex items-center bg-black bg-opacity-30 justify-center z-50">
            <div className="w-11/12 max-w-3xl h-fit bg-white relative shadow-lg rounded-xl p-5">
                <h1 className="font-bold text-xl">{formData.id ? "Modifier le model" : "Personnaliser le model"}</h1>
                <form onSubmit={onSubmit} className="space-y-4 w-full flex flex-wrap  h-[60vh] overflow-y-scroll">
                    <div className="w-full space-y-2">
                        <Label htmlFor="typeInvitation">Animation</Label>
                        <select name="typeInvitation" id="typeInvitation" className='w-full py-2'
                            value={`${formData.heart}`}
                            onChange={(e) => setFormData({
                                ...formData,
                                heart: e.target.value,
                            })}>
                            <option value={"true"}>
                                Coeur
                            </option>
                            <option value={"false"}>
                                Pas de coeur
                            </option>
                        </select>
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="title">Titre de l'invitation</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ex: Mariage de Medine et Jeereq"
                            required
                        />
                    </div>
                    <div className="space-y-2 w-1/2 pr-1">
                        <Label htmlFor="men">Nom du mari</Label>
                        <Input
                            id="men"
                            value={formData.men}
                            onChange={(e) => setFormData({ ...formData, men: e.target.value })}
                            placeholder="Ex: Jeereq"
                            required
                        />
                    </div>
                    <div className="space-y-2 w-1/2 pl-1">
                        <Label htmlFor="women">Nom de la femme</Label>
                        <Input
                            id="women"
                            value={formData.women}
                            onChange={(e) => setFormData({ ...formData, women: e.target.value })}
                            placeholder="Ex: Medine"
                            required
                        />
                    </div>

                    <div className="space-y-2 w-1/2 pr-1">
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

                    <div className="space-y-2 w-1/2 pl-1">
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
                    <div className="w-full space-y-2 w-1/2 pr-1">
                        <Label htmlFor="typeInvitation">Type d'invitation</Label>
                        <select name="typeInvitation" id="typeInvitation" className='w-full py-2'
                            value={formData.typeInvitation}
                            onChange={(e) => setFormData({
                                ...formData,
                                typeInvitation: e.target.value,

                            })}>
                            <option value="couple">
                                Couple
                            </option>
                            <option value="singel">
                                Célibataire
                            </option>
                        </select>
                    </div>
                    <div className="space-y-2 w-1/2 pl-1">
                        <Label htmlFor="nameInvitation">Nom(s) sur l'invitation</Label>
                        <Input
                            id="nameInvitation"
                            type="text"
                            value={formData.nameInvitation}
                            onChange={(e) => setFormData({
                                ...formData,
                                nameInvitation: e.target.value,

                            })}
                            required
                        />
                    </div>
                    <div className="space-y-2 w-full ">
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
                </form>
                <div className="w-full gap-2 grid grid-cols-2 mt-2 border-t">
                    <Button onClick={closeModalForm} type="submit" className="w-full">
                        Voir le restultat
                    </Button>
                    <Button onClick={openCommandForm} type="submit" className="w-full bg-green-900">
                        {loadingUpdate ? "...Chargement" : formData.id ? "Modifier" : " Commander"}
                    </Button>
                </div>
                <MapModal
                    isOpen={isMapOpen}
                    onClose={() => setIsMapOpen(false)}
                    onLocationSelect={handleMapLocationSelect}
                    initialLocation={{ lat: formData.lat, lng: formData.lng }}
                />
            </div>
        </div>
        <CommandFormInvitation onSubmit={onSubmit} formData={formData} setFormData={setFormData} openModal={isCommandOpen} closeModalForm={closeCommandForm} />
    </>
    );
}
export default InvitationFormInvitation;