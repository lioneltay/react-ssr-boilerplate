import * as React from "react"

type ComponentLoader = () => Promise<
  React.ComponentType | { default: React.ComponentType }
>

const componentLoaders: ComponentLoader[] = []

const DefaultLoadingComponent = () => <div>Loading...</div>

export function preloadAll() {
  return Promise.all(componentLoaders.map(loader => loader()))
}

export function asyncComponent({
  loader,
  LoadingComponent = DefaultLoadingComponent,
}: {
  loader: ComponentLoader
  LoadingComponent?: React.ComponentType
}): React.ComponentType {
  let LoadedComponent: React.ComponentType | null = null

  const loadComponent: ComponentLoader = () => {
    if (!LoadedComponent) {
      return loader().then(component => {
        if (typeof component === "object") {
          return (LoadedComponent = component.default)
        }
        return (LoadedComponent = component)
      })
    }

    return Promise.resolve(LoadedComponent)
  }

  componentLoaders.push(loadComponent)

  return class LoadableComponent extends React.Component {
    constructor(props: any) {
      super(props)
      loadComponent()
    }

    render() {
      if (!LoadedComponent) {
        return <LoadingComponent />
      }

      return <LoadedComponent {...this.props} />
    }
  }
}
