export interface IContact {
  id: number;
  email: string;
  phone: string;
  office: string;
  links: Link[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Link {
  id: number;
  social_network: string;
  link: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
