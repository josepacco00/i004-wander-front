type CreateReviewResponse = {
    status: number;
    message: string;
  };
  

import createApiClient from "./apiClient"

class ReviewServices {
    private api = createApiClient(`${import.meta.env.VITE_API_URL}/reviews`)

    async create(review: unknown): Promise<CreateReviewResponse> {
        const response = await this.api.post("/create", review);
        return response.data; 
    }
    
    async delete(review: unknown) {
        await this.api.delete(`${review}`);
    }
}

const reviewServices = new ReviewServices()

export default reviewServices;