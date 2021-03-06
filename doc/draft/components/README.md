Components
==========

Components in blockjs are reusable small blocks presented and used graphically 
in the IDE. Users can choose these components from catalogs or even write their 
own and share to the world.

Event and Execution Components
------------------------------

### MainComponent

The main component specifies where the application starts and what objects it can use:

![Main component for an application](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/main.png)

This application uses an object named httpd and the programmer can use all 
components defined for that specific object.

### BlockComponent

BlockComponent is used to make a queue of components that will be executed in that order until all components have been executed or BreakComponent is called.

Generic Data Components
-----------------------

### NumberComponent

![Number Component](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/number.png)

### TextComponent

![Text Component](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/text.png)

Objects can be created, too:

![Component to create an object](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/create-full-object.png)

Here is the same object as JavaScript code:

    {'foo':123,'bar':'text/plain'}

Call Components
---------------

Here is a component that calls method listen in the http server object with two arguments:

![Component to call method](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/full-call-httpd-listen.png)

This is the same component when presented in a different way:

![Component to call method](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/full-call-httpd-listen-2.png)

Event handlers are created with another component:

![Component to handle event](https://github.com/jheusala/blockjs/raw/master/doc/draft/components/httpd-request-event.png)

Event handlers do not need to be connected to other components. This event 
handler has two objects the programmer can use inside the handler 
implementation.

Full Examples
-------------

This is a schema for hello world webserver.

![Hello World webserver using Simplified Model](https://github.com/jheusala/blockjs/raw/master/doc/draft/simplified.png)
