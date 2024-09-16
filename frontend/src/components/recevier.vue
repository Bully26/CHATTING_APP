<template>
    <div v-for="user in friend" class="mb-1">
        <v-card @click="setrec(user);"
        class="mx-auto"
        :class="{'bg-light-blue-lighten-4':currec===user}"
        prepend-icon="mdi-github"
        rel="noopener"
        subtitle="messages..."
        :title="user"
        ></v-card>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data()
    {
        return{
            currec:null
        }
    }
    ,
    computed:{
        friend(){
            return this.$store.state.friend;
        }
    },

    methods:{
        setrec(data){
          this.$store.state.recevier=data;
          this.$store.state.have_recevier=true;
          this.currec=data;
          this.fetch_cht()
        },
        async fetch_cht()
        {
             let a=this.$store.getters.curuser;
             let b=this.currec;
             if(!this.$store.state.chats[b]){
             try {
                let response=await axios.get("http://localhost:3000/chats?",
                    {
                        params:{
                            user:a,
                            receiver:b
                        }
                    }
                );
                if (Object.keys(response.data).length !== 0) {
                this.add_first_data(response.data);
                }

             } catch (error) {
                alert(error);
             }
            }
        },
        add_first_data(res)
        {
            res.forEach(element => {
                this.$store.commit('addchat',element);
            });

        }
    }

}

</script>