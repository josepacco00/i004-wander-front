import { createContext, useEffect, useState, ReactNode } from "react"
import authServices from "../services/auth.services"
import { AuthContextInterface } from "../types/auth"
import { User } from "../types/user"


const defaultState: AuthContextInterface = {
    user: null,
    setUser: () => { },
    authenticateUser: () => { },
    storeToken: () => { },
    logout: () => { },
    isLoading: false,
}

const AuthContext = createContext<AuthContextInterface>(defaultState)

type AuthProviderProps = {
    children: ReactNode
}

const AuthProviderWrapper = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authenticateUser()
    }, [])

    const storeToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    const removeToken = () => {
        localStorage.removeItem('authToken')
    }

    const logout = async () => {
        const token = localStorage.getItem('authToken')

        if (token) {
            try {
                await authServices.logout(token)
            } catch (error) {
                console.error("Error during logout:", error)
            }
        }

        setIsLoading(false)
        setUser(null)
        removeToken()
        localStorage.clear()

        window.location.href = "/"
    }

    const authenticateUser = async (onSuccess = () => { }) => {
        const token = localStorage.getItem("authToken")

        if (token) {
            // Si hay token, intenta verificarlo, por si está caducado o no es correcto
            try {
                const { data }: { data: User } = await authServices.verify(token)
                const storedUser = localStorage.getItem("user")

                // Doble verificación, para saber que el token pertenece al usuario logeado
                if (storedUser && JSON.parse(storedUser).email === data.sub) {
                    setUser(JSON.parse(storedUser))
                } else {
                    // console.log("Los datos inicio de sesión no coinciden")
                    // Este logout no funciona, porque el token no sería válido, tampoco para ejecutar la operación
                    // logout()
                    localStorage.clear()
                }

                onSuccess()
            } catch (err) {
                console.error("Authentication error:", err)
                
                localStorage.clear()
                // Este logout no funciona, porque el token no sería válido, tampoco para ejecutar la operación
                // logout()
            } finally {
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
            // Si no hay token, no se puede realizar esta petición, porque necesita de un token
            // logout()
            localStorage.clear()

            // Simplemente se redirige al Home
        }
    }

    return (
        <AuthContext.Provider
            value={
                { user, setUser, authenticateUser, storeToken, logout, isLoading }
            }>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper }