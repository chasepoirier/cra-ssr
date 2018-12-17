import api from '../../api'
import { Actions } from './actions'
import { Dispatch } from 'redux'

export const fetchAllPostsRequest = () => Actions.fetchAllPostsRequest()
export const fetchAllPostsFail = error => Actions.fetchAllPostsFail(error)
export const fetchAllPostsSuccess = posts => Actions.fetchAllPostsSuccess(posts)

export const fetchAllPosts = () => async (dispatch: Dispatch) => {
  try {
    dispatch(Actions.fetchAllPostsRequest())
    const posts = await api.wp.getAllPosts()
    dispatch(Actions.fetchAllPostsSuccess(posts))
    return posts
  } catch (error) {
    dispatch(Actions.fetchAllPostsFail(error))
    return error
  }
}
