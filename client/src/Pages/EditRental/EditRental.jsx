import { useLocation } from 'react-router-dom'
import './EditRental.css'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { updateRental } from '../../helpers/apis'
import { useFetchRental } from '../../hooks/fetch.hooks'
import Navbar from '../../Components/Navbar/Navbar'
import DropDown from '../../Components/DropDown/DropDown'
import Spinner from '../../Components/Helpers/Spinner/Spinner'
import Footer from '../../Components/Footer/Footer'

function EditRental({ toggle, isOpen }) {
    const loc = useLocation()
    const path = loc.pathname.split('/')[2]

    const { isLoadingRentalData, apiRentalData, rentalStatus, rentalServerError } = useFetchRental(path)
    const { _id, address, desc, image, imageArray, location, price, title, } = apiRentalData?.data?.rental || {}

    const [formData, setFormData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
      if (apiRentalData && apiRentalData.data && apiRentalData.data.rental) {
        const houseData = apiRentalData.data.rental;
        setFormData({
          title: houseData.title || '',
          desc: houseData.desc || '',
          address: houseData.address || '',
          location: houseData.location || '',
          price: houseData.price || '',
        });
      }
    }, [apiRentalData]);
    
  
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
        if (formData[key] !== (apiRentalData?.data?.rental[key] || '')) {
          updatedFields[key] = formData[key];
        }
      }
      // Send updatedFields to your API for updating the Rental
      console.log('updatedFields>>',updatedFields);
      try {
        setIsLoading(true)
        const  id = _id
        const response = await updateRental({ id, ...updatedFields})
        
      } catch (error) {
        toast.error('Failed To Update rental')
        console.log(error)
      } finally{
        setIsLoading(false)
      }
    };
  return (
    <div className='editRental'>
        <Toaster position='top-center'></Toaster>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="editRental-container">
            <h2>Edit Rentals </h2>
            {
              isLoadingRentalData ? (
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
                  <label htmlFor="">Current Rental Image:</label>
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

export default EditRental