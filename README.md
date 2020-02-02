Draggables
==
Draggables is a lightweight and simple drag n' drop solution with all
the basic features you will need.

## Install
Just download the latest version and put it up into your code!
```html
<script src="path/to/draggable.js"></script>
```

## Examples
Start by creating your first draggable!
```html
<div id="container"></div>
<div id="drag" class="draggable">
    Drag me!
</div>

<script>

// Here we get both elements, the container and the draggable.

const container = document.querySelector('#container');
const drag = document.querySelector('#drag');

// And then we make the draggable actually drag, giving it
// a list of containers that is allowed to drop.

jugacu.draggable(drag, [
    {
        container: container
    }
])
</script>
```
Notice that you can pass in as many containers as you want.

### Control

Some times you'll need some kind of control of when the draggable its actually
allowed to drop, for that we just pass in a control function.

This control function will be called just before the drop action.

```js
// This is not an actual function, you should code whatever you want!
function isWeatherClear() {
    return true
}

jugacu.draggable(drag, [
    {
        container: container,
        condition: isWeatherClear
    }
])
```

So it only will be able to drop it we have a nice sunny weather!

### Options
This draggables accepts a bunch of options for you to customize

#### ghostMode
This option creates a clone of the element that gets dragged to create the illusion that
the original element ins't moving. 
```js
jugacu.draggable(drag, [
    {
        container: container
    }
], {
    ghostMode: true
})
```

#### ghostCanDrag
This option allows the ghost element to be draggable when dropped into a container, must
have 'ghostMode' enabled in order to work.

```js
jugacu.draggable(drag, [
    {
        container: container
    }
], {
    ghostMode: true,
    ghostCanDrag: true
})
```
### Events

Draggables provides a simple event handler for mostly of your
basic needs

#### onHover
Its triggered when the draggable element touches its respective container.
To this function is passed the respective container and its element.

```js
function doSomethingAmazing(container, element) {
    console.log(container, element)
}

jugacu.draggable(drag, [
    {
        container: container,
        onHover: doSomethingAmazing
    }
])
```

#### onLeave
Its triggered when the draggable looses contact with its respective container.
To this function is passed the respective container and its element.

```js
function stopDoingSomethingAmazing(container, element) {
    console.log(container, element)
}

jugacu.draggable(drag, [
    {
        container: container,
        onLeave: stopDoingSomethingAmazing
    }
])
```
#### onDrop
Triggered when the draggable successfully  drops into some container.
To this function is passed the respective container and its element.
```js
function weDidit(container, element) {
    console.log(container, element)
}

jugacu.draggable(drag, [
    {
        container: container,
        onDrop: weDidit
    }
])
```