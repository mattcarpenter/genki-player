import React from 'react'
import { Link, browserHistory } from 'react-router'

export default function AppContainer({ children }) {
  return (
    <div className="container" style={styles.container}>
      <header style={styles.header}>
        <h1>=＾● ⋏ ●＾=</h1>
        <Link to="/">Home</Link>
      </header>
      {children}
    </div>
  )
}

const styles = {
  header: {
    marginBottom: 40,
    textAlign: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

//  onClick={() => browserHistory.push('/foo')}