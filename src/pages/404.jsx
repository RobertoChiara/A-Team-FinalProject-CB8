import Image from "next/image";
import Link from "next/link";
import styles from "../styles/404.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page_404}>
      <h1>404</h1>
      <h3>Pagina non trovata</h3>

      <Image
        className={404}
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=740&t=st=1712423811~exp=1712424411~hmac=2d482c479f59dbabd95d462aab4c98d0a535e9bfe29f8745491cec4ca1806c99"
        alt="404"
        height={600}
        width={1000}
        priority={true}
      />

      <Link href={"/"}>
        <button className={styles.button}> HomePage</button>
      </Link>
    </div>
  );
}
