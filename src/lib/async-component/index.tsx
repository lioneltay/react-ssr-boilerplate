import * as React from "react"

type ComponentLoader = () => Promise<
  React.ComponentType | { default: React.ComponentType }
>

const chunks: string[] = []
let componentLoaders: ComponentLoader[] = []

function addChunk(chunkFilename: string): void {
  chunks.push(`dist${chunkFilename}.chunk.js`)
}

export function extractChunks(): string[] {
  return chunks
}

const DefaultLoadingComponent = () => <div>Loading...</div>

function queueLoader(loader: ComponentLoader): void {
  componentLoaders.push(loader)
}

export function preloadAll(): Promise<void> {
  const loaders = componentLoaders.slice()
  componentLoaders = []
  return Promise.all(loaders.map(loader => loader())).then(() => {
    if (componentLoaders.length > 0) {
      return preloadAll()
    }
  })
}

/**
 * Need to implement a loader that attaches a notifier that marks a component as loaded
 */
export function preloadReady(): Promise<void> {
  const loaders = componentLoaders.slice()
  componentLoaders = []
  return Promise.all(loaders.map(loader => loader())).then(() => {})
}

export function asyncComponent({
  loader,
  LoadingComponent = DefaultLoadingComponent,
  chunkFilename,
}: {
  loader: ComponentLoader
  LoadingComponent?: React.ComponentType
  chunkFilename?: string
}): React.ComponentType {
  if (chunkFilename) {
    addChunk(chunkFilename)
  }

  let LoadedComponent: React.ComponentType | null = null

  const loadComponent: ComponentLoader = async () => {
    if (!LoadedComponent) {
      const component = await loader()
      if (typeof component === "object") {
        return (LoadedComponent = component.default)
      }
      return (LoadedComponent = component)
    }
    return LoadedComponent
  }

  queueLoader(loadComponent)

  return class LoadableComponent extends React.Component {
    constructor(props: any) {
      super(props)
      const updateRequired = !LoadedComponent
      loadComponent().then(component => {
        if (updateRequired) {
          this.forceUpdate()
        }
      })
    }

    render() {
      if (!LoadedComponent) {
        return <LoadingComponent />
      }

      return <LoadedComponent {...this.props} />
    }
  }
}
