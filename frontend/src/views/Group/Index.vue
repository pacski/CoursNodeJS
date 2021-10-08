<template>
  <div class="home">
    <h1>Groups</h1>
    <div>
      <div v-bind:key="group._id" v-for="(group, index) in groups">
        <div v-if="!isOwner(group.userId) && !isInGroup(group.groupMembers)">
          <p>name : {{group.name}}</p>
          <p>owner : {{group.owner[0].username}}</p>
          <p>city : {{group.owner[0].city}}</p>
          <p>nb membre : {{group.groupMembers.length}}</p>
          <button @click="joinGroup(group._id, index)">Join</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {groupService} from '../../services/group'
import {groupMemberService} from '../../services/groupMember'
import {userService} from '../../services/user'
export default {
  data() {
    return {
      groupMemberService: new groupMemberService(),
      groupService: new groupService(),
      userService: new userService(),
      groups: [],
      user: {}
    }
  },
  mounted() {
    this.listGroup()
    .then((res)=>{
      this.groups = res.data
    })
    this.showUserConnected()
    .then((res)=>{
      this.user = res.data
    })
  },
  computed:{
    isOwner(){
      return ownerId => {
        return this.$store.getters.StateUser.userId === ownerId
      }
    },
    isInGroup(){
      return groupMembers =>{  
        var count = 0 
        for(let groupMember of groupMembers)  {
          console.log('Object.values(groupMember).indexOf(this.$store.getters.StateUser.userId) > -1:', Object.values(groupMember).indexOf(this.$store.getters.StateUser.userId) > -1)
          if (Object.values(groupMember).indexOf(this.$store.getters.StateUser.userId) > -1) {
            return true
          }else{
            if(count === groupMembers.length){
              return false
            }
          }
          count +1
        }
      }
    }
  },
  methods: {
    listGroup(){
      return this.groupService.list()
    },
    joinGroup(id, index){
      this.groupMemberService.join(id)
      .then(()=>{
        this.groups.splice(index, 1)
      })
    },
    showUserConnected(){
      return this.userService.show()
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