import { combineReducers } from 'redux'
import * as types from './types'

const initialState = {
  allPosts: {
    error: null,
    loading: true,
    data: []
  }
}

const allPosts = (state = initialState.allPosts, action) => {
  switch (action.type) {
    case types.FETCH_ALL_POSTS_REQUEST:
      return { error: null, loading: true, data: [] }
    case types.FETCH_ALL_POSTS_SUCCESS:
      return { ...state, loading: false, data: action.payload.posts }
    case types.FETCH_ALL_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload.error }
    default: {
      return state
    }
  }
}

export default combineReducers({ allPosts })
