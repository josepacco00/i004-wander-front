import { Routes, Route } from 'react-router-dom'
import Register from '../components/Register/Register'
import UserProfile from '../components/UserProfile/UserProfile'
import Login from '../components/LoginForm/LoginForm'
import ConfirmRegister from '../components/ConfirmRegister/ConfirmRegister'
import PaymentMethod from '../components/PaymentMethod/PaymentMethod'
import PaymentDetails from '../components/PaymentDetails/PaymentDetails'
import ForgotPasswordVerifyCode from '../components/ForgotPasswordVerifyCode/ForgotPasswordVerifyCode'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword'
import ChangePassword from '../components/ChangePassword/ChangePassword'
import Book from '../components/Book/Book'
import { ReservationProviderWrapper } from '../contexts/reservation.context'
import ExperienceDetail from '../components/ExperienceDetail/ExperienceDetail'
import AddExperience from "../components/AddExperience/AddExperience";
import Home from "../components/Home/homePage";
import ConfirmationView from '../components/ConfirmationView/ConfirmationView'
import Filters from '../components/Filters/Filters'
import { ProtectedPublicRoute } from './ProtectedPublicRoutes'

const AppRoutes = () => {

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/confirm-register" element={<ConfirmRegister />} />
            <Route path="/forgot-password-verify-code" element={<ForgotPasswordVerifyCode />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/filters" element={<Filters />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedPublicRoute />}>
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/add-experience" element={<AddExperience />} />
                <Route path="/confirmation-view" element={<ConfirmationView />} />
                <Route path="/experience/:id" element={<ExperienceDetail />} />
            </Route>

            {/* Rutas privadas */}
            {/* Si tienes un componente como PrivateRoute, descomenta y usa el código a continuación */}
            {/* <Route element={<PrivateRoute />}> */}
            <Route element={<ReservationProviderWrapper />}>
                <Route path="/booking" element={<Book />} />
                <Route path="/payment-method" element={<PaymentMethod />} />
                <Route path="/payment-details" element={<PaymentDetails />} />
            </Route>
            {/* </Route> */}

            {/* Ruta de 404 */}
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes;
