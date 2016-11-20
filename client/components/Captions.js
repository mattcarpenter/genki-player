import React from 'react'

class Captions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      caption: '',
      phrase: {},
      word: ''
    };
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    
  }

  shouldComponentUpdate() {
    let shouldUpdate = false;
    let shouldDisplayCaption = false;

    // Determine phrase for time
    (this.props.phrases || []).forEach((phrase) => {
        let start = Math.min.apply(null, phrase.words.map((w) => w.start));
        let end = Math.max.apply(null, phrase.words.map((w) => w.end));

        if (this.props.time >= start && this.props.time < end) {
          shouldDisplayCaption = true;
          // current time is within this phrase
          if (phrase !== this.state.phrase) {
            // new phrase isn't currently being displayed.
            this.setState({ phrase: phrase });
            shouldUpdate = true;
          }
        }

        // What word is currently being spoken?
        phrase.words.forEach((word) => {
          if (this.props.time >= word.start && this.props.time <= word.end) {
            // this word is currently being spoken. is a re-render required?
            if (this.state.word !== word.inverted) {
              this.setState({ word: word.inverted });
              shouldUpdate = true;
            }
          }
        });
    });

    if (!shouldDisplayCaption && Object.keys(this.state.phrase).length) {
      this.setState({ phrase: {} });
      shouldUpdate = true;
    }

    return shouldUpdate;
  }

  render() {
    // build components
    var words = [];

    (this.state.phrase.words || []).forEach((word, index) => {
      let color = word.inverted === this.state.word ? '#F00' : 'inherit';

      words.push(
        <div
          key={index}
          style={{ ...styles.word, color: color }}
        >
          {word.inverted}
        </div>
      );
    });

    return (
      <div
        style={{ ...styles.container, width: this.props.width }} >
        {words}
      </div>
    );
  }
}

const styles = {
  container: {
    fontSize: '30px',
    color: '#333',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  word: {}
}

export default Captions
