<template>
  <div>
    <div>
      <button id="btnTest1">唤起APP</button>
    </div>
    <div>
      <button class="hide" id="btnTest2">微信外唤起小程序</button>
      <wx-open-launch-weapp
        class="hide"
        id="launch-btn"
        username="gh_ddab9f37054f"
        path="pages/home/home?_um_campaign=601ceb4c425ec25f10ed8a75&_um_channel=601ceb4c425ec25f10ed8a76"
      >
        <button>开放标签唤起暂不可用</button>
        长按唤起小程序
        <img
          width="100%"
          src="https://gw.alicdn.com/imgextra/i4/O1CN01zsbA2w1N0FWrAHTj0_!!6000000001507-0-tps-430-430.jpg"
        />
      </wx-open-launch-weapp>
    </div>
    <div class="section">
      <b>下发方案:</b><br />
      <pre id="J_solutionBox"></pre>
    </div>
    <div class="section">
      <b>UserAgent:</b><br />
      <span>{{ userAgent }}</span>
    </div>
    <div class="section">
      <b>isIOS:</b>
      <span>{{ isIOS }}</span>
    </div>
    <div class="section">
      <b>isAndroid:</b>
      <span>{{ isAndroid }}</span>
    </div>
    <div class="section">
      <b>oid:</b><br />
      <pre id="oid"></pre>
    </div>
    <div class="section">
      <b>nextTrackCode:</b><br />
      <pre id="ntc"></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userAgent = ref('')
const isIOS = ref(false)
const isAndroid = ref(false)
const mpscheme = 'meipian://main.app.new/meipian?path=meipian%253A%252F%252Farticle%252Fdetail%253Fmask_id%253D3h5c9hhy%2526cb_create_at%253D1618909940%2526cb_expire_time%253D1800%2526client_type%253D2%2526type%253Dwechat%2526source%253Dh5wx_article_top&_sdk_=umeng&um_tc=f46a890aa43c404b95565ea58e9c3e2d&_valid_user_id_=4-c2afd3a446004288a60db5e802ec6c71&_linkid_=usr10s8s5q7tfvhb&source=h5wx_article_top&_bizType_=ushare'
const oid = ref('')
let ULink = null
let data = {
  linkid: 'usr1h49s0l7ngbh5'||'usr1cbtpat4292hc',
}
let ctx = null

onMounted(() => {
  initVConsole()
  loadScripts().then(() => {
    initULink()
  })
})

function initVConsole() {
  const script = document.createElement('script')
  script.src = 'https://g.alicdn.com/code/lib/vConsole/3.3.4/vconsole.min.js'
  script.onload = () => {
    console.log(new VConsole())
  }
  document.head.appendChild(script)
}

function loadScripts() {
  return new Promise((resolve) => {
    // 加载微信JS-SDK
    const wxScript = document.createElement('script')
    wxScript.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
    document.head.appendChild(wxScript)

    // 加载ULink SDK
    const ulinkScript = document.createElement('script')
    ulinkScript.src = 'https://share.umeng.com/demo/ulink/index.min.js?v=${SDK_VERSION}'
    ulinkScript.onload = () => {
      ULink = window.ULink
      userAgent.value = ULink.userAgent
      isIOS.value = ULink.isIOS()
      isAndroid.value = ULink.isAndroid()
      resolve()
    }
    document.head.appendChild(ulinkScript)
  })
}

function initULink() {
  // 获取oid
  if (localStorage && localStorage.setItem && localStorage.getItem) {
    oid.value = localStorage.getItem('_umeng_oid') || 
      (+new Date()).toString(36) + Math.random().toString(36).substr(2, 6)
    localStorage.setItem('_umeng_oid', oid.value)
  }
  document.getElementById('oid').innerText = 'umtestid_' + oid.value

  // 获取URL参数
  data = ULink.getUriDecodeParams()
  const tm = parseInt(data.timeout)
  const lazy = data.lazy === 'true'
  const auto = data.auto === 'true'
  const tip = data.tip
  let tipitem
  let clp

  if (data.clp === 'true') {
    clp = true
  } else if (data.clp === 'false') {
    clp = false
  } else if (data.clp === 'function') {
    clp = (clptoken) => {
      return mpscheme + '&umclp=' + clptoken
    }
  }

  // 设置提示方式
  if (tip === 'default') {
    tipitem = tip
  } else if (tip === 'function') {
    tipitem = (ctx) => {
      return `<div style="position:fixed;left:0;top:0;background:rgba(255,0,255,0.5);width:100%;height:100%;z-index:19910324;">${ctx.solution.downloadUrl}</div>`
    }
  }

  // 设置环境
  if (data.env === 'pre') {
    ULink.setGateway('https://pre-c.umsns.com')
  }

  // 处理微信环境
  handleWechatEnv()

  // 根据参数初始化ULink
  if (data.new === 'true') {
    initNewULink(tm, tipitem, lazy, auto, clp)
  } else {
    initOldULink(tm, tipitem, auto, clp)
  }
}

