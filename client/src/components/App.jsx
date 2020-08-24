import React from 'react';
import axios from 'axios';
import SearchResult from './SearchResult.jsx';
import ProductModal from './ProductModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount () {
    axios.get('/data')
      .then(({data}) => {
        this.setState({data})
      })
  }

  render () {
    const {data} = this.state;
    console.log(data)
    if (data.length > 0) {
      return (
        <div>
          <form>
            <input type='text' placeholder='Search for product'/>
            <input type='submit' />
          </form>
          <div>
            {data.map((product) => <SearchResult product={product}/>)}
          </div>
        </div>
      )
    } else {
      return (
        <div>Hello</div>
      )
    }
  }
}

export default App;
