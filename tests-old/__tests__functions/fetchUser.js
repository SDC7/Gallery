const axios = require('axios')
const fetch = require('node-fetch')

const fetchUser = () => {
    axios('https://jsonplaceholder.typicode.com/users/1').then(res => res.json()).catch(err => 'error')
  }

module.exports = fetchUser;