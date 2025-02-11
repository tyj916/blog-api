import PropTypes from 'prop-types';
import styles from '../styles/Heading.module.css'

function Heading({title, description=''}) {
  return (
    <div className={styles.heading}>
      <div className={styles.container}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

Heading.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default Heading;