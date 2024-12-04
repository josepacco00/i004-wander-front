import createApiClient from "./apiClient"

class UserServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/auth`)

    getUser() {
        return this.api.get(`/profile`)
    }

    logOutUser() {
        return this.api.post(`/logout`)
    }

    editUser(id: string, editData: any) {
        return this.api.put(`/${id}/edit`, editData)
    }

}

const userServices = new UserServices()

export default userServices
