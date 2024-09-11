
<template>
    <div>
      <h1>Gestión de Tareas</h1>
      
      <!-- Formulario para agregar tareas -->
      <form @submit.prevent="addTask">
        <input type="text" v-model="newTask.title" placeholder="Título" required>
        <input type="text" v-model="newTask.description" placeholder="Descripción">
        <input type="date" v-model="newTask.due_date" required>
        <button type="submit">Agregar Tarea</button>
      </form>
      
      <hr>
  
      <!-- Lista de tareas -->
      <div v-for="task in tasks" :key="task.id">
        <p>{{ task.title }} - {{ task.completed ? 'Completada' : 'Pendiente' }}</p>
        <button @click="completeTask(task)">Completar</button>
        <button @click="deleteTask(task)">Eliminar</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios'; // Importamos la configuración de Axios
  
  export default {
    data() {
      return {
        tasks: [],        // Para almacenar las tareas obtenidas
        newTask: {         // Para almacenar los datos de una nueva tarea
          title: '',
          description: '',
          due_date: ''
        }
      };
    },
    mounted() {
      this.getTasks();    // Obtener las tareas cuando el componente se monte
    },
    methods: {
      // Método para obtener todas las tareas
      getTasks() {
        axios.get('/tasks')
          .then(response => {
            this.tasks = response.data.data;
          })
          .catch(error => {
            console.error('Error al obtener las tareas:', error);
          });
      },
  
      // Método para agregar una nueva tarea
      addTask() {
        axios.post('/tasks', this.newTask)
          .then(response => {
            this.tasks.push(response.data); // Añadir la nueva tarea al arreglo de tareas
            this.newTask = { title: '', description: '', due_date: '' }; // Limpiar el formulario
          })
          .catch(error => {
            console.error('Error al agregar tarea:', error);
          });
      },
  
      // Método para completar una tarea
      completeTask(task) {
        axios.patch(`/tasks/${task.id}/complete`)
          .then(() => {
            task.completed = true; // Marcar la tarea como completada en la lista
          })
          .catch(error => {
            console.error('Error al completar la tarea:', error);
          });
      },
  
      // Método para eliminar una tarea
      deleteTask(task) {
        axios.delete(`/tasks/${task.id}`)
          .then(() => {
            this.tasks = this.tasks.filter(t => t.id !== task.id); // Remover la tarea de la lista
          })
          .catch(error => {
            console.error('Error al eliminar la tarea:', error);
          });
      }
    }
  };
  </script>
  