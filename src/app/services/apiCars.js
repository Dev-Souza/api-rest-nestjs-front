const { default: axios } = require("axios");

const apiCars = axios.create({
    baseURL: 'http://localhost:3333/'
})

export default apiCars