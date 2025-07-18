<template>
    <div class="password-analyzer">
      <div class="container">
        <h1 class="crack-time" :class="securityClass">{{ crackTimeDisplay }}</h1>
        
        <div class="security-status" :class="securityClass">
          <div class="security-badge">
            <span class="security-level">{{ securityLevel }}</span>
            <span class="security-description">{{ securityDescription }}</span>
          </div>
        </div>
        
        <div class="input-section">
          <input 
            v-model="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            class="password-input"
            :class="securityClass"
          />
          <input 
            v-model="salt"
            type="text"
            placeholder="Salt"
            class="salt-input"
            disabled="true"
          />
        </div>
        
        <h3 class="hash-display">
          SHA256: {{ hashedPassword }}
        </h3>
        
        <div class="password-info">
          <p><strong>문자 집합 크기:</strong> {{ characterSetSize }}</p>
          <p><strong>비밀번호 길이:</strong> {{ password.length }}</p>
          <p><strong>가능한 조합 수:</strong> {{ totalCombinations }}</p>
          <p><strong>보안 등급:</strong> <span :class="securityClass">{{ securityLevel }}</span></p>
        </div>
        
        <div class="info-section">
          <button @click="showModal = true" class="info-button">
            비밀번호 조합별 보안 등급 보기
          </button>
        </div>
      </div>
      
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>자료</h2>
            <button @click="closeModal" class="close-button">×</button>
          </div>
          <div class="modal-body">
            <p>테스트용 모달</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { passwordUtils } from '../utils/passwordUtils.js'
//   import '../styles/PasswordAnalyzer.css'
  
  export default {
    name: 'PasswordAnalyzer',
    data() {
      return {
        password: '',
        salt: '',
        showModal: false
      }
    },
    computed: {
      characterSetSize() {
        return passwordUtils.calculateCharacterSetSize(this.password)
      },
      
      crackTime() {
        return passwordUtils.calculateCrackTime(this.password, this.characterSetSize)
      },
      
      crackTimeDisplay() {
        if (!this.password) {
          return '비밀번호를 입력하세요'
        }
        return passwordUtils.formatTime(this.crackTime)
      },
      
      totalCombinations() {
        if (!this.password) return 0
        return Math.pow(this.characterSetSize, this.password.length)
      },
      
      hashedPassword() {
        return passwordUtils.generateHash(this.password, this.salt)
      },
      
      securityLevel() {
        if (!this.password) return '없음'
        
        const seconds = this.crackTime
        
        if (seconds < 1) return '매우 취약'
        if (seconds < 3600) return '취약'
        if (seconds < 86400) return '약함'
        if (seconds < 2592000) return '보통'
        if (seconds < 31536000) return '안전'
        if (seconds < 3153600000) return '매우 안전'
        return '극도로 안전'
      },
      
      securityDescription() {
        if (!this.password) return '비밀번호를 입력해주세요'
        
        const seconds = this.crackTime
        
        if (seconds < 1) return '즉시 크래킹 가능'
        if (seconds < 3600) return '1시간 이내 크래킹 가능'
        if (seconds < 86400) return '하루 이내 크래킹 가능'
        if (seconds < 2592000) return '한 달 이내 크래킹 가능'
        if (seconds < 31536000) return '1년 이내 크래킹 가능'
        if (seconds < 3153600000) return '100년 이상 소요'
        return '사실상 크래킹 불가능'
      },
      
      securityClass() {
        if (!this.password) return 'security-none'
        
        const seconds = this.crackTime
        
        if (seconds < 1) return 'security-critical'
        if (seconds < 3600) return 'security-danger'
        if (seconds < 86400) return 'security-warning'
        if (seconds < 2592000) return 'security-moderate'
        if (seconds < 31536000) return 'security-good'
        if (seconds < 3153600000) return 'security-excellent'
        return 'security-perfect'
      }
    },
    methods: {
      closeModal() {
        this.showModal = false
      }
    }
  }
  </script>
  