import axios from 'axios'
import { useEffect, useState } from 'react'
import { getUser } from '../helpers/apis'

//axios.defaults.baseURL = 'http://localhost:9000'
axios.defaults.baseURL = 'https://rilzain-official.onrender.com'

/**Get User Details Hooks */
export function useFetch(query){
    const [data, setData] = useState({ isLoading: true, apiData: null, status: null, serverError: null})


    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { id } = !query ? await getUser() : '';


                const { data, status} = !query ? await axios.get(`/api/user/${id}`) : await axios.get(`/api/auth/${query}`)
                console.log('Data from Hooks>>>', data)

                if(status === 200){
                    setData({ isLoading: false, apiData: data, status: status, serverError: null})
                } else{
                    setData({ isLoading: false, apiData: null, status: status, serverError: null})
                }
            } catch (error) {
                setData({ isLoading: false, apiData: null, status: null, serverError: error})
            }
        };
        fetchData()
    }, [query])

    return data
}

/**Get All Houses from Database */
export function useFetchHouses(query){
    const [houseData, setHouseData] = useState({ isLoadingHouseData: true, apiHouseData: null, houseStatus: null, houseServerError: null })

    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                const id = !query ? getUser() : '' 
                
                    const { data, status} = !query ? await axios.get(`/api/house/getHouse`) : await axios.get(`/api/house/getHouse/${id}`)
                    console.log('House Data from Hooks>>>', data)
                
                if(status === 200){
                    setHouseData({ isLoadingHouseData: false, apiHouseData: data, houseStatus: status, houseServerError: null })
                }else{
                    setHouseData({ isLoadingHouseData: false, apiHouseData: null, houseStatus: status, houseServerError: null })
                }
            } catch (error) {
                setHouseData({ isLoadingHouseData: false, apiHouseData: null, houseStatus: null, houseServerError: error })
            }
        }
        fetchHouseData()
    }, [query])
    return houseData
}