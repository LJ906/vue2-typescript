<template>
  <div class="page-wrp">
    <div>
      表单组件
    </div>
    <form-component
      :conditions="formItemArr"
      v-model="formData"
    ></form-component>
    <el-button @click="getFormData">submit</el-button>
    <div>结果：{{ JSON.stringify(formData) }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  IFormItem,
  EFormItemType
} from '@/components/FormComponent/commonFormType'
import FormComponent from '@/components/FormComponent/index.vue'
import Data from './data'

@Component({
  components: {
    FormComponent
  }
})
export default class Home extends Vue {
  // 最终结果及默认值
  formData = {
    name: '小李',
    gender: 'id1',
    user: { startSDate: '2022-02-24' }
  }

  formItemArr: IFormItem[] = [
    {
      prop: 'name',
      label: '姓名',
      type: EFormItemType.text
      // event: this.onNameChange
    },
    {
      prop: 'gender',
      label: '性别',
      type: EFormItemType.select,
      // multiple: true,
      options: { id1: '男', id2: '女' },
      event: this.onGenderChange
    },
    {
      prop: 'class',
      label: '动态获取的班级',
      // disabled: true,
      type: EFormItemType.select,
      options: {}
    },
    {
      prop: 'user.startSDate',
      label: '开学时间',
      type: EFormItemType.date
    },
    {
      prop: 'endSDate',
      label: '上课时间',
      type: EFormItemType.datetime
    }
  ]

  onGenderChange(): void {
    // this.formItemArr.find((item) => item.prop === 'class')?.options = {'1':  '1班', '2': '2班'}
    let classItem = this.formItemArr.find((item) => item.prop === 'class')
    classItem && (classItem.options = { '13': '22班', '12': '33班' })
  }

  // onNameChange(eventParams: IFormItemEventFnParams): void {}
  getFormData(): void {
    console.log('保存数据：', this.formData)
  }

  resetOpt(prop: string, options: { [k: string]: number | string }): void {
    let matchedItem = this.formItemArr.find((item) => item.prop === prop)
    matchedItem && (matchedItem.options = options)
  }
  mounted(): void {
    this.resetOpt('class', Data.classOption)
  }
}
</script>
<style lang="scss" scoped>
.page-wrp {
  padding: 20px;
}
</style>
