import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

function Checkout({ allGamesInCart, onPurchase }) {
  const ids = allGamesInCart.map((game) => game.suggestions_count);

  const sumPrice = ids.reduce(
    (somma, suggestions_count) => somma + suggestions_count / 20,
    0
  );

  const roundedPrice = Math.round(sumPrice);

  const [discount, setDiscount] = useState(0);
  const [finalPrice, setfinalPrice] = useState(0);
  const [inputDiscountCode, setInputDiscountCode] = useState("");

  useEffect(() => {
    setfinalPrice(roundedPrice);
  }, [roundedPrice]);

  const handleInputChangeDiscount = (e) => {
    setInputDiscountCode(e.target.value);
  };

  const handleDiscount = () => {
    if (inputDiscountCode === "edgemony2024") {
      setDiscount(20);
      setfinalPrice((roundedPrice - (roundedPrice * 20) / 100).toFixed(0));
    } else if (inputDiscountCode === "giusene") {
      setDiscount(90);
      setfinalPrice((roundedPrice - (roundedPrice * 90) / 100).toFixed(0));
    } else {
      setDiscount(0);

      setfinalPrice(roundedPrice);
    }
  };

  const processCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          cart: allGamesInCart,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onPurchase();
      } else {
        console.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className={styles.checkoutContainer}>
        <h4>Checkout</h4>
        <div className={styles.pricesContainer}>
          <p>Subtotal Price: {roundedPrice}€</p>
          <p>Discount: {discount}%</p>
          <p>Final Amount: {finalPrice}€</p>
        </div>
        <div>
          <div className={styles.dcodeContainer}>
            <label htmlFor="codice">Insert discount code:</label>
            <input
              type="text"
              id="codice"
              className={styles.codeBar}
              onChange={handleInputChangeDiscount}
            />
            <button
              type="button"
              className={styles.button}
              onClick={handleDiscount}
            >
              Apply
            </button>
          </div>
          <div className={styles.dcodeContainer}>
            <label htmlFor="metodo">Select you payment method</label>
            <select id="metodo" name="metodo" className={styles.codeBar}>
              <option value="">Select..</option>
              <option value="paypal">PayPal</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Klarna">Klarna</option>
              <option value="bank transfer">Bank transfer</option>
            </select>
          </div>
          <div className={styles.buyButtonContainer}>
            <button
              type="button"
              className={styles.button}
              onClick={processCheckout}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Checkout;
