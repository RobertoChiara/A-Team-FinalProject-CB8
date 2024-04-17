import React from "react";
import Image from "next/image";
import styles from "../../styles/Construction.module.scss";
import Link from "next/link";

export default function Construction() {
  return (
    <div className={styles.container}>
      <Image
        src="https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Aefbbee02-5bb4-11e3-a2ba-00144feabdc0?source=next-article&fit=scale-down&quality=highest&width=700&dpr=2"
        alt="Under construction image"
        width={1000}
        height={600}
      />
      <h1 className={styles.title}>Under Construction</h1>
      <p className={styles.message}>
        We are working hard to finish the development of this site. Sign up for
        updates using the link below!
      </p>
      <Link href="/contacts">Here</Link>
    </div>
  );
}
