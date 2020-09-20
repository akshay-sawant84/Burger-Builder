import axios from 'axios';

const instance = axios.create ({
    baseURL : 'https://react-burger-76a19.firebaseio.com/'
})

export default instance;