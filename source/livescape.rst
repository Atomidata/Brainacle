Livescape jQuery Live Landscape
##################################

:author: Dejan Noveski
:date: 2009-12-15 19:56
:tags: javascript, jquery, plugin, code, ui
:category: Coding


The idea behind this plugin is to have some kind of landscape container that
will contain objects moving inside of it e.g. sky with the clouds moving.
The plugin is built simple, has simple implementation, it is very easy to
use, yet very flexible. You only need the landscape image, the object images
and one container.

.. code-block:: Javascript

    $('#livescape').livescape({
        //height of the landscape (can be omitted)
        height : '360px',  
        //width of the landscape (can be omitted)
        width : '1000px', 
        //background image (can be omitted)
        background_image : 'img/bg.jpg', 

        // Next define the objects that are moving:
        objects : [
            {
                //the positions are relative to the landscape
                //if omitted, random assumed - same for duration
                
                //x of start position
                start_x : "1700px", 
                //y of start position
                start_y : "190px", 
                //x of end position
                end_x : "-4000px", 
                 //y of end position
                end_y : "190px",
                //image of the object (url)
                image : 'img/car.png', 
                // duration of the animation
                duration : 18000, 
                // the animation loops
                loop : true, 
                //the object is anchor
                href : "ThisisBatCountry.png", 
                //pause in between loops in ms
                pause: 1000,
                //the objects fade in on start and out on end
                fade : true 
            },
            //another object
            {
                start_x : "-250px",
                start_y : "5px",
                end_x : "1250px",
                end_y : "5px",
                duration : 49000,
                image : 'img/cloud1.png',
                loop : true,
                fade : true
            }
        ]
    })

This is setup is for 2 objects. The implementation is pretty intuitive and i 
think you will get a hold of it very fast.

Update
======

- The objects now turn towards the direction of movement using CSS3 rotation.
- For every object you can define a random starting and ending range using the attrubutes:
    - range_sx_min (start_x min range)
    - range_sx_max (start_x max range)
    - range_ex_min
    - range_ex_max
    - range_sy_min
    - range_sy_max
    - range_ey_min
    - range_ey_max

    all these attributes can be omitted and random will be used.

**The plugin is still beta and needs refactoring.** Nevertheless you will 
have access to an early access version.

Source and example
==================

You can check this plugin in action `here </static/uploads/livescape/index.html>`_

Get the `source  </static/uploads/livescape/jqLiveScape.js>`_
