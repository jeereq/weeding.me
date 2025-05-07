"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic'
import { InvitationType } from '@/app/admin/invitations/page';

const MapModal = dynamic(
    () => import('@/components/ui/map-modal'),
    { ssr: false }
)

const InvitationFormInvitation = ({ onSubmit, formData, setFormData, openModal, closeModalForm }: {
    onSubmit: (e: React.FormEvent) => void,
    formData: any,
    setFormData: (data: any) => void,
    invitationTypes: InvitationType[],
    openModal: boolean,
    closeModalForm: any
}) => {
    const [isMapOpen, setIsMapOpen] = useState(false);


    const handleMapLocationSelect = (location: { lat: number; lng: number }) => {
        setFormData({
            ...formData,
            dateLocationLat: location.lat,
            dateLocationLng: location.lng
        });
    };
    if (!openModal) return <div className="w-fit"></div>
    return (<>
        <div className="w-full fixed top-0 bottom-0 left-0 right-0 flex items-center bg-black bg-opacity-30 justify-center z-50">
            <div className="w-11/12 md:w-[500px] h-fit bg-white relative shadow-lg rounded-xl p-5">
                <form onSubmit={onSubmit} className="space-y-4 w-full h-[70vh] overflow-y-scroll">
                
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
                                dateDay: new Date(e.target.value).getDate(),
                                dateMonth: new Date(e.target.value).getMonth() + 1,
                                dateYear: new Date(e.target.value).getFullYear(),
                            })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Heure et minute</Label>
                        <div className="w-full gap-1">
                            <Input
                                id="date"
                                type="time"
                                value={formData.dateTime}
                                onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full space-y-2">
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

                    <div className="space-y-2">
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
                            value={formData.dateLocationAddress}
                            onChange={(e) => setFormData({
                                ...formData,
                                dateLocationAddress: e.target.value
                            })}
                            required
                        />
                        {formData.dateLocationLat && formData.dateLocationLng && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Coordonnées : {formData.dateLocationLat}, {formData.dateLocationLng}
                            </p>
                        )}
                    </div>
                </form>
                <div className="w-full gap-2 grid grid-cols-2 mt-2 border-t">
                    <Button onClick={closeModalForm} type="submit" className="w-full">
                        Voir le restultat
                    </Button>
                    <Button type="submit" className="w-full bg-green-900">
                        Commander
                    </Button>
                </div>
                <MapModal
                    isOpen={isMapOpen}
                    onClose={() => setIsMapOpen(false)}
                    onLocationSelect={handleMapLocationSelect}
                    initialLocation={{ lat: formData.dateLocationLat, lng: formData.dateLocationLng }}
                />
            </div>
        </div>
    </>
    );
}
export default InvitationFormInvitation;