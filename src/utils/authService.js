import cookie from 'react-cookie'
import { CookieDomain } from '../config'
let cookieConfig = {}
if(CookieDomain !== ''){
  cookieConfig = { domain: CookieDomain }
}

export function saveCookie(name,value) {
  cookie.save(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookie.load(name)
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig)
}

export function signOut() {
  cookie.remove('token', cookieConfig)
}

export function isLogin() {
  return !!cookie.load('token')
}

export function redirectToBack(nextState, replaceState) {
	//已经登录则不进入
  if (isLogin()) {
    replaceState(null, '/')
  }
}
export function redirectToLogin(nextState,replaceState) {
	if (!isLogin()) {
    replaceState(null, '/login')
  }
}