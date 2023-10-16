import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/fetch.hooks'
import Spinner from '../Helpers/Spinner/Spinner'
import './UserProfile.css'
import { Toaster } from 'react-hot-toast';

function UserProfile() {
    const { isLoading, apiData, serverError } = useFetch()
    
    const [isLoadingUpdate, setIsLoadingUdate] = useState(false)

    const [userData, setUserData] = useState({
        userName: '',
        email: '',
        phoneNumber: '',
        address: '',
        state: '',
      });
    

      useEffect(() => {
        if (!isLoading && !serverError) {

          setUserData({
            userName: apiData?.username || '',
            email: apiData?.email || '',
            phoneNumber: apiData?.phoneNumber || '',
            address: apiData?.address || '',
            state: apiData?.state || '',
          });
        }
      }, [isLoading, serverError, apiData]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value,
        });
      };

      const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            setIsLoadingUdate(true)
            

        } catch (error) {
            
        } finally{
            setIsLoadingUdate(false)
        }
      }
    return (
    <div className='userProfile'>
        <Toaster position='top-center' ></Toaster>
        <h1>Profile</h1>
        {
            isLoading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleUpdate}>
                <div className="input-group">
                    <label htmlFor="">UserName:</label>
                    <input type="text" value={userData.userName} name='userName' onChange={handleInputChange} />
                </div>
    
                <div className="input-group">
                    <label htmlFor="">Email:</label>
                    <input type="email" value={userData.email} name='email' onChange={handleInputChange} />
                </div>
    
                <div className="input-group">
                    <label htmlFor="">Phone Number:</label>
                    <input type="number" value={userData.phoneNumber} name='phoneNumber' onChange={handleInputChange} />
                </div>
    
                <div className="input-group">
                    <label htmlFor="">Address:</label>
                    <input type="text" value={userData.address} name='address' onChange={handleInputChange} />
                </div>
    
                <div className="input-group">
                    <label htmlFor="">State:</label>
                    <input type="text" value={userData.state} name='state' onChange={handleInputChange} />
                </div>
    
                <div className="input-group">
                    <input className='submit' type='submit' value='Update' />
                </div>            
                </form>
            )
        }
    </div>
  )
}

export default UserProfile