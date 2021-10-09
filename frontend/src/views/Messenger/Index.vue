<template>
  <div>
      <h1>Messagerie</h1>
      <div>
        <div v-bind:key="message._id" v-for="(message, index) in messages">
          <p v-text="message.createdAt"></p>
          <p v-text="message.owner[0].username ? message.owner[0].username  : 'unknown'"></p>
          <p v-text="message.body"></p>
          <button v-if="isOwner(message.autor)" @click="deleteMessage(message._id,index)">delete</button>
          <button v-if="isOwner(message.autor)" @click="switchEditingMode(message._id, index)">Edit</button>
          <div v-if="editingMode && message._id === selectedMessage">
            <input type="text" v-model="form.body" :placeholder="message.body">
            <input type="submit" @click="updateMessage(selectedMessage)" value="Update">
          </div>
        </div>
      </div>
      <div v-if="!editingMode">
        <input type="text" v-model="form.body">
        <input type="submit" @click="createMessage()">
      </div>
  </div>
</template>
<script>
import {io} from "socket.io-client";
import {messageService} from '../../services/message'
import {userService} from '../../services/user'
export default {
  data() {
    return {
      messages: [],
      form: {
        body: null
      },
      socket: null,
      messageService: new messageService(),
      userService: new userService(),
      editingMode: false,
      selectedMessage: null,
      indexMessage: null,
      user: {}
    }
  },
  computed:{
     isOwner(){
      return ownerId => {
        return this.$store.getters.StateUser.userId === ownerId
      }
    },
  },
  created() {
    const socket = io("http://localhost:2500/");
    this.socket = socket
    socket.on('receiveMessage', (message)=>{
      this.receiveMessage(message)
    })
  },
  mounted() {
      this.listMessage()
      .then((res)=>{
        this.messages = res.data
      })

      this.showUserConnected()
      .then((res)=>{
        this.user = res.data
      })
  },
  methods: {
    listMessage(){
      return this.messageService.list()
    },
    showUserConnected(){
      return this.userService.show()
    },
    createMessage(){
      let dataForm = {
        body: this.form.body,
        autor: this.$store.getters.StateUser.userId,
        createdAt: new Date(),
        owner: [
          {
            username: this.user.username
          }
        ]
      }
      this.messageService.create(dataForm)
      .then((res)=>{
        this.form.body = null
        this.socket.emit('newMessage', res.data)
      })
      .catch((err)=>{
        console.log('err:', err)
      })
    },
    receiveMessage(message){
      console.log('receiveMessage:', message)
      this.messages.push(message)
    },
    deleteMessage(id, index){
      this.messageService.delete(id)
      .then(()=>{
        this.messages.splice(index, 1);
      })
    },
    switchEditingMode(id, index){
      if(id !== this.selectedMessage){
        this.editingMode = true
        this.selectedMessage = id
        this.indexMessage = index
      }else{
        this.editingMode = false
        this.selectedMessage = null
        this.indexMessage = null
      }

    },
    updateMessage(id){
      let dataForm = {
        body: this.form.body,
        id: id
      }
      this.messageService.update(dataForm)
      .then(()=>{
        this.messages[this.indexMessage].body = this.form.body
        this.form.body = null
        this.editingMode = false
      })
    }
  },
}
</script>

<style>

</style>