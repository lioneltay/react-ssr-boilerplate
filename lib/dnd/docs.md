# Todo

- [ ] Draggable
- [ ] Dropzone
- [ ] Reader
- [ ] CursorElement

- [ ] Performance
  - [ ] Throttle mousemove event using requestAnimationFrame()
  - [ ] Implement should component update

- [ ] Add an event listening system.
  - [ ] Listening to drop events...
  - [ ] Add rxjs??

## Draggable

### type: string | number

Describes what is being dragged. Type of a Draggable must match the type of a Dropzone in order to be dropped.

### data: object

The data that the Draggable contains. A Dropzone will receive this data when a Draggable is dropped on the Dropzone.

### children: (context) => React.ReactElement<any>

A Render prop that receives context.