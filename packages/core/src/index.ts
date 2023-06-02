import type { Element } from './types'

export default class ScrollMatter {
  private el: Element
  private scrollAreaStyle: Partial<CSSStyleDeclaration> = {
    overflow: 'hidden',
  }

  constructor(el: Element) {
    this.el = el ?? el
  }

  private withNullCheck(fn: Function): (...args: any[]) => void {
    return (...args: any[]) => {
      const targetEl = this.el
      if (!targetEl) {
        console.warn('Element is null.')
        return
      }
      fn.apply(this, [targetEl, ...args])
    }
  }

  private assignStyles(
    target: CSSStyleDeclaration | undefined,
    styles: Partial<CSSStyleDeclaration>,
  ) {
    if (!target)
      return
    Object.assign(target, styles)
  }

  public scrollArea(): void {
    const element: Element = this.el!
    const content = element.innerHTML
    this.assignStyles(element.style, this.scrollAreaStyle)
    element.innerHTML = `<div class="scrollmatter-content">${content}</div>`
    element.addEventListener('wheel', (ev: WheelEvent) => {
      ev.preventDefault()
      if (element.scrollTop === 0 && ev.deltaY < 0)
        return
      if (
        element.scrollTop + element.clientHeight === element.scrollHeight
        && ev.deltaY > 0
      )
        return

      // console.log(
      //   element.scrollTop + ev.deltaY > element.scrollHeight - element.clientHeight,
      // )
      // console.log(element.scrollTop + ev.deltaY < 0)

      element.scrollLeft += ev.deltaY
      element.scrollTop += ev.deltaY
      return false
    })
  }
}
