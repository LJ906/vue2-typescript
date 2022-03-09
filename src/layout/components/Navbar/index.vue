<template>
  <div class="navbar">
    <div class="vwfs-logo">
      <!-- <img :src="vwfsFsoLogo" alt=""> -->
      <!-- <span style="margin-right: 30px">logologologo</span>  -->
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
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
import Hamburger from '@/components/Hamburger/index.vue'
import { AppModule } from '@/store/modules/app'
// import { UserModule } from  '@/store/modules/user'

@Component({
  name: 'Navbar',
  components: {
    Hamburger
  }
})
export default class ClassName extends Vue {
  vwfsFsoLogo = vwfsFsoLogo

  get sidebar() {
    return AppModule.sidebar
  }

  toggleSideBar(): void {
    AppModule.ToggleSidebar(false)
  }
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
    // width: 200px;
    img {
      width: 200px;
      height: 100%;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    // float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
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
