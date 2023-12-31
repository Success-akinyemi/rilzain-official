import { useState } from 'react'
import DropDown from '../../Components/DropDown/DropDown'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './NewHome.css'
import { uploadHouse, uploadRental } from '../../helpers/apis'
import toast, { Toaster } from 'react-hot-toast'

function NewHome({ isOpen, toggle }) {
    const [ card, setCard ] = useState('house')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [address, setAddress] = useState('')
    const [location, setLocation] = useState('')
    const [houseImage, setHouseImage] = useState(null)
    const [imageArray, setImageArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const handleHouseImageChange = (e) => {
        setHouseImage(e.target.files[0])
    }

    const handleMultipleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        //console.log('Selected Images:', selectedImages);
        setImageArray(selectedImages);
    }

    const uploadSingleImage = async (image) => {
        //const apiKey = '6d207e02198a847aa98d0a2a901485a5'
        //const format = 'json'

        const formData = new FormData();
        //formData.append('key', apiKey);
        formData.append('upload_preset', 'ec1ikrql');
        formData.append('file', image);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/ddhq7rrfq/image/upload` ,{
                method: 'POST',
                body: formData,
            })
            if(response.ok){
                const imageData = await response.json();
                return imageData.url;
            } else {
                const errorResponse = await response.json();
                throw new Error(`Failed to upload image: ${errorResponse.error.message}`);
            }
        } catch (error) {
            console.log('Error Uploading image>>', error)
            throw error;
        }
    };

    const clearInputFields = () => {
        setTitle('');
        setPrice('');
        setDesc('');
        setAddress('');
        setLocation('');
        setHouseImage(null);
        setImageArray([]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            
            const houseImageUrl = await uploadSingleImage(houseImage)
            const multipleImageUrlPromise = imageArray.map((image) => uploadSingleImage(image));
            const multipleImageUrl = await Promise.all(multipleImageUrlPromise)

            console.log('House Image Url:', houseImageUrl );
            console.log('Multiple Image Url:', multipleImageUrl );
            setHouseImage(houseImageUrl)
            setImageArray(multipleImageUrl)
            
            let newHouse
            if(card === 'house'){
                newHouse = await uploadHouse({ title, price, desc, address, location, houseImageUrl, imageArray })
            }
            if(card === 'rental'){
                newHouse = await uploadRental({ title, price, desc, address, location, houseImageUrl, imageArray })
            }
            
            if (newHouse === 'success') {
                toast.success('House Uploaded');
                // Clear input fields upon success
                clearInputFields();
            }
        } catch (error) {
            console.log('Error::', error)
            toast.error('Failed to upload house');
        } finally{
            setIsLoading(false)
        }
    }

  return (
    <div className='newHome'>
        <Toaster position='top-centre'></Toaster>
        <Navbar toggle={toggle} />
        <DropDown isOpen={isOpen} toggle={toggle} />
        <div className="newHome-container">
            <div className="opt">
                <span className={card === 'house' ? 'bg' : ''} onClick={() => setCard('house')}>House</span>
                <span className={card === 'rental' ? 'bg' : ''} onClick={() => setCard('rental')}>Rental</span>
            </div>
            <h2>{card === 'house' ? 'Add New House' : 'Add New Rental Property'}</h2>
            <form onSubmit={handleSubmit}>
                {
                    card === 'house' && (
                        <>
                            <div className="input-area">
                            <label>House Title:</label>
                            <input type="text" placeholder='E.g Semi-Detached Duplex' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="input-area">
                            <label>House Price (NGN):</label>
                            <input type="number" placeholder='NGN 1000000' value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>

                        <div className="input-area">
                            <label>House Description:</label>
                            <textarea rows={10} type="text" placeholder='5 Bedroom 2 Bathrooms semi-funished with spacious compound' value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>

                        <div className="input-area">
                            <label htmlFor='image-upload'>House image:</label>
                            <input 
                                type="file" 
                                id="image-upload" 
                                accept='image/jpeg image/png'
                                onChange={handleHouseImageChange}
                            />
                        </div>

                        <div className="input-area">
                            <label>House Address:</label>
                            <input type="text" placeholder='E.g No.12 Herbert road kuje.' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className="input-area">
                            <label>House Location (State):</label>
                            <input type="text" placeholder='E.g Lagos.' value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>

                        <div className="input-area">
                            <label htmlFor='multiple-image-upload'>Display Images of various section of the house:</label>
                            <input 
                                type="file" 
                                id="multiple-image-upload" 
                                multiple 
                                accept='image/jpeg image/png'
                                onChange={handleMultipleImageChange}
                            />
                        </div>

                        <div className="button">
                            <button className='submit' disabled={isLoading}>{isLoading ? 'Uploading New House...' : 'Add New House' }</button>
                        </div>
                        </>
                    )
                }

                {
                    card === 'rental' && (
                        <>
                            <div className="input-area">
                                <label>Property Title:</label>
                                <input type="text" placeholder='E.g Semi-Detached Duplex' value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className="input-area">
                                <label>Property Price (NGN):</label>
                                <input type="number" placeholder='NGN 1000000' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>

                            <div className="input-area">
                                <label>Property Description:</label>
                                <textarea rows={10} type="text" placeholder='5 Bedroom 2 Bathrooms semi-funished with spacious compound' value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                            </div>

                            <div className="input-area">
                                <label htmlFor='image-upload'>Property image:</label>
                                <input 
                                    type="file" 
                                    id="image-upload" 
                                    accept='image/jpeg image/png'
                                    onChange={handleHouseImageChange}
                                />
                            </div>

                            <div className="input-area">
                                <label>Property Address:</label>
                                <input type="text" placeholder='E.g No.12 Herbert road kuje.' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className="input-area">
                                <label>Property Location (State):</label>
                                <input type="text" placeholder='E.g Lagos.' value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>

                            <div className="input-area">
                                <label htmlFor='multiple-image-upload'>Display Images of various section of the Property:</label>
                                <input 
                                    type="file" 
                                    id="multiple-image-upload" 
                                    multiple 
                                    accept='image/jpeg image/png'
                                    onChange={handleMultipleImageChange}
                                />
                            </div>

                            <div className="button">
                                <button className='submit' disabled={isLoading}>{isLoading ? 'Uploading New Rental...' : 'Add New Property' }</button>
                            </div>
                        </>
                    )
                }
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default NewHome