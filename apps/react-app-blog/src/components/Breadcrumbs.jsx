import { Link, useLocation } from "react-router-dom";
import styles from '../styles/Breadcrumbs.module.css';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(path => path);
  let path = '';

  return (
    <nav className={styles.breadcrumbs}>
      <div className={styles.container}>
        <Link to='/'>Home</Link>
        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length -1;
          const excludedPaths = ['profile'];
          path += `/${name}`;

          return (
            <span key={name}>
              <span> &gt; </span>
              {isLast || excludedPaths.includes(name)
                ? <span>{name}</span>
                : <Link to={path}>{name}</Link>
              }
            </span>
          )
        })}
      </div>
    </nav>
  );
}

export default Breadcrumbs;