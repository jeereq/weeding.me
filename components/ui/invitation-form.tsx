"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, Loader2, UserPlus, Users } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import dynamic from 'next/dynamic'
import { InvitationType } from '@/app/admin/invitations/page';
import { templates } from '@/lib/utils';

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
                        location: {
                            ...formData.location,
                            lat: position.coords.lat,
                            lng: position.coords.lng
                        },
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
            location: {
                ...formData.location,
                lat: location.lat,
                lng: location.lng,
            },
        });
    };
    if (!openModal) return <div className="w-fit"></div>
    return (<>
        <div className="w-full fixed top-0 bottom-0 left-0 right-0 flex items-center bg-black bg-opacity-50 justify-center z-50">
            <div className="w-fit bg-white relative shadow-lg rounded-xl p-5">
                <form onSubmit={onSubmit} className="space-y-4">
                    <div onClick={closeModalForm} className="w-fit bg-white rounded-xl -translate-y-[115%] absolute cursor-pointer top-0 right-0 px-4 py-2 mb-2">
                        x
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Type d'événement</Label>
                        <RadioGroup
                            value={formData.type}
                            onValueChange={(value) => setFormData({ ...formData, type: value as InvitationType })}
                            className="grid grid-cols-2 gap-4"
                        >
                            {invitationTypes.map((type: any) => (
                                <div key={type.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={type.value} id={type.value} />
                                    <Label htmlFor={type.value}>{type.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
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
                        <Label htmlFor="event_date">Date de l'événement</Label>
                        <Input
                            id="event_date"
                            type="date"
                            value={formData.event_date}
                            onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <div className="flex gap-2 mb-2">
                            <Button
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
                            </Button>
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
                            value={formData.location.address}
                            onChange={(e) => setFormData({
                                ...formData,
                                location: { ...formData.location, address: e.target.value }
                            })}
                            required
                        />
                        {formData.location.lat && formData.location.lng && (
                            <p className="text-sm text-muted-foreground mt-2">
                                Coordonnées : {formData.location.lat}, {formData.location.lng}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="template">Template</Label>
                        <Select
                            value={formData.template_id}
                            onValueChange={(value) => setFormData({ ...formData, template_id: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un template" />
                            </SelectTrigger>
                            <SelectContent>
                                {templates.map((template) => (
                                    <SelectItem key={template.id} value={template.id}>
                                        {template.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button type="submit" className="w-full">
                        {title}
                    </Button>
                </form>
                <MapModal
                    isOpen={isMapOpen}
                    onClose={() => setIsMapOpen(false)}
                    onLocationSelect={handleMapLocationSelect}
                    initialLocation={
                        formData.location.lat && formData.location.lng
                            ? { lat: formData.location.lat, lng: formData.location.lng }
                            : { lat: 4.323554693688447, lng: 15.27127504348755 }
                    }
                />
            </div>
        </div>
    </>
    );
}
export default InvitationFormInvitation;