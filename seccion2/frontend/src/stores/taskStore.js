import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tareas';
const AUTH_TOKEN = 'pruebaDb123'; 
const api = axios.create({ 
  baseURL: API_URL,
  headers: {
    'x-api-token': AUTH_TOKEN
  }
});

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
  }),

  actions: {
    // GET
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/');
        this.tasks = response.data;
      } catch (err) {
        this.error = 'Error al cargar las tareas';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    // CREATE
    async addTask(formData) {
      this.loading = true;
      try {
        const response = await api.post('/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.tasks.unshift(response.data);
        return { success: true };
      } catch (err) {
        console.error(err);
        return { success: false, error: err.response?.data?.error || 'Error al crear la tarea' };
      } finally {
        this.loading = false;
      }
    },

    // UPDATE
    async updateTask(id, datosActualizados) {
      try {
        const response = await api.put(`/${id}`, datosActualizados);
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
        return { success: true };
      } catch (err) {
        console.error(err);
        return { success: false, error: 'Error al actualizar la tarea' };
      }
    },

    // DELETE
    async deleteTask(id) {
      try {
        await api.delete(`/${id}`);
        this.tasks = this.tasks.filter(t => t.id !== id);
        return { success: true };
      } catch (err) {
        console.error(err);
        return { success: false, error: 'Error al eliminar la tarea' };
      }
    }
  }
});