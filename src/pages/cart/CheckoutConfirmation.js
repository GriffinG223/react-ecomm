import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

export default function CheckoutConfirmation() {
  const { cartItems, setCartItems } = useContext(AppContext);
  const navigate = useNavigate();

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirm = () => {
    // Simulate purchase - you might clear the cart or store order info
    // For now, navigate to receipt page
    navigate("/receipt");
    // Optionally clear the cart:
    // setCartItems([]);
  };

  return (
    <div className="container my-4">
      <h2>Checkout Confirmation</h2>
      <hr />
      <h4>Order Summary</h4>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} = ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}
      <h4>Total: $ {totalAmount.toFixed(2)}</h4>
      <button className="btn btn-success" onClick={handleConfirm}>
        Confirm Purchase
      </button>
    </div>
  );
}

