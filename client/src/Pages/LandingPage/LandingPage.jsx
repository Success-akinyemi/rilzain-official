import Contact from '../../Components/Contact/Contact'
import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Hero from '../../Components/Hero/Hero'
import InfoSection from '../../Components/InfoSection/InfoSection'
import Navbar from '../../Components/Navbar/Navbar'
import NewestHome from '../../Components/NewestHome/NewestHome'
import { InfoDataOne, InfoDataThree, InfoDatatwo } from '../../data/InfoData'
import { SliderData } from '../../data/SliderData'
import './LandingPage.css'

function LandingPage({isOpen, toggle}) {
  return (
    <div className='landingPage'>
        <Navbar toggle={toggle} enableScrollEffect={true} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <Hero data={SliderData} info={true} />
        <div className='info-1'>
          <InfoSection {...InfoDataOne} />
        </div>
        <div className='info-2'>
          <InfoSection {...InfoDatatwo} />
        </div>
        <NewestHome />
        <Contact {...InfoDataThree} />
        <Footer />
    </div>
  )
}

export default LandingPage