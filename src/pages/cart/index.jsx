import { useEffect, useState } from "react";
import withAuth from "./../../components/withAuth/WithAuth";
import RemoveFromCartButton from "../../components/removeFromCart/RemoveFromCart";
import Card2 from "../../components/card2/Card2";
import styles from "../../styles/Cart.module.scss";

import Checkout from "@/components/checkout";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const username = localStorage.getItem("username");
      const res = await fetch(`/api/cart?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      } else {
        console.error(`Error: ${res.status}`);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (gameSlug) => {
    try {
      const res = await fetch("/api/cart", {
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
        setCart((prevCart) =>
          prevCart.filter((game) => game.slug !== gameSlug)
        );
      } else {
        console.error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const refreshCart = () => {
    const fetchCart = async () => {
      const username = localStorage.getItem("username");
      const res = await fetch(`/api/cart?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setCart(data.cart);
      } else {
        console.error(`Error: ${res.status}`);
      }
    };

    fetchCart();
  };

  useEffect(refreshCart, []);

  return (
    <div className={styles.cart}>
      <h2>List of your carted games</h2>
      <Checkout allGamesInCart={cart} onPurchase={refreshCart} />
      <div className={styles.cardContainer}>
        {cart && cart.length > 0 ? (
          cart.map((game) => {
            return (
              <div key={game.slug} className={styles.card}>
                <Card2 game={game} />
                <div className={styles.button}>
                  <RemoveFromCartButton game={game} onRemove={removeFromCart} />
                </div>
              </div>
            );
          })
        ) : (
          <p>No games in cart.</p>
        )}
      </div>
    </div>
  );
}

export default withAuth(Cart);
