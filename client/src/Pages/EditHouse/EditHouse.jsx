import { useLocation } from 'react-router-dom'
import './EditHouse.css'
import Navbar from '../../Components/Navbar/Navbar'
import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import { useFetchHouses } from '../../hooks/fetch.hooks'
import { useEffect, useState } from 'react'
import Spinner from '../../Components/Helpers/Spinner/Spinner'
import toast, { Toaster } from 'react-hot-toast'
import { updateHouse } from '../../helpers/apis'

function EditHouse({isOpen, toggle}) {
    const loc = useLocation()
    const path = loc.pathname.split('/')[2]

    const { isLoadingHouseData, apiHouseData, houseServerError, houseStatus } = useFetchHouses(path)
    const { _id, address, desc, image, imageArray, location, price, title, } = apiHouseData?.data?.house || {}


    const [formData, setFormData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
      if (apiHouseData && apiHouseData.data && apiHouseData.data.house) {
        const houseData = apiHouseData.data.house;
        setFormData({
          title: houseData.title || '',
          desc: houseData.desc || '',
          address: houseData.address || '',
          location: houseData.location || '',
          price: houseData.price || '',
        });
      }
    }, [apiHouseData]);
    
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      // Create an object containing only the fields that have changed
      const updatedFields = {};
      for (const key in formData) {
        if (formData[key] !== (apiHouseData?.data?.house[key] || '')) {
          updatedFields[key] = formData[key];
        }
      }
      // Send updatedFields to your API for updating the house
      console.log('updatedFields>>',updatedFields);
      try {
        setIsLoading(true)
        const  id = _id
        const response = await updateHouse({ id, ...updatedFields})
        
      } catch (error) {
        toast.error('Failed To Update House')
        console.log(error)
      } finally{
        setIsLoading(false)
      }
    };

  return (
    <div className='editHouse'>
      <Toaster position='top-center'></Toaster>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="editHouse-container">
            <h2>EditHouse </h2>
            {
              isLoadingHouseData ? (
                <Spinner />
              ) : (
                <form onSubmit={handleFormSubmit}>
                <div className="input-body">
                  <label htmlFor="">Tilte:</label>
                  <input type="text" name='title' value={formData.title} onChange={handleInputChange} />
                </div>
  
                <div className="input-body">
                  <label htmlFor="">Description:</label>
                  <input type="text" name='desc' value={formData.desc} onChange={handleInputChange} />
                </div>
  
                <div className="input-body">
                  <label htmlFor="">Address:</label>
                  <input type="text" name='address' value={formData.address} onChange={handleInputChange} />
                </div>
  
                <div className="input-body">
                  <label htmlFor="">Location:</label>
                  <input type="text" name='location' value={formData.location} onChange={handleInputChange} />
                </div>
  
                <div className="input-body">
                  <label htmlFor="">Price:</label>
                  <input type="text" name='price' value={formData.price} onChange={handleInputChange} />
                </div>
  
                <div className="imgcard">
                  <label htmlFor="">Current House Image:</label>
                  <img src={image} alt='house' />
                </div>
  
                <div className="imgArrayCard">
                  <label htmlFor="">Current Display Images:</label>
                  <div className="images">
                    {Array.isArray(imageArray) ? (
                      imageArray.map((item, idx) => (
                      <img src={item} alt='house-image' key={idx}/>
                      ))
                    ) : (
                    <p>No images available</p>
                    )}
                  </div>
                </div>
  
                <div className="btn">
                  <button disabled={isLoading}>{ isLoading ? 'Updating' : 'Update' }</button>
                </div>
              </form>
              )
            }
        </div>
        <Footer />
    </div>
  )
}

export default EditHouse