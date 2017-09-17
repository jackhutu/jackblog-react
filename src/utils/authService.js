import Cookies from 'universal-cookie'
const cookie = new Cookies()
import { CookieDomain } from '../config'
let cookieConfig = {}
if(CookieDomain !== ''){
  cookieConfig = { domain: CookieDomain }
}

export function saveCookie(name,value) {
  cookie.set(name, value, cookieConfig)
}

export function getCookie(name) {
  return cookie.get(name)
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig)
}

export function signOut() {
  cookie.remove('token', cookieConfig)
}

export function isLogin() {
  return !!cookie.get('token')
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