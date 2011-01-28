Calculating image entropy with Python, How and Why?
===================================================

:date: 2010-10-04 12:20
:author: Dejan Noveski
:tags: development, entropy, image, pil, python
:category: Coding


The Why?
---------

Lets say you are developing a video portal, kinda like youtube/vimeo
and you want to have an automated way of making thumbnails. Since
video manipulation in python is a bit tricky, you might as well make
the thumbnails with **ffmpeg** every [n] seconds. You need 10 thumbnails
for each video, and you want those thumbnails to show parts of it.

If you leave it random, you might end up having thumbnails that show 
a black scene or some scene that barely shows anything. Using the
image 
entropy, you can sort out the thumbnails based on the `"business" <http://www.astro.cornell.edu/research/projects/compression/entropy.html>`_ of
the scene they depict. The technique can be implemented as follows:


1. Generate n>[thumbnails_needed] thumbnails
2. Calculate the image entropy for each of them
3. Sort them by their entropy
4. Use the first [thumbnails_needed] thumbnails


The How?
--------

**Entropy** H of a sampled signal of length N samples is calculated:

.. code-block:: Text

   H(X) = -1 * sum_1_to_N ( p_i log( p_i ) )

p_i is the probability of the i-th sample of the signal and can be calculated:

.. code-block:: Text

   p_i = Histogram(sample)[i]/Length(Histogram(sample))

All we need to do is to get the histogram list and we can calculate
the entropy.

On a first sight, this sounds like a complex mathematical problem. And
it is, but we will make a little shortcut. We will use the `Python
imaging library <http://www.pythonware.com/products/pil/>`_ or **PIL**. This package is de facto standard package for
image manipulation in Python. It is one of the first packages I
install when preparing my development environment (before making
virtualenvs). PIL provides a method for calculating the histogram of
the image and solves most of our problems. The function for
calculating the entropy looks like this:

.. code-block:: Python

   import Image
   import math


   def image_entropy(img):
       """calculate the entropy of an image"""
       histogram = img.histogram()
       histogram_length = sum(histogram)

       samples_probability = [float(h) / histogram_length for h in histogram]

       return -sum([p * math.log(p, 2) for p in samples_probability if p != 0])

   img = Image.open('headshot.jpg')
   print image_entropy(img)

 

As you can see, PIL’s method for calculating the histogram really
simplifies things and makes the functions seem slim and simple. All
its left is iterating through set of thumbnails, calculating the
entropy and sorting them.

Remember: **Bigger entropy means more
noise/liveliness/color/business.*** You will usually need the thumbnails
with greater entropy.
