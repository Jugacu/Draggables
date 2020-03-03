(jugacu = window.jugacu || {})
    .draggable = (element, containersSettings, options = {}, boundary) => {

    let moving;
    let wasOver;

    // Prevents a bug that makes the browser thinks that is dragging.
    element.style.userSelect = 'none';

    element.addEventListener('mousedown', (e) => {
        if (options.ghostMode) {
            element.clone = element.cloneNode(true);
            element.parentNode.append(element.clone);
        }

        tpToCursor(e, options.ghostMode ? element.clone : element);
        enableMoving(options.ghostMode ? element.clone : element);
        setListeners();
    });

    function setListeners() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);

        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);
    }

    function mousemove(e) {
        if (moving) {
            tpToCursor(e, options.ghostMode ? element.clone : element)
        }
    }

    function mouseup(e) {
        if (moving) {
            tryToDrop(options.ghostMode ? element.clone : element, e);
            disableMoving(options.ghostMode ? element.clone : element);
        }
    }

    function tpToCursor(e, element) {
        boundary = boundary instanceof HTMLElement ? boundary : searchBounds(element, 0);

        const x = boundary ? e.clientX - boundary.getBoundingClientRect().left : e.pageX;
        const y = boundary ? e.clientY - boundary.getBoundingClientRect().top : e.pageY;

        element.style.left = `${x - element.offsetWidth / 2}px`;
        element.style.top = `${y - element.offsetHeight / 2}px`;

        execHoverCallbacks(element);
    }

    function searchBounds(element, index) {
        if (index > 100 || element === document.body) return null;
        const position = window.getComputedStyle(element).position;
        return ((position === 'relative' || position === 'absolute') && index > 0) ? element : searchBounds(element.parentElement, ++index);
    }

    function tryToDrop(element, event) {
        const containersSetting = getCollidingContainerSetting(element);
        if (containersSetting && containersSetting.container) {
            if (!isFunction(containersSetting.condition) ||
                (isFunction(containersSetting.condition) && containersSetting.condition(event, element, containersSetting.container))) {
                containersSetting.container.appendChild(element);

                if (isFunction(containersSetting.onDrop)) {
                    containersSetting.onDrop(containersSetting.container, element)
                }

                if (options.ghostMode && options.ghostCanDrag) {
                    jugacu.draggable(element, containersSettings, options, boundary);
                }
            } else if (options.ghostMode) {
                element.parentNode.removeChild(element);
            }
        } else if (options.ghostMode) {
            element.parentNode.removeChild(element);
        }
    }

    function getCollidingContainerSetting(element) {
        for (let i = 0; i < containersSettings.length; i++) {
            const containerSetting = containersSettings[i];
            if (collides(containerSetting.container, element)) {
                return containerSetting;
            }
        }

        return null;
    }

    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    function execHoverCallbacks(element) {
        const containerSetting = getCollidingContainerSetting(element);
        if (containerSetting && isFunction(containerSetting.onHover)) {
            containerSetting.onHover(containerSetting.container, element);
            wasOver = containerSetting;
        } else if (wasOver && isFunction(wasOver.onLeave)) {
            wasOver.onLeave(wasOver.container, element);
            wasOver = undefined;
        }
    }

    function collides(container, element) {
        const aRect = container.getBoundingClientRect();
        const bRect = element.getBoundingClientRect();

        return !(
            ((aRect.top + aRect.height) < (bRect.top)) ||
            (aRect.top > (bRect.top + bRect.height)) ||
            ((aRect.left + aRect.width) < bRect.left) ||
            (aRect.left > (bRect.left + bRect.width))
        );

    }

    function enableMoving(element) {
        element.style.position = 'absolute';
        moving = true;
    }

    function disableMoving(element) {
        element.style.position = '';
        element.style.left = '';
        element.style.top = '';
        moving = false;
    }

};
