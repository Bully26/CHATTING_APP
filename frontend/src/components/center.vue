<template>
    <div class="back">
     <v-app>
     <upperbar></upperbar>
     <leftdrawer></leftdrawer>
     <info></info>
     <cht v-if="checkrec"></cht>
     <bottom v-if="checkrec"></bottom>
   </v-app>
    </div>
  
  
</template>
  
  <script>
  
  import io from "socket.io-client"
  import cht from "../components/chat_sec.vue"
  import bottom from "../components/bt_nav.vue"
  import leftdrawer from "../components/drawer_first.vue"
  import upperbar from "../components/navbar.vue"
  import info from "../components/info.vue"
import { GoogleLogin } from "vue3-google-login"
  export default {
    data(){
           return {
           }
    },
    components: {
      upperbar,
      leftdrawer,
      bottom,
      cht,
      info
    },
    computed:{
      checkrec()
      {
        return this.$store.state.have_recevier;
      }
    },
    methods:{
      fun(){
        alert('logged');
      }
    }
  }
  </script>
  
  <style>
  .full{
    height:100vh
  }
  .leftMost{
    width: 2vh
  }
  
  .bd{
    border-color: blue;
    border-right: 5px solid rgb(46, 46, 46);
    
  }
  .back{
    background-color: black
  }
  
  </style>
  