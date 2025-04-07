import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Navigate } from "react-router-dom";

// This is an admin filter to make sure only admin's can access admin restricted content
// It keeps cheeky folk from adding /admin/products or admin/users to the browser search bar
// like this http://ecomm.../admin/products
export function AdminRoute(props){
    // This checks if user is admin 
    // IF it fails then the user is redirected back to the homepage
    // IF it works it returns the properties to it's calling children 
    const {userCredentials}= useContext(AppContext)
    if (!userCredentials || userCredentials.user.role !== "admin"){
        return <Navigate to="/" replace />

    }
	

    return props.children
}

export function AuthenticatedUserRoute({children}){
    const {userCredentials}= useContext(AppContext)
    if (!userCredentials ){
        return <Navigate to="/" replace/>

    }


    return children
}

export function VisitorRoute({children}){
    const {userCredentials}= useContext(AppContext)
    if (!userCredentials){
        return <Navigate to="/" replace/>

    }


    return children
}
