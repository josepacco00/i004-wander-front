import { INewReservationToNode } from "../types/reservation"
import createApiClient from "./apiClient"

class BookingServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/bookings`)

    async create(booking: INewReservationToNode) {
        await this.api.post(
            "/create",
            booking
        )
    }
}

const bookingServices = new BookingServices()

export default bookingServices