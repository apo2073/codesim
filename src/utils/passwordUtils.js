import CryptoJS from 'crypto-js'

export const passwordUtils = {
  calculateCharacterSetSize(password) {
    if (!password) return 0
    
    let size = 0
    const hasLowercase = /[a-z]/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumbers = /[0-9]/.test(password)
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    if (hasLowercase) size += 26
    if (hasUppercase) size += 26
    if (hasNumbers) size += 10
    if (hasSpecialChars) size += 32
    
    return size
  },

  calculateCrackTime(password, characterSetSize) {
    if (!password || characterSetSize === 0) return 0
    
    const attemptsPerSecond = 1000000000
    const totalCombinations = Math.pow(characterSetSize, password.length)
    const averageAttempts = totalCombinations / 2
    
    return averageAttempts / attemptsPerSecond
  },

  generateHash(password, salt = '') {
    if (!password) return ''
    const saltedPassword = password + salt
    return CryptoJS.SHA256(saltedPassword).toString()
  },

  formatTime(seconds) {
    if (seconds === 0) return '즉시'
    if (seconds < 1) return '1초 미만'
    if (seconds < 60) return `${Math.round(seconds)}초`
    if (seconds < 3600) return `${Math.round(seconds / 60)}분`
    if (seconds < 86400) return `${Math.round(seconds / 3600)}시간`
    if (seconds < 31536000) return `${Math.round(seconds / 86400)}일`
    if (seconds < 31536000000) return `${Math.round(seconds / 31536000)}년`
    
    const years = seconds / 31536000
    if (years > 1e12) return `${(years / 1e12).toFixed(1)}조년`
    if (years > 1e9) return `${(years / 1e9).toFixed(1)}십억년`
    if (years > 1e6) return `${(years / 1e6).toFixed(1)}백만년`
    if (years > 1e3) return `${(years / 1e3).toFixed(1)}천년`
    
    return `${Math.round(years)}년`
  }
}
