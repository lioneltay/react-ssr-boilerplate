import * as React from "react"
import * as R from "ramda"

type ComponentLoader = () => Promise<
  React.ComponentType | { default: React.ComponentType }
>

let modules: string[] = []
let componentLoaders: {
  [chunkName: string]: {
    module: string
    loader: ComponentLoader
  }
} = {}

function addModule(importPaths: string[]): void {
  modules = R.union(modules, importPaths)
}

function extractModules(): string[] {
  const returnChunks = modules.slice()
  modules = []
  return returnChunks
}

const DefaultLoadingComponent = () => <div>Loading...</div>

function addLoader(loader: ComponentLoader, modules: string[]): void {
  if (modules.length !== 1) {
    throw Error("Modules has length greater than one!")
  }

  componentLoaders[modules[0]] = {
    module: modules[0],
    loader,
  }
}

/**
 * For server side use only.
 * Loads all chunks so that they may be used synchronously.
 */
function preloadAll(): Promise<void> {
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
function preloadReady(): Promise<void> {
  let modulesToLoad = __REQUIRED_CHUNK_NAMES__

  async function recursivePreload(): Promise<void> {
    if (modulesToLoad.length === 0) {
      return
    }

    await Promise.all(
      modulesToLoad.map(async modulePath => {
        const loaderData = componentLoaders[modulePath]
        if (!loaderData) {
          return
        }
        modulesToLoad = R.difference(modulesToLoad, [modulePath])
        return loaderData.loader()
      })
    )

    return recursivePreload()
  }

  return recursivePreload()
}

function asyncComponent({
  loader,
  LoadingComponent = DefaultLoadingComponent,
  modules,
}: {
  loader: ComponentLoader
  LoadingComponent?: React.ComponentType
  modules?: string[]
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

  if (modules) {
    addLoader(loadComponent, modules)
  }

  return class LoadableComponent extends React.Component {
    private mounted: boolean = false

    constructor(props: any) {
      super(props)
      if (modules) {
        addModule(modules)
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

export { extractModules, preloadAll, preloadReady, asyncComponent }
