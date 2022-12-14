import Head from "next/head";
import Link from "next/link";
import { getCategories } from "../helper/helper";
import styles from "../styles/Home.module.css";

export default function Home({ categories }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Welcome to Sharing Session</h1>
      <h2>Data fetching Strategy NextJs with Amin Yusuf</h2>

      <article>
        <ul className={styles.categoryList}>
          {categories.map((category) => (
            <li key={category.tag_id}>
              <Link href={`/blog?category=${category.tag_id}`}>
                <a className={`button-tag ${category.tag_id}`}>
                  {category.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      categories: await getCategories(),
    },
  };
}
