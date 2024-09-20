<template>
    <v-navigation-drawer
    expand-on-hover
    rail
    color="#2a2e2b"
    @mouseenter=" drawer_expanded = true"
    @mouseleave=" drawer_expanded = false"
  >
    <v-divider></v-divider>
    <v-list-item prepend-icon="mdi-star" v-if="drawer_expanded==false"></v-list-item>
    <v-list  >
     
      <v-col v-if="drawer_expanded" class="d-flex justify-center mb-10">
        <v-row align="center" justify="center" class="text-center">
          <v-col cols="12" class="d-flex justify-center">
            <v-icon class="" icon="mdi-star"></v-icon>
          </v-col>
          <v-col cols="12">
            <div>{{ this.$store.state.username }}</div>
          </v-col>
        </v-row>
      </v-col>
      
       
      
      <v-list-item prepend-icon="mdi-folder" title="Chats" @click="setpg('Chats')"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Status"   @click="setpg('Status')"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="AddUser"   @click="setpg('Add User')"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="CreateRoom"   @click="setpg('CreateRoom')"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import eventBus from '../event';
export default {
  data(){
    return {
      drawer_expanded:false
    }
  },
  methods:{
    setpg(data){
      eventBus.emit("status_changed");
      this.$store.commit('setsection', data);
    }    
  }
}
</script>