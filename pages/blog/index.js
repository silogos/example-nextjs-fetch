import Head from "next/head";
import Link from "next/link";
import { getPosts } from "../../helper/helper";
import styles from "../../styles/Blog.module.scss";

export default function Home({ posts = [] }) {
  return (
    <>
      <Head>
        <title>Blog Static Props</title>
      </Head>

      {posts.map((post) => (
        <article key={`${post.post_id}`} className={styles.article}>
          <div className={styles.header}>
            <Link href={`/blog/${post.post_id}`}>
              <a>
                <h1 className={styles.title}>{post.title}</h1>
              </a>
            </Link>
            <div className={styles.info}>
              <time className={styles.time} dateTime={post.created_at}>
                {new Date(post.created_at).toDateString()}
              </time>
              <Link href={`/blog?category=${post.tag}`}>
                <a className={`button-tag ${post.tag}`}>{post.tag_name}</a>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      posts: await getPosts(),
    },
  };
}
