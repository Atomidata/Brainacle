PyFaceDetect
============

:author: Dejan Noveski
:date: 2010-12-28 18:00
:tags: python, opencv, face-detection
:category: Coding


PyFaceDetect is a thin wrapper around `OpenCV <http://opencv.willowgarage.com>`_ for detection and marking faces in images.

The module can be used as an API or in console for testing purposes. For usage and options: 

.. code-block:: Bash

    python pyfacedetect.py -h

Sample input
------------

.. image:: http://i.imgur.com/5Lq4O.jpg

Sample output
-------------

.. image:: http://i.imgur.com/56aTg.jpg

The module consists of 2 classes:

    OcvDetector that wraps OpenCV Api for face detection and can be used bare
    without the helper methods for loading images, marking faces, or getting
    human friendly output

    FaceDetect - full feature class that extends OcvDetector and adds helper
    methods for loading/marking/outputing/saving images and dumping faces in
    json.

You can enable scaning for profiles for quantity of faces by setting 
SCAN_FOR_PROFILES to True. That, however will give some overlapping rectangles.

Try and tweak MIN_FACE_SIZE, HAAR_SCALE and MIN_NEIGHBORS so you can change the
accuracy of the detection. For more info, read 
http://opencv.willowgarage.com/documentation/python/objdetect_cascade_classification.html

For speed, all images above 1000width or 1000h are scaled to 1000w or 1000h max.

API Usage
---------

.. code-block:: Python

    face_detect = new FaceDetect()

    face_detect.image_from_file(file_name)#load from file

    face_detect.image_from_input(input_id)#load 1 frame from video input

    face_detect.detect_faces()#stores faces in local list

    face_detect.overlay_image(rgb_border = (255,0,0), width = 2) #overlays original image with rectangles around detected faces.

    face_detect.to_json()#returns json string with faces rectangles

    face_detect.output_image()#shows image in window

    face_detect.save_image(file_name)#saves overlaid image to file_name


Dependencies
------------

`OpenCV 2.1+ <http://opencv.willowgarage.com/wiki/>`_ and Argparse

Source
------
`Bitbucket <https://bitbucket.org/dekomote/pyfacedetect>`_
`GitHub <https://github.com/dekomote/pyfacedetect>`_
