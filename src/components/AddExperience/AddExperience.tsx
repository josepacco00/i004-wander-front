import { useState, useEffect, useContext } from "react";
import "./AddExperience.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";
import { experienceServices } from "../../services/addExperience.services";
import SelectCords from "./Map/SelectionCoords";
import { AuthContext } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

type Coords = [number | undefined, number | undefined];
type infoCoords = any;

const AddExperience = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [images, setImages] = useState<File[]>([]);
  const [availability, setAvailability] = useState<{
    [date: string]: string[];
  }>({});
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [capacity, setCapacity] = useState<number>();
  const [tags, setTags] = useState<string[]>([]); // Array vacío para los tags
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>("");

  // Lista de tags disponibles para seleccionar
  const availableTags = [
    "Rural",
    "Naturaleza",
    "Comida",
    "Tours",
    "Náutico",
    "Ciudad",
    "Eventos",
  ];

  // Validar texto sin caracteres especiales
  const isValidText = (text: string): boolean => {
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,\s]+$/; // Permite letras, números y espacios
    return regex.test(text);
  };

  // Validaciones
  const validateForm = (): boolean => {
    if (!title.trim()) {
      setErrorMessage("El campo 'Título' es obligatorio.");
      return false;
    }
    if (!isValidText(title)) {
      setErrorMessage(
        "El título solo puede contener letras, números y espacios."
      );
      return false;
    }
    if (!description.trim()) {
      setErrorMessage("El campo 'Descripción' es obligatorio.");
      return false;
    }
    if (!isValidText(description)) {
      setErrorMessage(
        "La descripción solo puede contener letras, números y espacios."
      );
      return false;
    }

    if(Object.keys(availability).length === 0){
      setErrorMessage("Debe seleccionar al menos una fecha y una hora.");
      return false;
    }

    if (!price || price <= 0) {
      setErrorMessage("El campo 'Precio' debe ser mayor a 0.");
      return false;
    }
    if (!capacity || capacity <= 0) {
      setErrorMessage("El campo 'Capacidad' debe ser mayor a 0.");
      return false;
    }
    if (tags.length === 0) {
      setErrorMessage("Debe seleccionar al menos una categoría.");
      return false;
    }
    if (!selectedDate) {
      setErrorMessage("Debe seleccionar una fecha.");
      return false;
    }
    if (!coords[0] || !coords[1]) {
      setErrorMessage("Debe seleccionar una ubicación.");
      return false;
    }
    return true;
  };

  const [errorMessage, setErrorMessage] = useState<string>(""); // Para mostrar el mensaje de error
  const [showModal, setShowModal] = useState(false); // Para mostrar/ocultar el modal

  // Manejar la carga de imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Manejar la hora seleccionada
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHour(e.target.value);
  };

  const handleTagSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = event.target.value;
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags((prevTags) => [...prevTags, selectedTag]);
    }
  };

  // Manejar la fecha seleccionada
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Agregar disponibilidad para la fecha seleccionada y hora
  const addAvailabilityForDate = () => {
    if (selectedDate && selectedHour) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      setAvailability((prev) => {
        const newAvailability = { ...prev };
        if (!newAvailability[dateKey]) {
          newAvailability[dateKey] = [];
        }
        if (!newAvailability[dateKey].includes(selectedHour)) {
          newAvailability[dateKey].push(selectedHour);
        }
        return newAvailability;
      });
      setSelectedHour("");
    }
  };

  // Eliminar disponibilidad para una fecha y hora específica
  const removeAvailability = (date: string, hour: string) => {
    setAvailability((prev) => {
      const newAvailability = { ...prev };
      if (newAvailability[date]) {
        newAvailability[date] = newAvailability[date].filter((h) => h !== hour);
      }
      return newAvailability;
    });
  };

  // Formatear disponibilidad
  const formatAvailabilityDates = () => {
    const formattedDates: string[] = [];
    Object.entries(availability).forEach(([date, hours]) => {
      hours.forEach((hour) => {
        const [hourPart, minutePart] = hour.split(":");
        const fullDate = new Date(date);
        fullDate.setUTCHours(Number(hourPart), Number(minutePart), 0, 0);
        formattedDates.push(fullDate.toISOString());
      });
    });
    return formattedDates;
  };

  // Agregar un valor al array de `location`
  // const addLocation = (value: string) => {
  //   setLocation((prev) => [...prev, value]);
  // };

  // // Eliminar un valor del array de `location`
  // const removeLocation = (index: number) => {
  //   setLocation((prev) => prev.filter((_, i) => i !== index));
  // };

  // const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const input = e.currentTarget.value.trim();
  //     if (input && !tags.includes(input)) {
  //       setTags([...tags, input]);
  //       e.currentTarget.value = ""; // Limpia el campo después de agregar el tag
  //     }
  //   }
  // };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el envío del formulario

    if (!validateForm()) {
      setShowModal(true); // Mostrar el modal si la validación falla
      return; // No continuar si la validación falla
    }

    // Si la validación pasa, puedes hacer la llamada al backend
    const location = [
      infoCoords.country,
      infoCoords.city,
      coords[0]?.toFixed(4),
      coords[1]?.toFixed(4),
    ];


    const payload = {
      title,
      description,
      location,
      hostId: user?._id,
      price,
      availabilityDates: formatAvailabilityDates(),
      tags,
      capacity,
    };

    
    console.log(payload)

    try {
      const response = await experienceServices.addExperience(payload);
      console.log("Respuesta del backend:", response.data);
      alert("¡Experiencia añadida con éxito!");
      navigate("/user-profile");
    } catch (error) {
      console.error("Error al enviar los datos al backend:", error);
      alert("Hubo un error al añadir la experiencia. Inténtalo nuevamente.");
    }
  };

  const [coords, setCoords] = useState<Coords>([undefined, undefined]);
  const [infoCoords, setInfoCoords] = useState<infoCoords>({});

  // Función para realizar la geocodificación inversa
  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=es`
      );
      if (!response.ok) throw new Error("Error fetching location data");

      const { address } = await response.json();
      return address; // Contiene información como la ciudad, país, etc.
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return null;
    }
  };

  // Llamar a reverseGeocode cuando las coordenadas cambien
  useEffect(() => {
    const fetchLocationData = async () => {
      if (coords[0] !== undefined && coords[1] !== undefined) {
        const data = await reverseGeocode(coords[0], coords[1]);

        setInfoCoords(data);
      }
    };

    fetchLocationData();
  }, [coords]); // Ejecutar cuando coords cambie

  const closeModal = () => {
    setShowModal(false);
    setErrorMessage(""); // Limpiar el mensaje de error al cerrar el modal
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg shadow-lg w-80">
            <p className="mb-4 font-medium text-primary">{errorMessage}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 text-white rounded-md bg-primary hover:bg-orange"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* Sección de imágenes */}
      <div className="image-section">
        <label className="label-1">Añadir experiencia</label>
        <div className="main-image">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="upload-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </label>
        </div>

        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-preview">
              <img
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
                className="preview-img"
              />
              <button
                className="remove-button"
                onClick={() => removeImage(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Título de la experiencia */}
      <div className="content">
        <h1 className="label">Titulo Experiencia</h1>
        <textarea
          className="titulo-input"
          placeholder="Escribe el Titulo de la Experiencia"
          value={title}
          maxLength={20}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Descripción */}
      <div className="content">
        <h1 className="label">Descripción</h1>
        <textarea
          className="description-input"
          placeholder="Escribe una descripción de la experiencia"
          value={description}
          maxLength={250}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="px-3 form-group">
        <label className="label">Categorías</label>
        <select value="" onChange={handleTagSelect} className="tags-select">
          <option value="">Selecciona una Categoría</option>
          {availableTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <div className="tags-list">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="remove-tag"
              >
                X
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Disponibilidad */}
      <div className="form-group">
        <label className="label">Disponibilidad</label>

        {/* Selección de rango de fechas */}
        <div className="date-picker">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange} // Ahora actualiza la fecha seleccionada
            minDate={new Date()}
            maxDate={addMonths(new Date(), 5)}
            inline
            showDisabledMonthNavigation
          />
        </div>

        {/* Selección de hora */}
        <div className="time-selection">
          <label className="label-hora">Hora disponible</label>
          <input
            type="time"
            value={selectedHour}
            onChange={handleHourChange}
            className="time-input"
          />
          <button
            type="button"
            className="add-availability-button"
            onClick={addAvailabilityForDate}
          >
            Agregar hora
          </button>
        </div>
      </div>

      {/* Mostrar disponibilidad seleccionada */}
      <div className="px-3 pb-4 availability-summary">
        <ul className="">
          {Object.entries(availability).map(([date, hours]) => (
            <li key={date} className="flex gap-4">
              <strong>{date}:</strong>
              <ul>
                {hours.map((hour, index) => (
                  <li key={index}>
                    {hour}{" "}
                    <button
                      className="remove-availability-button"
                      onClick={() => removeAvailability(date, hour)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Otros campos */}
      <div className="px-3 form-group">
        <label className="label">Capacidad</label>
        <input
          onChange={(e) => setCapacity(Number(e.target.value))}
          type="number"
          className="input"
          placeholder="Ejemplo: 2"
          min="1"
        />
      </div>

      <div className="mb-4">
        <h1 className="label">Ubicación</h1>
        <SelectCords
          coords={coords}
          setCoords={setCoords}
          infoCoords={infoCoords}
        />
      </div>

      <div className="px-3 form-group">
        <label className="label">Precio por persona</label>
        <div className="price-input">
          <span className="currency">$</span>
          <input
            type="number"
            className="input price-field"
            placeholder="Ejemplo: 20"
            min="0"
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
      </div>
      {/* Etiquetas (Lista desplegable) */}

      <div className="button-container">
        <button onClick={() => console.log(availability)} type="submit" className="submit-button">
          Añadir experiencia
        </button>
      </div>
    </form>
  );
};

export default AddExperience;
