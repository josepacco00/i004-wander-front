import { UserDetails } from '../../types/user'
import detailsList from '../../consts/userProfileFields'
import DetailsRow from './DetailsRow'

const DetailsCard: React.FC<UserDetails> = ({ email, location, phone }) => {

    const dataMap = { email, location, phone }

    return (
        <div className="w-full">
            <ul className="divide-y divide-gray-200">
                {detailsList.map((deet, i) => {
                    const { field, icon, title } = deet
                    const data = dataMap[field as keyof typeof dataMap] || ''
                    return (
                        <li key={i}>
                            <div className="py-2">
                                <DetailsRow field={field} icon={icon} title={title} data={data} />
                            </div>
                        </li>
                    )
                })}
            </ul>


        </div>

    )
}

export default DetailsCard