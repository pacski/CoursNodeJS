import axios from 'axios';
import store from '../store';

class userService{
    token = store.getters.StateUser.token  
    userId = store.getters.StateUser.userId
    contentHeaders = new Headers({ 'Content-Type': 'application/json', 'authorization': this.token });
    headers = { headers: { 'authorization': this.token } }
    body = {}
    
    async show() {
        this.body['userId'] = this.userId
        return await axios.post('/user/account', this.body, this.headers)
    }
    async update(body) {
        this.body['userId'] = this.userId
        this.body = body
        return await axios.patch('/user/update/'+this.userId, this.body, this.headers)
    }
}
export  {userService}