import { useState, useContext, useEffect } from "react";
import { Link, useNavigate }    from "react-router-dom";
import { AppContext }           from "../../../AppContext";



export default function UserList(){
   
    const [users, setUsers] = useState([])
    const {userCredentials, setUserCredentials} = useContext(AppContext)
    const navigate = useNavigate()
   
    // Pagination(Page Management) 
    const [currentPage, setCurrentPage] = useState(1)// start at page 1
    const [totalPages, setTotalPages]    = useState(1)
    const pageSize = 5

    async function getUsers(){
        try{
             const response = await fetch("http://localhost:4000/users?_page="+ currentPage  +"&_limit=" + pageSize,{
                 method:"GET",
		 headers:{
			 Authorization : "Bearer "+ userCredentials.accessToken
		 }
	     })
	    
            let totalCount = response.headers.get('X-Total-Count')
	    console.log("X-Total-Count:" + totalCount)
	    let pages = Math.ceil(totalCount /pageSize)
            console.log("Total Pages:" + pages)
	    setTotalPages(pages) 

            const data = await response.json()
            if(response.ok){
                setUsers(data)
	    }
            else if(response.status === 401){//bouncer call 
                 setUserCredentials(null)
                 navigate("/auth/login/")
            }
	    else{
	        alert("Unable to read the data: " + data)
	    }
        }
	catch(error){
            alert("Unable to connect to server")
        }  
    }// I have a rough understanding of the extent of how this works but
     // However, the idea is useEffect applies the effect of an empty function accessing getUsers
     // then whatever is in the array at the bottom is applied to the effect being accessed. So we get users,
     // then reduce them to an array of pages(pagination function below this) then return them into the currentPage button  
    useEffect(() => {
        getUsers()
    }, [currentPage])

    // pagination functionality
    let paginationButtons = []
    for (let i = 1; i <= totalPages; i++){
        paginationButtons.push(
            <li className={i === currentPage ? "page-item active" : "page-item" } key = {i}>
                <a className="page-link" href={"?page=" +i}
	              onClick={event => {
	                  event.preventDefault()
                          setCurrentPage(i)
		      }}
                      >{i}</a>
           </li>
	)

    }
   

	
    return(
        <div className="container my-4">
	    <h2 className="text-center mb-5"> UserList</h2>

	    <table className="table">
                <thead>
	        <tr>    
                    <th>ID</th>
                    <th>First Name</th>
	            <th>Last Name</th>
	            <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
	        </tr>
	        </thead>
	        <tbody>
	            {
                        users.map((user,index) => {
                            return(
                                <tr key = {index}>
                                    <td>{user.id}</td>
				    <td>{user.firstname}</td>
				    <td>{user.lastname}</td>
				    <td>{user.email}</td>
				    <td>{user.role === "admin" ?
					 <span className="badge text-bg-warning">Admin</span> : 
				         <span className="badge text-bg-success">Customer</span>}
				    </td>
			           
				    <td> <Link className="btn btn-primary btn-sm"
				                      to={"/admin/users/details/" + user.id}
				                    role="button"> Details</Link>
				    </td>
				</tr>    


			    )


			})

		    }

	        </tbody>
	    </table>
	    <ul className= "pagination"> {paginationButtons}</ul>
        </div>
    )
}
