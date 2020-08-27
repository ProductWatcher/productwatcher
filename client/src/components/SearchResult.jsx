import React from 'react';
import styles from '../styles/SearchResult.css';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product
    }
  }
  render() {
    console.log(product)
    const { product } = this.state;
    return (
      <div className={styles.Product}>
        <div className={styles.upperSide}>
          <img className={styles.image} src={product.img}/>
        </div>
        <div className={`${styles.lowerSide} ${styles.productDetail}`}>
          <div>{product.product_name}</div>
          <div>{product.product_id}</div>
        </div>
      </div>
    )
  }
};

export default SearchResult;
