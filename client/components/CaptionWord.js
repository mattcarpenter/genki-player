import React from 'react'

class Captions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    var style = { ...styles.container };
    if (this.props.word.particle) {
      style.backgroundColor = styles.particleBackgroundColor;
    } else {
      style.backgroundColor = styles.defaultbackgroundColor;
    }

    return (
      <div style={style}>
        {this.props.word.word}
      </div>
    );
  }
}

const styles = {
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#D0D0D0',
    padding: 5,
    whiteSpace: 'nowrap',
    margin: 2
  },
  particleBackgroundColor: '#E0E0E0',
  defaultbackgroundColor: '#FAFAFA',
  latchedBorderColor: '#FF0000',
  defaultBorderColor: '#D0D0D0'
};

export default Captions
