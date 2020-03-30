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
      localStorage.setItem(
        'wodSequence',
        JSON.stringify([
          1,
          4,
          7,
          10,
          13,
          16,
          22,
          19,
          25,
          2,
          5,
          8,
          11,
          14,
          17,
          23,
          20,
          26,
          3,
          6,
          9,
          12,
          15,
          18,
          24,
          21,
          27,
        ])
      )
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
