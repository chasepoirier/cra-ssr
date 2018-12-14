import * as types from './types'

export const Actions = {
  toggleContactForm: toggle => (types.TOGGLE_CONTACT_FORM, { toggle }),
  toggleMobileNav: toggle => (types.TOGGLE_MOBILE_MENU, { toggle })
}
