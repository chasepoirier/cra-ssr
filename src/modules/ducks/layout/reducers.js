import { combineReducers } from 'redux'
import * as types from './types'

const initialState = {
  contact: {
    active: false
  },
  mobile: {
    menu: {
      active: false
    }
  }
}

const contact = (state = initialState.contact, action) => {
  switch (action.type) {
    case types.TOGGLE_CONTACT_FORM:
      return { ...state, active: action.payload.toggle }
    default: {
      return state
    }
  }
}

const mobile = (state = initialState.mobile, action) => {
  switch (action.type) {
    case types.TOGGLE_MOBILE_MENU:
      return {
        ...state,
        menu: { ...state.menu, active: action.payload.toggle }
      }
    default: {
      return state
    }
  }
}

export default combineReducers({ contact, mobile })
