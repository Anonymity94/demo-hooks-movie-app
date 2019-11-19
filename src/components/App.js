import React, { useState, useEffect, Fragment } from 'react'
import './App.css'
import Header from './Header'
import Search from './Search'
import Movie from './Movie'

const buildSearchApi = (keyword = 'man') =>
  `https://www.omdbapi.com/?s=${keyword}&apikey=4a3b711b`

const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    doSearch()
  }, [])

  const doSearch = keyword => {
    fetch(buildSearchApi(keyword))
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search)
          setTotalCount(jsonResponse.totalResults)
          setLoading(false)
        } else {
          setErrorMessage(jsonResponse.Error)
          setTotalCount(0)
          setLoading(false)
        }
      })
  }

  const search = keyword => {
    if (!keyword) {
      setErrorMessage('Please enter search criteria')
      return
    }
    setLoading(false)
    setErrorMessage(null)

    doSearch(keyword)
  }

  return (
    <div className="App">
      <Header text="useState" />
      <Search onSearch={search} />
      <div className="moviesWrapper">
        {loading && !errorMessage ? (
          <span className="loading">loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <Fragment>
            <div className="total">Total: {totalCount}</div>
            <div className="movies">
              {movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default App