function handleWechatEnv() {
  if (ULink.isWechat) {
    const btn = document.getElementById('launch-btn')
    btn.style.display = 'block'
    btn.addEventListener('launch', (e) => {
      console.log('success')
    })
    btn.addEventListener('error', (e) => {
      console.log('fail', e.detail)
    })
  } else {
    const btn2 = document.getElementById('btnTest2')
    btn2.style.display = 'block'
    btn2.onclick = () => {
      location.href = 'weixin://dl/business/?t=NUhFcfSZuhv'
    }
  }
}

function proxyOpenDownloadfn(defaultAction, cctx) {
  if (data.popup === 'true') {
    defaultAction()
  } else {
    if (cctx.solution.type === 'scheme') {
      if (ULink.isWechat || ULink.isQQ) {
        defaultAction()
      } else {
        location.href = cctx.solution.downloadUrl
      }
    }
  }
}

function initNewULink(tm, tipitem, lazy, auto, clp) {
  console.log(auto, 'auto********')
  ULink({
    id: data.linkid,
    data: data,
    selector: '#btnTest1',
    timeout: tm,
    useOpenInBrowerTips: tipitem || 'default',
    lazy: lazy,
    auto: auto,
    useClipboard: clp,
    proxyOpenDownload: proxyOpenDownloadfn,
    onready: (ctx) => {
      console.log('ready', ctx)
      document.getElementById('J_solutionBox').innerText = JSON.stringify(
        ctx.solution,
        null,
        2
      )
    }
  })
}

function initOldULink(tm, tipitem, auto, clp) {
  setTimeout(() => {
    ULink.tracker.setMetaInfo({
      oid: 'umtestid_' + oid.value,
      nickname: '昵称',
      avator: '头像',
      trackurl: location.href
    })
    
    ULink.tracker.enter({ page_name: document.title, page: location.href }, () => {
      ULink.tracker.getNextTrackCode((data) => {
        document.getElementById('ntc').innerText = data
        console.log('新的追踪码:', data)
      })
      
      ULink.start({
        id: data.linkid || 'usr1cbtpat4292hc',
        data: data,
        useClipboard: clp,
        useOpenInBrowerTips: tipitem || 'default'
      }).ready((context) => {
        console.log('ready', context)
        ctx = context
        
        const option = {
          action: 'click',
          proxyOpenDownload: proxyOpenDownloadfn,
          timeout: tm
        }
        
        if (auto) {
          console.log('auto---------', auto)
          ctx.wakeup(Object.assign({}, option, { action: 'load' }))
        }
        
        document.getElementById('btnTest1').onclick = (e) => {
          ctx.wakeup(option)
        }
        
        document.getElementById('J_solutionBox').innerText = JSON.stringify(
          ctx.solution,
          null,
          2
        )
      })
    })
  }, 500)
}
</script>

<style scoped>
      body {
        padding: 0 5%;
        height: 2000px;
      }
      button,
      .btn {
        display: block;
        margin: 20px auto;
        width: 100%;
        height: 80px;
        background: #3b82fe;
        border: 0 none;
        border-radius: 10px;
        font-size: 30px;
        color: #fff;
        text-align: center;
        line-height: 80px;
        overflow: hidden;
      }
      .section {
        padding: 10px 0;
        color: #666;
      }
      .section b {
        color: #3b82fe;
      }
      pre {
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
      }
      .hide {
        display: none;
      }
    </style>
