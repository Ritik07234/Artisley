export interface Artist {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  location: string;
  languages: string[];
  image?: string;
}
