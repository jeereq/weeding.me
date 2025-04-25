"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, User, Users, UsersRound, MapPin, Calendar, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Member {
  name: string;
  relation?: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'attending' | 'declined';
  type: 'family' | 'company' | 'group' | 'individual';
  members?: Member[];
}

interface Invitation {
  id: string;
  title: string;
  date: string;
  location: string;
  template: string;
  message: string;
}

interface Props {
  initialGuest: Guest & { invitationId: string };
  initialInvitation: Invitation;
}

const templates = {
  'Élégance Florale': {
    backgroundImage: 'https://images.pexels.com/photos/1589216/pexels-photo-1589216.jpeg',
    textColor: 'text-white',
    overlayColor: 'bg-black/40',
    accentColor: 'bg-rose-500',
    borderColor: 'border-rose-300/20'
  },
  'Corporate Classic': {
    backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    textColor: 'text-white',
    overlayColor: 'bg-black/40',
    accentColor: 'bg-blue-500',
    borderColor: 'border-blue-300/20'
  }
};

export default function InvitationContent({ initialGuest, initialInvitation }: Props) {
  const [guest, setGuest] = useState(initialGuest);
  const [invitation, setInvitation] = useState(initialInvitation);
  const [status, setStatus] = useState(guest.status);

  const template = templates[invitation.template as keyof typeof templates];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'family':
        return <Users className="h-5 w-5" />;
      case 'company':
        return <Building2 className="h-5 w-5" />;
      case 'group':
        return <UsersRound className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const handleResponse = (newStatus: 'attending' | 'declined') => {
    setStatus(newStatus);
    // Here you would typically make an API call to update the status
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-fixed"
      style={{ 
        backgroundImage: `url(${template.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-4xl ${template.overlayColor} backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border ${template.borderColor}`}
      >
        <div className={`p-8 md:p-12 ${template.textColor}`}>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heart className="w-12 h-12 mx-auto mb-6 text-rose-500" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {invitation.title}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                {invitation.message}
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-rose-400" />
                  <span>Détails</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 opacity-90">Date & Heure</h3>
                  <p className="text-xl">
                    {new Date(invitation.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 opacity-90">Lieu</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-rose-400 flex-shrink-0 mt-1" />
                    <p className="text-xl">{invitation.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  {getTypeIcon(guest.type)}
                  <span>{guest.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {guest.members && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium opacity-90">Membres invités</h3>
                    <ScrollArea className="h-[200px] pr-4">
                      <div className="space-y-3">
                        {guest.members.map((member, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex justify-between items-center bg-white/5 p-3 rounded-lg"
                          >
                            <span className="text-lg">{member.name}</span>
                            {member.relation && (
                              <Badge variant="outline" className="border-white/20 text-sm">
                                {member.relation}
                              </Badge>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}

                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-medium opacity-90">Votre réponse</h3>
                  <div className="flex gap-4">
                    <Button
                      className={`flex-1 ${status === 'attending' ? template.accentColor : 'bg-white/10'} transition-colors`}
                      onClick={() => handleResponse('attending')}
                    >
                      Je serai présent
                    </Button>
                    <Button
                      className={`flex-1 ${status === 'declined' ? 'bg-red-500' : 'bg-white/10'} transition-colors`}
                      onClick={() => handleResponse('declined')}
                    >
                      Je ne pourrai pas venir
                    </Button>
                  </div>
                  {status !== 'pending' && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm opacity-80"
                    >
                      Votre réponse a été enregistrée. Vous pouvez la modifier à tout moment.
                    </motion.p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}