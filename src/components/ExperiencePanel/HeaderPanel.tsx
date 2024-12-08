import iconLeft from '../../assets/icons/icon-arrow-left.svg'
import { useNavigate } from 'react-router-dom';

function HeaderPanel({title} : {title: string}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-4">
      <img onClick={() => navigate(-1)} src={iconLeft} alt="icon-left" className="w-8 pl-5 cursor-pointer" />
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="pr-5"></p>
    </div>
  );
}

export default HeaderPanel;
