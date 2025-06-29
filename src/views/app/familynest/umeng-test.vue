<template>
  <button id="xxl">点我唤起</button>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // 确保ULink脚本已加载
  const script = document.createElement('script');
  script.src = 'https://g.alicdn.com/jssdk/u-link/index.min.js';
  script.onload = () => {
    // 脚本加载完成后初始化ULink
    window.ULink([
      {
        id: "linkidxxx",
        data: {
          a: 4,
          b: "xx",
        },
        selector: "#xxl",
        
        useOpenInBrowerTips: "default",
        proxyOpenDownload: function (defaultAction, LinkInstance){
          if (LinkInstance.solution.type === "scheme"){
            // qq或者微信环境特殊处理下
            if (window.ULink.isWechat || window.ULink.isQQ) {
              // 在qq或者微信环境执行内置逻辑，具体内置逻辑为:当设置了useOpenInBrowerTips字段时，qq&&微信&&scheme时，启用蒙层提示去浏览器打开
              defaultAction();
            }else{
              window.location.href = LinkInstance.solution.downloadUrl;
            }
          }else if(LinkInstance.solution.type === "universalLink"){
            // universalLink 唤起应当由服务端提供一个带重定向到appstore的universallink地址。因此，此处不应写逻辑，友盟会在近期上线universalLink 重定向功能。
          }
        },
      },
    ]);
  };
  document.head.appendChild(script);
});
</script>

<style scoped>
/* 可以在这里添加组件样式 */
</style>