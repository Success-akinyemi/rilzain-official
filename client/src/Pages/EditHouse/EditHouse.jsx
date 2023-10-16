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
        </div>
        <Footer />
    </div>
  )
}

export default EditHouse