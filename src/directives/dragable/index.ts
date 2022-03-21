import { DirectiveOptions } from 'vue'

export const Dragable: DirectiveOptions = {
  bind(el, _, vnode) {
    const dragDom = el.querySelector('.custom-dragbox') as HTMLElement
    const dialogHeaderEl = el.querySelector('.custom-dragbox') as HTMLElement
    // dragDom.style.cssText += ';top:0px;'
    dialogHeaderEl.style.cssText += ';cursor:move;'

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标在托动物中落下的坐标点
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      // const minDragDomLeft = dragDom.offsetLeft
      // const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
      // const minDragDomTop = dragDom.offsetTop
      // const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight
      
      // 重写上下左右临界值
      const minDragDomTop = 0
      const maxDragDomTop = screenHeight - dragDomHeight
      const minDragDomLeft = 0
      const maxDragDomLeft = screenWidth - dragDomWidth

      const styleLeftStr = getComputedStyle(dragDom).left
      const styleTopStr = getComputedStyle(dragDom).top
      if (!styleLeftStr || !styleTopStr) return
      // let styleLeft: number
      // let styleTop: number

      // Format may be "##%" or "##px"
      // if (styleLeftStr.includes('%')) {
      //   styleLeft = +document.body.clientWidth * (+styleLeftStr.replace(/%/g, '') / 100)
      //   styleTop = +document.body.clientHeight * (+styleTopStr.replace(/%/g, '') / 100)
      // } else {
      //   styleLeft = +styleLeftStr.replace(/px/g, '')
      //   styleTop = +styleTopStr.replace(/px/g, '')
      // }

      document.onmousemove = (e) => {
        let left = e.clientX - disX
        let top = e.clientY - disY

        // Handle edge cases
        if (-(left) > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-(top) > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // Move current element
        // dragDom.style.cssText += `;left:${left + styleLeft}px;top:${top + styleTop}px;`
        dragDom.style.cssText += `;left:${left}px;top:${top}px;`
        // Emit on-dialog-drag event
        // See https://stackoverflow.com/questions/49264426/vuejs-custom-directive-emit-event
        if (vnode.componentInstance) {
          vnode.componentInstance.$emit('on-drag')
        } else if (vnode.elm) {
          vnode.elm.dispatchEvent(new CustomEvent('on-drag'))
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
