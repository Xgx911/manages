import { Message } from 'element-ui'
import axios from 'axios'

axios.defaults.timeout = 60000
axios.defaults.baseURL = process.env.NODE_ENV == 'production' ? 'xxxxx' : 'xxxxxx'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Authorization ' + token
  }
}, error => {
  return Promise.reject(error)
}
)

axios.interceptors.response.use(res => {
  switch (res.status) {

  }
}, error => {
  switch (error.status) {
    case 403:
      Message({
        message: '登陆过期',
        type: 'error',
        onClose () {
          window.location.href = '/'
        }
      })
  }
  return Promise.reject(error)
})

export default axios

// {
//   "x": 0,
//   "y": 1,
//   "w": 1,
//   "h": 1,
//   "i": "1"
// },
// {
//   "x": 0,
//   "y": 2,
//   "w": 1,
//   "h": 1,
//   "i": "2"
// },
// {
//   "x": 0,
//   "y": 3,
//   "w": 1,
//   "h": 1,
//   "i": "3"
// }
// {
//   "x": 1,
//   "y": 0,
//   "w": 1,
//   "h": 1,
//   "i": "4"
// },
// {
//   "x": 1,
//   "y": 1,
//   "w": 1,
//   "h": 1,
//   "i": "5"
// },
// {
//   "x": 1,
//   "y": 2,
//   "w": 1,
//   "h": 1,
//   "i": "6"
// },
// {
//   "x": 1,
//   "y": 3,
//   "w": 1,
//   "h": 1,
//   "i": "7"
// },
// {
//   "x": 2,
//   "y": 0,
//   "w": 1,
//   "h": 1,
//   "i": "8"
// },
// {
//   "x": 2,
//   "y": 1,
//   "w": 1,
//   "h": 1,
//   "i": "9"
// },
// {
//   "x": 2,
//   "y": 2,
//   "w": 1,
//   "h": 1,
//   "i": "10"
// },
// {
//   "x": 2,
//   "y": 3,
//   "w": 1,
//   "h": 1,
//   "i": "11"
// },
// {
//   "x": 3,
//   "y": 0,
//   "w": 1,
//   "h": 1,
//   "i": "12"
// },
// {
//   "x": 3,
//   "y": 1,
//   "w": 1,
//   "h": 1,
//   "i": "13"
// },
// {
//   "x": 3,
//   "y": 2,
//   "w": 1,
//   "h": 1,
//   "i": "14"
// },
// {
//   "x": 3,
//   "y": 3,
//   "w": 1,
//   "h": 1,
//   "i": "15"
// },
// {
//   "x": 4,
//   "y": 0,
//   "w": 1,
//   "h": 1,
//   "i": "16"
// },
// {
//   "x": 4,
//   "y": 1,
//   "w": 1,
//   "h": 1,
//   "i": "17"
// },
// {
//   "x": 4,
//   "y": 2,
//   "w": 1,
//   "h": 1,
//   "i": "18"
// },
// {
//   "x": 4,
//   "y": 3,
//   "w": 1,
//   "h": 1,
//   "i": "19"
// }
