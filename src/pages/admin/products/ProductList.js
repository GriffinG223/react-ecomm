import {Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import {AppContext} from "../../../AppContext";
export default function ProductList(){
  
        // Page Management Functionality aka Pagination
	const [products, setProducts] = useState([])
        const [currentPage, setCurrentPage] =useState(1)
	const [totalPages, setTotalPages] =useState(1)
	const pageSize = 6
      
	// search functionality- these get integrated into the url to assert commands into pages
	const [search,setSearch] = useState("")

        // sort functionality
	const [sortColumn, setSortColumn] = useState({column: "id", orderBy: "desc" })
        
	// authentication management: moving the users credentials about
	const {userCredentials, setUserCredentials} = useContext(AppContext)
	
	const navigate = useNavigate()

	function getProducts(){
	    let url = "http://localhost:4000/products?&_page="+ currentPage +"&_limit="+
		       pageSize +"&q=" + search +"&_sort=" + sortColumn.column + "&_order=" + sortColumn.orderBy
            console.log("url: " + url)
            
	    fetch(url)
                 .then(response => {
                     if(response.ok){
		         let totalCount = response.headers.get('X-Total-Count')
			 console.log("X-Total-Count:" + totalCount)
			 let pages = Math.ceil(totalCount / pageSize)
	                 console.log("Total Pages:" + pages)
			 setTotalPages(pages)
			 return response.json()
		     }
		 throw new Error()
	     })
             .then(data => {
                 setProducts(data)
	     })
             .catch(error => {
                 alert("Unable to get data")

	     })
	}
        // getProducts, for currentPage  , for search, for sortColumn
        useEffect(getProducts, [currentPage, search, sortColumn])
       
	// THE COMMMAS!! Seriously I spent alot of time debugging this to realize I missed a comma:(
	function deleteProduct(id){
            fetch("http://localhost:4000/products/" + id,{
	        method:"DELETE",
		headers: {// The space following Bearer is important
			"Authorization": "Bearer " + userCredentials.accessToken
		}

	    })
	    .then(response =>{   
		if(response.status === 401){
                    //disconnect and redirect
	            setUserCredentials(null)
		    navigate("./auth/login")// the patrick swayze method, they get tossed to the login
		    return
		}
                if(!response.ok){
                    throw new Error()
		}

            getProducts()


	    })
	    .catch(error =>{
                alert("Unable to delete the product")

	    })


	}

        // Page Functionality
        let paginationButtons = []
        for(let i = 1; i <= totalPages; i++){
            paginationButtons.push(
                <li className={i === currentPage ? "page-item active" : "page-item"} key={i} >
                    <a className="page-link" href={"?page=" + i}
		        onClick={event  =>{ 
                             event.preventDefault()
                             setCurrentPage(i)
                        
			}}
		    >{i}</a>
                </li>

	    )

	}	

        function handleSearch(event){
             event.preventDefault()
	     
             let text = event.target.search.value
	     setSearch(text) // takes text from via function useState into let URL
	     setCurrentPage(1)// just sets the current page in a search to 1
 
        }

        function sortTable(column){
            let orderBy = "desc"
	    if (column === sortColumn.column){
	        // reverse orderBy
		if(sortColumn.orderBy === "asc")
		    orderBy = 'desc'
		else 
		    orderBy = 'asc'

	    }
	    setSortColumn({column: column, orderBy: orderBy})
	}

	return(
         <div className="container my-4">
             <h2 className="text-center mb-4" >Products</h2>

	     <div className="row mb-3">

                 <div className="col">
                     <Link className="btn btn-primary me-1" to="/admin/products/create" role="button">Create</Link>
	             <button type="button" className="btn btn-outline-primary"
		     
		     onClick={getProducts}>Refresh
		</button> 
		</div>

	         <div className="col">
	             <form className="d-flex" onSubmit={handleSearch}>
                         <input className="form-control me-2" type="search" placeholder="Search" name="search" />
                         <button className="btn btn-outline-success" type="submit">Search</button>
                     </form>
       
                 

	         </div>
	     </div>

	     <table className="table">
	         <thead>
	            <tr>
	                <th style={{cursor: "pointer"}} onClick={() => sortTable("id")}
		            >ID
		            <SortArrow column="id" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}     />   
		            </th>
	     	
		        <th style={{cursor: "pointer"}} onClick={() => sortTable("name")}
			    >Name 
		            <SortArrow column="name" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}   />
		            </th>
		
		        <th style={{cursor: "pointer"}} onClick={() => sortTable("brand")}
		            >Brand
		            <SortArrow column="brand" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}  />
		            </th>
	     	
		        <th style={{cursor: "pointer"}} onClick={() => sortTable("category")}
		            >Category
                            <SortArrow column="category" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}     />
		            </th>
	     		
		        <th style={{cursor: "pointer"}} onClick={() => sortTable("price")}
		            >Price
                            <SortArrow column="price" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy}     />
		            </th>
	     
		        <th>Image</th>
	     	
		        <th style={{cursor: "pointer"}} onClick={() => sortTable("createdAt")}
		            >Created At
	    	            <SortArrow column="createdAt" sortColumn={sortColumn.column} orderBy={sortColumn.orderBy} />
		            </th>

		        <th>Action</th>
	             
		    </tr>


	     	 </thead>

	         <tbody>
                     {
                         products.map((product, index) => {  
		     	    return(
                                 <tr key = {index}>                              
				    <td>
                                        {product.id}</td>
				   
				    <td>
				        {product.name}</td>
				   
				    <td>
                                        {product.brand}</td>
                                   
				    <td>
                                        {product.category}</td>
                                   
				    <td>
                                        {product.price}</td>
                                   
				    <td>
                                        <img src={"http://localhost:4000/images/" + product.imageFilename}
				             width="100" alt="..." /></td>
                                   
				    <td>
                                        {product.createdAt.slice(0,10)} </td>
                           
				    <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                       <Link   className='btn btn-primary btn-sm me-1' 
                                            to={"/admin/products/edit/" + product.id}>
				            Edit
				       </Link>
				       <button type="button" className="btn btn-danger btn-sm"
				           onClick={() => deleteProduct(product.id)}> Delete
				       </button></td>
			        </tr>
			    )
		     	})
	             }
	         </tbody>
	     </table>
             
	     <ul className = "pagination">{paginationButtons}</ul>





	 </div>
     )


}


// This controls the sorting arrows response
function SortArrow({column, sortColumn, orderBy}){
    if (column  !== sortColumn) return null

    if (orderBy === "asc"){
       return  <i className="bi bi-arrow-up"></i>
    }
    return  <i className="bi bi-arrow-down"></i>

}
