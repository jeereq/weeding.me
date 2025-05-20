"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Users, Badge, RefreshCw, Eye, Pencil, Trash2, Wine } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { props, useData } from '@/lib/data';
import { Boissons, templates } from '@/lib/utils';
import { motion } from "framer-motion";
import InvitationFormInvitationAdmin from '@/components/ui/invitation-form-admin';
import { useFetchData } from '@/hooks/useFetchData';
import TemplateGreen from '@/components/templates/green';
import TemplateYellow from '@/components/templates/yellow';
import TemplateRed from '@/components/templates/red';

interface Location {
  lat: number | null;
  lng: number | null;
  address: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'declined';
}

export type InvitationType =
  | 'mariage_civil'
  | 'mariage_religieux'
  | 'pacs'
  | 'fiancailles'
  | 'anniversaire_mariage'
  | 'autre';

interface Invitation {
  id: string;
  title: string;
  event_date: string;
  status: string;
  type: InvitationType;
  location: Location;
  template: {
    title: string;
  };
  guests: Guest[];
}

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isActiveOpen, setIsActiveOpen] = useState(false);
  const [isBoissonOpen, setIsBoissonOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [boissons, setBoissons] = useState<any>(Boissons)
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const { user, updateInvitation, deleteInvitation } = useData()
  const [isSee, setIsSee] = useState(false)
  const { fetch, loading } = useFetchData({ uri: "auth/invitations/activeCommand" })
  const { fetch: fetchDesactive, loading: loadingDesactive } = useFetchData({ uri: "auth/invitations/desctiveCommand" })
  const { fetch: fetchDelete, loading: loadingDelete } = useFetchData({ uri: "auth/invitations/delete" })
  const [formData, setFormData] = useState<any>({
    ...props,
    template: 1,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvitation: any = {
      id: Math.random().toString(),
      title: formData.title,
      event_date: formData.event_date,
      status: 'draft',
      type: formData.type,
      location: formData.location,
      template: { title: templates.find(t => t.id === formData.template_id)?.title || '' },
      guests: []
    };
    setInvitations([newInvitation, ...invitations]);
    setIsCreateOpen(false);
    setFormData({
      title: '',
      event_date: '',
      template_id: '',
      type: 'autre',
      location: { lat: null, lng: null, address: '' },
    });
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'attending':
        return "Présent"
      case 'declined':
        return "Décliné"
      case 'pending':
        return "En attente"
      default:
        return 'Pas envoyé';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attending':
        return 'text-green-600';
      case 'declined':
        return 'text-red-600';
      case 'noStarted':
        return 'text-gray-600';
      default:
        return 'text-yellow-600';
    }
  };
  const openActiveModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsActiveOpen(true);
  };
  const openDeleteModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsDeleteOpen(true);
  };

  const openGuestsModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsGuestsOpen(true);
  };
  const openBoissonsModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsBoissonOpen(true);
  };
  const openViewsModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsViewOpen(true);
    setIsSee(true);
  };
  const openViewsModalWithoutUpdate = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsViewOpen(true);
    setIsSee(false);
  };


  if (loading) return <div className="w-full">
    <h1 className="font-bold text-center">
      ...Chargement
    </h1>
  </div>
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {user.role.id ? "Invitations" : "Invitations Choisis"}
        </h1>
        <Button onClick={function () {
          setIsCreateOpen(true)
        }}>
          <Plus className="h-4 w-4 lg:mr-2" />
          <span className="lg:block hidden">
            Nouvelle invitation
          </span>
        </Button>
      </div>
      <InvitationFormInvitationAdmin
        formData={formData}
        setFormData={setFormData}
        closeModalForm={function () {
          setIsCreateOpen(false)
        }}
        openModal={isCreateOpen}
        onSubmit={handleCreate}
      />

      <div className="grid gap-1 lg:gap-2 md:grid-cols-2 lg:grid-cols-3 ">
        {user.templates.map((invitation: any) => (
          <>
            <Card key={invitation.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={invitation.image || templates.find(t => t.id == invitation.template)?.imageUrl}
                  alt={invitation.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge
                  className={`${invitation.active ? "text-green-500" : "text-red-500"} absolute top-2 right-2`}>
                </Badge>
                <div className="absolute bottom-2 right-2 flex gap-2 font-bold">
                  {templates.find(t => t.id == invitation.template)?.category}
                </div>
                {invitation.invitationsUser && <div className="w-fit absolute bottom-2 left-2">
                  {invitation.invitationsUser} Invitation(s)
                </div>}
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2" style={{ color: invitation.color }}>{invitation.title}</h3>
                <h4 className="text-md mb-2">{templates.find(t => t.id == invitation.template)?.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {invitation.address}
                </p>
                <div className="flex grid lg:grid-cols-2 items-center">
                  <div title={`${invitation.title} ${invitation.invitations} invitations, ${invitation.price.toFixed(2)}$ `}
                    className="flex w-full lg:w-fit items-center mr-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {invitation.invitations} <span className="font-bold ml-2 mr-1">$</span> {invitation.price.toFixed(2)}
                  </div>
                  <div className=" w-full pt-3 lg:w-fit grid grid-cols-6 gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewsModalWithoutUpdate(invitation)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openBoissonsModal(invitation)}
                    >
                      <Wine className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewsModal(invitation)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={!invitation.active && user?.role?.id == 4}
                      className={`${invitation.active ? "text-green-500" : "text-red-500"}`}
                      onClick={() => openActiveModal(invitation)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={user?.role?.id == 4}
                      className={`text-red-500`}
                      onClick={() => openDeleteModal(invitation)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openGuestsModal(invitation)}
                    >
                     <Users className="h-4 w-4 mr-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Dialog open={isGuestsOpen && selectedInvitation?.id == invitation.id} onOpenChange={setIsGuestsOpen}>
              <DialogContent className="w-full lg:max-w-3xl max-h-[70vh] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Les invités du mariage de {selectedInvitation?.title}</DialogTitle>
                </DialogHeader>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvitation?.guests?.map((guest: any) => (
                        <TableRow key={guest.id}>
                          <TableCell>
                            {guest.type != "singel" ? guest?.members?.map(function ({ name }: any) {
                              return name
                            }).join(" & ") : guest.name}</TableCell>
                          <TableCell>{guest.email}</TableCell>
                          <TableCell>{guest.phone}</TableCell>
                          <TableCell>
                            <span className={`capitalize ${getStatusColor(guest.status)}`}>
                              {getStatusText(guest.status)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isActiveOpen && selectedInvitation?.id == invitation.id} onOpenChange={setIsActiveOpen}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>
                    Voulez-vous {invitation.active ? "desactiver" : "activer"} cette demande ou commande d'invitation : {selectedInvitation?.title} ?
                  </DialogTitle>
                </DialogHeader>
                <TableBody>
                  <div className="w-full gap-2 grid grid-cols-2 mt-2">
                    <Button
                      onClick={function () {
                        setIsActiveOpen(false)
                      }}
                      type="submit"
                      className="w-full"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={function () {
                        if (invitation.active) {
                          fetchDesactive({ id: invitation.id }, "POST").then(function ({ data }) {
                            if (data.data) {
                              updateInvitation({ ...invitation, active: false }, user)
                              setIsActiveOpen(false)
                            }
                          })
                        } else {

                          fetch({ id: invitation.id }, "POST").then(function ({ data }) {
                            if (data.data) {
                              updateInvitation({ ...invitation, active: true }, user)
                              setIsActiveOpen(false)
                            }
                          })
                        }
                      }}
                      type="submit"
                      className={`w-full ${invitation.active ? "bg-red-500" : " bg-green-900"}`}
                    >
                      {(loading || loadingDesactive) ? "...Chargement" : invitation.active ? "Desactiver" : "Activer"}
                    </Button>
                  </div>
                </TableBody>
              </DialogContent>
            </Dialog>
            <Dialog open={isDeleteOpen && selectedInvitation?.id == invitation.id} onOpenChange={setIsDeleteOpen}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>
                    Voulez-vous supprimer cette demande d'invitation : {selectedInvitation?.title} ?
                  </DialogTitle>
                </DialogHeader>
                <TableBody>
                  <div className="w-full gap-2 grid grid-cols-2 mt-2">
                    <Button
                      onClick={function () {
                        setIsDeleteOpen(false)
                      }}
                      type="submit"
                      className="w-full"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={function () {
                        fetchDelete({ id: invitation.id }, "POST").then(function ({ data }) {
                          if (data.data) {
                            deleteInvitation(invitation, user)
                            setIsDeleteOpen(false)
                          }
                        })
                      }}
                      type="submit"
                      className={`w-full bg-red-500`}
                    >
                      {(loading || loadingDelete) ? "...Chargement" : "Supprimer"}
                    </Button>
                  </div>
                </TableBody>
              </DialogContent>
            </Dialog>
            <Dialog open={isViewOpen && selectedInvitation?.id == invitation.id} onOpenChange={setIsViewOpen}>
              <DialogContent className="w-full lg:max-w-3xl bg-gray-100">
                <TableBody>
                  <div className="w-full">
                    <div className="lg:w-[500px] w-full 0 mx-auto px-4 lg:px-8">
                      <div className="w-full h-[85vh] overflow-y-scroll mx-auto ">
                        <motion.div
                          key={invitation.template}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          {invitation.template == 1 && <TemplateGreen hide={isSee} template={templates.find(t => t.id == invitation.template)} data={invitation} />}
                          {invitation.template == 2 && <TemplateYellow hide={isSee} template={templates.find(t => t.id == invitation.template)} data={invitation} />}
                          {invitation.template == 3 && <TemplateRed hide={isSee} template={templates.find(t => t.id == invitation.template)} data={invitation} />}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </TableBody>
              </DialogContent>
            </Dialog>
            <Dialog open={isBoissonOpen && selectedInvitation?.id == invitation.id} onOpenChange={setIsBoissonOpen}>
              <DialogContent className="w-full lg:max-w-3xl bg-gray-100">
                <TableBody>
                  <div className="w-full">
                    <div className="w-full 0 mx-auto ">
                      <div className="w-full h-[85vh] overflow-y-scroll mx-auto ">
                        <motion.div
                          key={invitation.template}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <ul>
                            {Object.entries(boissons).map(([key, boissons]: any) => {
                              return <>
                                {boissons.map((boisson: any) => {
                                  return (
                                    <li key={boisson.nom} className="flex cursor-pointer group items-center justify-start p-2 border-b">
                                      <div className="w-[20px] h-[20px] border-2 group-hover:border-blue-500 rounded-full border mr-2"></div>
                                      <div className="w-[200px]">
                                        <span className="font-semibold pr-2 block">{boisson.nom}</span>
                                        <span className="font-semibold pr-2 block">({key.replaceAll('_', ' ')})</span>
                                      </div>
                                      <span className="text-gray-500">{boisson.description} </span>
                                    </li>
                                  )
                                })}
                              </>
                            })}
                          </ul>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </TableBody>
              </DialogContent>
            </Dialog>
          </>
        ))}
      </div>

    </div>
  );
}