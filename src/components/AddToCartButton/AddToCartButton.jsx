import { FaCartPlus } from "react-icons/fa";
import { useState } from "react";
import Modal from "../modal/Modal";

const AddToCartButton = ({ game }) => {
  const [showModalNoUsername, setshowModalNoUsername] = useState(false);
  const [showModalAddtoCart, setshowModalAddtoCart] = useState(false);
  const [showModalAlreadyInCart, setshowModalAlreadyInCart] = useState(false);
  const username =
    typeof window !== "undefined" && localStorage.getItem("username");

  const handleAddToCart = async () => {
    console.log("Button clicked");

    if (!username) {
      console.log("No username");
      setshowModalNoUsername(true);
      return;
    }
    
    
   


     
    console.log("Username:", username);

    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          game: {
            slug: game.slug,
            name: game.name,
            background_image: game.background_image,
            suggestions_count: game.suggestions_count,
          },
        }),
      });

      console.log("Fetch request made");

      const data = await res.json();

      console.log("Response:", data);
      
      if (data.success === true) {
        setshowModalAddtoCart(true);        
      }
      if (data.message === "Game already in cart") {
        setshowModalAlreadyInCart(true);
        return;        
      }       
     

      if (!data.success) {
        
        throw new Error(data.message);
        
      }
    } catch (error) {   
      
      console.error("An error occurred:", error);
    }

   
    
  };

  return (
    <>
      <FaCartPlus onClick={handleAddToCart} />
      {showModalNoUsername && (
        <Modal onClose={() => setshowModalNoUsername(false)}>
          Only logged user can add to cart
        </Modal>      
      )}
     {showModalAddtoCart && (
        <Modal onClose={() => setshowModalAddtoCart(false)}>
          Game Added to Cart!
        </Modal>      
      )}
      {showModalAlreadyInCart && (
        <Modal onClose={() => setshowModalAlreadyInCart(false)}>
          Game Already in Cart.
        </Modal>      
      )}
    </>
  );
};

export default AddToCartButton;
