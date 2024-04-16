import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Contact.module.scss";
import Link from "next/link";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, telephone, message };

    try {
      const response = await fetch("/api/guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent correctly!");
        router.push("/");
      } else {
        alert("Error sending message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert(
        "A problem occurred while sending the message. Please try again later."
      );
    }
  };

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <h2>Contact us</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telephone">Telephone:</label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
              className={styles.inputMessage}
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>

      <div className={styles.linkContainer}>
        <h3>Final Project team &ldquo;A&ldquo; of the Codig Bootcamp CB8:</h3>
        <Link
          className={styles.link}
          rel="edgemony"
          href="https://edgemony.com"
        >
          Edgemony
        </Link>
      </div>

      <div className={styles.teamContainer}>
        <h1>Team members:</h1>
        <Link href="https://github.com/RobertoChiara">Roberto Chiara</Link>
        <Link href="https://github.com/MCelesteMassaro">
          Maria Celeste Massaro
        </Link>
        <Link href="https://github.com/ChriSchillaci">Christian Schillaci</Link>
        <Link href="https://github.com/AndreaTorris">Andrea Torrisi</Link>
        <Link href="https://github.com/AlexVenutelli">Alex Venutelli</Link>
        <h1>Team Leader</h1>
        <Link href="https://github.com/giusene">Giuseppe Senettone</Link>
      </div>
    </section>
  );
};
export default Contact;
