import { useState, useEffect } from "react"; // Aggiunto per la modale
import Head from "next/head";
import Carousel from "@/components/carousel";
import SectionList from "@/components/sectionList";
import { httpGET } from "@/utils/http";
import { gameListData } from "@/mocks/gameListData";
import styles from "../styles/Home.module.scss";

// --- Componente Modale Disclaimer ---
const ProjectDisclaimer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostra la modale solo se non è stata già accettata in questa sessione
    const accepted = sessionStorage.getItem("novaGames_disclaimer");
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("novaGames_disclaimer", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>🎮 Nota Informativa</h2>
        <p>
          Questo sito è un <strong>progetto didattico</strong> realizzato
          durante il Bootcamp CB8. Tutti i contenuti, i loghi e i prezzi sono a
          scopo illustrativo.
          <strong> Non è uno shop reale</strong>: non è possibile effettuare
          acquisti né pagamenti. <br />
          This is an <strong>educational project</strong> created for Bootcamp
          CB8. All content is for illustrative purposes only.
          <strong> This is not a real store</strong>: no purchases can be made.
        </p>
        <button onClick={handleAccept} className={styles.modalBtn}>
          Ho capito, entra nel sito
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const randomPageCarousel = Math.floor(Math.random() * 10);
    const [suggested, all_time, best_year, best_previous_year] =
      await Promise.all([
        httpGET("/games", 5, randomPageCarousel),
        ...gameListData.map((item) =>
          httpGET("/games", 20, 1, item.date, item.order),
        ),
      ]);

    return {
      props: {
        data: {
          suggested,
          all_time,
          best_year,
          best_previous_year,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>NovaGames</title>
        <meta name="description" content="Web Project Bootcamp CB8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Inseriamo la modale qui */}
      <ProjectDisclaimer />

      <Carousel data={data.suggested?.results} />
      <section className={styles.sectionLists}>
        {gameListData.map((item, idx) => (
          <SectionList
            key={idx}
            data={data[item.slug]?.results}
            title={item.name}
            cardRectangular={item.cardRectangular}
          />
        ))}
      </section>
    </>
  );
}
