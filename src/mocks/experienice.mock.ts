import { IExperience } from "../types/experience";

// Mock para prueba
export const experienceMock: IExperience = {
    id: "987-653",
    availabilityDates: [new Date(), new Date("2024/12/13"), new Date("2024/10/9"), new Date("2024/1/7"), new Date("2024/4/24"), new Date("2024/1/18"), new Date("2024/7/3"), new Date("2024/11/4")],
    capacity: 4,
    createdAt: new Date(),
    description: "Experience description",
    hostId: "654-987",
    location: ["Spain", "Valencia", "39.4699", "-0.3763"],
    price: 100,
    rating: 3.7,
    tags: ["Tag1", "Tag2", "Tag3"],
    title: "Experience Title"
  }