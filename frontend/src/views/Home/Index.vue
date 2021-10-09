<template>
  <div class="home">
    <h1>Home</h1>
    <h3>my own groups</h3>
    <div class="groups">
      <b-card class="group"
      v-bind:key="group._id" v-for="(group, index) in groups"
      :title="group.name" header-tag="header" footer-tag="footer">
        <template #header>
          <h6 class="mb-0">{{group.owner ? group.owner[0].city : ''}} <b-icon-signpost></b-icon-signpost></h6>
        </template>
      <b-card-text>{{group.description}}</b-card-text>
      <b-card-text>{{speedAverage(group)}} <b-icon-lightning></b-icon-lightning></b-card-text>
      <b-card-text><strong>Members</strong></b-card-text>
      <b-card-text>Me</b-card-text>
      <b-card-text
      v-bind:key="groupMember._id" v-for="groupMember in group.groupMembers"
      >{{groupMember.owner[0].username ? groupMember.owner[0].username : 'unknown'}}
      </b-card-text>
      <b-button href="#" variant="primary" v-if="!isOwner(group.userId)" @click="quitGroup(group._id, index)">Join</b-button>
        <template #footer>
          <em>{{group.groupMembers ? group.groupMembers.length + 1 : 1}} <b-icon-person-fill></b-icon-person-fill></em>
        </template>
      </b-card>
    </div>
    <h3>add a group</h3>
    <div class="group-form">
     <b-form-group
        id="input-group-1"
        label="Group informations"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="email"
          placeholder="Enter name"
          required
        ></b-form-input>
        <b-form-input
          id="input-1"
          v-model="form.description"
          type="email"
          placeholder="Enter description"
        ></b-form-input>
        <b-button @click="createGroup()" type="submit" variant="primary">Add</b-button>
      </b-form-group>
    </div>

    <h3>my joined groups</h3>
    <div class="groups">
      <b-card class="group"
      v-bind:key="joinedGroup._id" v-for="(joinedGroup, index) in joinedGroups"
      :title="joinedGroup.group[0].name" header-tag="header" footer-tag="footer">
        <template #header>
          <h6 class="mb-0">{{joinedGroup.group[0].owner[0].city}} <b-icon-signpost></b-icon-signpost></h6>
        </template>
      <b-card-text>{{joinedGroup.group[0].description}}</b-card-text>
      <b-card-text>{{speedAverage(joinedGroup.group)}} <b-icon-lightning></b-icon-lightning></b-card-text>
      <b-card-text><strong>Members</strong></b-card-text>
      <b-card-text>Me</b-card-text>
      <b-card-text
      v-bind:key="groupMember._id" v-for="groupMember in joinedGroup.group"
      >
      {{ !isOwner(groupMember.owner[0]._id) ? groupMember.owner[0].username ? groupMember.owner[0].username : 'unknown' : 'Me'}}
      </b-card-text>
      <b-button href="#" variant="primary" v-if="!isOwner(joinedGroup.group[0].userId)" @click="quitGroup(joinedGroup.group[0]._id, index)">Quit</b-button>
        <template #footer>
          <em>{{joinedGroup.group.length + 1}} <b-icon-person-fill></b-icon-person-fill></em>
        </template>
      </b-card>
    </div>
    <div>
    </div>
  </div>
</template>
<style>
.groups{
  width: 50%;
  margin: auto;
}
.group {
  margin: 10px;
}
.group-form{
  width: 50%;
  margin: auto;
}
</style>
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
        name: null,
        description: null
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
      }
    })
  },
  computed:{
    isOwner(){
      return ownerId => {
        return this.$store.getters.StateUser.userId === ownerId
      }
    },
    speedAverage(){
      return group =>{  
        if(group.groupMembers && group.groupMembers.length > 0){
          var total = group.owner[0].speed
          group.groupMembers.forEach(element => {
            total += element.owner[0].speed ? element.owner[0].speed : 0
          })
          return total / (group.groupMembers.length + 1)
        }else{
          return group.owner ? group.owner[0].speed : 0
        }
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
        name: this.form.name,
        description: this.form.description
      }
      this.groupService.create(dataForm)
      .then((res)=>{
        this.groups.push(res.data)
        this.form.name = null
        this.form.description = null
      })
    },
    quitGroup(id, index){
      this.groupMemberService.quit(id)
      .then(()=>{
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