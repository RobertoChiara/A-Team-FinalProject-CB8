import { BsCartX } from "react-icons/bs";
import { useState } from "react";
import Modal from "../modal/Modal";

const RemoveFromCartButton = ({ game, onRemove }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const username =
    typeof window !== "undefined" && localStorage.getItem("username");

  const handleRemoveFromCart = async () => {
    console.log("Button clicked");

    if (!username) {
      console.log("No username");
      setShowModal(true);
      return;
    }

    console.log("Username:", username);

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          gameSlug: game.slug,
        }),
      });

      console.log("Fetch request made");

      const data = await res.json();

      console.log("Response:", data);

      if (!data.success) {
        throw new Error(data.message);
      } else {
        setModalMessage("Item removed from Cart");
        setShowModal(true);
        setTimeout(() => {
          onRemove(game.slug);
          setShowModal(false);
        }, 2000);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>{modalMessage}</Modal>
      )}
      <button>
        <BsCartX onClick={handleRemoveFromCart} />
      </button>
    </>
  );
};

export default RemoveFromCartButton;
