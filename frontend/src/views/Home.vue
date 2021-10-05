<template>
  <div class="home">
    <h1>Home</h1>
    <h1>test</h1>
    <!-- <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/trainings">Trainings</router-link>
    </div>
    <router-view/> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
}
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>