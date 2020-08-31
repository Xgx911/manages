<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="80px"
  >
    <el-form-item prop="username" label="用户：">
      <el-input
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="请输入用户名"
        size="medium"
        @keyup.enter.native="submitForm('loginForm')"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码：">
      <el-input
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="请输入密码"
        size="medium"
      >
        <i
          class="el-icon-view el-input__icon"
          slot="suffix"
          @click="showPassword"
        ></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-row :span="24">
        <el-col :span="12">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="请输入验证码"
            size=""
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <div class="login-code" @click="refreshCode">
            <!--验证码组件-->
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm('loginForm')"
        class="login-submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import SIdentify from '@/components/Sidentify';
export default {
  name: 'userLogin',
  components: { SIdentify },
  data () {
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        this.loginForm.code = '';
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      isDebugLogin: false,
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      identifyCodes: '1234567890qwertyuiop',
      identifyCode: '',
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 1, max: 200, message: '长度在1-200字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在1-100字符之间', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ]
      },
      passwordType: 'password'
    }
  },
  watch: {
    isDebugLogin (v) {
      if (v) {
        this.loginForm.password = '123';
        this.refreshCode()
      }
    },
    identifyCode (v) {
      this.isDebugLogin && (this.loginForm.code = v)
    }
  },
  methods: {
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4)
      console.log(this.identifyCode)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },
    showPassword () {
      this.passwordType === ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('授权成功')
        } else {
          return false
        }
      })
    }
  },
  created () {
    this.refreshCode()
  }
}
</script>

<style>
.login-form .el-input__inner {
  height: 40px;
  line-height: 40px;
}
.login-form .el-form-item__label {
  line-height: 40px;
}
.login-submit.el-button {
  padding: 12px 20px;
}
</style>
<style lang="scss" scoped>
.login-form {
  padding: 10px 0;
  .el-form-item + .el-form-item {
    margin-top: 30px;
  }
  .login-code {
    cursor: pointer;
    .login-code-img {
      width: 100px;
      height: 38px;
      background-color: #eee;
      border: 1px solid #f0f0f0;
      color: #333;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 2px;
      text-indent: 2px;
      text-align: center;
    }
  }
  .login-submit {
    width: 100%;
    border: 0;
  }
}
</style>
