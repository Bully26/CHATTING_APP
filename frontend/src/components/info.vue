<template>
    <div>
        <v-navigation-drawer class="bd">
            <v-toolbar height="50" :class=cls>
             <v-flex class="ps-10 " >{{CURsec}}</v-flex>
            </v-toolbar>
            <users v-if="show_chat"></users>

            <div v-if="show_adduser" class="d-flex align-center">
                <input type="text" id="lname" v-model="new_user" name="lname" class="inp">
                <VBtn class="send" @click="addUser" >Add</VBtn>
            </div>
          </v-navigation-drawer>
    </div>
</template>
<script>
import eventBus from '../event';
import users from '../components/recevier.vue'
import io from 'socket.io-client'
import axios from 'axios';

export default {
 components:{
   users
 },
 data(){
    return {
            cls:"bg-blue-grey-darken-1",
            new_user:null
        };
 },
 created(){
    eventBus.on('status_changed',this.clicked);
    this.curpage=this.$store.getters.cursec;
 }
 ,
 mounted(){
    if(this.$store.state.socket==null)this.$store.state.socket=io('http://localhost:3000/');
    this.$store.state.socket.on('add_user',(d)=>{
          this.$store.commit('addfriend',d.user);
          this.$store.commit('addfriend',d.recev);
    });
  },
 methods:{
    clicked(){

            this.cls="bg-blue-grey-darken-3";
            setTimeout(() => {
                this.cls="bg-blue-grey-darken-1";
            }, 300);
        },
    async addUser()
    {
        if(this.new_user==null)return;
        this.$store.commit('addfriend',this.new_user);
        this.$store.state.socket.emit('add_user',
            {
                user:this.$store.getters.curuser,
                recev:this.new_user
            }
        )
        const res=await axios.post('http://localhost:3000/adduser',{
            user:this.$store.getters.curuser,
            recev:[this.new_user]
        });
        
    }
    
 },
 computed:{
    CURsec()
    {
        return this.$store.getters.cursec;
    },
    show_chat()
    {
        return this.$store.getters.cursec=='Chats';
    },
    show_adduser()
     {
        return this.$store.getters.cursec=='Add User';
     }
 }
}
</script>

<style>
.inp{
  border-left: 2vh;
  background-color: rgb(132, 222, 245);
  height: 6vh;
  border-radius: 7px;
  margin:10px;
  width: 70%;
}
.send{
    background-color: rgb(164, 255, 225);
    height: 6vh;
    margin-right: 5px;
    border-radius: 10px;
}
</style>