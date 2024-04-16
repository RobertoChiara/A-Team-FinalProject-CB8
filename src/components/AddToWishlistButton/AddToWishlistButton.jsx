import { FaHeartCirclePlus } from "react-icons/fa6";
import { useState } from "react";
import Modal from "../modal/Modal";

const AddToWishlistButton = ({ game }) => {
  const [showModalNoUsername, setshowModalNoUsername] = useState(false);
  const [showModalAddtoWishlist, setshowModalAddtoWishlist] = useState(false);
  const [showModalAlreadyInWishlist, setshowModalAlreadyInWishlist] = useState(false);
  const username =
    typeof window !== "undefined" && localStorage.getItem("username");

  const handleAddToWishlist = async () => {
    console.log("Button clicked");

    if (!username) {
      console.log("No username");
      setshowModalNoUsername(true);
      return;
    }

    console.log("Username:", username);

    try {
      const res = await fetch("/api/wishlist", {
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
        setshowModalAddtoWishlist(true);        
      }
      if (data.message === "Game already in wishlist") {
        setshowModalAlreadyInWishlist(true);
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
      <FaHeartCirclePlus onClick={handleAddToWishlist} />
      {showModalNoUsername && (
        <Modal onClose={() => setshowModalNoUsername(false)}>
          Only logged user can add to wishlist.
        </Modal>)}
        {showModalAddtoWishlist && (
          <Modal onClose={() => setshowModalAddtoWishlist(false)}>
            Game Added to Wishlist!
          </Modal>      
        )}
        {showModalAlreadyInWishlist && (
          <Modal onClose={() => setshowModalAlreadyInWishlist(false)}>
            Game Already in Wishlist.
          </Modal>      
        )}
      
    </>
  );
};

export default AddToWishlistButton;
