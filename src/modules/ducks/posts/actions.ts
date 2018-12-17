import { createAction } from '../../utils/createAction'
import { ActionsUnion } from '../../utils/types'
import * as types from './types'

const fetchAllPosts = {
  fetchAllPostsRequest: () => createAction(types.FETCH_ALL_POSTS_REQUEST),
  fetchAllPostsSuccess: (posts: WPPost[]) =>
    createAction(types.FETCH_ALL_POSTS_SUCCESS, { posts }),
  fetchAllPostsFail: (error: string) =>
    createAction(types.FETCH_ALL_POSTS_FAIL, { error })
}

export const Actions = {
  ...fetchAllPosts
}

export type Actions = ActionsUnion<typeof Actions>
