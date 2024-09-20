<template>
  <div>
      <v-bottom-navigation class="d-flex justify-start">
          <v-layout class="d-flex justify-start">
              <v-btn class="bg-green-accent-3" @click="send(chatt)">
                  <v-icon class="mb-4">mdi-send</v-icon>
              </v-btn>
              <v-text-field v-model="chatt"></v-text-field>
          </v-layout>
      </v-bottom-navigation>
  </div>
</template>

<script>
import eventBus from '../event';
import io from 'socket.io-client'
import { mapMutations, mapGetters } from 'vuex';
import Recevier from './recevier.vue';

export default {

    data(){
        return {
            chatt:'',
            socket:null
        }
    },
     mounted(){
        if(this.$store.state.socket==null)this.$store.state.socket=io('http://localhost:3000/');
        this.$store.state.socket.emit('user',this.$store.getters.curuser);
        this.$store.state.socket.on('message_client',(data)=>{
             this.$store.commit('addchat',data);
             this.$store.commit('addReceivedMessageId',data.id);
        });
        
    },
    methods:{
        send(data){
            this.$store.state.socket.emit('message_server',
                {
                    message:this.chatt,
                    user:this.$store.getters.curuser,
                    recevier:this.$store.state.recevier
                }
            )
        }
    }
}
</script>
