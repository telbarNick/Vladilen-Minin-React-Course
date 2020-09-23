import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-2a408.firebaseio.com/'
})