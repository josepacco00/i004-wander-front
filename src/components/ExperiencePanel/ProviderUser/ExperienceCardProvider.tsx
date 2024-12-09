import imageSafari from "../../../assets/img/Safari.jpg";
import { useNavigate } from "react-router-dom";

function ExperienceCardProvider({ title, experienceId , price, status } : {title: string, experienceId: string, price: number, status:string  } ) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <div>
        <img
          src={imageSafari}
          alt=""
          className="max-w-[95px] h-28 rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 overflow-hidden">
        <div className="pt-0.5">
          <h1 className="text-lg font-semibold truncate">
            {title}
          </h1>
          {status ? <p>
            Estado: <span className="text-green-600">Activo</span>
          </p> : <p>
            Estado: <span className="text-red-600">Inactivo</span>
          </p>}
          <p>Precio: ${price}</p>
        </div>

        <div className="flex gap-2 text-xs">
          <button onClick={() => navigate(`/customers/${experienceId}`)} className="px-2 py-1 text-white rounded">Ver Clientes</button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCardProvider;
