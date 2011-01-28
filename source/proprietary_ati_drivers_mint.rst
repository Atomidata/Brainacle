Install Proprietary ATI 10.8 drivers on Ubuntu Lucid / Linux Mint
==================================================================

:date: 2010-09-09 20:55
:author: Dejan Noveski
:tags: linux, ati, drivers
:category: Miscellaneous


I will digress a bit from the theme of the blog, but seeing a lot of
people having issues with installing the ATI drivers on Ubuntu, I
decided to put my thoughts and experience with it here.

I have experimented with the drivers quite a bit. I own Sapphire
Radeon HD 4650, and always try out games on Wine(i wish all of them
worked in Gnu/Linux) which is the reason I need updated drivers on my
rig. Two weeks ago, AMD(then ATI) updated the drivers to 10.8
version. By their claims, these drivers introduce some performance
gain, bugfixes and general stability. I installed the driver 30
minutes before writing this post and it actually works pretty good.

**Now for the technical part:**

What you need is a rig with AMD graphic card powered by a `Linux Mint <http://linuxmint.com/>`_
or `Ubuntu Lucid distro <http://ubuntu.org/>`_ with installed
build-essential. Driver (which
in fact is shell script) can be downloaded `Here <http://support.amd.com/us/gpudownload/Pages/index.aspx>`_. The script is called
ati-driver-installer-[version]-[CPU architecture].run. Download it to
new empty folder - lets call it ati in home folder.

Now we have the driver and we can start with installation. Before we
actually commence the installation, we have to purge/remove the old
ati driver from the system. You should try these commands to remove
it:

.. code-block:: Bash
   
   sudo apt-get purge fglrx 

or

.. code-block:: Bash
   
   sudo sh /usr/share/fglrx/fglrx-uninstall.sh

After the removing is done, reboot the PC. You could be asked to turn
the graphics to low details (safe mode). Do that. Next, open a
terminal and navigate to the folder with the driver.

.. code-block:: Bash
   
   cd ~/ati/

Add permissions for execution to the script:

.. code-block:: Bash
   
   chmod +x ati-driver-installer-[version]-[CPU architecture].run

Generate distro-specific packages(for lucid or mint 9):

.. code-block:: Bash

   sudo ./ati-driver-installer-[version]-[CPU architecture].run –buildpkg Ubuntu/lucid

or list all available distro builds:

.. code-block:: Bash

   sudo ./ati-driver-installer-[version]-[CPU architecture].run –listpkg

After this operation (if everything went ok) you will have several
.deb packages. Install them with the next command:


.. code-block:: Bash   

   sudo dpkg -i *.deb


The drivers are installed. If this is your first ATI driver
installation, invoke next command to make the initial config:


.. code-block:: Bash

   sudo aticonfig –initial


Reboot the PC, and you’ll have the drivers installed. If you have any
problems, refer to the Installation Instructions on the driver’s
download page.



**Disclaimer:** This post is a general guideline for installing the
proprietary ati drivers for linux practiced by the author. The author
will not accept any liability for any damages/data-loss caused using
the technique described above.

