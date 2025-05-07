import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const templates: any[] = [
  {
    id: 1,
    title: "Mariage 1",
    category: "wedding",
    active: true,
    style: "Classique & Raffiné",
    imageUrl: "https://i.pinimg.com/736x/63/de/3a/63de3a93ad459acf7e6d9ee0d5102aac.jpg",
  },
  {
    id: 2,
    title: "Mariage 2",
    category: "wedding",
    active: true,
    style: "Moderne & Coloré",
    imageUrl: "https://i.pinimg.com/736x/a5/b6/14/a5b614c1975ed48ad4f4927194cc0d03.jpg",
  },
  {
    id: 3,
    title: "Mariage 3",
    category: "wedding",
    active: true,
    style: "Doux & Poétique",
    imageUrl: "https://i.pinimg.com/736x/d9/3f/1f/d93f1f8cbe0aa03820c4af9e0c159554.jpg",
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
    imageUrl: "https://i.pinimg.com/736x/63/de/3a/63de3a93ad459acf7e6d9ee0d5102aac.jpg",
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