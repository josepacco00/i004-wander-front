import { NewUserData } from '../types/auth'
import createApiClient from './apiClient'

class AuthServices {
    private api = createApiClient(`${import.meta.env.VITE_API_URL}/auth`);

    // Método de login
    login = async (credentials: {email: string, password: string}) => {
        const response = await this.api.post(
            '/login',
            { ...credentials });

        return response; // Devuelve la respuesta
    };

    // Método de verificación
    verify(token: string) {
        return this.api.get('/verify', { headers: { Authorization: `Bearer ${token}` } });
    }

    // Método registro
    register(newUserData: NewUserData) {
        return this.api.post(
            "/register",
            JSON.stringify(newUserData),
        )
    }

    async confirmAccount(data: {email: string, verificationCode: string}) {
        const res =  await this.api.post("/verify-user", data)

        return res
    }

    // Método para logout
    logout(token: string) {
        return this.api.post('/logout', null, { headers: { Authorization: `Bearer ${token}` } });
    }
}

const authServices = new AuthServices()

export default authServices