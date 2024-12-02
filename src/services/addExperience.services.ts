
import createApiClient from "./apiClient";

class ExperienceServices {
    private api = createApiClient(`${import.meta.env.VITE_API_URL}/experiences`);

    async addExperience(experience: any) {
        return await this.api.post("/create", experience);
    }
}

export const experienceServices = new ExperienceServices();