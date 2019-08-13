const KEY = 'toutiao-hm'

export default {
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  setUser (userInfo) {
    const user = this.getUser()
    window.sessionStorage.setItem(KEY, JSON.stringify({ ...user, ...userInfo }))
  },
  removeUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
