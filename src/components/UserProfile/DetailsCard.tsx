import email from '../../assets/icons/icon-email.svg'
import DetailsRow from './DetailsRow'

const DetailsCard: React.FC = () => {

    const detailsList = [
        {
            icon: email,
            title: 'Email',
            data: 'ale@travel.com'
        },
        {
            icon: email,
            title: 'Móvil',
            data: '+34 600 123 123'
        },
        {
            icon: email,
            title: 'Ubicación',
            data: 'Valencia, España'
        },
        {
            icon: email,
            title: 'Pagos',
            data: email
        },
    ]

    return (
        <div className="">
            <ul className="divide-y divide-gray-200">
                {detailsList.map((deet, i) => {
                    const { icon, title, data } = deet
                    return (
                        <li key={i}>
                            <div className="py-2 px-8 text-left">
                                <DetailsRow icon={icon} title={title} data={data} />
                            </div>
                        </li>
                    )
                })}
            </ul>


        </div>

    )
}

export default DetailsCard