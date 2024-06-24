
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCombinedStore = defineStore('combinedStore', () => {

  const users = ref([]);
  const posts = ref([]);
  const isLoading = ref(false);

  // Actions
  const fetchUsersAndPosts = async () => {
    isLoading.value = true;
    try {
      const [usersResponse, postsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
      ]);

      if (!usersResponse.ok) {
        throw new Error('Failed to fetch users');
      }

      if (!postsResponse.ok) {
        throw new Error('Failed to fetch posts');
      }

      const usersData = await usersResponse.json();
      const postsData = await postsResponse.json();

      users.value = usersData;
      posts.value = postsData;
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  // Return state and actions
  return { users, posts, isLoading, fetchUsersAndPosts };
});
