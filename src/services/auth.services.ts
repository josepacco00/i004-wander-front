import createApiClient from './apiClient'

class AuthServices {

    private api = createApiClient(`${import.meta.env.VITE_API_URL}/auth`)

    verify(token: string) {
        return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
    }
}

const authServices = new AuthServices()

export default authServices