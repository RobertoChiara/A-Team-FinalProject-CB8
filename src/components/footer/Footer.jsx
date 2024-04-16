import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_position}>
        <div className={styles.aboutUs}>
          <h2>About us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            non consequuntur labore fugit, perspiciatis nostrum odit at
            temporibus harum deserunt!
          </p>
        </div>
        <div className={styles.company}>
          <h2>Company</h2>
          <div className={styles.company_btn}>
            <button>Blog</button>
            <button>About Us</button>
            <button>Download</button>
            <button>Work with Us</button>
          </div>
        </div>

        <div className={styles.partner}>
          <h2>Partner</h2>
          <div className={styles.partner_btn}>
            <button>Sell On Gifting</button>
            <button>Corporate Gifting</button>
            <button>Press</button>
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
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
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
