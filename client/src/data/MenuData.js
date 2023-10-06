const isUser = localStorage.getItem('authToken')

const menuData = [
    {title: 'Homes', link: '/home'},
    {title: 'Contact Us', link: '/contact'},
    {title: 'Rentals', link: '/rentals'},
]

//if (isUser) {
//    menuData.push({ title: 'My Homes', link: '/myHomes' });
//}

export default menuData