import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const templates: any[] = [
  {
    id: 1,
    title: "Mariage Élégant",
    category: "wedding",
    active: true,
    style: "Classique & Raffiné",
    imageUrl: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
  },
  {
    id: 2,
    title: "Anniversaire Festif",
    category: "birthday",
    active: false,
    style: "Moderne & Coloré",
    imageUrl: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
  },
  {
    id: 3,
    title: "Baptême Délicat",
    category: "baptism",
    active: false,
    style: "Doux & Poétique",
    imageUrl: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg",
  },
  {
    id: 4,
    title: "Fiançailles Romantiques",
    category: "engagement",
    active: false,
    style: "Romantique & Élégant",
    imageUrl: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
  },
  {
    id: 5,
    title: "Baby Shower Tendre",
    category: "baby-shower",
    active: false,
    style: "Doux & Chaleureux",
    imageUrl: "https://images.pexels.com/photos/3875080/pexels-photo-3875080.jpeg",
  },
  {
    id: 6,
    title: "Graduation Moderne",
    category: "graduation",
    active: false,
    style: "Contemporain & Dynamique",
    imageUrl: "https://images.pexels.com/photos/5905492/pexels-photo-5905492.jpeg",
  },
  {
    id: 7,
    title: "Graduation Moderne",
    category: "graduation",
    active: false,
    style: "Contemporain & Dynamique",
    imageUrl: "https://res.cloudinary.com/jeereq/image/upload/v1739904923/itm/uvwc2y07o8zbtirqax4n.jpg"
  }
];