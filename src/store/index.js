const KEY = 'toutiao-hm'

export default {
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  setUser (userInfo) {
    window.sessionStorage.setItem(KEY, JSON.stringify(userInfo))
  },
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
