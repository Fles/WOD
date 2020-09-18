import React from 'react'
import App from 'next/app'
import PersistentDrawerLeft from '../components/WodPersistentDrawerLeft'
import WodContext from '../components/WodContext'
import Layout from '../components/Layout'
import shuffle from '../tools/shuffle'
import LoginForm from '../components/LoginForm'
export default class WodApp extends App {
  state = {
    sequence: [],
    a0: false,
  }

  componentDidMount = () => {
    if (localStorage.getItem('wodSequence')) {
      this.setState({
        sequence: JSON.parse(localStorage.getItem('wodSequence')),
      })
    } else {
      localStorage.clear()
      localStorage.setItem(
        'wodSequence',
        JSON.stringify([
          1,
          4,
          7,
          10,
          28,
          13,
          16,
          22,
          19,
          25,
          2,
          5,
          8,
          11,
          29,
          14,
          17,
          23,
          20,
          26,
          3,
          6,
          9,
          12,
          30,
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

  shuffle = () => this.setState({ sequence: [...shuffle(this.state.sequence)] })

  render() {
    const { Component, pageProps } = this.props
    const { sequence } = this.state
    const { add, remove, clear, find, shuffle } = this

    return (
      <Layout>
        {this.state.a0 ? (
          <WodContext.Provider
            value={{
              sequence,
              add,
              remove,
              clear,
              find,
              shuffle,
            }}
          >
            <PersistentDrawerLeft>
              <Component {...pageProps} />
            </PersistentDrawerLeft>
          </WodContext.Provider>
        ) : (
          <LoginForm
            smit={data => {
              if (data === 'NnIi') {
                this.setState({
                  a0: true,
                })
              }
            }}
          />
        )}
      </Layout>
    )
  }
}
