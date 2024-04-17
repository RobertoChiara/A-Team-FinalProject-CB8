import { useEffect, useState } from "react";
import withAuth from "./../../components/withAuth/WithAuth";
import Card2 from "../../components/card2/Card2";
import styles from "../../styles/Library.module.scss";

function Library() {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      const username = localStorage.getItem("username");
      const res = await fetch(`/api/library?username=${username}`);
      if (res.ok) {
        const data = await res.json();
        setLibrary(data.library);
      } else {
        console.error(`Error: ${res.status}`);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div>
      <h2 className={styles.lib__title}>List of your own games</h2>
      <div className={styles.main__Container}>
        {library && library.length > 0 ? (
          library.map((game) => {
            return (
              <Card2
                game={game}
                key={game.slug}
                typeClass="lib__Card"
                typeClassTitle="lib__CardTitle"
                typeClassImage="lib__CardImage"
                typeClassP="lib__CardP"
              />
            );
          })
        ) : (
          <p>No games in library.</p>
        )}
      </div>
    </div>
  );
}

export default withAuth(Library);
