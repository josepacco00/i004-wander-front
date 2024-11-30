import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedPublicRoute = () => {
    const {user, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <div>Cargando...</div>
    }

    return user ? <Navigate to="/" replace /> : <Outlet />
}