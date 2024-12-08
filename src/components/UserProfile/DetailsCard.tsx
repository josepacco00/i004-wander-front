import { useNavigate } from 'react-router-dom'
import { UserDetails } from '../../types/user'
import detailsList from '../../consts/userProfileFields'
import DetailsRow from './DetailsRow'

const DetailsCard: React.FC<UserDetails> = ({ email, location, phone, role }) => {

    const navigate = useNavigate()
    const dataMap = { email, location, phone }

    const handleBookingsClick = () => {
        navigate('/my-experiences')
    }

    return (
        <div className="w-full">
            <ul className="divide-y divide-gray-200">
                {detailsList.map((deet, i) => {

                    const { field, icon, title } = deet
                    const data = dataMap[field as keyof typeof dataMap] || ''
                    const adjustedTitle = field === 'bookings' && role.toLocaleUpperCase() === 'PROVIDER' ? 'Gestionar Reservas' : title

                    return (
                        <li key={i}>
                            <div className="py-2">
                                <DetailsRow
                                    field={field}
                                    icon={icon}
                                    title={adjustedTitle}
                                    data={data}
                                    onClick={field === 'bookings' ? handleBookingsClick : undefined}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>


        </div>

    )
}

export default DetailsCard