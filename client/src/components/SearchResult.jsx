import React from 'react';

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
      <div className='search-result'>
        <div>
          <div>{product.product_name}</div>
          <div>{product.product_id}</div>
        </div>
        <div>
          <img src={product.img}/>
        </div>
      </div>
    )
  }
};

export default SearchResult;
