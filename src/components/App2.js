import React, { useReducer, useEffect } from 'react'
import './App.css'
import Header from './Header'
import Search from './Search'
import Movie from './Movie'

const buildSearchApi = (keyword = 'man') =>
  `https://www.omdbapi.com/?s=${keyword}&page=1&apikey=4a3b711b`

const initState = {
  loading: true,
  movies: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initState)

  useEffect(() => {
    doSearch()
  }, [])

  const doSearch = keyword => {
    fetch(buildSearchApi(keyword))
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonResponse.Search
          })
        } else {
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            error: jsonResponse.Error
          })
        }
      })
  }

  const search = keyword => {
    if (!keyword) {
      dispatch({
        type: 'SEARCH_MOVIES_FAILURE',
        error: 'Please enter search criteria'
      })
      return
    }

    // 搜索中
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST'
    })

    doSearch(keyword)
  }

  const { movies, errorMessage, loading } = state

  return (
    <div className="App">
      <Header text="useReducer" />
      <Search onSearch={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span className="loading">loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  )
}

export default App
