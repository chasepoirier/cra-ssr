import * as types from './types'

export const Actions = {
  toggleContactForm: toggle => ({
    type: types.TOGGLE_CONTACT_FORM,
    payload: { toggle }
  }),
  toggleMobileNav: toggle => ({
    type: types.TOGGLE_MOBILE_MENU,
    payload: { toggle }
  })
}
