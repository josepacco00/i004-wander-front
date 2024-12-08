import createApiClient from "./apiClient"

class BookingServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/bookings`)

    // Tipar con una interfaz
    async create(booking: unknown) {
        await this.api.post(
            "/create",
            booking
        )
    }
    async getBookingsFromUser(id: unknown) {
        const responde = await this.api.get(`/user/${id}`);
        return responde.data;
    }

    async getBookingsFromExperience(id: unknown) {
        const responde = await this.api.get(`/experience/${id}`);
        return responde.data;
    }

    async updateBooking(bookingId: unknown, data: unknown) {
        await this.api.put(`/${bookingId}`, data);
    }

}

const bookingServices = new BookingServices()

export default bookingServices