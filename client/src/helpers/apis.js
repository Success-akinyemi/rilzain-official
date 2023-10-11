import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-hot-toast'

//axios.defaults.baseURL = 'http://localhost:9000'
axios.defaults.baseURL = 'https://rilzain-solutions-api.onrender.com'


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

export async function registerUser({ username, email, password, phoneNumber }){
    try {
        //console.log('before send',username, email, password, phoneNumber)
        const response  = await axios.post('/api/register', { username, email, password, phoneNumber })
        //console.log('resPonse', response)
        const { data } =response
        localStorage.setItem('authToken', data.token)
        console.log(data.token)
        toast.success(`Welcome ${username}`)

        
        return null
    
    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

/**LOGIN USER */
export async function loginUser({ emailOrphoneNumber, password }){
    try {
        const { data } = await axios.post('/api/login', { emailOrphoneNumber, password })
        //console.log( email, password)
        localStorage.setItem('authToken', data.token)
        console.log('STATUS>>', data.success)
        console.log('User Logged in', data.token)

        
    
    } catch (error) {
        const errorMsg = error.response.data.error
        console.log(errorMsg)
        return errorMsg
    }
}

/**Like House */
export async function likeHouse({ house, user }){
    try {
        console.log('LIKE DATA', user, house)
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
export async function uploadHouse({ title, price, desc, address, location, houseImageUrl, imageArray }){
    try {
        const token = await localStorage.getItem('authToken')
        //console.log(token)
        //console.log('FROM CLIENT', title, price, desc, address, location, houseImageUrl, imageArray)
        const response = await axios.post('/api/house/newHouse', { title, price, desc, address, location, houseImageUrl, imageArray }, {headers: {Authorization: `Bearer ${token}`}})
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

/**ADD HOUSE TO FAVORITES */
export async function addHouseToFav({ user, house }){
    try {
        const token = await localStorage.getItem('authToken')
        const req  = await axios.post('/api/house/addToFav', {user, house}, {headers: {Authorization: `Bearer ${token}`}})
        
        if(req.data.statusMsg === 'success'){
            toast.success('House Added to Favourites')
        }
    } catch (error) {
        toast.error('Failed to Add House To Favourites')
        throw new Error('Failed To Add House To Favourites');
    }
}

/**DELETE HOUSE */
export async function deleteHouse({ houseId, admin }){
    try {
        const token = await localStorage.getItem('authToken')
        const response = await axios.delete(`/api/house/delete?houseId=${houseId}&admin=${admin}`, {headers: {Authorization: `Bearer ${token}`}})
        if(response.data.statusMsg === 'success'){
            const msg = response.data.message
            console.log(msg)
            toast.success(msg)
        }
    } catch (error) {
        console.log('error',error)
        const err = error.response.data.error
        toast.error(err)
        throw new Error('Failed To Delete House')
    }
}