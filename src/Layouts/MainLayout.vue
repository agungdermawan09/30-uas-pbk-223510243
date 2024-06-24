<template>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-secondary text-dark" align="center">
        <q-toolbar>
          <q-toolbar-title class="q-mx-auto">
            UAS PBK
          </q-toolbar-title>
        </q-toolbar>
  
        <q-tabs align="right" class="tabs-custom">
          <q-route-tab to="/todo" label="Todo" />
          <q-route-tab to="/post" label="Post" />
          <q-route-tab to="/album" label="Album" />
        </q-tabs>
      </q-header>
  
      <q-page-container class="bg-pattern">
        <router-view />
      </q-page-container>
  
      <q-footer elevated class="footer-custom">
        <q-toolbar>
          <q-toolbar-title class="q-mx-auto">
            AGUNG DERMAWAN 223510243
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: this.getCurrentTime()
      };
    },
    methods: {
      getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString();
      },
      updateClock() {
        this.currentTime = this.getCurrentTime();
      }
    },
    mounted() {
      this.clockInterval = setInterval(this.updateClock, 1000);
    },
    beforeDestroy() {
      clearInterval(this.clockInterval);
    }
  };
  </script>
  
  <style scoped>
  .bg-pattern {
    background: #795548;
    background-size: cover;
    background-position: center center;
    background-repeat: repeat;
  }
  
  .tabs-custom {
    background-color: #FF5722;
  }
  
  .footer-custom {
    background-color: #795548;
  }
  
  .q-header {
    background-color: #FF9800 !important;
  }
  
  .q-toolbar-title, .q-tabs, .q-footer {
    background-color: #FF5722 !important;
    text-align: center;
  }
  </style>
  