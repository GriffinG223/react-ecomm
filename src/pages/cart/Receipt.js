import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";

export default function Receipt() {
  const { cartItems } = useContext(AppContext);

  // Simulate an order number
  const orderNumber = Math.floor(Math.random() * 1000000);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-4">
      <h2>Receipt</h2>
      <hr />
      <p>Thank you for your purchase!</p>
      <p>Your order number is: <strong>{orderNumber}</strong></p>
      <h4>Order Details</h4>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h4>Total: $ {totalAmount.toFixed(2)}</h4>
      <Link className="btn btn-primary" to="/">
        Continue Shopping
      </Link>
    </div>
  );
}

