<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon name="peoples" class="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">New Visits</div>
          <count-to
            :start-val="0"
            :end-val="13600"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon name="message" class="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Messages</div>
          <!-- <div class="card-panel-num">4234234</div> -->
          <count-to
            :start-val="0"
            :end-val="28600"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon name="money" class="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Purchases</div>
          <!-- <div class="card-panel-num">4234234</div> -->
          <count-to
            :start-val="0"
            :end-val="11600"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon name="shopping" class="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Shoppings</div>
          <!-- <div class="card-panel-num">4234234</div> -->
          <count-to
            :start-val="0"
            :end-val="8700"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// eslint-disable-next-line
import CountTo from 'vue-count-to'

@Component({
  components: {
    CountTo
  }
})
export default class ClassName extends Vue {}
</script>
<style scoped lang="scss">
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    position: relative;
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }
  }

  .icon-people {
    color: #40c9c6;
  }
  .icon-message {
    color: #36a3f7;
  }

  .icon-money {
    color: #f4516c;
  }

  .icon-shopping {
    color: #34bfa3;
  }
  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }

  .card-panel-icon {
    float: left;
    font-size: 48px;
  }

  .card-panel-description {
    float: right;
    font-weight: 700;
    margin: 26px;
    margin-left: 0;
    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }
    .card-panel-num {
      font-size: 20px;
    }
  }
}
</style>
