<template>
    <div v-for="user in friend" class="mb-1">
        <v-card @click="setrec(user)"
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
        }
    }

}

</script>