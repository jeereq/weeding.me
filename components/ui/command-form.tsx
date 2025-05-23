"use client";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchData } from '@/hooks/useFetchData';
import { useData } from '@/lib/data';

const CommandFormInvitation = ({ onSubmit, formData, setFormData, openModal, closeModalForm }: {
    onSubmit: (e: React.FormEvent) => void,
    formData: any,
    setFormData: (data: any) => void,
    openModal: boolean,
    closeModalForm: any
}) => {
    const { user, updateInvitation } = useData()
    const { loading, fetch } = useFetchData({ uri: "auth/invitations/command" })
    const { loading: loadingUpdate, fetch: fetchUpdate } = useFetchData({ uri: "auth/invitations/commandeUpdate" })
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
    return (
        <>
            <div className="w-full fixed top-0 bottom-0 left-0 right-0 flex items-center bg-black bg-opacity-30 justify-center z-50">
                <div className="w-11/12 md:w-[600px] h-fit bg-white relative shadow-lg rounded-xl p-3">
                    <h1 className="font-bold text-xl">Modifier la commande</h1>
                    <form
                        onSubmit={function (e: any) {
                            e.preventDefault()
                            if (formData.id) {
                                fetchUpdate({ ...formData, price: Calcule() }, "POST")
                                    .then(function ({ data: { message, data } }: any) {
                                        if (message) {
                                            alert(message)
                                            onSubmit({ ...e })
                                            updateInvitation(data, user)
                                            closeModalForm()
                                        }
                                    })
                            } else {
                                fetch({ user: user.id, ...formData, price: Calcule() }, "POST")
                                    .then(function ({ data: { message, data } }: any) {
                                        if (message) {
                                            alert(message)
                                            onSubmit({ ...e, ...data })
                                            closeModalForm()
                                        }
                                    })
                            }
                        }} className="space-y-4 w-full flex flex-wrap h-fit overflow-y-scroll p-2">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="initiateurDeLaDemande">Nom complet du demandeur</Label>
                            <Input
                                id="initiateurDeLaDemande"
                                value={formData.initiateurDeLaDemande}
                                onChange={(e) => setFormData({ ...formData, initiateurDeLaDemande: e.target.value })}
                                placeholder="Ex: Mariage de Jeereq et Medine"
                                required
                            />
                        </div>
                        <div className="space-y-2 w-1/2 pr-1">
                            <Label htmlFor="phone">Numéro de téléphone</Label>
                            <Input
                                type='tel'
                                value={formData.phone}
                                disabled={formData?.id}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Ex: +243 817 125 577"
                                required
                            />
                        </div>
                        <div className="space-y-2 w-1/2 pl-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type='email'
                                value={formData.email}
                                disabled={formData?.id}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Ex: jeereq@gmail.com"
                                required
                            />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="invitations">Nombre d'invitations (Minimum de 50)</Label>
                            <Input
                                id="invitations"
                                minLength={50}
                                min={50}
                                disabled={formData?.id}
                                type='number'
                                value={formData.invitations}
                                onChange={(e) => setFormData({ ...formData, invitations: e.target.value })}
                                placeholder="Ex: 200$"
                                required
                            />
                        </div>

                        <div className="w-full space-y-2 w-full">
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

                        <div className="space-y-2 w-1/2 pr-1">
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
                        <div className="space-y-2 w-1/2 pl-1">
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
                        <div className="w-full gap-2 grid grid-cols-2 mt-2 border-t pt-3">
                            <Button onClick={closeModalForm} type="submit" className="w-full">
                                Annuler
                            </Button>
                            <Button type="submit" className="w-full bg-green-900">
                                {(loading || loadingUpdate) ? "...Chargement" : formData.id ? "Sauvegarder" : "Envoyer"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default CommandFormInvitation;