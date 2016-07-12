import { 
  CHANGE_STYLE_MODE,
  GET_INDEX_IMG_SUCCESS,
  GET_INDEX_IMG_FAILURE,
  GET_CAPTCHAURL
} from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'
import img from '../assets/images/shanghai.jpg'
import { API_ROOT } from '../config'
import { getCookie,saveCookie } from '../utils/authService'

export default createReducer(fromJS({
  indexImg:'',
  styleMode: getCookie('styleMode') || 'day-mode',
  captchaUrl: API_ROOT + 'users/getCaptcha?'
}), {
  [CHANGE_STYLE_MODE]: (state, action) => {
    let styleMode = state.get('styleMode') === 'day-mode'?'night-mode':'day-mode'
    saveCookie('styleMode', styleMode)
    return state.set('styleMode',styleMode)
  },
  [GET_CAPTCHAURL]: (state, action) => state.set('captchaUrl',action.captchaUrl),
  [GET_INDEX_IMG_SUCCESS]: (state, {json}) => state.set('indexImg',json.img),
  [GET_INDEX_IMG_FAILURE]: (state, {json}) => state.set('indexImg',img)
})