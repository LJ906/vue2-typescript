<template>
  <div class="page-wrp scroll-table">
    table
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="tableRef"
      :loading="loading"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="creater" label="姓名" width="180">
      </el-table-column>
      <!-- <el-table-column prop="departureDate" label="出差日期" width="180"> </el-table-column> -->
      <el-table-column prop="visitCity" label="出差城市"> </el-table-column>
      <el-table-column prop="returnDate" label="结束时间"> </el-table-column>
      <el-table-column prop="departureDate" label="开始时间"> </el-table-column>
      <el-table-column prop="travelPurpose" label="出差事由"> </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { queryTableData } from '@/api/table'

export interface ITableItem {
  id: number | string
  departureDate: string
  returnDate: string
  creater: string
  travelPurpose: string
  visitCity: string
}

@Component
export default class ClassName extends Vue {
  tableData: ITableItem[] = []
  pageNo = 1
  pageSize = 10
  tableWrpDom: Element | null = null
  loading = false
  finished = false // 是否可以加载更多的标志
  requested = false // 已发请求

  async getTableData(pageNo = 1): Promise<void> {
    this.requested = true
    this.finished = false
    this.loading = true
    console.log('pageno', pageNo)
    let data = await queryTableData()
    this.tableData =
      this.tableData.length > 1 ? this.tableData.concat(data.list) : data.list
    // if (this.tableData.length < this.pageSize && this.pageNo > 1) {
    //   this.finished = true
    // }
    this.loading = false
    this.requested = false
    if (!this.finished) {
      this.$nextTick((): void => {
        this.initScrollEvent()
      })
    }
  }

  initScrollEvent(): void {
    this.tableWrpDom = document.querySelector('.scroll-table')
    if (!this.tableWrpDom) return
    this.tableWrpDom.addEventListener('scroll', this.loadMoreData)
  }
  loadMoreData(): void {
    if (this.finished) return
    if (this.requested) return
    const distanceToBottom =
      (this.tableWrpDom as Element).scrollHeight -
      (this.tableWrpDom as Element).scrollTop -
      (this.tableWrpDom as Element).clientHeight

    console.log('距离底部距离', distanceToBottom)

    if (distanceToBottom < 100) {
      this.pageNo++
      this.getTableData(this.pageNo)
    }
  }

  mounted(): void {
    this.getTableData()
  }

  beforeDestroy(): void {
    ;(this.tableWrpDom as Element).removeEventListener(
      'scroll',
      this.loadMoreData
    )
  }
}
</script>
<style scoped>
.scroll-table {
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: scroll;
}
</style>
