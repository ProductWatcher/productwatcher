import React from 'react';
import axios from 'axios';
import SearchResult from './SearchResult.jsx';
import ProductModal from './ProductModal.jsx';
import styles from '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchTerm: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }
  
  componentDidMount() {
    axios.get('/products', { params: { name: '' } }).then(({ data }) => {
      this.setState({ data });
    });
  }

  onChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  onSubmitHandler() {
    event.preventDefault();
    console.log('searchTerm:', this.state.searchTerm);
    axios
      .get('/products', { params: { name: this.state.searchTerm } })
      .then(({ data }) => {
        this.setState({ data });
      });
  }

  render() {
    const { data } = this.state;
    let results;
    if (data.length > 0) {
      results = (
        <div className={styles.searchResult}>
          <div className={styles.productEntries}>
            {data.map((product, index) => {
              if (index < 10) {
                return <SearchResult product={product} />;
              }
            })}
          </div>
        </div>
      );
    }

    return (
      <div className={styles.app}>
        <form onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            placeholder="Search for product"
            onChange={this.onChangeHandler}
          />
          <input type="submit" value="Search" />
        </form>
        {results}
      </div>
    );
  }
}

export default App;
