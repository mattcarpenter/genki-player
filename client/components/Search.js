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
          <strong>Search Results</strong><br/>
          <ul>
            {results}
          </ul>
        </div>
      );
    }

    return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={this.submit.bind(this)}>
          <div className="form-group">
            <label htmlFor="query">Search Query</label>
            <input type="text" className="form-control" id="query" onChange={this.handleQueryChange.bind(this)}/>
          </div>
          <button type="button" className="btn btn-default" onClick={this.search.bind(this)}>Search</button>
        </form>
        {resultsContainer}
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: 640
  },
  form: {
    width: '100%'
  },
  results: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    backgroundColor: '#FAFAFA'
  }
}

export default Captions
