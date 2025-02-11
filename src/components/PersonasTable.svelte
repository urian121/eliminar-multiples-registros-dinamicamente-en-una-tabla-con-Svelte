<script>
  import { personas, eliminarRegistroPersona, toggleSelection } from "../stores/stores.js";
</script>

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
      {#each $personas as persona}
        <tr id={persona.id}>
          <th>
            <input
              class="form-check-input"
              type="checkbox"
              checked={persona.selected}
              on:change={() => toggleSelection(persona.id)}
            />
            <label class="form-check-label" for={persona.id}>{persona.id}</label>
          </th>
          <td>{persona.nombre}</td>
          <td>{persona.telefono}</td>
          <td>{persona.sexo}</td>
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
