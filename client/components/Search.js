import React from 'react'
import SearchResult from './SearchResult'

class Captions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: []
    };
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchResults != this.props.searchResults) {
      // Update results
      this.setState({ results: (this.props.searchResults || []) });
    }
  }

  search() {
    this.props.onSearch(this.state.query);
  }

  handleQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  submit(event) {
    event.preventDefault();
    this.search();
  }

  render() {
    // compose search results
    var results = [];
    var resultsContainer = [];

    var words = (this.state.query || '').split(' ').join(',');

    this.state.results.forEach((result, index) => {
      results.push(
        <SearchResult
          key={index}
          recording={result}
          words={words}
        />
      );
    });

    if (results.length > 0) {
      resultsContainer.push(
        <div key="0" style={styles.results}>
          <h5>Search Results</h5>
          <ul>
            {results}
          </ul>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <form className="form-horizontal" style={styles.form} onSubmit={this.submit.bind(this)}>
          <div style={styles.left}>
            <input type="text" style={styles.input} className="form-control" id="query" onChange={this.handleQueryChange.bind(this)}/>
          </div>
          <div style={styles.right}>
            <button style={styles.button} type="button" className="btn btn-default" onClick={this.search.bind(this)}>Search</button>
          </div>
        </form>
        {resultsContainer}
      </div>
    );
  }
}

const styles = {
  left: {
    flexGrow: 1,
    marginRight: 5
  },
  input: {
  },
  container: {
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  results: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    borderStyle: 'solid'
  }
}

export default Captions
