//LOGICA rimozione da wishlist

import { useEffect, useState } from "react";
import withAuth from "./../../components/withAuth/WithAuth";
import RemoveFromWishlistButton from "../../components/removeFromWishlist/RemoveFromWishlist";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";
import Card2 from "../../components/card2/Card2";
import styles from "../../styles/Wishlist.module.scss";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const username = localStorage.getItem("username");
      const res = await fetch(`/api/wishlist?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setWishlist(data.wishlist);
      } else {
        console.error(`Error: ${res.status}`);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (gameSlug) => {
    try {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          gameSlug,
        }),
      });
      if (res.ok) {
        setWishlist((prevWishlist) =>
          prevWishlist.filter((game) => game.slug !== gameSlug)
        );
      } else {
        console.error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h2>List of your wishlisted games</h2>
      {wishlist && wishlist.length > 0 ? (
        wishlist.map((game) => {
          return (
            <div key={game.slug} className={styles.card__Container}>
              <Card2 game={game} />
              <RemoveFromWishlistButton
                game={game}
                onRemove={removeFromWishlist}
              />
              <AddToCartButton game={game} onRemove={removeFromWishlist} />
            </div>
          );
        })
      ) : (
        <p>No games in wishlist.</p>
      )}
    </div>
  );
}

export default withAuth(Wishlist);
