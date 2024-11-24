import axios from 'axios'

const get_song = async () => {
    const response = await axios.get(`http://127.0.0.1:5000/get_song`)
    return response.data
}

export default { get_song }