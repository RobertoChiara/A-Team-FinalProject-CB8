import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../api/authContext";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/User.module.scss";

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };

    window.addEventListener("storage", handleStorageChange);

    if (!isAuthenticated) {
      router.push("/login");
    } else {
      handleStorageChange();
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated]);

  const fetchUser = async (username) => {
    try {
      const res = await fetch(`/api/user?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        throw new Error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUser(username);
    }
  }, [username]);

  useEffect(() => {
    const handleStorageChange = () => {
      const username = localStorage.getItem("username");
      setUsername(username);
      if (username) {
        fetchUser(username);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    if (!isAuthenticated) {
      router.push("/login");
    } else {
      handleStorageChange();
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const gender = ["male", "female"][Math.floor(Math.random() * 2)];
  const randomImage = `https://xsgames.co/randomusers/assets/avatars/${gender}/${Math.floor(
    Math.random() * 79
  )}.jpg`;
  if (user) {
    return (
      <>
        {isAuthenticated && user && (
          <>
            <div className={styles.user__Container}>
              <Image
                className={styles.user__Image}
                src={randomImage}
                alt="User"
                width={150}
                height={150}
              />
              <h1 className={styles.user__Name}>{username}</h1>
              <div className={styles.user__ListContainer}>
                <div>
                  <h2>Wishlist:</h2>
                  <ol className={styles.user__List}>
                    {`You have ${user.wishlist.length} products present in your Wishlist.`}
                  </ol>
                </div>
                <div>
                  <h2>Cart:</h2>
                  <ol className={styles.user__List}>
                    {`You have ${user.cart.length} products present in your Cart.`}
                  </ol>
                </div>
                <div>
                  <h2>Library:</h2>
                  <ol className={styles.user__List}>
                    {`You have ${user.wishlist.length} products present in your Library.`}
                  </ol>
                </div>
              </div>
              <button className={styles.user__Btn} onClick={logout}>
                Logout
              </button>
            </div>
          </>
        )}
      </>
    );
  }
};

export default Index;
