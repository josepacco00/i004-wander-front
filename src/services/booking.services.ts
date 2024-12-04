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
}

const bookingServices = new BookingServices()

export default bookingServices