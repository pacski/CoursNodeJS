
const app_url = process.env.VUE_APP_URL

const axios = require('axios')
export default class UserService {
    signup(data) {
        axios.post(app_url + "/user/signup", data)
            .then((res) => {
                console.log(res)
                return res.status
            })
            .catch((err) => {
                return err.status
            })
    }
    login(data) {
        axios.post(app_url + "/user/login", data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

}