/**
 * Se usa Stores para manejar la lista de personas
 * Store writable, sirve para crear una variable reactiva y que se actualice cuando se cambia su valor.
 * Store derived, sirve para crear una variable reactiva que depende de otra variable reactiva.
 */
import { writable, derived } from "svelte/store";
import  {mostarToast} from "../services/miToast.js";

// Defino el Store personas que será un array reactivo para manejar la lista de personas
export const personas = writable([]);

/**
 * Stores para manejar la cantidad de personas seleccionadas 
 */
export const totalSeleccionados = derived(personas, ($personas) => {
  // Filtra las personas seleccionadas
  const seleccionados = $personas.filter((p) => p.selected);

  // Retorna la cantidad de personas seleccionadas
  return seleccionados.length;
});

/**
 *  Función para eliminar una persona por ID
 */
export function eliminarRegistroPersona(id) {
  // Filtra la lista de personas, eliminando la persona con el ID dado
  personas.update((lista) => lista.filter((p) => p.id !== id));

  // Muestra una notificación de advertencia
  mostarToast("Registro eliminado correctamente", "warning");
}

/**
 *  Función para eliminar todos los registros seleccionados
 */
export function eliminarRegistroSeleccionados() {
  // Filtra la lista de personas, eliminando los que están seleccionados
  personas.update((lista) => lista.filter((p) => !p.selected));

  // Muestra una notificación de éxito
  mostarToast("Registros eliminados correctamente", "success");
}

/**
 *  Función para seleccionar todos los registros
 */
export function selectAll() {
  // Recorre la lista de personas y cambia la propiedad "selected"
  personas.update((lista) => {
    // Verifica si todos los elementos están seleccionados
    const allSelected = lista.every((p) => p.selected);

    // Si todos están seleccionados, los deselecciona; de lo contrario, los selecciona
    return lista.map((p) => ({ ...p, selected: !allSelected }));
  });
}

/**
 *  Fución para alternar la selección de un registro
 */
export function toggleSelection(id) {
  // Actualiza la lista de personas, cambiando la propiedad "selected"
  // de la persona con el ID dado.
  personas.update((lista) =>
    lista.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
  );
}
