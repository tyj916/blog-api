import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAuthorName } from '../utils';
import styles from '../styles/Heading.module.css';

function Heading({title, description='', author=null, time=''}) {
  const authorName = author ? getAuthorName(author) : '';
  return (
    <div className={styles.heading}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p>{description}</p>}
        {authorName && <Link to={author.username}>{authorName}</Link>}
        {time && <p>{time}</p>}
      </div>
    </div>
  );
}

Heading.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.object,
  time: PropTypes.string,
}

export default Heading;