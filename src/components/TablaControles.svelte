<script>
  import { selectAll, eliminarRegistroSeleccionados, totalSeleccionados } from "../stores/stores.js";
</script>

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
      disabled={$totalSeleccionados === 0}
    >
      <i class="bi bi-trash"></i> Borrar seleccionados
    </button>
  </div>
  <div class="col-md-4">
    <button type="button" class="btn btn-warning">
      <i class="bi bi-people-fill"></i> Total seleccionados:
      <span class="fw-bold">{$totalSeleccionados}</span>
    </button>
  </div>
</div>