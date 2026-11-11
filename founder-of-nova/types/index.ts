export interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
  isActive?: boolean;
}

export interface ClientItem {
  id?: string;
  name: string;
  logoUrl?: string;
  file?: string;
  isActive?: boolean;
}

export interface GallerySlide {
  img: string;
  badgeIcon: string;
  badgeText: string;
  counter: string;
  title: string;
  metaIcon: string;
  meta: string;
  modalSubject: string;
  actionText: string;
}

export interface ToastData {
  show: boolean;
  title: string;
  desc: string;
}

