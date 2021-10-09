<template>
  <div class="home">
    <h1>Home</h1>
    <h3>my own groups</h3>
    <div>
      <div v-bind:key="group._id" v-for="(group, index) in groups">
        <p>name : {{group.name}}</p>
        <div>
          <h4>members :</h4>
          <div v-bind:key="groupMember._id" v-for="groupMember in group.groupMembers">
            <p v-text="groupMember.owner[0].username"></p>
          </div>
          <button v-if="!isOwner(group.userId)" @click="quitGroup(group._id, index)">Quit</button>
        </div>
      </div>
    </div>
    <h3>add a group</h3>
    <div>
      <input type="text" v-model="form.name">
      <button @click="createGroup()">Add</button>
    </div>
    <div>
      <h3>my joined groups</h3>
      <div v-bind:key="joinedGroup.id" v-for="(joinedGroup, index) in joinedGroups">
        <p>name : {{joinedGroup.group[0].name}}</p>
        <div>
          <h4>members :</h4>
          <div v-bind:key="groupMember._id" v-for="groupMember in joinedGroup.group">
            <p v-if="!isOwner(groupMember.groupMembers[0].owner[0]._id)" v-text="groupMember.groupMembers[0].owner[0].username"></p>
            <p v-else>Me</p>
          </div>
          <button v-if="!isOwner(joinedGroup.group[0].userId)" @click="quitGroup(joinedGroup.group[0]._id, index)">Quit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {groupService} from '../../services/group'
import {groupMemberService} from '../../services/groupMember'
export default {
  data() {
    return {
      groupService: new groupService(),
      groupMemberService: new groupMemberService(),
      groups: [],
      joinedGroups: [],
      form:{
        name: null
      }
    }
  },
  mounted() {
    this.listOwnGroup()
    .then((res)=>{
      this.groups = res.data
    })
    this.listGroup()
    .then((res)=>{
      if(res.data.length > 0){
        this.joinedGroups = res.data
        console.log('res.data:', res.data)
        console.log('res.data:', res.data[0].owner[0].username)

      }
    })
  },
  computed:{
    isOwner(){
      return ownerId => {
        return this.$store.getters.StateUser.userId === ownerId
      }
    },
  },
  methods: {
    listOwnGroup(){
      return this.groupService.listOwnGroup()
    },
    listGroup(){
      return this.groupMemberService.list()
    },
    createGroup(){
      let dataForm = {
        name: this.form.name
      }
      this.groupService.create(dataForm)
      .then(()=>{
        this.groups.push(dataForm)
        this.form.name = null
      })
    },
    quitGroup(id, index){
      this.groupMemberService.quit(id)
      .then((res)=>{
        console.log('res:', res)
        this.joinedGroups.splice(index, 1)
      })
    }
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