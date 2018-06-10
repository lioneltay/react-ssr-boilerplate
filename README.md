# Todos

- [x] Add code component splitting
- [x] Add ability to preloaded nested components
- [x] Need a way to know which chunks were loaded on client so that they can be preloaded without using preloadAll() which would load all components of the entire app

- [x] Implement preloadReady() which preloads only the used chunks
  - [x] used chunks are determined by a global variable attched by the intial html response in a script tag
  - [x] restructure loader data structure to be an object mapping that includes chunk names

- react-router-4
  - [x] Add StaticRouter and BrowserRouter
  - [x] Add redirect
  - [x] Add Code splitted routes

- [ ] Webpack / babel plugin to remove the need to manually name chunks
  - [ ] Read webpack contributers guide for deeper understanding https://webpack.js.org/contribute/writing-a-plugin/

- [ ] styled components SSR
  - [ ] Read through all of styled components docs again

- [ ] Data fetching (generic promises?)

- [ ] loader api could provide props too??

- [ ] Graphql SSR

- [ ] redux SSR

- [ ] CircleCI

- [ ] Lint / build / deploy pipeline

- [ ] How does public path work?
  - How does it work with an in memory file system?
  - How does it work with webpack-dev-middleware

