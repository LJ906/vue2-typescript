export enum EFormItemType {
  text = "text",
  select = "select",
  date = "date",
  datetime = "datetime"
}

export enum ElabelPosition { top, right, left }
export interface IFormItemEventFnParams {
  itemValue: string | (string | number)[];
  formData: { [k: string]: any };
  item: IFormItem;
}
interface IFormItemSelectOpt {
  [k: string]: string | number;
}
export interface IFormItem {
  prop: string; //form绑定的prop 不能重复,后台提交时的字段
  label: string;  // 显示的名字
  type?: EFormItemType; // 输入框的类型
  value?: any; // 默认值
  placeholder?: string; // 默认 ’请输入‘, 
  span?: number; // 每项 i-col的份数， 默认4
  options?: IFormItemSelectOpt; // type是select时的选项，Object格式，值绑定的key, 显示的 value，即传给后台的值是此处的id
  event?: (params: IFormItemEventFnParams) => void; // 输入框的或下拉框的on-change触发的事件名称， 记得在父组件中监听， 参数为 包含所有字段的value， 
  hidden?: boolean; // 显示隐藏， false 不显示此项
  labelWidth?: number; // 单个项的 label 宽度, 可不传，默认100，
  labelPosition?: ElabelPosition;
  disabled?: boolean;
  pickerOptions?(): string;
  [k: string]: any;
}