JqCarousel Three-D
##################

:author: Dejan Noveski
:date: 2010-01-27 19:59
:tags: javascript, jquery, plugin, ui
:category: Coding


This plugin was coded to prove a point. We saw another similar plugin like this,
but it was only for sale with obfuscated code, so I decided to write it and opensource it.
It doesn't have the limited functionality and the custom implementation of the paid ones,
it is easy to implement and highly customizable. Works with images and other HTML containers.

`Here </static/uploads/jqcarousel3d/index.html>`_ you can check out a demo of
the carousel. The JS embed code is:

.. code-block:: Javascript

    $('#carouselthreed').carousel3D({
        speed: 900,
        perspectiveZoom: 70,
        sideOffset: 80,
        topOffset:0,
        secondaryOpacity: .35,
        emClass:'tdc-element'
    })

And here is the HTML:

.. code-block:: HTML

    <div id="carouselthreed">
        <img class="tdc-element" src="fly.jpg">
        <img class="tdc-element" src="gates.jpg">
        <img class="tdc-element" src="penguins.jpg">
    </div>

The settings object attributes are:
- speed - Speed of animation in milliseconds (default 350)
- perspectiveZoom - Percentage of secondary element's sizes relative to primary element (default 80)
- sideOffset - Offset of secondary elements (default 70)
- topOffset - Offset from top of secondary elements (default 0)
- secondaryOpacity - Opacity of secondary elements (default 0.8)
- emClass - CSS class of elements that will rotate (images/dom) (default "tdc-element")

Any of those attributes can be omitted and default values will be used.
For reference, the second element in the container is taken, it is the
central element and all other elements are resized relative to it.

**It works with unlimited number of elements.**

`Download </static/uploads/jqcarousel3d/Carousel3D3.js>`_ the plugin and get a
fresh copy of `JQuery <http://jquery.com/>`_ and you're set.

Enjoy
