import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { getAllPosts, getPostBySlug } from "../api/cheatSheets/getMdFiles";
import markdownToHtml from "../api/cheatSheets/markdownToHtml";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);
  console.log(posts)
  return {
    paths: posts.map((post:any) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

/**
 * 記事の内容を取得する
 */
export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug, ["slug", "title", "date", "content"]);

  // Markdown を HTML に変換する
  const content = await markdownToHtml(post.content);
  console.log(content);
  // content を詰め直して返す
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

const Post: NextPage<Props> = ({ post }) => {
  console.log(post);
  const router = useRouter();
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <article>
          {/* <h1 className={styles.title}>{post.title}</h1> */}
          <div className={styles.grid}>
            <div>
              {/* <p>{post.date}</p> */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </article>
      </main>
      <footer className={styles.footer}>
        <p>Powered by Next.js.</p>
      </footer>
    </div>
  );
};

export default Post;
