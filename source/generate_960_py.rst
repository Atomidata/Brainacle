Generate960.py
==============

:author: Dejan Noveski
:date: 2011-01-15 12:06
:tags: python, 960gs, grids, design
:category: Coding

Command line utility script for generating custom `960gs <http://960.gs>`_ grids (css). It can generate grids will custom width, column number and gutter width. Outputs to file or stdout.

Usage
-----

.. code-block:: bash

    python generate960.py

Optional Arguments
------------------

    -h, --help            show help message and exit

    -w WIDTH, --width WIDTH  Content width in px. Defaults to 960px.

    -c COLUMNS, --columns COLUMNS   Number of columns. Defaults to 12.

    -g GUTTER, --gutter GUTTER   Gutter width in px. Defaults to 20px.

    -f FILE, --file FILE  Name of the file to be saved. If this is not specified the css will be printed to stdout

To generate 1024 grid with 15px gutters and 10 columns:

.. code-block:: bash

    python generate960.py -w 1024 -c 10 -g 15

Requirements
------------

`Jinja2 <http://jinja.pocoo.org/>`_ and `Argparse <http://code.google.com/p/argparse/>`_

Source
------
`Bitbucket <https://bitbucket.org/dekomote/generate960.py>`_
`GitHub <https://github.com/dekomote/generate960.py>`_

