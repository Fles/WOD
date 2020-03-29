import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import WodContext from '../components/WodContext'

export default class WodApp extends App {
  state = {
    sequence: [],
  }

  componentDidMount = () => {
    if (localStorage.getItem('wodSequence')) {
      this.setState({
        sequence: JSON.parse(localStorage.getItem('wodSequence')),
      })
    } else {
      localStorage.setItem('wodSequence', JSON.stringify([1, 2, 7, 11]))
      //Router.push('/')
    }
  }

  add = id => {
    if (!this.state.sequence.includes(id)) {
      this.setState({ sequence: [...this.state.sequence, id] })
    } else {
      //Router.push('/')
    }
  }

  remove = id => {
    if (this.state.sequence.includes(id)) {
      this.setState({
        sequence: [...this.state.sequence].filter(function(item) {
          return item !== id
        }),
      })
    } else {
      //Router.push('/')
    }
  }

  clear = () => this.setState({ sequence: [] })

  find = id => this.state.sequence.indexOf(id)

  render() {
    const { Component, pageProps } = this.props
    const { sequence } = this.state
    const { add, remove, clear, find } = this

    return (
      <WodContext.Provider
        value={{
          sequence,
          add,
          remove,
          clear,
          find,
        }}
      >
        <Component {...pageProps} />
      </WodContext.Provider>
    )
  }
}
