<template>
 
    <v-responsive
      class="mx-auto"
      max-width="344"
    >
      <div v-if="user==null && !this.intialized">
        <GoogleLogin :callback="fun"/>
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
      intialized:false
    }
  },
  beforeCreate(){
    if(localStorage.getItem('JWT'))
     {
      this.$store.state.username=decodeCredential(localStorage.getItem('JWT')).email;
      this.intialized=true;
      this.$router.push('user');
      
     }
  }
  ,
  methods:{
    register(){
        if(this.user!='')this.$store.commit('setuser',this.user);
        else alert('invalid name');
    },
    fun(res)
    {
      console.log(res);
      const back=decodeCredential(res.credential);
      localStorage.setItem("JWT",res.credential);
      console.log(back);
      this.user=back.email;
      this.register();
      this.$router.push('user');
     
      
    }
  },
}
</script>