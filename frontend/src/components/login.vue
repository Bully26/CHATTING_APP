<template>
    <v-responsive
      class="mx-auto"
      max-width="344"
    >
      <v-text-field
        hide-details="auto"
        label="First name"
        v-model='user'
      ></v-text-field>
    </v-responsive>
    <div class="d-flex justify-md-center" >
        <VBtn color="success" @click="register" to="user">submit</VBtn>
    </div>
  </template>

<script>

export default {
  data()
  {
    return {
      user:""
    }
  },
  methods:{
    register(){
        if(this.user!='')this.$store.commit('setuser',this.user);
        else alert('invalid name');
    }
  }
}
</script>