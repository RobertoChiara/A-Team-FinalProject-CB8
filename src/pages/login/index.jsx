import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../api/authContext";
import styles from "../../styles/Login.module.scss";
import Image from "next/image";
const Login = () => {
  const router = useRouter();
  const { authenticate } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const fetchUserAndSetAvatar = async (username) => {
    try {
      const res = await fetch(`/api/user?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("avatar", data.user.avatar);
      } else {
        throw new Error(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("username", username);
        authenticate(data.accessToken, username);
        setModalMessage("Login successful!");
        setModalVisible(true);
        fetchUserAndSetAvatar(username); // Call the function to fetch user data and set avatar
        const { redirect } = router.query;
        if (redirect) {
          router.push(decodeURIComponent(redirect));
        } else {
          router.push("/");
        }
      } else {
        const errorData = await response.json();
        setModalMessage(`Login failed: ${errorData.message}`);
        setModalVisible(true);
        console.error("Login failed:", errorData.message);
      }
    } catch (error) {
      setModalMessage(`Login error: ${error}`);
      setModalVisible(true);
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.login__container}>
        <h1 className={styles.title}>NOVA GAMING </h1>
        <Image
          className={styles.logo_login}
          src="/images/logoAbout.png"
          alt="logo"
          height={25}
          width={100}
          priority={true}
        />
        {/* <h2 className={styles.login__title}>Login</h2> */}
        <form className={styles.login__form} onSubmit={handleSubmit}>
          <input
            className={styles.login__input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.login__input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {modalVisible && <p>{modalMessage}</p>}
          <button type="submit" className={styles.login__btn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
