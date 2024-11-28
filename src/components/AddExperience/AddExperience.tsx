import React, { useState } from "react";
import "./AddExperience.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns"; // Necesario para manejar el rango máximo de meses

const AddExperience = () => {
  const [images, setImages] = useState<File[]>([]);
  const [availability, setAvailability] = useState<{
    [date: string]: string[];
  }>({}); // Fechas con horarios seleccionados

  // Estados para el rango de fechas
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>("");

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

  // Manejar la fecha seleccionada
  const handleDateChange = (date: Date) => {
    setSelectedDate(date); // Actualizamos la fecha seleccionada
  };

  // Agregar disponibilidad para la fecha seleccionada y hora
  const addAvailabilityForDate = () => {
    if (selectedDate && selectedHour) {
      const dateKey = selectedDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD
      setAvailability((prev) => {
        const newAvailability = { ...prev };
        if (!newAvailability[dateKey]) {
          newAvailability[dateKey] = [];
        }
        // Verificar si la hora ya está ocupada
        if (!newAvailability[dateKey].includes(selectedHour)) {
          newAvailability[dateKey].push(selectedHour);
        }
        return newAvailability;
      });
      setSelectedHour(""); // Limpiar la hora seleccionada después de agregarla
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

  return (
    <form>
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
                  className="size-6"
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
          onInput={(e) => {
            e.target.style.height = "auto"; // Restablece la altura
            e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta según el contenido
          }}
        />
      </div>

      {/* Descripción */}
      <div className="content">
        <h1 className="label">Descripcion</h1>
        <textarea
          className="description-input"
          placeholder="Escribe una descripcion de la experiencia"
        />
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
      <div className="availability-summary">
        <ul>
          {Object.entries(availability).map(([date, hours]) => (
            <li key={date}>
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
      <div className="form-group">
        <label className="label">Capacidad</label>
        <input type="number" className="input" placeholder="Ejemplo: 2" />
      </div>
      <div className="form-group">
        <label className="label">Ubicación</label>
        <input
          type="text"
          className="input"
          placeholder="Ejemplo: 20 personas"
        />
      </div>
      <div className="form-group">
        <label className="label">Precio por persona</label>
        <div className="price-input">
          <span className="currency">$</span>
          <input
            type="number"
            className="input price-field"
            placeholder="Ejemplo: 20"
          />
        </div>
      </div>

      <div className="button-container">
        <button type="submit" className="submit-button">
          Añadir experiencia
        </button>
      </div>
    </form>
  );
};

export default AddExperience;
