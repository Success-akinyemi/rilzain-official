import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './MyHomes.css'

function MyHomes({ toggle, isOpen }) {
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