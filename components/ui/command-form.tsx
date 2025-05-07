"use client";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CommandFormInvitation = ({ onSubmit, formData, setFormData, openModal, closeModalForm }: {
    onSubmit: (e: React.FormEvent) => void,
    formData: any,
    setFormData: (data: any) => void,
    openModal: boolean,
    closeModalForm: any
}) => {

    function Calcule(): number {
        if (formData.invitations < 200) {
            return formData.invitations * 0.7
        } else if (formData.invitations >= 200) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 20)
        } else if (formData.invitations >= 300) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 25)
        } else if (formData.invitations >= 400) {
            return (formData.invitations * 0.7) - (((formData.invitations * 0.7) / 100) * 30)
        } else {
            return (formData.invitations * 0.7)
        }
    }
    if (!openModal) return <div className="w-fit"></div>
    return (<>
        <div className="w-full fixed top-0 bottom-0 left-0 right-0 flex items-center bg-black bg-opacity-30 justify-center z-50">
            <div className="w-11/12 md:w-[600px] h-fit bg-white relative shadow-lg rounded-xl p-5">
                <form onSubmit={onSubmit} className="space-y-4 w-full h-fit overflow-y-scroll p-2">

                    <h1 className="font-bold text-xl">Commander vos invitations</h1>
                    <div className="space-y-2">
                        <Label htmlFor="initiateurDeLaDemande">Nom complet du demandeur</Label>
                        <Input
                            id="initiateurDeLaDemande"
                            value={formData.initiateurDeLaDemande}
                            onChange={(e) => setFormData({ ...formData, initiateurDeLaDemande: e.target.value })}
                            placeholder="Ex: Mariage de Medine et Jeereq"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Numero de téléphone</Label>
                        <Input
                            type='tel'
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Ex: 200"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="invitations">Nombre d'invité</Label>
                        <Input
                            id="invitations"
                            type='number'
                            value={formData.invitations}
                            onChange={(e) => setFormData({ ...formData, invitations: e.target.value })}
                            placeholder="Ex: 200"
                            required
                        />
                    </div>

                    <div className="w-full space-y-2">
                        <Label >
                            le cout unitaire d'une invitation est de 0.7$
                        </Label>
                        <p>
                            <span className="font-bold pr-3">Cout :</span> {Calcule().toFixed(2)}$
                        </p>
                        {formData.invitations >= 200 && <Label className='pr-2' >
                            Pour plus de 200 invitations la reduction est de 20%
                        </Label>}
                        {formData.invitations >= 300 && <Label className='pr-2' >
                            Pour plus de 300 invitations la reduction est de 25%
                        </Label>}
                        {formData.invitations >= 400 && <Label className='pr-2' >
                            Pour plus de 400 invitations la reduction est de 30%
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
                </form>
                <div className="w-full gap-2 grid grid-cols-2 mt-2 border-t">
                    <Button onClick={closeModalForm} type="submit" className="w-full">
                        Annuler
                    </Button>
                    <Button type="submit" className="w-full bg-green-900">
                        Envoyer
                    </Button>
                </div>
            </div>
        </div>
    </>
    );
}
export default CommandFormInvitation;