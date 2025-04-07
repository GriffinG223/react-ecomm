import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Function to retrieve credentials from localStorage
  function getStoredCredentials() {
    const data = localStorage.getItem("credentials");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("Error parsing stored credentials:", error);
      }
    }
    return null;
  }

  // User credentials state (initialized from localStorage)
  const [userCredentials, setUserCredentials] = useState(getStoredCredentials());

  // Initialize cart state from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Update localStorage whenever userCredentials changes
  useEffect(() => {
    localStorage.setItem("credentials", JSON.stringify(userCredentials));
  }, [userCredentials]);

  // Persist cartItems to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Updated cartItems:", cartItems);
  }, [cartItems]);

  // Cart functions
  const addItemToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        // Increase quantity if already in cart
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateItemQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Debug log to verify state
  console.log("AppProvider rendered. User:", userCredentials, "Cart items:", cartItems);

  return (
    <AppContext.Provider
      value={{
        userCredentials,
        setUserCredentials,
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

