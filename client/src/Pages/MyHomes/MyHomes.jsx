import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { useFetchMyHomes } from '../../hooks/fetch.hooks'
import './MyHomes.css'

function MyHomes({ toggle, isOpen }) {
  const { isLoading, apiData, serverError } = useFetch()
  const id = apiData?._id
  const { isLoadingMyHomesData, myHomesApiData, myHomesStatus, myHomesServerError } = useFetchMyHomes(id);
  
  return (
    <div className='myHomes'>
        <Navbar toggle={toggle} />
        <DropDown toggle={toggle} isOpen={isOpen} />
        <div className='myHomes-container'>
            MyHomes
        </div>
        <Footer />
    </div>
  )
}

export default MyHomes