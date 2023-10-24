import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { getUser } from '../helpers/apis'

//axios.defaults.baseURL = 'http://localhost:9000'
axios.defaults.baseURL = 'https://rilzain-solutions-api.onrender.com'


/**Get User Details Hooks */
export function useFetch(query){
    const [data, setData] = useState({ isLoading: true, apiData: null, status: null, serverError: null})

    useEffect(() => {
        const fetchData =  async () => {
            try {
                const { id } = !query ? await getUser() : await getUser();
                
                const config = {
                    headers: {
                      Authorization: `Bearer ${id}`,
                    },
                  };            

                const { data, status} = !query ? await axios.get(`/api/user/${id}`, config) : await axios.get(`/api/getUsers/${id}`)
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
export function useFetchHouses(houseId = null){
    const [houseData, setHouseData] = useState({ isLoadingHouseData: true, apiHouseData: null, houseStatus: null, houseServerError: null })
    
    useEffect(() => {
        const fetchHouseData = async () => {
            try {
                    //const id = !query ? getUser() : '' 
                    let url;
                    if(houseId){
                        console.log('req')
                        url = `/api/house/getHouse/${houseId}`
                    }else{
                        url = `/api/house/getHouse`
                    }
                    console.log(url)
                    const { data, status} = await axios.get(url) 
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
    }, [houseId])
    return houseData
}

/**Get User Saved House */
export async function useFetchMyHomes(){
    const [myhomesData, setMyHomesData] = useState({ isLoadingMyHomesData: true, myHomesApiData: null, myHomesStatus: null, myHomesServerError: null})

        const fetchMyHomesData = useCallback(async () => {
            const {id} = await getUser();
            try {
               console.log('ID from myHouse', id)
                const { data, status } = await axios.get(`/api/house/getMyhouse/${id}`)
                console.log('Saved House Data', data)
                console.log('status',status)
                if(status === 200){
                    setMyHomesData({ isLoadingMyHomesData: false, myHomesApiData: data, myHomesStatus: status, myHomesServerError: null })
                }else{
                    setMyHomesData({ isLoadingMyHomesData: false, myHomesApiData: null, myHomesStatus: status, myHomesServerError: null })
                }
            } catch (error) {
                setMyHomesData({ isLoadingMyHomesData: false, myHomesApiData: null, myHomesStatus: null, myHomesServerError: error })   
            }
        }, [])

        useEffect(() => {
            fetchMyHomesData()
        }, [fetchMyHomesData])
    return myhomesData
}

/**Get All User */
export async function useFetchAllUsers(query){
    const [usersData, setUsersData] = useState({ isLoadingUsers: true, apiUsersData: null, usersStatus: null, usersServerError: null })

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const { id } = !query ? await getUser() : ''

                const { data, status } = !query ? await axios.get(`/api/getUsers/${id}`) : await axios.get(`/api/auth/${query}`)
                console.log('ALL USERS', data)
                
                if(status === 200){
                    setUsersData({ isLoadingUsers: false, apiUsersData: data, usersStatus: status, usersServerError: null})
                } else{
                    setUsersData({ isLoadingUsers: false, apiUsersData:null, usersStatus: status, usersServerError: null})
                }
            } catch (error) {
                setUsersData({ isLoadingUsers: false, apiUsersData: null, usersStatus: null, usersServerError: error})
            }
        };
        fetchUsersData()
    }, [query])
    console.log('USER DATA', usersData)
    return usersData
}

/**GET RENTALS */
export function useFetchRental(rentalId = null){
    const [rentalData, setRentalData] = useState({ isLoadingRentalData: true, apiRentalData: null, rentalStatus: null, rentalServerError: null })
    
    useEffect(() => {
        const fetchRentalData = async () => {
            try {
                    //const id = !query ? getUser() : '' 
                    let url;
                    if(rentalId){
                        console.log('req')
                        url = `/api/rental/getRental/${rentalId}`
                    }else{
                        url = `/api/rental/getRental`
                    }
                    console.log(url)
                    const { data, status} = await axios.get(url) 
                    console.log('House Data from Hooks>>>', data)
                
                if(status === 200){
                    setRentalData({ isLoadingRentalData: false, apiRentalData: data, rentalStatus: status, rentalServerError: null })
                }else{
                    setRentalData({ isLoadingRentalData: false, apiRentalData: null, rentalStatus: status, rentalServerError: null })
                }
            } catch (error) {
                setRentalData({ isLoadingRentalData: false, apiRentalData: null, rentalStatus: null, rentalServerError: error })
            }
        }
        fetchRentalData()
    }, [rentalId])
    return rentalData
}

/**Get USER SAVE HOUSE v2 */
export function useFetchSaveHouse(query){
    const [saveHouseData, setSaveHouseData] = useState({ isLoadingSaveHouse: true, saveHouseApiData: null, saveHouseStatus: null, saveHouseServerError: null})

    useEffect(() => {
        const fetchSaveHouseData =  async () => {
            try {
                const { id } = !query ? await getUser() : await getUser();
                
                const config = {
                    headers: {
                      Authorization: `Bearer ${id}`,
                    },
                  };            

                const { data, status} = !query ? await axios.get(`/api/house/getMyhouse/${id}`, config) : await axios.get(`/api/getUsers/${id}`, config)
                console.log('Data from Hooks Save House>>>', data)

                if(status === 200){
                    setSaveHouseData({ isLoadingSaveHouse: false, saveHouseApiData: data, saveHouseStatus: status, saveHouseServerError: null})
                } else{
                    setSaveHouseData({ isLoadingSaveHouse: false, saveHouseApiData: null, saveHouseStatus: status, saveHouseServerError: null})
                }
            } catch (error) {
                setSaveHouseData({ isLoadingSaveHouse: false, saveHouseApiData: null, saveHouseStatus: null, saveHouseServerError: error})
            }
        };
        fetchSaveHouseData()
    }, [query])

    return saveHouseData
}