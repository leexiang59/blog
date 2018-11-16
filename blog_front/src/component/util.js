const api = {
  version: 'v1',
  user: '/v1/user/',
  article: '/v1/article/'
}
const util = {
  sendErrorToWX: function (err, url) {
    fetch(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=73ede3e3-e70b-4bb7-9f23-21ce41b09e10`, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        'msgtype': 'markdown',
        'markdown': {
          'content': `#### 错误信息 \n\n  >${JSON.stringify(err)} \n >接口：${url}`
        }
      })
    })
  },
  fetchLite: function (
    {
      url,
      options = {},
      done = () => {},
      fail = json => { console.log(json) },
      error = error => { console.log(error) }
    } = {}
  ) {
    // 接口超时处理
    let timeOut = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({
          state: 408,
          msg: '请求超时'
        })
      }, 3 * 1000)
    })
    let fetchHandle = new Promise((resolve, reject) => {
      fetch(window.location.hostname.indexOf('localhost') === -1 ? `//api.willli.top${url}` : url, {
      // fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        ...options
      }).then(res => {
        if (res.status === 200) {
          resolve(res.json())
        } else {
          reject({
            state: res.status,
            msg: '网络错误'
          })
        }
      })
    })
    return Promise.race([fetchHandle, timeOut]).then(json => {
      if (json.state === 0) {
        done && done(json)
      } else {
        fail && fail(json)
        if (json.state === 1008) { // 未登录

        } else {
          // this.sendErrorToWX(json, url)
        }
      }
    }).catch(err => {
      // this.sendErrorToWX(err, url)
      error && error(err)
    })
  }
}
export { util, api }
