export const FETCH_ALL_POSTS_REQUEST = '@@posts/FETCH_ALL_POSTS_REQUEST'
export const FETCH_ALL_POSTS_FAIL = '@@posts/FETCH_ALL_POSTS_FAIL'
export const FETCH_ALL_POSTS_SUCCESS = '@@posts/FETCH_ALL_POSTS_SUCCESS'

export interface PostState {
  allPosts: {
    error: string | null
    loading: boolean
    data: WPPost[]
  }
}
