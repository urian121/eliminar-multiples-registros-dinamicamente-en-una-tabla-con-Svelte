import { personas } from "../stores/stores.js";

export async function cargarDatos() {
  try {
    const response = await fetch("/data/data.json");
    const data = await response.json();
    personas.set(data); // Asigna los datos al store
  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}
