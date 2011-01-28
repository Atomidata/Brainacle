How to easily enable r600g Gallium3D in Ubuntu and Ubuntu derivatives for radeon
================================================================================

:date: 2011-01-05 01:47
:author: Dejan Noveski
:tags: linux, ati, drivers
:category: Miscellaneous


Gallium3D is a software library for 3D graphics device drivers developed by VMware. It's the next big thing in linux graphic drivers world. At the moment, it drives the old (sub r300) ATI graphic cards
and it is in a very active development for NVidia and newer ATI(AMD) hardware. You can read more about Gallium `here <http://wiki.freedesktop.org/wiki/Software/gallium>`_

Last three weeks I became obsessed with the open source radeon driver. There is a lot of buzz going on there, a lot of optimizations and development (much expected in kernel 2.6.38) which is pretty much covered on the forums of
`Phoronix <http://phoronix.com>`_. I decided to take a spin on new drivers, the development versions of `Mesa <http://www.mesa3d.org/>`_ and a newer kernel 2.6.37 from the 
`Ubuntu mainline builds <http://kernel.ubuntu.com/~kernel-ppa/mainline/>`_. I have an R700 based ATI HD4650. The gallium driver for this card is r600g. It shows many improvements and 
optimizations but it's still in development cycle, unlike the driver for older cards r300g which is pretty much the default driver in Meerkat. Because of it's status, r600g is tricky to install 
especially if you aren't comfortable with building git versions with compiler switches that enable gallium in mesa. But, thanks to the guys at `Xorg-edgers PPA <https://launchpad.net/~xorg-edgers/+archive/ppa>`_
the simple mortals can have gallium on Ubuntu as easy as installing a video player.

Xorg-edgers PPA states that if you install the packages from the main PPA (ppa:xorg-edgers/ppa) and add Option "ForceGallium" "true" in xorg.conf, r600g will be used. 
However, if this doesn't work with the latest updates, check `Xorg-edgers/radeon <https://launchpad.net/~xorg-edgers/+archive/radeon>`_. Packages from this PPA enable gallium 
by default. The only thing you need to do is add it: 

.. code-block:: Bash

    sudo apt-add-repository ppa:xorg-edgers/radeon
    sudo apt-get update && sudo apt-get upgrade

Now if you installed the driver/gl stack from /radeon you should delete xorg.conf if you don't have any monitor specific lines there. If you used the main ppa, you should add that option "ForceGallium" inside the device section and *voila*, you have r600g driver running.

I tested this with stock kernel 2.6.35 and updated 2.6.37 and it works pretty good. There is huge performance gain which I felt playing Penumbra Overture. On high settings, 1920x1200 resolution, the game is flying. Video is smooth, compiz works great and games play smoother.
The 2.6.38 kernel brings even more good news for radeon users. Massive performance gain with the `PageFlipping <http://www.phoronix.com/scan.php?page=news_item&px=OTAwNA>`_ and the CollorTilling implementations in the radeon driver give it a big boost.
We just have to wait for a more stable version of the kernel. The kernel is at rc2 stage at the moment of writing.

Anyway, Kudos to the open source driver developers, better make that to ALL open source developers involved in Linux.


**Disclaimer:** This post is a general guideline for installing the
Gallium3D radeon driver for linux practiced by the author. The author
will not accept any liability for any damages/data-loss caused using
the technique described above.

