import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <header>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href={"./"}>Home</Link>
          </li>
          <li>
            <Link href={"/blog"}>Blog</Link>
          </li>
          <li>
            <Link href={"/about-us"}>About Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
