import requset from "@/utils/request";

export const queryTableData = (): any => {
  return requset({
    url: '/trave/list',
    method: 'GET'
  })
}