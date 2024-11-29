import { Routes, Route } from 'react-router-dom'
// import PrivateRoute from './PrivateRoutes'
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

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/confirm-register" element={<ConfirmRegister />} />
            <Route path="/forgot-password-verify-code" element={<ForgotPasswordVerifyCode />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />  {/* this route is not yet implemented */}
            <Route path="/add-experience" element={<AddExperience />} />

            <Route element={<ReservationProviderWrapper />}>
                <Route path="/experience/:id" element={<ExperienceDetail />} />
                <Route path="/booking" element={<Book />} />
                <Route path="/payment-method" element={<PaymentMethod />} />
                <Route path="/payment-details" element={<PaymentDetails />} />
            </Route>

            {/* <Route element={<PrivateRoute />}>
                <Route path="/UserProfile" element={<UserProfile />} />

            </Route> */}

            <Route path="*" element={<h1>404</h1>} />

        </Routes>
    )
}


export default AppRoutes
