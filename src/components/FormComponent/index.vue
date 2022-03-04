<template>
  <div class="custom-form-wrap">
    <!-- <el-form ref="form" :model="form" label-width="80px"> -->
    <el-form
      inline
      ref="customForm"
      class="custom-form"
      :model="value"
      size="small"
      :label-position="labelPosition"
      :label-width="labelWidth"
    >
      <el-row :gutter="defaultGutter">
        <el-col
          v-for="(condition, i) in conditions"
          :key="condition.prop + i"
          :span="condition.span ? condition.span : defaultConditionSpan"
          :hidden="condition.hidden"
        >
          <el-form-item
            :label="condition.label"
            :prop="condition.prop"
            class="custom-form-item"
            :labelWidth="condition.labelWidth"
          >
            <!-- select -->
            <el-select
              v-if="condition.type === 'select'"
              v-model="value[condition.prop]"
              :disabled="condition.disabled"
              :multiple="condition.multiple || false"
              @change="hanldeSelectChange(condition, value[condition.prop])"
              :placeholder="
                condition.placeholder || defaultConditionPlaceholder
              "
            >
              <el-option
                v-for="(v, k) in condition.options"
                :key="k + v"
                :label="v"
                :value="k"
              >
              </el-option>
            </el-select>
            <template
              v-else-if="
                condition.type == 'date' || condition.type == 'datetime'
              "
            >
              <el-date-picker
                v-if="condition.prop.includes('.')"
                class="fc-custom-date"
                v-model="
                  value[condition.prop.split('.')[0]][
                    condition.prop.split('.')[1]
                  ]
                "
                :disabled="condition.disabled"
                :type="condition.type"
                clearable
                placeholder="选择日期"
                :value-format="
                  condition.type == 'date'
                    ? 'yyyy-MM-dd'
                    : 'yyyy-MM-dd HH:mm:ss'
                "
                :picker-options="condition.pickerOptions"
              >
              </el-date-picker>
              <el-date-picker
                v-else
                class="fc-custom-date"
                v-model="value[condition.prop]"
                :disabled="condition.disabled"
                :type="condition.type"
                clearable
                placeholder="选择日期"
                :value-format="
                  condition.type == 'date'
                    ? 'yyyy-MM-dd'
                    : 'yyyy-MM-dd HH:mm:ss'
                "
                :picker-options="condition.pickerOptions"
              >
              </el-date-picker>
            </template>

            <el-input
              v-else
              clearable
              :type="condition.type || defaultConditionType"
              v-model="value[condition.prop]"
              :disabled="condition.disabled || false"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ElabelPosition, IFormItem } from './commonFormType'

@Component({
  name: 'FormComponent'
})
export default class extends Vue {
  @Prop() private conditions!: IFormItem[]
  @Prop() private value!: { [k: string]: any }
  @Prop({ default: '100' }) private labelWidth!: string
  @Prop({ default: 'top' }) private labelPosition: ElabelPosition | undefined

  mounted(): void {
    console.log('conditons', this.conditions)
  }
  // 自定义的属性
  tempvalue = 12
  defaultGutter = 40
  defaultConditionSpan = 6 // 默认一个item占4个span
  defaultConditionType = 'text' //  默认text
  defaultConditionPlaceholder = '请输入'
  operationsBtnSpan = 24

  /**
   * 下拉框change事件
   * @param {Object} condition: 当前项的信息，
   * @param {Object} currentVal : 当前选中的值
   */
  hanldeSelectChange(condition: IFormItem, itemValue: string[]): void {
    if (condition.event) {
      condition.event({ itemValue, formData: this.value, item: condition })
    }
  }
}
</script>
<style>
.custom-form-wrap .el-date-editor.el-input,
.custom-form-wrap .el-date-editor.fc-custom-date {
  width: 100%;
}
.custom-form-wrap .custom-form-item,
.custom-form-item .el-select {
  width: 100%;
  /* margin-bottom: 10px; */
  /* margin-top: 0; */
}
</style>
