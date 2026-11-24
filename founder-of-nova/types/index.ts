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
  _id?: string;
  id?: string;
  img?: string;
  imageUrl?: string;
  badgeIcon?: string;
  badgeText?: string;
  counter?: string;
  title: string;
  metaIcon?: string;
  meta?: string;
  modalSubject?: string;
  actionText?: string;
  actionType?: 'modal' | 'whatsapp' | 'call' | 'url';
  actionUrl?: string;
  order?: number;
  isActive?: boolean;
}

export interface ToastData {
  show: boolean;
  title: string;
  desc: string;
}

