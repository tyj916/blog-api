import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer>
      <p className={styles.copyright}>
        &copy; 2025 <a href="https://github.com/tyj916">tyj916</a>
      </p>
    </footer>
  );
}

export default Footer;