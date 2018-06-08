import * as React from "react"

type ComponentLoader = () => Promise<
  React.ComponentType | { default: React.ComponentType }
>

let componentLoaders: ComponentLoader[] = []

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

export function preloadReady(): Promise<void> {
  const loaders = componentLoaders.slice()
  componentLoaders = []
  return Promise.all(loaders.map(loader => loader())).then(() => {})
}

export function asyncComponent({
  loader,
  LoadingComponent = DefaultLoadingComponent,
}: {
  loader: ComponentLoader
  LoadingComponent?: React.ComponentType
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
