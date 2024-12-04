import Button from "../Button";
import { useNavigate } from "react-router-dom";

const AddExperienceButton = () => {
  const navigate = useNavigate();

  const handleAddExperience = () => {
    navigate("/add-experience");
  };

  return (
    <div className="px-8">
      <Button text="Añadir una experiencia" onClick={handleAddExperience} />
    </div>
  );
};

export default AddExperienceButton;
