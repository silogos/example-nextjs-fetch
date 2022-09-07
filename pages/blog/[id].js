import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Prism from "prismjs";
import { getPostById, getPostIds } from "../../helper/helper";
import styles from "../../styles/Blog.module.scss";
import "prismjs";
import "prism-themes/themes/prism-vsc-dark-plus.css";
import markdownToHtml from "../../helper/markdownToHtml";

export default function Home({ post }) {
  const { isFallback } = useRouter();

  return (
    <>
      <Head>
        <title>Blog Static Props</title>
      </Head>

      {isFallback ? (
        <span>Loading</span>
      ) : (
        <article key={`${post.post_id}`} className={styles.article}>
          <div className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.info}>
              <time className={styles.time} dateTime={post.created_at}>
                {new Date(post.created_at).toDateString()}
              </time>
              <Link href={`/blog?category=${post.tag}`}>
                <a className={`button-tag ${post.tag}`}>{post.tag_name}</a>
              </Link>
            </div>
          </div>
          <hr></hr>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const postIds = await getPostIds();
  const paths = postIds.map(({ post_id }) => ({
    params: {
      id: post_id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostById(params.id);
  if (!post) {
    return {
      notFound: true,
    };
  }

  if (post.content) {
    post.content = markdownToHtml(post.content);
  }

  return {
    props: { post },
    revalidate: 60,
  };
}
