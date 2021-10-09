<template>
  <div class="home">
    <h1>Groups</h1>
    <div class="cards">
      <div v-bind:key="group._id" v-for="(group, index) in groups">
        <div v-if="!isOwner(group.userId) && !isInGroup(group.groupMembers)">
          <b-card :title="group.name" header-tag="header" footer-tag="footer">
            <template #header>
              <h6 class="mb-0">{{group.owner[0].city}} <b-icon-signpost></b-icon-signpost></h6>
            </template>
          <b-card-text>{{group.description}}</b-card-text>
          <b-card-text>{{speedAverage(group)}} <b-icon-lightning></b-icon-lightning></b-card-text>
          <b-button href="#" variant="primary" @click="joinGroup(group._id, index)">Join</b-button>
            <template #footer>
              <em>{{group.groupMembers.length + 1}} <b-icon-person-fill></b-icon-person-fill></em>
            </template>
          </b-card>
        </div>
        <br>
      </div>
    </div>
  </div>
</template>
<style>
.cards{
  width: 40%;
  margin: auto;
}
</style>
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
    },
    speedAverage(){
      return group =>{  
        if(group.groupMembers.length > 0){
          var total = group.owner[0].speed
          group.groupMembers.forEach(element => {
            total += element.owner[0].speed ? element.owner[0].speed : 0  
          })
          return total / group.groupMembers.length
        }else{
          return group.owner[0].speed
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