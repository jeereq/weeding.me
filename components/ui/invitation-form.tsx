"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Loader2, UserPlus, Users } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic'
import { InvitationType } from '@/app/admin/invitations/page';

const MapModal = dynamic(
    () => import('@/components/ui/map-modal'),
    { ssr: false }
)

const InvitationFormInvitation = ({ onSubmit, title, formData, setFormData, invitationTypes, openModal, closeModalForm }: {
    onSubmit: (e: React.FormEvent) => void,
    title: string,
    formData: any,
    setFormData: (data: any) => void,
    invitationTypes: InvitationType[],
    openModal: boolean,
    closeModalForm: any
}) => {
    const [isLocating, setIsLocating] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const handleGeolocation = () => {
        setIsLocating(true);
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position: any) => {
                    setFormData({
                        ...formData,
                        dateLocationLat: position.coords.lat,
                        dateLocationLng: position.coords.lng

                    });
                    setIsLocating(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setIsLocating(false);
                }
            );
        }
    };

    const handleMapLocationSelect = (location: { lat: number; lng: number }) => {
        setFormData({
            ...formData,
            dateLocationLat: location.lat,
            dateLocationLng: location.lng
        });
    };
    if (!openModal) return <div className="w-fit"></div>
    return (<>
        <div className="w-full fixed top-0 bottom-0 left-0 right-0 flex items-center bg-black bg-opacity-50 justify-center z-50">
            <div className="w-11/12 md:w-[500px] bg-white relative shadow-lg rounded-xl p-5">
                <form onSubmit={onSubmit} className="space-y-4 w-full">
                    <div onClick={closeModalForm} className="w-fit bg-white rounded-xl -translate-y-[115%] absolute cursor-pointer top-0 right-0 px-4 py-2 mb-2">
                        x
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre de l'invitation</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ex: Mariage de Sophie et Thomas"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Nom du maris</Label>
                        <Input
                            id="title"
                            value={formData.men}
                            onChange={(e) => setFormData({ ...formData, men: e.target.value })}
                            placeholder="Ex: Mariage de Thomas"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Nom de la femme</Label>
                        <Input
                            id="title"
                            value={formData.women}
                            onChange={(e) => setFormData({ ...formData, women: e.target.value })}
                            placeholder="Ex: Mariage de Sophie"
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

                    <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <div className="flex gap-2 grid-cols-1 grid  mb-2">
                            {/* <Button
                                type="button"
                                variant="outline"
                                onClick={handleGeolocation}
                                disabled={isLocating}
                            >
                                {isLocating ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <MapPin className="h-4 w-4 mr-2" />
                                )}
                                Utiliser ma position
                            </Button> */}
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
                    <Button type="submit" className="w-full">
                        Commander
                    </Button>
                </form>
                <MapModal
                    isOpen={isMapOpen}
                    onClose={() => setIsMapOpen(false)}
                    onLocationSelect={handleMapLocationSelect}
                    initialLocation={
                        (formData.dateLocationLat && formData.dateLocationLng)
                            ? { lat: formData.dateLocationLat, lng: formData.dateLocationLng }
                            : { lat: 4.323554693688447, lng: 15.27127504348755 }
                    }
                />
            </div>
        </div>
    </>
    );
}
export default InvitationFormInvitation;