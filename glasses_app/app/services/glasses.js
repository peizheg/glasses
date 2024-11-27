import axios from 'axios'

const baseUrl = "http://127.0.0.1:5000"

const get_song = async () => {
    const response = await axios.get(`${baseUrl}/get_song`)
    return response.data
}

const change_lyrics = async (lyrics) => {
    const response = await axios.post(`${baseUrl}/change_lyrics`, { lyrics })
    return response.data
}

export default { get_song, change_lyrics }