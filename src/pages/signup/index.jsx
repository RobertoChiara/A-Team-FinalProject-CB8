import React, { useState } from "react";
import styles from "../../styles/Signup.module.scss";
import { avatars } from "../../mocks/avatar";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username").toLowerCase();
    const password = formData.get("password");

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match");
      setIsModalOpen(true);
      return;
    }

    const body = { username: username, password: password, avatar: avatar };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setModalMessage("Registration successful");
        setIsModalOpen(true);
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.message);
        if (errorData.message === "User already exists") {
          setModalMessage("User already exists");
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.signup__container}>
      <h1 className={styles.signup__title}>Sign Up</h1>
      <form className={styles.signup__form} onSubmit={handleSubmit}>
        <input
          className={styles.signup__input}
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.signup__input}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={styles.signup__input}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          className={styles.signup__input}
          type="hidden"
          name="avatar"
          placeholder="Avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <p className={styles.avatarP}>select your avatar</p>
        <div className={styles.avatarGrid}>
          {avatars.map((avatarObj) => (
            <div key={avatarObj.id} onClick={() => setAvatar(avatarObj.id)}>
              <Image
                src={avatarObj.image}
                alt={`Avatar ${avatarObj.name}`}
                className={avatar === avatarObj.id ? `${styles.selected}` : ""}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
        <input type="hidden" name="avatar" value={avatar} />
        <button type="submit" className={styles.signup__btn}>
          Sign Up
        </button>
      </form>
      {isModalOpen && <p>{modalMessage}</p>}
    </div>
  );
}
