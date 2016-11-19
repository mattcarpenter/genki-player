import React from 'react'

class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progressWidth: 0,
      progressPosition: 0
    };
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.time !== this.props.time) {
      var constrainedCurrentTime = this.props.time > this.props.duration ? this.props.duration : this.props.time;
      this.setState({ progressPosition: constrainedCurrentTime * this.props.width / this.props.duration });
    }
  }

  containsSearchTerms(caption) {
    var found = false;
    return false;
    (caption.inverted || '').split(' ').forEach((word) => {
      (this.props.searchTerms || []).forEach((term) => {
        if (term === word) {
          found = true;
        }
      });
    });

    return found;
  }

  render() {
    var segments = [];

    // build segments
    if (this.props.phrases && this.props.duration) { 
      this.props.phrases.forEach((phrase, index) => {
        // For this phrase, calculate the earliest start and latest end time of all words
        let start = Math.min.apply(null, phrase.words.map((w) => w.start));
        let end = Math.max.apply(null, phrase.words.map((w) => w.end));

        let left = start * this.props.width / this.props.duration;
        let right = (end * this.props.width / this.props.duration) + 1;

        segments.push(
          <div
            onClick={()=>this.props.onSeek(start)}
            key={index}
            style={{ ...styles.segment, left: left, width: right-left, backgroundColor: this.containsSearchTerms(phrase) ? '#efeab1' : '#F0F0F0' }}
            className="transport-segment">
          </div>
        );
      });
    }

    // return transport container with segments and position indicator
    return (
      <div style={{ ...styles.container, width: this.props.width }}>
        {segments}
        <div style={{ ...styles.progress, left: this.state.progressPosition }}></div>
      </div>
    );
  }
}

const styles = {
  container: {
    borderWidth: 1.0,
    borderStyle: 'solid',
    borderColor: '#A0A0A0',
    height: 40,
    marginBottom: 15,
    position: 'relative'
  },
  progress: {
    height: '38px',
    top: 0,
    backgroundColor: '#00FF00',
    width: '1px',
    position: 'absolute'
  },
  segment: {
    height: '38px',
    position: 'absolute',
    top: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderStyle: 'solid',
    borderColor: '#D9D9D9'
  }
};

export default Transport
