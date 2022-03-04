<template>
  <div class="navbar">
    <div class="vwfs-logo">
      <!-- <img :src="vwfsFsoLogo" alt=""> -->
      logologologo
    </div>
    <div class="navbar-right">
      <span class="user-name">张三李四有限公司**</span>
      <span class="navbar-logout">
        <i class="el-icon-switch-button font-bold"></i>

      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const vwfsFsoLogo = require('../../../assets/vwfs-fso-logo.jpg')

@Component
export default class ClassName extends Vue {
  vwfsFsoLogo = vwfsFsoLogo;
}
</script>
<style scoped lang="scss">
@import '../../../styles/variables.scss';
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  height: $navHeight;
  padding: 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background: $loginBg;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  color: #fff;
  font-size: 16px;
  .vwfs-logo {
    width: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.navbar-logout {
  padding: 0 20px;
  .font-bold {
    font-weight: 700;
  }
}
</style>
