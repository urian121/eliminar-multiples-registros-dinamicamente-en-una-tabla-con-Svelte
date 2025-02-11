<script>
  // Importando Bootstrap y sus iconos
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap-icons/font/bootstrap-icons.css";

  // Importando la función onMount de Svelte para cargar los datos
  import { onMount } from "svelte";
  import TablaControles from "./components/TablaControles.svelte";
  import PersonasTable from "./components/PersonasTable.svelte";
  import { cargarDatos } from "./services/dataService.js";

  // Funcion onMount que se ejecuta al cargar el componente
  onMount(() => {
    cargarDatos();
  });
</script>

<div class="container">
  <h1 class="text-center fw-bold mb-5">
    Eliminar Registros Dinámicamente en una Tabla con Svelte
    <hr />
  </h1>

  <!-- Componente de controles -->
  <TablaControles />

  <!-- Componente de tabla -->
  <PersonasTable />
</div>
