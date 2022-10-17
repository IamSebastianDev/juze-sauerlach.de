<!-- @format -->

# Web

The `web` directory contains the frontend resources used by the website and CMS dashboard.

## Web - Structure

The directory contains the `src` & `public` directories.

-   `src` contains the source code for the dashboard, frontend and shared parts. This is the code that will be bundled and minified by rollup.
-   `public` contains all static assets, like `html`, `css` & `images`

Each of the `src` subdirectories has their own respective structure consisting of smaller modules:

-   `lib` contains the application code as well the components for the site.
-   `config` holds all configuration files / objects
-   `utils` holds utility functions
-   `services` holds services used to communicate with the backend
-   `controllers` contains controllers used to interact with elements on the website

## Web - Development

To develop the frontend, run `yarn dev & yarn serve`. This will bundle the resources and start the backend to serve the files. It should be available on the port specified in your `.env` file, and if no port is specified on port 3000.

## Web - Technology

The frontend makes heavy use of [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). The base class for the projects web components can be found in the [components/core](web/src/shared/lib/components/core) directory. The core component has several methods to simplify building web components.

### `$()` && `$$()`

Type: (selector: string) => Element
Type: (selector: string) => NodeList

The `$` && `$$` methods serve as short cut to execute query selector operations on the component.

```js
...
method() {
    const element = this.$('.selector-class');
    // element now holds a reference to the element of the given class.
    // as only the component is queried, no elements outside the component
    // will be found
}
```

The `$` method substitutes for `document.querySelector()` and the `$$` method is the equivalent for `document.querySelectorAll()`

### `this.output()` & `this.emit()`

Type: (eventName: string, ({ data: any }) => any) => void
Type: (eventName: string, data: any)

Methods that can be used to emit and listen to events of a component, if said component is created with JavaScript.

### `listen()`

Type: (eventName: string) => void

Method to set up a event listener on the component. Can be used with defining events on the component, that will trigger if the event of the correct type is triggered.

```js
constructor() {
    // other code inside the constructor
    ...
    // setup a click listener on the component
    this.listen('click');
}

events = [
    {
        // the event type/name
        type: 'click',
        // the selector that should be listened to
        selector: '*',
        // the action to perform once the event is detected on the element
        action: (ev) => {console.log('clicked')}
    }
]
```

### `injectCSS()`

Type: () => void

Method to inject the global component stylesheet into the component, so that the scoped styles can be used. CSS is written in CSS Modules placed alongside the component, and will be bundled into a global file. The module needs to include this file in a stylesheet in its own markup to be able to use it.
