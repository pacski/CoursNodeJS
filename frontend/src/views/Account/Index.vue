<template>
  <div>
        <h1>Mon compte</h1>
        <div>
            <p>username : {{user.username}}</p>
        </div>
        <div v-if="editingMode">
            <input type="text" v-model="user.username">
        </div>
        <div>
            <p>email : {{user.email}}</p>
        </div>
        <div v-if="editingMode">
            <input type="text" v-model="user.email">
        </div>
        <div>
            <p>city : {{user.city}}</p>
        </div>
        <div v-if="editingMode">
            <input type="text" v-model="user.city">
        </div>
        <div>
            <p>speed : {{user.speed}}</p>
        </div>
        <div v-if="editingMode">
            <input type="number" max="10" min="0" v-model="user.speed">
        </div>
        <button v-if="!editingMode" @click="switchEditingMode()">edit</button>
        <button v-if="editingMode" @click="update()">Update</button>

  </div>
</template>

<script>
import {userService} from '../../services/user'

export default {
    data() {
        return {
            userService: new userService(),
            user: {
                speed: null,
                username: null,
                city: null,
                email: null,
            },
            editingMode: false,
            selectedInput: null
        }
    },
    mounted() {
        this.show()
        .then((res)=>{
            this.user = res.data
        })
    },
    methods: {
        show(){
            return this.userService.show()
        },
        switchEditingMode(){
            this.editingMode = true
        },
        update(){
            let dataForm = {
                username: this.user.username,
                city: this.user.city,
                email: this.user.email,
                speed: this.user.speed,
            }
            this.userService.update(dataForm)
            .then(()=>{
                this.user = dataForm
                this.editingMode = false
            })

        }
    },
}
</script>

<style>

</style>