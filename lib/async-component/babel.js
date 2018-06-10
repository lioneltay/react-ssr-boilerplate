module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value

        if (source !== "async-component") return

        const specifier = path.node.specifiers.find(
          specifier =>
            specifier.type === "ImportSpecifier" &&
            specifier.imported.name === "asyncComponent"
        )

        if (!specifier) return

        const bindingName = specifier.local
          ? specifier.local.name
          : specifier.imported.name
        const binding = path.scope.getBinding(bindingName)

        binding.referencePaths.forEach(refPath => {
          let callExpression = refPath.parentPath

          if (
            callExpression.isMemberExpression() &&
            callExpression.node.computed === false &&
            callExpression.get("property").isIdentifier({ name: "Map" })
          ) {
            callExpression = callExpression.parentPath
          }

          if (!callExpression.isCallExpression()) return

          const args = callExpression.get("arguments")
          if (args.length !== 1) throw callExpression.error

          const options = args[0]
          if (!options.isObjectExpression()) return

          const properties = options.get("properties")
          const propertiesMap = {}

          properties.forEach(property => {
            const key = property.get("key")
            propertiesMap[key.node.name] = property
          })

          if (propertiesMap.webpack) {
            return
          }

          const loaderMethod = propertiesMap.loader.get("value")
          const dynamicImports = []

          loaderMethod.traverse({
            Import(path) {
              dynamicImports.push(path.parentPath)
            },
          })

          if (!dynamicImports.length) return

          propertiesMap.loader.insertAfter(
            t.objectProperty(
              t.identifier("modules"),
              t.arrayExpression(
                dynamicImports.map(dynamicImport => {
                  return dynamicImport.get("arguments")[0].node
                })
              )
            )
          )
        })
      },
    },
  }
}
