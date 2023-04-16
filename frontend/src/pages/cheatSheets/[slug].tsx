import { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostBySlug } from "../api/cheatSheets/getMdFiles";
import markdownToHtml from "../api/cheatSheets/markdownToHtml";
import styled from 'styled-components'
import Header from "@/components/common/organisms/header";
import TemporaryDrawer from "@/components/cheetSheetsPage/organisms/sidebar";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const ContentArea = styled.div`
  display: flex;
  height: 100vh;
`
const PostsArea = styled.div`
  display: flex;
  height: 100vh;
  margin-left: 150px
`

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug"]);
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
  const posts = getAllPosts(["slug"]);
  // Markdown を HTML に変換する
  const tmpContent = await markdownToHtml(post.content);
  
  // 枠線と改行を追記する
  const addCustomReplaces = tmpContent.replace(/<table>/g, '<table border="1">').replace(/-br-/g, '<br>');
  const content = addCustomReplaces;

  // content を詰め直して返す
  return {
    props: {
      posts,
      post: {
        ...post,
        content,
      },
    },
  };
};

const Post: NextPage<Props> = ({posts, post }) => {

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <main>
      <ContentArea>
        <TemporaryDrawer data={posts}/>
        <PostsArea>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostsArea>
      </ContentArea>
      </main>
    </div>
  );
};

export default Post;
