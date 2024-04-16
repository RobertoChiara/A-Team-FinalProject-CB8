import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.scss";

function Card2({
  game,
  typeClass,
  typeClassTitle,
  typeClassImage,
  typeClassP,
}) {
  return (
    <div className={styles[typeClass]}>
      <Link href={`/game/${game.slug}`}>
        <h4 className={styles[typeClassTitle]}>{game.name}</h4>
        <Image
          className={styles[typeClassImage]}
          src={game.background_image}
          height={200}
          width={300}
          alt={game.name}
        />
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
