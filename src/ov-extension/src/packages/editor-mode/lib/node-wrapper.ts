class NodeWrapperStorage {
  store: NodeWrapper[] = []

  push(node: NodeWrapper) {
    this.store.push(node)
  }

  findById(id: string): NodeWrapper | undefined {
    return this.store.find(n => n.id === id)
  }

  findByDataSelector(node: HTMLElement): NodeWrapper | undefined {
    const id = node.dataset['ov-selector-id']

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
}

export class NodeWrapper implements NodeWrapperInterface {
  current: HTMLElement
  id: string
  selectors: string[] = []
  coordinates: { x: number, y: number } = { x: 0, y: 0 }

  constructor(node: HTMLElement) {
    this.current = node
    this.id = Math.floor(Math.random() * 10000).toString()
  }

  create() {
    this.current.dataset['ov-selector-id'] = this.id

    this.createSelectors()
    this.createCoordinates()
  }

  createSelectors() {
    this.selectors = Array.from(this.current.classList) // TODO
  }

  createCoordinates() {
    this.coordinates = {
      x: this.current.offsetLeft,
      y: this.current.offsetTop
    }
  }
}
