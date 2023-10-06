import { Navigate } from "react-router-dom";
import { useFetch } from "../hooks/fetch.hooks";

export const AuthorizeUser = ({ children }) => {
    const authToken = localStorage.getItem('authToken')
    if(!authToken){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children
}

export const AdminUser = ({ children }) => {
    const authToken = localStorage.getItem('authToken')
    const { apiData } = useFetch()
    const isAdmin = apiData?.isAdmin
    console.log('AA')
    if(!authToken && !isAdmin){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children
}