<template>
  <div id="app">
      <Signup v-if="signup"/>
      <Login v-if="!signup"/>
      <p v-if="!signup" @click="wantSignup()">S'inscrire ?</p>
      <p v-if="signup" @click="wantLogin()">Se connecter ?</p>
  </div>
</template>

<script>
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'


export default {
  name: 'App',
  data(){
    return{
      signup: false
    }
  },
  components: {
    Signup, Login
  },
  methods: {
    wantSignup(){
      this.signup = true
    },
    wantLogin(){
      this.signup = false
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
