<template>
  <div>
      <h1>Messagerie</h1>
      <div class="tchat">
        <div class="message" v-bind:class="isOwner(message.autor) ?'own-message' :''" v-bind:key="message._id" v-for="(message, index) in messages">
          <div class="head">
            <p v-text="message.createdAt"></p>
            <p v-text="message.owner[0].username ? message.owner[0].username  : 'unknown'"></p>
          </div>
          <div class="body">
            <p v-if="!editingMode" v-text="message.body"></p>
            <textarea v-if="editingMode && message._id === selectedMessage" v-model="form.body" :placeholder="message.body"></textarea>
          </div>
          <div class="foot">
            <strong  v-if="isOwner(message.autor) && !editingMode" @click="deleteMessage(message._id,index)">Delete</strong>
            <strong v-if="isOwner(message.autor) && !editingMode" @click="switchEditingMode(message._id, index)">Edit</strong>
            <strong v-if="editingMode && message._id === selectedMessage" @click="updateMessage(selectedMessage)" >Update</strong>
          </div>
        </div>
      </div>
      <div v-if="!editingMode && dataIsLoaded">
        <div class="tchat-form">
          <textarea v-model="form.body" ></textarea>
          <div class="tchat-send-btn" @click="createMessage()">Envoyer</div>
        </div>
      </div>
  </div>
</template>
<style>
.tchat{
  width: 80%;
  margin: auto;
}
.tchat-form{
  display: flex;
}
.tchat-send-btn{
  width: 10%;
  height: 60px;
  line-height: 60px;
  background: grey;
  margin: auto;
  border: solid;
}
textarea{
  width: 90%;
  height: 60px;
  border: solid;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none; 
}
.message{
  border: solid;
  display: flex;
  flex-direction: column;
  margin: 15px;
  width: 50%;
  position: relative;
  border-radius: 15px;
}
.own-message{
  left: 50%;
  background: grey;
}
.message, .head, .foot{
  display: flex;
}
.head{
  justify-content: space-between;
  padding: 10px;
}
.foot{
  justify-content: flex-end;
}
.foot strong{
  margin: 10px;
}
</style>
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
      dataIsLoaded: false,
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
        this.dataIsLoaded = true
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