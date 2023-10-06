import { useState } from 'react';

function Homes({ isOpen, toggle }) {
  const [likedHouses, setLikedHouses] = useState([]);

  const handleLike = async (houseId) => {
    if (!isUser) {
      toast.error('Please Login First');
    } else {
      try {
        const response = await fetch(`/api/houses/like/${houseId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Include your authentication token if applicable
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': `Bearer ${yourAuthToken}`,
          // },
        });

        if (response.ok) {
          // Update the likedHouses state based on the response
          const updatedLikedHouses = [...likedHouses];
          if (likedHouses.includes(houseId)) {
            // User has unliked the house, so remove it from the likedHouses array
            updatedLikedHouses.splice(updatedLikedHouses.indexOf(houseId), 1);
          } else {
            // User has liked the house, so add it to the likedHouses array
            updatedLikedHouses.push(houseId);
          }
          setLikedHouses(updatedLikedHouses);
        } else {
          // Handle error responses from the server
          const data = await response.json();
          toast.error(data.error || 'Failed to update like');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to update like');
      }
    }
  }

  // Render the appropriate icon based on whether the house is liked or not
  const renderLikeIcon = (houseId) => {
    return likedHouses.includes(houseId) ? (
      <FavoriteIcon className='icon icon-1' />
    ) : (
      <FavoriteBorderIcon className='icon icon-1' />
    );
  }

  // ...
  // Rest of your component code
}
