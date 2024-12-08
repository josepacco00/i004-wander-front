// Retorna el formato de fecha DD/MM/YYYY

export function formatToShortDate(longDate : string) {
    const date = new Date(longDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); 

    return `${day}/${month}/${year}`; // Aquí debe ir el template string con backticks


}

export function formatCategory(category: string | string[]) {

    const categoryString = Array.isArray(category) ? category[0] : category;

    if (!categoryString) return '';
    return categoryString.charAt(0).toUpperCase() + categoryString.slice(1);
}


export const getStatus = (state: string) => {
    switch (state) {
      case "CONFIRMED":
        return { text: "Confirmado", color: "text-green-600" };
      case "CANCELLED":
        return { text: "Cancelado", color: "text-red-600" };
      case "PENDING":
        return { text: "Pendiente", color: "text-gray-500" };
      default:
        return { text: "Desconocido", color: "text-gray-400" };
    }
  };