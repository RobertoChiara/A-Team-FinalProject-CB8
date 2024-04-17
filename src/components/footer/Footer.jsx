import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_position}>
        <div className={styles.aboutUs}></div>
        <div className={styles.company}>
          <h2>Company</h2>
          <div className={styles.company_btn}>
            <Link href="/about">
              <button>About Us</button>
            </Link>
            <button>Download</button>
            <button>Work with Us</button>
          </div>
        </div>

        <div className={styles.partner}>
          <h2>Partner</h2>
          <div className={styles.partner_btn}>
            <button>Steam</button>
            <button>Epic Games</button>
            <button>Insta Gaming</button>
          </div>
        </div>

        <div className={styles.help}>
          <h3>Help</h3>
          <div className={styles.help_btn}>
            <button>Contact Us</button>
            <button>Shipping + Returns</button>
            <button>FAQ</button>
          </div>
        </div>

        <div className={styles.newsletter}>
          <div className={styles.newsletterForm}>
            <h3>Newsletter</h3>
            <p>Sign up for our newsletter to get the latest news</p>
            <input type="text" id="email" placeholder="email" required />
          </div>

          <div className={styles.social}>
            <Link className={styles.facebook} href="https://www.facebook.com/">
              <FaFacebookSquare />
            </Link>

            <Link
              className={styles.instagram}
              href="https://www.instagram.com/"
            >
              <FaInstagram />
            </Link>

            <Link className={styles.twitter} href="https://twitter.com/">
              <FaSquareXTwitter />
            </Link>

            <Link className={styles.youtube} href="https://youtube.com/">
              <FaSquareYoutube />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
