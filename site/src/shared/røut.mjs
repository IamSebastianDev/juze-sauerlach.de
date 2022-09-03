/** @format */

/**

@name Røut.js
@version 0.9.0

@license MIT

Copyright 2020 Sebastian Heinz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

export default class Røut {
    /**
     *
     * @constructor is called when the router gets instantiated.
     *
     * @param { Object } routes - all routes the router compares the url location against. Routes consist of a identifier and a template and can have an optional title property that will be used as page title and can contain a child route object
     * @param { Object } options - optional options object
     */

    constructor(routes, options = {}) {
        // the private routes property contains the references between routes and templates to return

        this._routes = routes;

        // parsing the options object

        // internal default settings used to merge and parse
        this._internalDefaults = {
            method: 'path', // hash / path based routing. Enable path if you want to clean out the hash from the URL and use child routes. The server needs to be configured to route all get request without a valid destination to a hashed version of the request url.
            redirect404: false, // set to true to redirect to "/" instead to a page404 if a route can not be found.
            entryPoint: 'index', // the name of the entry point of the router. By default this is index
            useRender: true, // set to true to use the render method instead of calling the callback. The Render method will parse a html template string and add add it to the renderTarget correctly. If set to false, Røut will simply invoke the callback and rendering will be handled by the associated callback.
            renderTarget: document.querySelector('body'), // the target element for the render
            resetScroll: true, // resets scroll to the top of the page on page load to simulate a new page
        };

        // merge the options argument and the internal defaults
        this._options = { ...this._internalDefaults, ...options };

        // set up load and hashchange ev listeners
        window.addEventListener('hashchange', this._match.bind(this, window.location));

        window.addEventListener('load', this._match.bind(this, window.location));

        // return this for testing and logging purposes
        return this;
    }

    /**
     * @public Method
     *
     * Method used to change location programmatically
     *
     * @param { string } route
     */

    goTo(route) {
        // create a new url from the route and base
        let string = new URL('http://localhost/' + route);

        // create a url from the route and call the match method to initiate a route change
        this._match(string);
    }

    /**
     * @public Method
     *
     * Method used to add routes to the existing route object.
     *
     * @param { String } routeName - the name and identifier of the route
     * @param { Object } route - the route object that will be added to the route
     * @param { Array } sub routes - Array of Strings the sub routes will be constructed of, if undefined the new route will be added as a base route. sub routes will be created if they don't exist
     * @returns { Object } - Returns the newly created route
     */

    create(routeName, route, subroutes = []) {
        // define the temporary variable for traversing

        let currentRoute = this._routes[subroutes[0]] ? this._routes[subroutes[0]] : undefined;

        // for all subroutes
        for (let i = 1; i < subroutes.length; i++) {
            // check if the subroutes exists

            if (currentRoute[subroutes[i]]) {
                // if the route exists, set current Route to the route and traverse further

                currentRoute = currentRoute[subroutes[i]];
            } else {
                // if the route does not exist, create the route and set the current Route
                currentRoute[subroutes[i]] = {};
                currentRoute = currentRoute[subroutes[i]];
            }
        }

        if (!currentRoute) {
            this._routes[routeName] = route;
            return this._routes[routeName];
        } else {
            currentRoute[routeName] = route;
            return currentRoute[routeName];
        }
    }

    /**
     * @public Method
     *
     * Method used to remove a route from the existing route object.
     *
     * @param { String } route - String that the router will try to match to remove. If not found, the router returns false
     * @returns { Boolean } - In case the route string cannot be matched, the method returns false, otherwise it returns true.
     */

    remove(route) {
        // check for correct syntax
        if (route[0] != '#') {
            throw new Error('Route syntax incorrect. Leading # required.');
        }

        // parse the route
        let path = this._parse(route);

        // find the route
        if (path.path.length === 0) {
            // if no path has been parsed, delete the route with the hash name on the base route level
            delete this._routes[path.hash];
        } else {
            // if a path exists, traverse the path until the required route has been found
            let currentRoute = this._routes[path.path[0]];

            // traverse the route until the last path segment is reached.
            for (let i = 1; i < path.path.length; i++) {
                if (currentRoute.children[path.path[i]] && i < path.path.length - 1) {
                    currentRoute = currentRoute.children[path.path[i]];
                } else {
                    // delete the last past segment

                    delete currentRoute.children[path.path[i]];

                    // check if the children property is empty, if so delete it.

                    if (Object.keys(currentRoute.children).length === 0 && currentRoute.constructor === Object) {
                        delete currentRoute.children;
                    }

                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @public Method
     *
     * Method resets the route object to {}
     */

    reset() {
        this._routes = {};
    }

    /**
     * @private Method
     *
     * Method to match a url string against the route object and execute the callback / template
     *
     * @param { URL } url - the url the route object will be matched against to find the requested route
     * @returns { Function } - the route callback / template
     */

    _match(url) {
        // validate the passed url

        if (!typeof url == 'object' || !url.hash == undefined) {
            // if the passed url is not an object or does not contain a defined hash property, throw an error.

            throw new Error('Passed argument is not a window.location object.');
        }

        // parse the url to split it into hash, path and query
        let parsedURL = this._parse(url.hash);

        // helper function to set title
        const setTitle = (route) => {
            // get the title tag of the document

            let title = document.querySelector('title');

            // check if a title property exists on the route
            if (route.hasOwnProperty('title')) {
                title.textContent = route.title;
            } else {
                return false;
            }
        };

        // helper function to redirect on route mismatch
        const handleRouteMismatch = () => {
            // if the route cannot be matched, check for redirection instructions

            if (this._options.redirect404 || !this._routes['404']) {
                // if 404 redirection flag is set to true, or a page404 route does not exist, route to entry point instead

                window.location.hash = '#';
            } else {
                // else route to 404

                this._options.method === 'path' ? (window.location.hash = '#/404') : (window.location.hash = '#404');
            }
        };

        // match the parsed url against the routes object

        if (this._options.method === 'hash') {
            // if method is set to hash, only the hash will be compared against the available routes
            // the hash will also not be stripped from the url
            // child routes will not be accessible

            // try to match the route

            if (this._routes[parsedURL.hash]) {
                // if the route can be matched execute the template
                if (this._options.useRender) {
                    this._options.resetScroll ? window.scrollTo(0, 0) : null;
                    this._render(
                        this._options.renderTarget,
                        this._routes[parsedURL.hash].template,
                        parsedURL.query,
                        this._routes[parsedURL.hash].callback,
                        this._routes[parsedURL.hash].callbackArgs
                    );
                } else {
                    this._routes[parsedURL.hash].callback(parsedURL.query, {
                        dest: parsedURL.hash,
                        ...this._routes[parsedURL.hash],
                    });
                }

                // set the page title
                setTitle(this._routes[parsedURL.hash]);
            } else {
                // if no route can be found, handle the redirect

                handleRouteMismatch();
            }
        } else if (this._options.method === 'path') {
            // if method is set to path, hash and path will be matched against the routes.
            // leading # will be removed from the url
            // this way, child routes can be defined as another route object under the "children" property

            /**
             * Helper function to retrieve the from a constructed path
             *
             * @param { Array } path - the path segments the route object should be traversed upon
             * @returns { Boolean, Object } - returns false if the route can not be matched, or the route if a route can be established
             */

            const constructRoute = (path) => {
                // define return
                let constructedRoute;

                // check if the parsedURL obj contains path segments
                if (path.length === 0) {
                    // if no path segments exists return the entry point template

                    return this._routes[this._options.entryPoint];
                } else {
                    // check if a child route exist

                    if (this._routes[path[0]]) {
                        // if the base route exists, assign it to the constructed route as entry point

                        constructedRoute = this._routes[path[0]];
                    } else {
                        // if it doesn't, return false;

                        return false;
                    }

                    // if the route has children try to assign them

                    if (constructedRoute.children || path.length != 0) {
                        // loop through the path segments beginning from index 1, since index 0 is already assigned
                        // this retrieves the route object if it exists

                        for (let i = 1; i < path.length; i++) {
                            if (
                                constructedRoute.children && // if the constructed route has a child property
                                constructedRoute.children[path[i]] // and if the child property can be matched against
                            ) {
                                constructedRoute = constructedRoute.children[path[i]]; // assign the child to be the current constructed route
                            } else {
                                // if not, return false

                                return false;
                            }
                        }
                    }
                    // return the retrieved route object

                    return constructedRoute;
                }
            };

            // create and match the path against the route object
            let route = constructRoute(parsedURL.path);

            if (!route) {
                // if the route cannot be matched, check for redirection instructions

                handleRouteMismatch();
            } else {
                // if the route can be matched

                // call the route callback
                if (this._options.useRender) {
                    this._options.resetScroll ? window.scrollTo(0, 0) : null;
                    this._render(
                        this._options.renderTarget,
                        route.template,
                        parsedURL.query,
                        route.callback,
                        route.callbackArguments
                    );
                } else {
                    route.callback(parsedURL.query, route.callbackArgs);
                }

                // perform a replacement operation on the history state
                window.history.replaceState(
                    {},
                    route.title,
                    `/${parsedURL.path.join('/')}${
                        parsedURL.query.toString().length != 0 ? '?' + parsedURL.query.toString() : ''
                    }`
                );

                // set the page title
                setTitle(route);
            }
        } else {
            throw new Error("Incorrect Method set. 'path' or 'hash' possible.");
        }
    }

    /**
     * @private Method
     *
     * Method to parse the URL string and separate path and query parameters
     *
     * @param { String } hash - the url hash string to parse
     * @returns { Object } - the parsed Route separated into path and query properties in which path is an Array of Strings and query is an Object
     */

    _parse(hash) {
        // define the return object

        let parsedURL = new Object();

        // extract the pure hash from the passed string
        // if the hash is empty, set to the entry point of the app instead.
        // remove leading hash

        parsedURL.hash =
            hash === '' ? this._options.entryPoint : hash.match(/#.?(?=\/)|#.*(?=\/)|#.*/gim)[0].replace('#', '');

        // extract all path segments from the path

        let pathSegments = hash.match(/\/.*(?=\/)|\/.*(?=\?)|\/.*(?=)/gim) || [];

        // sanitize the path segments and remove the leading backslash

        pathSegments = pathSegments.map((elem) => elem.replace('/', ''));

        // add the path segments to the object

        parsedURL.path = pathSegments;

        // extract the query parameters into an URL search params object
        // the hash string is split after the "?"

        parsedURL.query = new URLSearchParams(hash.split('?')[1]);

        // return the parsed URL

        return parsedURL;
    }

    /**
     * @private Method
     *
     * Method to parse and traverse a route string to find a particular route
     *
     * @param { String } string - the String that should be traversed, in "/" notation without the leading /
     * @param { Object } routes - the routes container the path should be compared against
     */

    _parseRouteName(string, routes) {
        return string.includes('/') ? string.split('/').reduce((o, i) => o[i], routes) : routes[string];
    }

    /**
	 * @private Method
	 *
	 * Method to parse and render a html string
	 *
	 * @param { HTMLElement } target - the target element the template content should be appended to
	 * @param { Function } template - the template that is about to be rendered
	 * @param { URLSearchParams } query - query parameters passed into the render
	 * @param { Function } callback - callback method that gets called after the render is complete.
	 * @param {array} args - arguments supplied to the callback
		 
	 } }
	 */

    async _render(target, template, query, callback, args) {
        // instantiate a DOM Parser instance for parsing a template sting
        const parser = new DOMParser();

        // retrieve the html string
        let html = await template(query);

        // parse the html string and retrieve the template
        let parsedHTML = parser.parseFromString(html, 'text/html').querySelector('template');

        // remove all children
        while (target.firstElementChild) {
            target.firstElementChild.remove();
        }

        // append the content of the document fragment
        target.appendChild(parsedHTML.content);

        // if a callback is provided, execute it
        if (callback != undefined) {
            callback(query, args);
        }
    }
}
