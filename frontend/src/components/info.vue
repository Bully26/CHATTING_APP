<template>
    <div>
        <v-navigation-drawer class="bd">
            <v-toolbar height="50" :class=cls>
             <v-flex class="ps-10 " >{{curpage}}</v-flex>
            </v-toolbar>
            <users v-if="curpage=='Chats'"></users>
          </v-navigation-drawer>
    </div>
</template>
<script>
import eventBus from '../event';
import users from '../components/recevier.vue'

export default {
 components:{
   users
 },
 data(){
    return {
            curpage: "Chats",
            cls:"bg-blue-grey-darken-1"
        };
 },
 created(){
    eventBus.on('status_changed',this.clicked);
    this.curpage=this.$store.getters.cursec;
 }
 ,
 methods:{
    clicked(){

            this.cls="bg-blue-grey-darken-3";
            setTimeout(() => {
                this.cls="bg-blue-grey-darken-1";
            }, 300);
          
               
          
        }
 }
}
</script>