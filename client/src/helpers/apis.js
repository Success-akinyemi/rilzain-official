import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-hot-toast'

//axios.defaults.baseURL = 'http://localhost:9000'
axios.defaults.baseURL = 'https://rilzain-official.onrender.com'


/**Get user from token */
export async function getUser(){
    const token = localStorage.getItem('authToken')
    if(!token) return Promise.reject('Cannot get Token')
    try {
        const decoded = jwt_decode(token);
        console.log('decoded>>', decoded);
        
        return decoded;
      } catch (error) {
        console.error('Error decoding token:', error);
        return Promise.reject('Error decoding token');
      }
}

export async function registerUser({ username, email, password, phoneNumber, toggle }){
    try {
        const { data }  = await axios.post('/api/register', { username, email, password, phoneNumber, toggle })
        //console.log(username, email, password)
        localStorage.setItem('authToken', data.token)
        console.log(data.token)
        toast.success(`Welcome ${username}`)

        toggle()
        return null
    
    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

/**LOGIN USER */
export async function loginUser({ emailOrphoneNumber, password, toggle }){
    try {
        const { data } = await axios.post('/api/login', { emailOrphoneNumber, password })
        //console.log( email, password)
        localStorage.setItem('authToken', data.token)
        console.log('STATUS>>', data.success)
        console.log('User Logged in', data.token)

        toggle()
    
    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

/**Like House */
export async function likeHouse({ house, user }){
    try {
        const token = await localStorage.getItem('authToken')
        const response = await axios.post('/api/house/like', { house, user }, {headers: {Authorization: `Bearer ${token}`}})
    
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error('Failed to like House')
        }
    } catch (error) {
        throw error;
    }
}

/**Upload New House */
export async function uploadHouse({ title, price, desc, address, location, houseImage, imageArray }){
    try {
        const token = await localStorage.getItem('authToken')
        const response = await axios.post('/api/house/newHouse', { title, price, desc, address, location, houseImage, imageArray }, {headers: {Authorization: `Bearer ${token}`}})
        //console.log(title, price, desc, address, location, houseImage, imageArray)
        console.log(response.data.statusMsg)
        if(response.data.statusMsg === 'success'){
            return response.data.statusMsg
        } else {
            throw new Error('House upload failed');
        }
    } catch (error) {
        throw new Error('House Upload Failed');
    }
}