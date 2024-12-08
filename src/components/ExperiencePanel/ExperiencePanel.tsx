
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth.context"
import PanelTourist from "./TouristUser/PanelTourist";
// import BookingInfo from "./BookingInfo/BookingInfo";
import PanelProvider from "./ProviderUser/PanelProvider";

function ExperiencePanel() {

  const { user } = useContext(AuthContext);
  console.log(user)
  

  return user?.role !== 'TOURIST' ? <PanelTourist/> : <PanelProvider/>
}

export default ExperiencePanel;