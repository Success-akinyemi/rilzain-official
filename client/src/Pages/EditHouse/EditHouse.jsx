import { useLocation } from 'react-router-dom'
import './EditHouse.css'
import Navbar from '../../Components/Navbar/Navbar'
import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import { useFetchHouses } from '../../hooks/fetch.hooks'

function EditHouse({isOpen, toggle}) {
    const loc = useLocation()
    const path = loc.pathname.split('/')[2]

    const { isLoadingHouseData, apiHouseData, houseServerError, houseStatus } = useFetchHouses(path)
    const { _id, address, desc, image, imageArray, location, price, title, } = apiHouseData?.data?.house || {}

  return (
    <div className='editHouse'>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="editHouse-container">
            <h2>EditHouse</h2>
            <form>
              <div className="input-body">
                <label htmlFor="">Tilte:</label>
                <input type="text"  />
              </div>

              <div className="input-body">
                <label htmlFor="">Description:</label>
                <input type="text"  />
              </div>

              <div className="input-body">
                <label htmlFor="">Address:</label>
                <input type="text"  />
              </div>

              <div className="input-body">
                <label htmlFor="">Location:</label>
                <input type="text"  />
              </div>

              <div className="input-body">
                <label htmlFor="">Price:</label>
                <input type="text"  />
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
                <button>Update</button>
              </div>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default EditHouse