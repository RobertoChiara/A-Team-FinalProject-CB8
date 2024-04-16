import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Contact.module.scss";
import Link from "next/link";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, message };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Messaggio inviato correttamente!");
        router.push("/");
      } else {
        alert("Errore durante l'invio del messaggio");
      }
    } catch (error) {
      console.error(error);
      alert("Si è verificato un problema. Riprova più tardi.");
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
              type="telephone"
              id="telephone"
              name="telephone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="message">Message:</label>
            <textarea
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
        <h3>Final Project team &ldquo;A&ldquo; of the Codig Bootcamp</h3>
        <Link
          className={styles.link}
          rel="edgemony"
          href="https://edgemony.com"
        >
          Edgemony
        </Link>
      </div>

      <div>
        <h1>Team members:</h1>
        <p>Roberto Chiara</p>
        <p>Maria Celeste Massaro</p>
        <p>Christian Schillaci</p>
        <p>Andrea Torrisi</p>
        <p>Alex Venutelli</p>
      </div>
    </section>
  );
};
export default Contact;
