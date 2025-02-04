<script>
  import { onMount } from "svelte";
  import Controls from "./components/Controls.svelte";
  import PersonasTable from "./components/PersonasTable.svelte";

  // Importando Bootstrap y sus iconos
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap-icons/font/bootstrap-icons.css";

  // Importando la librería de alertas emergentes
  import { toast } from "nextjs-toast-notify";

  // Declando el arreglo de personas para almacenar los datos obtenidos del archivo JSON
  let personas = [];

  // Función que se ejecuta al cargar el componente
  onMount(async () => {
    // Realiza una solicitud para obtener los datos del archivo JSON ubicado en la raíz pública
    const response = await fetch("/data/data.json");
    // Convierte la respuesta en formato JSON y asigna los datos al arreglo 'personas'
    personas = await response.json();
  });

  function eliminarRegistroPersona(idPersona) {
    // Imprime el ID de la persona que se va a eliminar (para fines de depuración)
    console.log("Eliminar registro con ID:", idPersona);

    // Filtra el arreglo 'personas' para eliminar el registro con el ID correspondiente
    personas = personas.filter((persona) => persona.id !== idPersona);

    // Muestra una alerta emergente para indicar que la operación se realizó con éxito
    mostarAlerta("La persona fue eliminada correctamente.", "warning");
  }

  /**
   * Elimina todos los registros que están seleccionados.
   */
  function eliminarRegistroSeleccionados() {
    // Filtra el array de personas para conservar solo aquellos registros
    // que no están seleccionados (selected === false)
    personas = personas.filter((persona) => !persona.selected);
    mostarAlerta(
      "Los registros seleccionados fueron eliminados correctamente.",
      "success"
    );
  }

  /**
   * Alterna entre seleccionar y deseleccionar todos los registros.
   */
  function selectAll() {
    // Verifica si todos los registros están actualmente seleccionados
    const allSelected = personas.every((persona) => persona.selected);

    // Actualiza el estado de selección de cada registro
    // Si todos estaban seleccionados, los deselecciona; de lo contrario, los selecciona
    personas = personas.map((persona) => ({
      ...persona, // Mantiene el resto de las propiedades del objeto intactas
      selected: !allSelected, // Cambia el estado de selección
    }));
  }

  /**
   * Cambia el estado de selección de un registro específico.
   * @param {number} personaId - El ID del registro cuya selección será cambiada.
   */
  function toggleSelection(personaId) {
    // Recorre el array de personas y actualiza el registro cuyo ID coincide
    personas = personas.map(
      (persona) =>
        persona.id === personaId
          ? {
              ...persona, // Copia las propiedades del objeto actual
              selected: !persona.selected, // Alterna el estado de selección
            }
          : persona // Devuelve los demás registros sin cambios
    );
  }

  /**
   * Calcula dinámicamente el total de registros seleccionados.
   * Esta variable se actualiza automáticamente cada vez que cambia el array de personas.
   */

  $: totalSeleccionados = personas.filter((persona) => persona.selected).length;

  /**
   * Muestra una alerta emergente con un mensaje específico.
   * @param msj
   */
  function mostarAlerta(msj, type) {
    // Muestra una alerta emergente para indicar que la operación se realizó conxito
    toast[type](msj, {
      duration: 5000,
      progress: true,
      position: "top-right",
      transition: "swingInverted",
      sound: true,
    });
  }
</script>

<div class="container">
  <h1 class="text-center fw-bold mb-5">
    Eliminar Registros Dinámicamente en una Tabla con Svelte <hr />
  </h1>

  <!-- Componente de controles -->
  <Controls {selectAll} {eliminarRegistroSeleccionados} {totalSeleccionados} />

  <!-- Componente de tabla -->
  <PersonasTable
    {personas}
    onEliminar={eliminarRegistroPersona}
    onToggle={toggleSelection}
  />
</div>
