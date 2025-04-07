import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useCallback } from "react";
import {AppContext} from "../../../AppContext"; 



export default function UserDetails(){
    const params = useParams()
    const [user,setUser] = useState({})
    const {userCredentials, setUserCredentials} = useContext(AppContext)
    const navigate = useNavigate()
    const baseUrl = (process.env.REACT_APP_API_BASE_URL || "http://localhost:4000") + "/users/";

    const getUserDetails = useCallback(async() =>{
        try{
            const response = await fetch(baseUrl + params.id,{
		method:"GET" ,
	        headers:{
                    Authorization: "Bearer " + userCredentials.accessToken
	        }
	    })

            const data = await response.json()
	    if (response.ok){
                setUser(data)
	    }
	    else if(response.status === 401){
                setUserCredentials(null)
		navigate("/auth/login/")
	    }
            else{
                alert("Unable to read the user details: " + data)
	    }
	}
	catch(error){
            alert("Unable to connect to the server")
	}
    },[baseUrl,params.id,userCredentials.accessToken, setUserCredentials, navigate]);

    useEffect(() => {
        getUserDetails()
    },[getUserDetails]);



    return(
        <div className="container my-4"> 
            <h2>User Details</h2>
           <hr /> 
            <div className="row mb-3">
	        <div className="col-4">ID</div>
                <div className="col-8">{user.id}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">First Name</div>
                <div className="col-8">{user.firstname}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Last Name</div>
                <div className="col-8">{user.lastname}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Email</div>
                <div className="col-8">{user.email}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Phone</div>
                <div className="col-8">{user.phone}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Address</div>
                <div className="col-8">{user.address}</div>
            </div>

            <div className="row mb-3">
                <div className="col-4">Role</div>
                <div className="col-8">{!user.id ? "" : user.role === "admin" ? 
                                         <span className="badge text-bg-warning">Admin</span> :
                                         <span className="badge text-bg-success">Customer</span>}
                </div>
	    </div>

            <hr />

            <Link className= "btn btn-secondary btn-sm" to="/admin/users" role="button">Back</Link>

       </div>



    )





}
