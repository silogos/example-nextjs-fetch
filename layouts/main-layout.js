import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import styles from "../styles/Home.module.css";

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
