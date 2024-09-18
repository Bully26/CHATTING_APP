<template>
 
    <v-responsive
      class="mx-auto"
      max-width="344"
    >
      <div v-if="user==null">
        <GoogleLogin :callback="fun" prompt auto-login/>
      </div>

      <div v-if="user!=null">
          {{user}}
      </div>


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
import { decodeCredential } from 'vue3-google-login';
export default {
  data()
  {
    return {
      user:null,
    }
  },
  methods:{
    register(){
        if(this.user!='')this.$store.commit('setuser',this.user);
        else alert('invalid name');
    },
    
    fun(res)
    {
      console.log(res);
      const back=decodeCredential(res.credential);
      console.log(back);
      this.user=back.email;
      this.register();
      this.$router.push('user');
     
      
    }
  },
}
</script>