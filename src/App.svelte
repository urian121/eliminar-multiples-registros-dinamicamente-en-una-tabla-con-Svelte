<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap-icons/font/bootstrap-icons.css";

  // Para generar alertas emergentes
  import { toast } from "nextjs-toast-notify";
  import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

  import { onMount } from "svelte";
  let personas = [];

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
    toast.success("¡La persona ha sido eliminada con éxito!", {
      duration: 5000,
      progress: true,
      position: "top-center",
      transition: "swingInverted",
      sonido: true,
    });
  }

  /**
   * Función para seleccionar o deseleccionar todos los registros
   */
  function selectAll() {
    const allSelected = personas.every((persona) => persona.selected);
    personas = personas.map((persona) => ({
      ...persona,
      selected: !allSelected,
    }));
  }

  function eliminarRegistroSeleccionados() {
    personas = personas.filter((persona) => !persona.selected);
  }

  function toggleSelection(personaId) {
    personas = personas.map((persona) =>
      persona.id === personaId
        ? { ...persona, selected: !persona.selected }
        : persona
    );
  }

  $: totalSeleccionados = personas.filter((persona) => persona.selected).length;
</script>

<div class="container">
  <div class="row">
    <div class="col">
      <h1 class="text-center fw-bold mb-5">
        Eliminar Registros Dinámicamente en una Tabla con Svelte <hr />
      </h1>
    </div>
  </div>

  <div class="row">
    <div class="col-md-4 mb-5">
      <button type="button" class="btn btn-primary" on:click={selectAll}>
        <i class="bi bi-check2-square"></i> Seleccionar todos
      </button>
    </div>
    <div class="col-md-4">
      <button
        type="button"
        class="btn btn-danger"
        on:click={eliminarRegistroSeleccionados}
      >
        <i class="bi bi-trash"></i> Borrar seleccionados
      </button>
    </div>
    <div class="col-md-4">
      <button type="button" class="btn btn-warning">
        <i class="bi bi-people-fill"></i> Total seleccionados:
        <span class="fw-bold">{totalSeleccionados}</span>
      </button>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Sexo</th>
              <th scope="col">Profesión</th>
              <th scope="col">Departamento</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {#each personas as persona}
              <tr id={persona.id}>
                <th>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={persona.selected}
                    on:change={() => toggleSelection(persona.id)}
                  />
                  <label class="form-check-label" for={persona.id}>
                    {persona.id}
                  </label>
                </th>
                <td>{persona.nombre}</td>
                <td>{persona.telefono}</td>
                <td>{persona.Sexo}</td>
                <td>{persona.profesion}</td>
                <td>{persona.departamento}</td>
                <td>
                  <button
                    class="btn btn-warning"
                    type="button"
                    on:click={() => eliminarRegistroPersona(persona.id)}
                    aria-label="Eliminar registro"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style>
  input[type="checkbox"] {
    cursor: pointer;
    width: 25px;
    height: 25px;
  }
</style>
