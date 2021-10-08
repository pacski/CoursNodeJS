import axios from 'axios';
import store from '../store';

class groupMemberService{
    token = store.getters.StateUser.token  
    userId = store.getters.StateUser.userId
    contentHeaders = new Headers({ 'Content-Type': 'application/json', 'authorization': this.token });
    headers = { headers: { 'authorization': this.token } }
    body = {}
    
    async list() {
        this.body['userId'] = this.userId
        return await axios.post('/groupMember/', this.body, this.headers)
    }

    async join(id) {
        this.body['userId'] = this.userId
        this.body['groupId'] = id
        return await axios.post('/groupMember/join', this.body, this.headers)
    }

    async quit(id) {
        this.body['userId'] = this.userId
        this.body['groupId'] = id
        console.log('this.body:', this.body)
        return await axios.post('/groupMember/quit', this.body, this.headers)
    }
}
export  {groupMemberService}