<template>
  <div class="home">
    <h1>Groups</h1>
    <div>
      <div v-bind:key="group._id" v-for="group in groups">
        <p>name : {{group.name}}</p>
        <p>owner : {{group.owner[0].username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {groupService} from '../../services/group'
export default {
  data() {
    return {
      groupService: new groupService(),
      groups: [],
    }
  },
  mounted() {
    this.listGroup()
    .then((res)=>{
      this.groups = res.data
    })
  },
  methods: {
    listGroup(){
      return this.groupService.list()
    },
  },
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