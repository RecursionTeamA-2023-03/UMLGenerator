import type { InferGetStaticPropsType, NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { getAllPosts } from "../api/cheatSheets/getMdFiles";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["slug", "title", "date", "tags"]);
  return {
    props: { allPosts },
  };
};

const CheatSheets: NextPage<Props> = ({ allPosts }) => {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>記事一覧</h1>

        <div className={styles.grid}>
          {allPosts.map((post) => (
            <a href={`/cheatSheets/${post.slug}`} className={styles.card} key={post.slug}>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CheatSheets;
