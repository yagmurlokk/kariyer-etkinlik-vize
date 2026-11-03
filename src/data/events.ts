import type { CampusEvent } from "../types/campus-event";
import kariyerGunleriImg from '../assets/kariyergunleri.png';
import robotikImg from '../assets/robotikresim.jpg';
import yazilimImg from '../assets/yazilimresim.jpg';
import yapayzekaImg from '../assets/yapayzekaresim.webp';
import mobiluygulamaImg from '../assets/mobiluygulamaresim.jpg';
import siberguvenlikImg from '../assets/siberguvenlikresim.jpeg';


export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla söyleşiler ve staj imkanları.",
    capacity: 120,
    image: kariyerGunleriImg
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:30",
    location: "Lab 2",
    description: "Mikrodenetleyiciler ve otonom robot tasarımları.",
    capacity: 30,
    image: robotikImg 
  },
  {
    id: "event-3",
    title: "Yazılım Konferansı",
    category: "Söyleşi", // "Konferans" kurala uymadığı için "Söyleşi" yapıldı
    date: "25-10-2026",
    time: "13:00",
    location: "Büyük Salon",
    description: "Yazılım dünyasındaki güncel bulut ve web teknolojileri.",
    capacity: 250,
    image:yazilimImg
  },
  {
    id: "event-4",
    title: "Yapay Zeka ve Gelecek",
    category: "Seminer",
    date: "02-11-2026",
    time: "15:00",
    location: "Mühendislik Fakültesi Amfi 1",
    description: "Üretken yapay zeka modelleri üzerine panel.",
    capacity: 100,
    image: yapayzekaImg
  },
  {
    id: "event-5",
    title: "Mobil Uygulama Hackathonu",
    category: "Atölye",
    date: "15-11-2026",
    time: "09:00",
    location: "İnovasyon Merkezi",
    description: "24 saatlik kesintisiz mobil arayüz geliştirme maratonu.",
    capacity: 40,
    image: mobiluygulamaImg
  },
  {
    id: "event-6",
    title: "Siber Güvenlik Zirvesi",
    category: "Söyleşi", // "Konferans" kurala uymadığı için "Söyleşi" yapıldı
    date: "28-11-2026",
    time: "11:00",
    location: "Merkez Kütüphane Konferans Salonu",
    description: "Ağ güvenliği ve siber savunma stratejileri paneli.",
    capacity: 180,
    image: siberguvenlikImg 
  }
];