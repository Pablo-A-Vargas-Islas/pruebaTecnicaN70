<template>
  <div class="container py-5">
    <header class="text-center mb-5">
      <h1 class="fw-bold text-primary">Gestor de Tareas</h1>
      <p class="text-muted">Mini aplicación Full Stack conectada con Node.js, Express y PostgreSQL</p>
    </header> 

    <div class="row">
      <!-- FORMULARIO PARA AGREGAR UNA NUEVA TAREA -->
      <div class="col-lg-4 mb-4">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-primary text-white">
            <h5 class="card-title mb-0">Nueva Tarea</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label fw-semibold">Título *</label>
                <input
                  v-model.trim="form.titulo"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.titulo }"
                  placeholder="Ej. Revisar entregables"
                />
                <div class="invalid-feedback">El título es obligatorio.</div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Descripción</label>
                <textarea
                  v-model.trim="form.descripcion"
                  class="form-control"
                  rows="3"
                  placeholder="Detalles de la tarea..."
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Archivo adjunto (Opcional)</label>
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileUpload"
                  class="form-control"
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="store.loading"
              >
                <span v-if="store.loading" class="spinner-border spinner-border-sm me-2"></span>
                Guardar Tarea
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- MÓDULO DE LISTA DE LAS TAREAS -->
      <div class="col-lg-8">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Listado de Tareas</h5>
            <span class="badge bg-secondary">{{ store.tasks.length }} tareas</span>
          </div>
          <div class="card-body p-0">
            <div v-if="store.loading && store.tasks.length === 0" class="text-center py-5">
              <div class="spinner-border text-primary" role="status"></div>
              <p class="mt-2 text-muted">Cargando tareas...</p>
            </div>

            <div v-else-if="store.tasks.length === 0" class="text-center py-5 text-muted">
              <p class="mb-0">No hay tareas registradas. ¡Crea una nueva desde el formulario!</p>
            </div>

            <div v-else class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Estado</th>
                    <th>Título y Descripción</th>
                    <th>Adjunto</th>
                    <th>Fecha</th>
                    <th class="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="task in paginatedTasks" :key="task.id">
                    <td>
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :checked="task.completado"
                        @change="toggleCompletado(task)"
                      />
                    </td>
                    <td>
                      <div :class="{ 'text-decoration-line-through text-muted': task.completado }">
                        <strong>{{ task.titulo }}</strong>
                        <p class="small mb-0 text-secondary" v-if="task.descripcion">{{ task.descripcion }}</p>
                      </div>
                    </td>
                    <td>
                      <a
                        v-if="task.archivoAdjunto"
                        :href="`http://localhost:3000/${task.archivoAdjunto}`"
                        target="_blank"
                        class="btn btn-sm btn-outline-info"
                      >
                        Ver archivo
                      </a>
                      <span v-else class="text-muted small">Sin adjunto</span>
                    </td>
                    <td class="small text-muted">
                      {{ new Date(task.fechaCreacion).toLocaleDateString() }}
                    </td>
                    <td class="text-end">
                      <button
                        @click="confirmDelete(task.id)"
                        class="btn btn-sm btn-outline-danger"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- BOTONES DE PAGINACIÓN -->
          <div v-if="totalPages > 1" class="card-footer bg-white d-flex justify-content-between align-items-center">
            <small class="text-muted">Página {{ currentPage }} de {{ totalPages }}</small>
            <div class="btn-group">
              <button
                class="btn btn-sm btn-outline-secondary"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                Anterior
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useTaskStore } from './stores/taskStore';

const store = useTaskStore();
const fileInput = ref(null);

const form = reactive({
  titulo: '',
  descripcion: '',
  archivo: null
});

const errors = reactive({
  titulo: false
});

const currentPage = ref(1);
const itemsPerPage = 5;

const totalPages = computed(() => Math.ceil(store.tasks.length / itemsPerPage) || 1);

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return store.tasks.slice(start, start + itemsPerPage);
});

onMounted(() => {
  store.fetchTasks();
});

const handleFileUpload = (event) => {
  form.archivo = event.target.files[0] || null;
};

const handleSubmit = async () => {
  errors.titulo = !form.titulo;
  if (errors.titulo) return;

  const data = new FormData();
  data.append('titulo', form.titulo);
  data.append('descripcion', form.descripcion);
  if (form.archivo) {
    data.append('archivo', form.archivo);
  }

  const result = await store.addTask(data);

  if (result.success) {
    Swal.fire({
      icon: 'success',
      title: '¡Tarea creada!',
      text: 'La tarea se guardó con éxito.',
      timer: 2000,
      showConfirmButton: false
    });

    form.titulo = '';
    form.descripcion = '';
    form.archivo = null;
    if (fileInput.value) fileInput.value.value = '';
    errors.titulo = false;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: result.error
    });
  }
};

const toggleCompletado = async (task) => {
  const result = await store.updateTask(task.id, { completado: !task.completado });
  if (!result.success) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar el estado de la tarea.'
    });
  }
};

const confirmDelete = async (id) => {
  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (confirm.isConfirmed) {
    const result = await store.deleteTask(id);
    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Eliminada',
        text: 'La tarea ha sido borrada.',
        timer: 1500,
        showConfirmButton: false
      });
      
      if (paginatedTasks.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.error
      });
    }
  }
};
</script>