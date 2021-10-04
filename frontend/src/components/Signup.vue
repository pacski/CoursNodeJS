<template>
  <div class="login">
      <h1>Signup</h1>
      <form action="" method="post" @submit.prevent>
          <label for="email">Email</label>
          <input type="email" name="email" id="" v-model="email">
          <br>
          <label for="email">password</label>
          <input type="password" name="" id="" v-model="password">
          <br>
          <input type="submit" @click="signup" value="Valider">
      </form>
  </div>
</template>

<script>
import userService from "../services/user"
export default {
    data() {
        return {
            email: null,
            password: null,
     }
	},
    methods: {
        signup(){
            const user = new userService();
            user.signup({
              "email": this.email,
              "password": this.password
            })
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
