import React from 'react'

class Captions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        Captions
      </div>
    );
  }
}

const styles = {
  container: {
  }
}

export default Captions
