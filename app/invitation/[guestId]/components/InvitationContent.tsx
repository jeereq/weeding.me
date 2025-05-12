"use client";
import TemplateYellow from '@/components/templates/yellow';
import TemplateRed from '@/components/templates/red';
import TemplateGreen from '@/components/templates/green';
import { templates } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useFetchData } from '@/hooks/useFetchData';

interface Props {
  guestId: any;
}



export default function InvitationContent({ guestId }: Props) {
  const { fetch, loading } = useFetchData({ uri: "auth/users/invitationPublic" })
  const [selectedGuest, setSelectedGuest]: any = useState(null)
  useEffect(function () {
    fetch({ id: guestId }, "POST").then(function ({ data }) {
      console.log(data)
      if (data.data) {
        setSelectedGuest(data.data)
      }
    })
  }, [])
  if (!selectedGuest || loading) return <div className="w-full h-screen flex items-center">
    <h1 className="font-bold  text-center w-full">
      ...Chargement
    </h1>
  </div>
  return (
    <div className="w-full p-5  bg-gray-100">
      <div className="space-y-6 w-full md:w-[500px] mx-auto">
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
    </div>
  );
}