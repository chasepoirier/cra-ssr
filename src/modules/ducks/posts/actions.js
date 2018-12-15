import * as types from './types'

export const Actions = {
  fetchAllPostsRequest: () => ({ type: types.FETCH_ALL_POSTS_REQUEST }),
  fetchAllPostsSuccess: posts => ({
    type: types.FETCH_ALL_POSTS_SUCCESS,
    payload: { posts }
  }),
  fetchAllPostsFail: error => ({
    type: types.FETCH_ALL_POSTS_FAIL,
    payload: { error }
  })
}
