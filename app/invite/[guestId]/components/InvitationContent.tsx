"use client";
import TemplateYellow from '@/components/templates/yellow';
import TemplateRed from '@/components/templates/red';
import TemplateGreen from '@/components/templates/green';
import { templates } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useFetchData } from '@/hooks/useFetchData';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Props {
  guestId: any;
}

export default function InvitationContent({ guestId }: Props) {
  const searchParams = useSearchParams()
  const { fetch, loading } = useFetchData({ uri: "auth/invite/active" })
  const { fetch: fetchDesactive, loading: loadingDesactive } = useFetchData({ uri: "auth/invite/active" })
  const { fetch: fetchPublic, loading: loadingPublic } = useFetchData({ uri: "auth/users/invitationPublic" })
  const [selectedGuest, setSelectedGuest]: any = useState(null)
  useEffect(function () {
    fetchPublic({ id: guestId }, "POST").then(function ({ data }) {
      if (data.data) {
        setSelectedGuest(data.data)
      }
    })

  }, [])
  if (!selectedGuest || loading || loadingDesactive || loadingPublic) return <div className="w-full h-screen flex items-center">
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
      {selectedGuest.status == "noStarted" && <div className="w-full fixed z-50 bottom-0 left-0 right-0">
        <div className="w-[500px] grid grid-cols-2 mx-auto gap-1 p-5">
          <Button
            variant="ghost"
            size="sm"
            className='bg-red-500 text-white font-bold'
            onClick={() => {
              fetchDesactive({ id: guestId }, "POST").then(function ({ data }) {
                if (data.data) {
                  alert(data.message)
                }
              })

            }}
          >
            Absent
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className='bg-green-500 text-white font-bold'
            onClick={() => {
              fetch({ id: guestId }, "POST").then(function ({ data }) {
                if (data.data) {
                  alert(data.message)
                }
              })
            }}
          >
            Présent
          </Button>
        </div>
      </div>}
    </div>
  );
}