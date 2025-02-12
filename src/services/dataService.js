import { personas } from "../stores/stores.js";

export async function cargarDatos() {
  try {
    // Realiza una solicitud para obtener los datos desde el archivo JSON
    const response = await fetch("/data/data.json");

    // Convierte la respuesta en formato JSON
    const data = await response.json();

    // Asigna los datos obtenidos al store "personas"
    personas.set(data);
  } catch (error) {
    // Muestra un error en la consola si la carga falla
    console.error("Error cargando datos:", error);
  }
}
