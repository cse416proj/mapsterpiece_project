import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://localhost:4000/map',
})

// const apis = {
//    // ...
// }

// export default apis