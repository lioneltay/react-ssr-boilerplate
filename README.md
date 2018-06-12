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

- [x] Webpack / babel plugin to remove the need to manually name chunks
  - [x] Read webpack contributers guide for deeper understanding https://webpack.js.org/contribute/writing-a-plugin/

- [ ] Learn more about babel plugins

- [x] styled components SSR
  - [x] Read through all of styled components docs again
    - attrs, extends, custom-mixins using javascript, referring to other components

- [ ] Clean up async-components implementation
  - look out for a memory leak (array of loaders)




# Drag and Drop
- [ ] Drag and drop library
- [ ] Use action/reducer pattern
    - discriminated union types
    - enum action type
  - use new Pointer events
- [ ] DragPreviews: What to display when dragging
- [ ] CursorItem: Renders a fixed position element that is centered around the pointer

- [ ] Read jameiebuilds babel handbook


- [ ] Can use typescript for main server script + babel-node
  - [ ] can use typescript for other lib files too, like webpack-hot-server-middleware
    - [ ] Add a build complete log to server bundle

- [ ] Add context field to webpack config (fix it so that if you are not in the correct directory it still works)

- [ ] MOVE TO A MONO REPO, remove all the annoyances of syncing versions

- [ ] State debugability without redxu and redux deve tools


- [ ] Webpack tree shaking

- [ ] error-box display


- [ ] Data fetching (generic promises?)

- [ ] loader api could provide props too??

- [ ] Graphql SSR

- [ ] redux SSR

- [ ] CircleCI

- [ ] Lint / build / deploy pipeline
  - [ ] linter could be just a call to tsc with 'noEmitError: true' ?

- [ ] Build optimisation
  - [ ] HMR not as fast as it was initially

- [ ] production builds


- [ ] How does public path work?
  - How does it work with an in memory file system?
  - How does it work with webpack-dev-middleware

