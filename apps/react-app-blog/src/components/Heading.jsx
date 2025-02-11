import styles from '../styles/Heading.module.css'

function Heading({title, description=''}) {
  return (
    <div className={styles.heading}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default Heading;