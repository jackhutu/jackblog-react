export const API_ROOT = (process.env.NODE_ENV === 'production')
  ? 'https://api.jackhu.top/'
  :'https://api.jackhu.top/'

export const CookieDomain = (process.env.NODE_ENV === 'production')
  ? '.jackhu.top'
  : ''