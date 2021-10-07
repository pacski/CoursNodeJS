import axios from 'axios';
import store from '../store';

class groupService{
    token = store.getters.StateUser.token  
    userId = store.getters.StateUser.userId
    contentHeaders = new Headers({ 'Content-Type': 'application/json', 'authorization': this.token });
    headers = { headers: { 'authorization': this.token } }
    body = {}
    
    async list() {
        this.body['userId'] = this.userId
        return await axios.post('/group', this.body, this.headers)
    }

    async listOwnGroup() {
        this.body['userId'] = this.userId
        return await axios.post('/group/own', this.body, this.headers)
    }

    async create(body) {
        body['userId'] = this.userId
        this.body = body
        return await axios.post('/group/create', this.body, this.headers)
    }

    async delete(id) {
        this.body['userId'] = this.userId
        return await axios.delete('/group/delete/'+id, this.headers, this.body)
    }

    async update(body) {
        this.body['userId'] = this.userId
        this.body = body
        return await axios.patch('/group/update/'+body.id, this.body, this.headers)
    }
}
export  {groupService}