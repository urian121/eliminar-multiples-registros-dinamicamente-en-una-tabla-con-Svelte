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
export const totalSeleccionados = derived(personas,
  ($personas) => $personas.filter((p) => p.selected).length
);


/**
 *  Función para eliminar una persona por ID
 */
export function eliminarRegistroPersona(id) {
  personas.update((lista) => lista.filter((p) => p.id !== id));
  mostarToast("Registro eliminado correctamente", "warning");
}

/**
 *  Función para eliminar todos los registros seleccionados
 */
export function eliminarRegistroSeleccionados() {
  personas.update((lista) => lista.filter((p) => !p.selected));
  mostarToast("Registros eliminados correctamente", "success");
}

/**
 *  Función para seleccionar todos los registros
 */
export function selectAll() {
  personas.update((lista) => {
    const allSelected = lista.every((p) => p.selected);
    return lista.map((p) => ({ ...p, selected: !allSelected }));
  });
}

/**
 *  Fución para alternar la selección de un registro
 */
export function toggleSelection(id) {
  personas.update((lista) =>
    lista.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
  );
}
