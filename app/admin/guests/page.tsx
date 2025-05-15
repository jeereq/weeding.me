"use client";

import { FC, useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Mail, Filter, Users, Eye, User, UsersRound, Plus, Trash2, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useData } from '@/lib/data';
import { useFetchData } from '@/hooks/useFetchData';
import TemplateRed from '@/components/templates/red';
import TemplateYellow from '@/components/templates/yellow';
import TemplateGreen from '@/components/templates/green';
import { templates } from '@/lib/utils';

interface Member {
  name: string;
  relation?: string;
}

interface Guest {
  id?: any;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'attending' | 'declined';
  type: 'family' | 'company' | 'group' | 'singel' | 'couple';
  userTemplate: any;
  members: Member[];
}

const GuestsPage: FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [invitationFilter, setInvitationTypeFilter] = useState<string>('all');
  const [name, setName] = useState<string>("")
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageRappelDialogOpen, setMessageRappelDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<any | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { user } = useData()
  const { fetch, loading } = useFetchData({ uri: "auth/users/invitations" })
  const { fetch: fetchCreate, loading: loadingCreate } = useFetchData({ uri: "auth/invitations/create" })
  const { fetch: fetchDelete, loading: loadingDelete } = useFetchData({ uri: "auth/invite/delete" })
  const [newGuest, setNewGuest] = useState<any>({
    id: null,
    name: '',
    email: '',
    phone: '',
    type: 'couple',
    invitation: 1,
    status: 'noStarted',
    userTemplate: '',
    members: [],
  });

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || guest.status == statusFilter;
    const matchesType = typeFilter === 'all' || guest.type == typeFilter;
    const matchesInvitation = invitationFilter === 'all' || guest.userTemplate?.id == invitationFilter;
    return matchesSearch && matchesStatus && matchesType && matchesInvitation;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    } else {
      setSelectedGuests([]);
    }
  };
  const openDeleteModal = (guest: any) => {
    setSelectedGuest(guest);
    setIsDeleteOpen(true);
  };


  const handleSelectGuest = (guestId: string, checked: boolean) => {
    if (checked) {
      setSelectedGuests([...selectedGuests, guestId]);
    } else {
      setSelectedGuests(selectedGuests.filter(id => id !== guestId));
    }
  };

  const handleSendMessage = () => {
    console.log('Sending message to:', selectedGuests);
    console.log('Message:', messageContent);
    setMessageDialogOpen(false);
    setMessageContent('');
  };

  const handlePreviewInvitation = (guest: Guest) => {
    setSelectedGuest(guest);
    setPreviewDialogOpen(true);
  };

  const handleAddMember = () => {
    setNewGuest({
      ...newGuest,
      members: [...newGuest.members, { name: '', relation: '' }],
    });
  };

  const handleRemoveMember = (index: number) => {
    setNewGuest({
      ...newGuest,
      members: newGuest.members.filter((_: any, i: number) => i !== index),
    });
  };

  const handleMemberChange = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...newGuest.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setNewGuest({ ...newGuest, members: updatedMembers });
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'singel':
        return <User className="h-4 w-4" />;
      case 'couple':
        return <UsersRound className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };
  const submit = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    delete newGuest.id

    fetchCreate(newGuest, "POST").then(function ({ data }) {
      if (data.data) {
        setGuests([data.data, ...guests]);
        setCreateDialogOpen(false)
      }
      alert(data.message)
      console.log(data)
    }).catch(function (error: any) {
      console.log(error)
      setCreateDialogOpen(false)
    })
  }

  useEffect(function () {
    fetch({ id: user.id }, "POST").then(function ({ data }) {
      if (data?.data) {
        setGuests(data.data)
      }
    })

  }, [user])

  if (loading) return <div className="w-full">
    <h1 className="font-bold text-center">
      ...Chargement
    </h1>
  </div>
  return (
    <div className="space-y-6 overflow-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invités</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => setMessageRappelDialogOpen(true)}
          // disabled={selectedGuests.length != 0}
          >
            <Mail className="h-4 w-4 lg:mr-2" />
            <span className="w-fit lg:block hidden">
              Message Rappel
            </span>
          </Button>
          <Button
            onClick={() => setMessageDialogOpen(true)}
          // disabled={selectedGuests.length != 0}
          >
            <Mail className="h-4 w-4 lg:mr-2" />
            <span className="w-fit lg:block hidden">
              Message Invitation
            </span>
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 lg:mr-2" />
            <span className="w-fit lg:block hidden">
              Nouvel invité
            </span>
          </Button>
        </div>
      </div>
      <Card>
        <CardContent>
          <div className="grid gap-1 lg:gap-4 grid-cols-1 lg:grid-cols-4 py-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un invité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="noStarted">Pas envoyé</SelectItem>
                  <SelectItem value="attending">Présent</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="declined">Décliné</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type d'invité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les types</SelectItem>
                  <SelectItem value="family">Famille</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="company">Entreprise</SelectItem>
                  <SelectItem value="group">Groupe</SelectItem>
                  <SelectItem value="singel">Célibataire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Select value={invitationFilter} onValueChange={setInvitationTypeFilter}>
                <SelectTrigger>
                  <Mail className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Invitations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les invitations</SelectItem>
                  {user?.templates?.filter(function ({ active }: any) {
                    return active
                  }).map(function ({ id, title, color }: any) {
                    return <SelectItem value={id} style={{ color }}>{title}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>
                  Phone
                </TableHead>
                <TableHead>
                  Invitation
                </TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date de reponse</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest: any) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedGuests.includes(guest.id)}
                      onCheckedChange={(checked) => handleSelectGuest(guest.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(guest.type)}
                      <Badge variant="secondary" className="capitalize">
                        {guest.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      {guest.type != "singel" ? guest?.members?.map(function ({ name }: any) {
                        return name
                      }).join(" & ") : guest.name}
                    </div>
                  </TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell style={{ color: guest.userTemplate.color }}>{guest.userTemplate.title}</TableCell>
                  <TableCell>
                    <span className={`capitalize font-bold ${getStatusColor(guest.status)}`}>
                      {getStatusText(guest.status)}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(guest?.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreviewInvitation(guest)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className='text-red-500'
                      onClick={() => openDeleteModal(guest)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const url = `${window.location.origin}/invitation/${guest.id}`;
                        navigator.clipboard.writeText(url);

                        alert('Lien copié dans le presse-papier');
                      }}
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Copier le lien
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un message d'invitation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="w-full grid gap-1 grid-cols-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type d'invité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les types</SelectItem>
                  <SelectItem value="family">Famille</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="company">Entreprise</SelectItem>
                  <SelectItem value="group">Groupe</SelectItem>
                  <SelectItem value="singel">Célibataire</SelectItem>
                </SelectContent>
              </Select>
              <Select value={invitationFilter} onValueChange={setInvitationTypeFilter}>
                <SelectTrigger>
                  <Mail className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Invitations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les invitations</SelectItem>
                  {user?.templates?.filter(function ({ active }: any) {
                    return active
                  }).map(function ({ id, title, color }: any) {
                    return <SelectItem value={id} style={{ color }}>{title}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="w-full mb-2 flex">
                <div onClick={function () {
                  setMessageContent(`${messageContent} {{nom}}`)
                }} className="w-fit cursor-pointer rounded-full hover:bg-gray-300 bg-gray-100 mr-2 py-1 px-3">
                  nom
                </div>
                <div onClick={function () {
                  setMessageContent(`${messageContent} {{invitation}}`)
                }} className="w-fit cursor-pointer rounded-full hover:bg-gray-300 bg-gray-100 mr-2 py-1 px-3">
                  invitation
                </div>
                <div onClick={function () {
                  setMessageContent(`${messageContent} {{date}}`)
                }} className="w-fit cursor-pointer rounded-full hover:bg-gray-300 bg-gray-100 mr-2 py-1 px-3">
                  date
                </div>
                <div onClick={function () {
                  setMessageContent(`${messageContent} {{address}}`)
                }} className="w-fit cursor-pointer rounded-full hover:bg-gray-300 bg-gray-100 py-1 px-3">
                  address
                </div>
              </div>
              <Textarea
                placeholder="Votre message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={6}
              />
            </div>
            <div className="gap-1 w-full grid grid-cols-2">
              <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSendMessage}>
                Envoyer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={messageRappelDialogOpen} onOpenChange={setMessageRappelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un message de rappel</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="w-full grid gap-1 grid-cols-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="noStarted">Pas envoyé</SelectItem>
                  <SelectItem value="attending">Présent</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="declined">Décliné</SelectItem>
                </SelectContent>
              </Select>
              <Select value={invitationFilter} onValueChange={setInvitationTypeFilter}>
                <SelectTrigger>
                  <Mail className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Invitations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les invitations</SelectItem>
                  {user?.templates?.filter(function ({ active }: any) {
                    return active
                  }).map(function ({ id, title, color }: any) {
                    return <SelectItem value={id} style={{ color }}>{title}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Envoi à {selectedGuests.length} invité{selectedGuests.length > 1 ? 's' : ''}
              </p>
              <Textarea
                placeholder="Votre message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={6}
              />
            </div>
            <div className="gap-1 w-full grid grid-cols-2">
              <Button variant="outline" onClick={() => setMessageRappelDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSendMessage}>
                Envoyer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        {selectedGuest && (<DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Voulez-vous supprimer cet invité : {selectedGuest.type != "singel" ? selectedGuest?.members?.map(function ({ name }: any) {
                return name
              }).join(" & ") : selectedGuest.name} ?
            </DialogTitle>
          </DialogHeader>
          <TableBody>
            <div className="w-full gap-2 grid grid-cols-2 mt-2">
              <Button
                onClick={function () {
                  setIsDeleteOpen(false)
                }}
                disabled={selectedGuest.status != "noStarted"}
                type="submit"
                className="w-full"
              >
                Annuler
              </Button>
              <Button
                onClick={function () {
                  fetchDelete({ id: selectedGuest.id }, "POST").then(function ({ data }) {

                    if (data.data) {
                      const guest: any = data.data
                      setGuests(function (data: any[]) {
                        return data.filter(function (item: any) {
                          return item.id != selectedGuest?.id
                        })
                      })
                      setIsDeleteOpen(false)
                    }
                  })
                }}
                type="submit"
                className={`w-full bg-red-500`}
              >
                {(loadingDelete) ? "...Chargement" : "Supprimer"}
              </Button>
            </div>
          </TableBody>
        </DialogContent>)}
      </Dialog>

      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-2xl h-[90vh] overflow-y-scroll">
          {selectedGuest && (
            <div className="space-y-6 w-full">
              {selectedGuest.userTemplate?.template == 1 && <TemplateGreen template={templates.find(function ({ id }) {
                return id == 1
              })} data={{
                ...selectedGuest.userTemplate, nameInvitation: selectedGuest.type != "singel" ? selectedGuest?.members?.map(function ({ name }: any) {
                  return name
                }).join(" & ") : selectedGuest.name
              }} />}
              {selectedGuest.userTemplate?.template == 2 && <TemplateRed template={templates.find(function ({ id }) {
                return id == 2
              })} data={{
                ...selectedGuest.userTemplate, nameInvitation: selectedGuest.type != "singel" ? selectedGuest?.members?.map(function ({ name }: any) {
                  return name
                }).join(" & ") : selectedGuest.name
              }} />}
              {selectedGuest.userTemplate?.template == 3 && <TemplateYellow template={templates.find(function ({ id }) {
                return id == 3
              })} data={{
                ...selectedGuest.userTemplate, nameInvitation: selectedGuest.type != "singel" ? selectedGuest?.members?.map(function ({ name }: any) {
                  return name
                }).join(" & ") : selectedGuest.name
              }} />}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nouvel invité</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-6 flex flex-wrap items-center">
            <div className="space-y-2 w-full">
              <Label htmlFor="type">Type d'invité</Label>
              <Select
                value={newGuest.type}
                onValueChange={(value: Guest['type']) => {
                  setNewGuest({
                    ...newGuest,
                    type: value
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Famille</SelectItem>
                  <SelectItem value="couple">Couple</SelectItem>
                  <SelectItem value="company">Entreprise</SelectItem>
                  <SelectItem value="group">Groupe</SelectItem>
                  <SelectItem value="singel">Célibataire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="userTemplate">Invitation</Label>
              <Select
                value={newGuest.userTemplate}
                onValueChange={(value) => setNewGuest({ ...newGuest, userTemplate: value })}
              >
                <SelectTrigger>
                  <Mail className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Invitation" />
                </SelectTrigger>
                <SelectContent>
                  {user?.templates?.filter(function ({ active }: any) {
                    return active
                  }).map(function ({ id, title, color }: any) {
                    return <SelectItem value={`${id}`} style={{ color }}>{title}</SelectItem>
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 w-1/2 pr-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newGuest.email}
                onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                placeholder="Email de contact"
              />
            </div>

            <div className="space-y-2 w-1/2 pr-2">
              <Label htmlFor="phone">Numero de téléphone</Label>
              <Input
                id="phone"
                type="tel"
                value={newGuest.phone}
                onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                placeholder="243 817 125 577"
              />
            </div>

            {newGuest.type !== 'singel' ? (
              <div className="space-y-4 w-full">
                <div className="flex justify-between items-center">
                  <Label>Membres</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMember}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un membre
                  </Button>
                </div>
                <div className="space-y-4">
                  {newGuest.members.map((member: any, index: number) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <Input
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          placeholder="Nom du membre"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMember(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) :
              <div className="space-y-2 w-full">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  placeholder="Nom de l'invité"
                />
              </div>}

            <div className="grid grid-cols-2 w-full space-x-2">
              <Button variant="outline" onClick={(e: any) => {
                e.preventDefault()
                e.stopPropagation()

                setCreateDialogOpen(false)
              }}>
                Annuler
              </Button>
              <Button type={"submit"}>
                {loadingCreate ? "...Chargement" : "Créer l'invité"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GuestsPage;