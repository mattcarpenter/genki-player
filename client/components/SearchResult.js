import React from 'react'
import { Link } from 'react-router'

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <li style={styles.container}>
        <Link to={'/recording/' + this.props.recording._id + (this.props.words !== ',' ? '?words=' + this.props.words : '') } >
          {this.props.recording.name}
        </Link>
      </li>
    );
  }
}

const styles = {
  container: {
    padding: 5
  }
};


export default SearchResult
