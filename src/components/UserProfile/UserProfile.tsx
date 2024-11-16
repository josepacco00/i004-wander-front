import ProfileCard from "./ProfileCard"
import BioCard from "./BioCard"
import DetailsCard from "./DetailsCard"
import DetailsRow from "./DetailsRow"

import logout from "../../assets/icons/incon-logout.svg"

const UserProfile: React.FC = () => {

    return (
        <div className='flex flex-col items-center h-screen w-screen mt-4 font-montserrat'>
            <div className='w-full px-8 mb-12'>
                <ProfileCard />
            </div>
            <div className='w-full px-8 mb-12'>
                <BioCard />
            </div>
            <div className='w-full px-8 mb-12'>
                <DetailsCard />
            </div>
            <div className='mb-2 justify-end'>
                <DetailsRow icon={logout} title="Cerrar sesión" data='' />
            </div>
        </div>
    )

}

export default UserProfile