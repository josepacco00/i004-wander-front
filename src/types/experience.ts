export interface IExperience {
  id: string;
  title: string;
  description: string;
  location: [country: string, city: string, lat: string, lon: string]
  hostId: string;
  price: number;
  availabilityDates: Date[];
  tags: string[];
  rating: number;
  capacity: number;
  createdAt: Date;
}

