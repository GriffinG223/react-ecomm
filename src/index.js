import React from 'react';
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Navbar, Footer} from './components/layout';
import { AdminRoute, AuthenticatedUserRoute }   from './components/authorization';
import Home             from './pages/Home';
import ProductDetails   from './pages/ProductDetails';
import Contact          from './pages/Contact';
import NotFound         from './pages/NotFound';
import UserProfile      from './pages/UserProfile';
import UserList         from './pages/admin/users/UserList';
import UserDetails      from './pages/admin/users/UserDetails';
import ProductList      from './pages/admin/products/ProductList';
import CreateProduct    from './pages/admin/products/CreateProduct';
import EditProduct      from './pages/admin/products/EditProduct';
import Login            from './pages/auth/Login';
import Register         from './pages/auth/Register';
import {AppContext}     from './AppContext';
function App(){

	function getStoredCredentials(){
             let data = localStorage.getItem("credentials")
	     if (data){
                 let json = JSON.parse(data)
		 return json

	     }
	     return null

	}
        const [userCredentials, setUserCredentials] = useState(getStoredCredentials)
        // this useEffect places newly updated credentials into the local storage
	useEffect(() => {
            let str = JSON.stringify(userCredentials)
	    localStorage.setItem("credentials", str)


	}, [userCredentials])
        
	//<AdminRoute> below is used to sanitize the browser bar of any foul play,
	// items in the <AdminRoute></AdminRoute> brackets go to src/components && vim authorization.js,
	// then the user will be tested in a crucible of truthfulness to get redirected to Admin page or Home
	return(
	    <AppContext.Provider value={{ userCredentials, setUserCredentials} }>	
	    <BrowserRouter basename={process.env.PUBLIC_URL}>
	        <Navbar />
	        
		<Routes>
		    <Route path="/"                        element={<Home           />}/>
		    <Route path="/contact"                 element={<Contact        />}/>
		    <Route path="/products/:id"            element={<ProductDetails />}/>
		    <Route path="/profile/"                element={<AuthenticatedUserRoute>
			                                                <UserProfile />
			                                            </AuthenticatedUserRoute>}/>   

		    <Route path="/auth/register"           element={<Register       />}/>
		    <Route path="/auth/login"              element={<Login          />}/>
		    
		    <Route path="/admin/products"          element={<AdminRoute>
			                                                <ProductList  />
			                                            </AdminRoute>}    />
	           
		    <Route path="/admin/products/create"   element={<AdminRoute>
			                                                <CreateProduct/>
			                                            </AdminRoute>}    />
	            
		    <Route path="/admin/products/edit/:id" element={<AdminRoute>
			                                                <EditProduct/>
			                                            </AdminRoute>}    />
		    
		    <Route path="/admin/users/"            element={<AdminRoute>
			                                                <UserList/>
			                                            </AdminRoute>}    />
                    
		    <Route path="/admin/users/details/:id" element={<AdminRoute>
                                                                        <UserDetails/>
                                                                    </AdminRoute>}    />


		   <Route path="*"                         element={<NotFound/>}      />
		</Routes>
		
		<Footer />
            </BrowserRouter>
	    </AppContext.Provider>
	)
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
