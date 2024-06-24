<template>
    <div class="todo-container">
      <div class="todo-app" id="todo-app">
        <h1 class="app-title">To-Do List</h1>
        <div class="row">
          <q-input filled v-model="newTask" placeholder="Apa yang ingin anda kerjakan ?" class="input-task" />
          <q-btn label="Tambah" @click="addTask" color="primary" class="custom-btn" />
        </div>
        <div class="filters">
          <q-btn @click="hideCompleted = !hideCompleted" class="button-74" color="primary">
            {{ hideCompleted ? 'Tampilkan' : 'Sembunyikan' }}
          </q-btn>
        </div>
        <ul class="lists">
          <li
            v-for="(task, index) in filteredTodos" :key="task.id"
            :class="{ checked: task.checked, editing: task.editing }"
            @click="toggleTask(task)">
            <template v-if="!task.editing">
              <span :class="{ 'task-checked': task.checked }">{{ task.text }}</span>
              <span @click.stop="removeTask(task)" class="removebutton">&#xd7;</span>
              <span @click.stop="editTask(task)" class="editbutton">&#x270E;</span>
            </template>
            <template v-else>
              <q-input filled v-model="task.text" @keyup.enter="updateTask(task)" class="input-edit-task" />
              <q-btn icon="close" @click.stop="cancelEdit(task)" class="editbutton"></q-btn>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { Quasar, Notify, QBtn, QInput } from 'quasar'
  import 'quasar/dist/quasar.css'
  
  let id = 0
  
  const newTask = ref('')
  const hideCompleted = ref(false)
  const tasks = ref([
    { id: id++, text: 'Learn HTML', checked: true, editing: false },
    { id: id++, text: 'Learn JavaScript', checked: true, editing: false },
    { id: id++, text: 'Learn Vue', checked: false, editing: false }
  ])
  
  function toggleTask(task) {
    if (!task.editing) {
      task.checked = !task.checked;
      saveData();
    }
  }
  
  const filteredTodos = computed(() => {
    return hideCompleted.value
      ? tasks.value.filter((task) => !task.checked)
      : tasks.value
  })
  
  function addTask() {
      if (newTask.value.trim() === '') {
        alert("Agenda tidak boleh kosong!");
      } else {
        tasks.value.unshift({ id: id++, text: newTask.value, checked: false, editing: false });
        newTask.value = '';
        saveData();
      }
    }
  
  function removeTask(task) {
    tasks.value = tasks.value.filter((t) => t !== task)
    saveData();
  }
  
  function editTask(task) {
    task.editing = true;
    task.checked = false; 
  }
  
  function updateTask(task) {
    if (task.text.trim() === '') {
      Notify.create("Harus ada isi!");
    } else {
      task.editing = false;
      saveData();
    }
  }
  
  function cancelEdit(task) {
    task.editing = false;
  }
  
  function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }
  
  function loadData() {
    const savedTasks = localStorage.getItem("tasks");
    tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
  }
  
  onMounted(() => {
    loadData();
  })
  </script>
  
  <style scoped>
  .todo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .todo-app {
    background: rgb(255, 242, 223);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 100%;
  }
  
  .app-title {
    display: flex;
    align-items: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .app-icon {
    width: 24px;
    height: 24px;
    margin-left: 10px;
  }
  
  .row {
    display: flex;
    margin-bottom: 20px;
  }
  
  .input-task {
    flex: 1;
    margin-right: 10px;
  }
  
  .filters {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  
  .lists {
    list-style: none;
    padding: 0;
  }
  
  .lists li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    transition: background 0.3s;
  }
  
  .lists li.checked {
    background: #e0ffe0;
  }
  
  .lists li .task-checked {
    text-decoration: line-through;
    color: #888;
  }
  
  .removebutton {
    cursor: pointer;
    color: red;
    margin-left: 10px;
  }
  
  .editbutton {
    cursor: pointer;
    color: blue;
    margin-left: 10px;
  }
  
  .input-edit-task {
    flex: 1;
  }
  </style>
  