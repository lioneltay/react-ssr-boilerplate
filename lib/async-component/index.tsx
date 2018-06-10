import * as React from "react"
import * as R from "ramda"

type ComponentLoader = () => Promise<
  React.ComponentType | { default: React.ComponentType }
>

let chunks: string[] = []
let componentLoaders: {
  [chunkName: string]: {
    chunkName: string
    loader: ComponentLoader
  }
} = {}

function addChunk(chunkFilename: string): void {
  chunks = R.union(chunks, [chunkFilename])
}

export function extractChunks(): string[] {
  const returnChunks = chunks.slice()
  chunks = []
  return returnChunks
}

const DefaultLoadingComponent = () => <div>Loading...</div>

function addLoader(chunkName?: string, loader: ComponentLoader): void {
  if (!chunkName) {
    return
  }

  componentLoaders[chunkName] = {
    chunkName,
    loader,
  }
}

/**
 * For server side use only.
 * Loads all chunks so that they may be used synchronously.
 */
export function preloadAll(): Promise<void> {
  const loaders = Object.values(componentLoaders).map(
    loaderData => loaderData.loader
  )
  componentLoaders = {}
  return Promise.all(loaders.map(loader => loader())).then(() => {
    if (Object.values(componentLoaders).length > 0) {
      return preloadAll()
    }
  })
}

/**
 * Recursively loads the required chunks. Only loads chunks marked by the server as being used.
 */
declare const __REQUIRED_CHUNK_NAMES__: string[]
export function preloadReady(): Promise<void> {
  let chunksToLoad = __REQUIRED_CHUNK_NAMES__

  async function recursivePreload(): Promise<void> {
    if (chunksToLoad.length === 0) {
      return
    }

    await Promise.all(
      chunksToLoad.map(async chunkName => {
        const loaderData = componentLoaders[chunkName]
        if (!loaderData) {
          return
        }
        chunksToLoad = R.difference(chunksToLoad, [chunkName])
        return loaderData.loader()
      })
    )

    return recursivePreload()
  }

  return recursivePreload()
}

export function asyncComponent({
  loader,
  LoadingComponent = DefaultLoadingComponent,
  chunkName,
}: {
  loader: ComponentLoader
  LoadingComponent?: React.ComponentType
  chunkName?: string
}): React.ComponentType {
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

  addLoader(chunkName, loadComponent)

  return class LoadableComponent extends React.Component {
    private mounted: boolean = false

    constructor(props: any) {
      super(props)
      if (chunkName) {
        addChunk(chunkName)
      }

      loadComponent().then(component => {
        if (this.mounted) {
          this.forceUpdate()
        }
      })
    }

    componentDidMount() {
      this.mounted = true
    }

    render() {
      if (!LoadedComponent) {
        return <LoadingComponent />
      }

      return <LoadedComponent {...this.props} />
    }
  }
}
