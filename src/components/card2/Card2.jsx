import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";

function Card2({
  game,
  typeClass = "",
  typeClassImage = "",
  typeClassTitle = "",
  typeClassP = "",
}) {
  return (
    <div className={styles[typeClass]}>
      <Link className={styles.linkCard} href={`/game/${game.slug}`}>
        <Image
          className={styles[typeClassImage]}
          src={game.background_image}
          height={220}
          width={480}
          alt={game.name}
        />
        <h4 className={styles[typeClassTitle]}>{game.name}</h4>
      </Link>
      <p className={styles[typeClassP]}>
        Price:{" "}
        {Math.round(game.suggestions_count / 20) < 1
          ? "Free To Play"
          : `${Math.round(game.suggestions_count / 20)}€`}
      </p>
    </div>
  );
}

export default Card2;
