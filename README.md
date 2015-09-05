# The Iron Developer


## Build Step

```
npm install
webpack --watch
```

## Flux Setup

I know that using the flux paradigm for my simple homepage is overkill, but I wanted to have a simple environment to
play with it. To get my homepage setup with flux, I added 4 new files and made only a few slight adjustments:

* `AppActions.es6` - An object literal that calls App.dispatch
* `AppConstants.es6` - An object literal that maps strings
* `AppDispatcher.es6` - Initializing `flux`'s `flux.Dispatcher` model
* `AppStore.es6` - A singleton object literal that has been registered with AppDispatcher.

The general workflow is a little confusing at first, but let me see if I can summarize:

**Pre User Interaction:**

1. `AppStore` registers a case/switch of actions to the `AppDispatcher`.
2. React Components bind listeners to the `AppStore`.

**User Interaction:**

1. User clicks on a button
2. React Component's `onClick` catches the click, which calls an action defined on `AppActions`
	* action type and data are passed in as arguments to the
3. `AppActions` calls the `AppDispatcher.dispatch` function.
4. `AppDispatcher` calls upon the registered functions, with the intent to match the case/switch.
    * If an action is found, the `AppStore` will the data that its currently storing, and emit a `change` event
5. A React component will respond to the `AppStore.trigger('change')` event by updating its state.

**Notes:**

Incredibly Useful Resource: [Flux For Stupid People](http://blog.andrewray.me/flux-for-stupid-people/)


## WebPack Breakdown

```
entry
  |
  |-- styles.less
  |
  |-- scripts/app.jsx
           |
           |-- navigation.jsx
           |
           |-- home.jsx
```