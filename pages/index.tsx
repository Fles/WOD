import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import fetch from 'isomorphic-unfetch'

const Index = ({ exercises }) => (
  <div>
    <h1>Exercises</h1>
    <ul>
      {exercises.map(({ name }) => {
        return <div key={name}>{name}</div>
      })}
    </ul>
  </div>
)

Index.getInitialProps = async function() {
  //const res = await fetch('https://api.')
  //const data = await res.json()
  const exe = await require('../static/data.json')
  return {
    exercises: exe.map(entry => entry),
  }
}

export default Index
