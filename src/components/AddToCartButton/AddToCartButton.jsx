import { FaCartPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import styles from "./index.module.scss";

const AddToCartButton = ({ game, onRemoveFromWishlist }) => {
  const [showModalNoUsername, setshowModalNoUsername] = useState(false);
  const [showModalAddtoCart, setshowModalAddtoCart] = useState(false);
  const [showModalAlreadyInCart, setshowModalAlreadyInCart] = useState(false);
  const username =
    typeof window !== "undefined" && localStorage.getItem("username");

  useEffect(() => {
    let timer;
    if (showModalAddtoCart || showModalNoUsername || showModalAlreadyInCart) {
      timer = setTimeout(() => {
        setshowModalAddtoCart(false);
        setshowModalNoUsername(false);
        setshowModalAlreadyInCart(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showModalAddtoCart, showModalNoUsername, showModalAlreadyInCart]);

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
        if (onRemoveFromWishlist) {
          onRemoveFromWishlist(game.slug);
        }
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
      <button className={styles.button}>
        <FaCartPlus onClick={handleAddToCart} />
      </button>
    </>
  );
};

export default AddToCartButton;
