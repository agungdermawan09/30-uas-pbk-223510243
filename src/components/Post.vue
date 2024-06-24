<template>
    <q-page class="q-pa-md">
      <div class="posts-container q-pa-md">
        <q-card class="posts q-pa-md">
          <q-card-section>
            <h1 class="text-h4">Postingan User</h1>
            <h2>{{ selectedUserName }}</h2>
            <q-select
              v-model="selectedUser"
              :options="usersOptions"
              option-label="label"
              option-value="value"
              @update:model-value="onUserChange"
              outlined
              clearable
              class="q-mb-md"
              label="Select User"
            />
          </q-card-section>
  
          <q-card-section v-if="isLoading">
            <q-spinner-dots class="q-my-md" />
            <div class="text-center">Loading posts...</div>
          </q-card-section>
  
          <q-card-section v-else>
            <q-list bordered>
              <q-item v-for="post in filteredPosts" :key="post.id" class="q-mb-sm">
                <q-item-section>
                  <q-item-label><strong>{{ post.title }}</strong></q-item-label>
                  <q-item-label>{{ post.body }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useCombinedStore } from '../stores/Stores.js';
  import { useQuasar } from 'quasar';
  
  const { $q } = useQuasar();
  const combinedStore = useCombinedStore();
  
  const selectedUser = ref(null);
  const selectedUserName = ref('');
  
  const { users, posts, isLoading, fetchUsersAndPosts } = combinedStore;
  
  const usersOptions = computed(() =>
    users.map(user => ({ label: user.name, value: user.id }))
  );
  
  const filteredPosts = computed(() => {
    if (selectedUser.value) {
      return posts.filter(post => post.userId === selectedUser.value);
    }
    return posts;
  });
  
  const onUserChange = () => {
    const selectedUserObject = users.find(user => user.id === selectedUser.value);
    selectedUserName.value = selectedUserObject ? selectedUserObject.name : '';
  };
  
  onMounted(() => {
    fetchUsersAndPosts();
  });
  </script>
  
  <style scoped>
  .text-h4 {
      font-family: 'Montserrat', sans-serif;
      color: #000000;
      font-size: 42px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 30px;
  }
  </style>
  