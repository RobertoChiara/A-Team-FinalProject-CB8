import React, { useState } from "react";
import Card from "@/components/card";
import { httpGET } from "@/utils/http";
import styles from "../../styles/Store.module.scss";
import Filter from "../../components/filterModal/Filter";
import Pagination from "@/components/pagination";

export const getServerSideProps = async (context) => {
  const searchQuery = context.query.search;
  const page = context.query.page;
  const genresQuery = context.query.genres
    ? `&genres=${context.query.genres}`
    : "";
  const parentPlatformsQuery = context.query.parent_platforms
    ? `&parent_platforms=${context.query.parent_platforms}`
    : "";

  try {
    const data = await httpGET(
      "/games",
      20,
      page || 1,
      "",
      "-rating",
      searchQuery,
      genresQuery,
      parentPlatformsQuery
    );

    return {
      props: {
        games: data,
        page: page || 1,
        searchQuery: searchQuery || null,
        genresQuery,
        parentPlatformsQuery,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function Store({
  games,
  page,
  searchQuery,
  genresQuery,
  parentPlatformsQuery,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
    setIsBlurred(!isBlurred);
  };

  return (
    <div className={styles.store}>
      {showFilter && <Filter onClose={toggleFilter}></Filter>}
      <div className={`${styles.content} ${isBlurred ? styles.blurred : ""}`}>
        <div className={styles.filterSection}>
          <button onClick={toggleFilter} className={styles.filterButton}>
            Filter
          </button>
        </div>
        <div className={styles.cardContainer}>
          {games.results?.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </div>
        <Pagination
          count={games.count}
          prev={games.previous}
          next={games.next}
          page={page}
          searchQuery={searchQuery}
          genresQuery={genresQuery}
          parentPlatformsQuery={parentPlatformsQuery}
        />
      </div>
    </div>
  );
}
