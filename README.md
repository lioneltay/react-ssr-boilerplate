# Todos

- [x] Add code component splitting
- [x] Add ability to preloaded nested components
- [x] Need a way to know which chunks were loaded on client so that they can be preloaded without using preloadAll() which would load all components of the entire app

- react-router-4
  - [x] Add StaticRouter and BrowserRouter
  - [x] Add redirect
  - [x] Add Code splitted routes

- [ ] Data fetching (generic promises?)

- [ ] loader api could provide props too??

- [ ] Graphql SSR

- [ ] redux SSR

- [ ] styled components SSR

- [ ] CircleCI

- [ ] Lint / build / deploy pipeline

- [ ] How does public path work?
  - How does it work with an in memory file system?
  - How does it work with webpack-dev-middleware


- [ ] Implement preloadReady() which preloads only the used chunks
  - used chunks are determined by a global variable attched by the intial html response in a script tag
  - restructure loader data structure to be an object mapping that includes chunk names



Fix
https://github.com/webpack/webpack-dev-server/issues/1272