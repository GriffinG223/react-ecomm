import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function UserCart() {
  const { cartItems, updateItemQuantity, removeItemFromCart } = useContext(AppContext);
  const navigate = useNavigate();
  console.log("Cart data in UserCart:", cartItems);

   useEffect(() => {
     console.log("Updated cart data:", cartItems);
  }, [cartItems]); 
  
  const handleCheckout = () => {
    // Navigate to checkout confirmation page
    navigate("/checkout-confirmation");
  };

  return (
    <div className="container my-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Continue shopping</Link></p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateItemQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>$ {item.price}</td>
                  <td>$ {item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItemFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <button className="btn btn-primary" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

