import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../Layouts/MainLayout.vue';
import Todo from '../components/Todo.vue';
import Post from '../components/Post.vue';
import Album from '../components/Album.vue';
import AlbumOpen from '../components/AlbumOpen.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    name: 'MainLayout',
    children: [
      {
        path: 'todo',
        component: Todo,
        name: 'Todo'
      },
      {
        path: 'post',
        component: Post,
        name: 'Post'
      },
      {
        path: 'album',
        component: Album,
        name: 'Album'
      },
      {
        path: 'album/:id',
        component: AlbumOpen,
        name: 'AlbumOpen'
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
