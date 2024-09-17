import { STYLES_CONFIG } from '../../../packages/editor-mode/editor-panel/style-manager/stylesConfig'

class NodeWrapperStorage {
  store: NodeWrapper[] = []

  push(node: NodeWrapper) {
    this.store.push(node)
  }

  findById(id: string): NodeWrapper | undefined {
    return this.store.find(n => n.id === id)
  }

  findByDataSelector(node: HTMLElement): NodeWrapper | undefined {
    const id = node.dataset['1VSelectorId']

    if (!id) return undefined
    
    return this.findById(id)
  }
}

export const nodeWrapperStorage = new NodeWrapperStorage()

export interface NodeWrapperInterface {
  current: HTMLElement
  id: string
  selectors: string[]
  coordinates: { x: number, y: number }
  isSimplicity: boolean;
  styles: Record<string, string>;
  textContent: string | null;
}

export class NodeWrapper implements NodeWrapperInterface {
  current: HTMLElement
  id: string
  selectors: string[] = []
  coordinates: { x: number, y: number } = { x: 0, y: 0 }
  isSimplicity: boolean = false
  styles: Record<string, string> = {}
  textContent: string | null = null

  constructor(node: HTMLElement) {
    this.current = node
    this.id = Math.floor(Math.random() * 10000).toString()
  }

  create() {
    this.current.dataset['1VSelectorId'] = this.id

    this.isSimplicity = this.current.childElementCount === 0
    this.textContent = this.current.textContent

    this.createSelectors()
    this.createCoordinates()
    this.createStylesMap()
  }

  createSelectors() {
    this.selectors = Array.from(this.current.classList) // TODO

    const generatePath = () => {
      const stack = []
      let el: any = this.current!

      while(el.parentNode) {
        const siblings = el.parentNode.childNodes

        let elementIndex = 0
        let sibCount = 0

        // eslint-disable-next-line no-loop-func
        siblings.forEach((sib: any) => {
          if (sib.nodeName === el.nodeName){
            if (el === sib) elementIndex = sibCount
            sibCount++
          } 
        })

        if (el.hasAttribute('id') && el.id !== '') {
          stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
        } else if ( sibCount > 1 ) {
          stack.unshift(el.nodeName.toLowerCase() + ':nth-child(' + ++elementIndex + ')');
        } else if (el.classList.length && el.classList.toString().split(' ').join('.') !== '') {
          stack.unshift(el.nodeName.toLowerCase() + '.' + el.classList.toString().split(' ').join('.'));
        } else {
          stack.unshift(el.nodeName.toLowerCase());
        }


        el = el.parentNode
      }

      return stack.slice(1).join(' > ')
    }
  }

  createCoordinates() {
    this.coordinates = {
      x: this.current.offsetLeft,
      y: this.current.offsetTop
    }
  }

  createStylesMap() {
    const elementStyles: Record<string, any> = window.getComputedStyle(this.current, null)

    const allStyles = Object.keys(STYLES_CONFIG)

    this.styles = allStyles.reduce((acc, style) => ({ ...acc, [style]: elementStyles[style] }), {})

    for (let i = 0; i < this.current.attributes.length; i++) console.log(this.current.attributes[i])
  }
}
