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
        <Hero data={SliderData} info={true} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <InfoSection {...InfoDataOne} />
        <InfoSection {...InfoDatatwo} />
        <NewestHome />
        <Contact {...InfoDataThree} />
        <Footer />
    </div>
  )
}

export default LandingPage