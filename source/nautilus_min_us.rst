########################
Nautilus-minus extension
########################

:author: Dejan Noveski
:date: 2011-02-14 19:01
:category: Coding
:tags: linux, coding, python, gnome, nautilus


**nautilus-min.us** is an *extension* for nautilus that makes uploading images
and galleries to http://min.us easier for the user. It adds an item in the
context menu, so when you select one or more images, you click "Upload to min.us",
wait for a moment, and your default browser will open on the gallery page.

.. container:: center-align

    .. image:: /static/uploads/minus-menu.png


Installation
############

Automatic installation
======================

You can install the extension from `this deb file <https://github.com/dekomote/nautilus-min.us/downloads>`_.
It should take care of all dependencies etc. If this method fails, try manual installation:

Manual installation
===================

Get the tarball with the latest source `here <https://github.com/dekomote/nautilus-min.us/tarball/master>`_,
Extract it into $HOME/.nautilus/python-extensions/ . If there isn't such
directory, create it with your user. Extract the tarball so that the script
*upload_to_minus.py* and the dir *minus_utils* are directly in *python-extensions/*
and not subfolders.

The extension needs `python-nautilus <http://projects.gnome.org/nautilus-python/>`_
package. On Ubuntus or Debians, install it using apt:

    sudo apt-get install python-nautilus

The extension notifies the user via libnotify (pynotify) which is present on Ubuntus
and some Debians. If that's not there, it falls back to zenity, which is in
standard gnome installation. Try to get at least one of these packages so you
can be notified of eventual errors/ updates.

Future
######

I would love to hear some comments, critique, feature requests etc. You can fork it,
request pulls and comment on `GitHub <https://github.com/dekomote/nautilus-min.us/>`_.

