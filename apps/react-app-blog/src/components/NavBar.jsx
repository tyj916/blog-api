import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(path => path);
  let path = '';

  return (
    <nav>
      <Link to='/'>Home</Link>
      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length -1;
        path += `/${name}`;

        return (
          <>
            <span> &gt; </span>
            {isLast 
              ? <span>{name}</span>
              : <Link to={path}>{name}</Link>
            }
          </>
        )
      })}
    </nav>
  );
}

export default NavBar;