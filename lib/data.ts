import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface useData {
  user: any | null;
  jwt: string | null;
  login: (data: any) => Promise<void>;
  pushInvitation: (data: any, user: any) => Promise<void>;
  updateInvitation: (data: any, user: any) => Promise<void>;
  loginJwt: (data: any) => Promise<void>;
  register: (data: any, jwt: string) => Promise<void>;
  logout: () => void;
}
export const props = {
  day: new Date().getDate(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  date: new Date().toString(),
  template: "",
  time: "18:00",
  dateLocation: "Avenue de la paix, Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS)",
  lat: -4.3276,
  lng: 15.3136,
  address: "Avenue de la paix, Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS)",
  title: "Jeereq & Medine",
  men: "Jeereq",
  women: "Medine",
  typeInvitation: "couple",
  nameInvitation: "Jeereq et Medine",
  heart: false,
  initiateurDeLaDemande: "",
  phone: "",
  invitations: 50,
  city: "",
  country: "",
  image: "https://i.pinimg.com/736x/63/de/3a/63de3a93ad459acf7e6d9ee0d5102aac.jpg",
  color: "black"
}

export const useData = create<useData>()(
  persist(
    (set) => ({
      user: null,
      jwt: null,
      login: async (data: any) => {
        set({
          user: data
        });
      },
      pushInvitation: async (data: any, user: any) => {
        set({
          user: { ...user, templates: [...user.templates, data] }
        });
      },
      updateInvitation: async (data: any, user: any) => {
        set({
          user: {
            ...user, templates: user.templates.map(function (item: any) {
              return data.id == item.id ? data : item
            })
          }
        });
      },
      loginJwt: async (data: string) => {
        set({
          jwt: data
        });
      },
      register: async (data: any, jwt: string) => {
        set({
          user: data,
          jwt
        });
      },
      logout: () => {
        set({
          user: null,
          jwt: null
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);