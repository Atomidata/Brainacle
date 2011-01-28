Benchmark of django deployment techniques
=========================================

:date: 2010-01-19 19:55
:author: Vasil Vangelovski
:tags: django, python, deployment, sys, benchmark
:category: Sys

I made a benchmark of different Django deployment techniques and configurations
mostly for my personal purposes. The results are published in the hope that it
would save others some time. The benchmark was not designed to test the speed 
of Django itself, only to give relative comparison between different techniques
for running a Django application in production environments. I'm not affiliated
with any of the following open source projects: Apache,  Nginx, Cherokee, 
mod_wsgi, mod_python, Cherrypy or uWSGI. Further, I'm not claiming to be an 
expert in configuring any of the software mentioned here.

What was measured
-----------------

The Django project used for the benchmark was a simple application for 
displaying rows from 3 different tables with pagination. Each page had
references to 3 static files (css, javascript and an image). Each page 
involved rendering a simple template inheriting from a base template 
and including another one, built-in filters were also used. The database 
had more than a million records in all three tables combined. I browsed 
different pages of the application over a proxy which recorded the URLs
of the browsing session. So for each request that was handled by the application
there were 3 more requests for static files. For each deployment technique I ran
4 tests at different concurrency levels for 1 minute making GET requests to the
recorded URLs. For each test run I recorded throughput (number of requests
served per second), response time (average time in which a request was served)
and longest request (the longest time a request was served in each run). 
Only for the tests at highest concurrency levels I recorded memory usage. 
I tried to make sure that only the necessary processes for each test were 
running at a time. Automatic maintenance tasks on the system and the database 
were turned off. Every test cycle was repeated at least 3 times to 
recheck the results.

Hardware and software details
-----------------------------

For generating the loads I used Siege and ran all the benchmarks over 
gigabit ethernet from a 2.16 GHz machine with 2 GB of RAM running OS X Snow
Leopard.

The system that served as a web and database server ran in a VMware appliance
on a 2.8 GHz Core2Duo PC with 8GBs of RAM. The appliance was given only 1GB 
of working memory and assigned both cores of the CPU. Software details:

- Ubuntu 9.10 32b
- Python 2.6
- PostgreSQL 8.4
- Apache 2.2.12 worker MPM
- Nginx 0.7.64
- Cherokee 0.99.39
- Django 1.1
- psycopg2 2.0.8

Tested configurations
---------------------

Apache with mod_wsgi
++++++++++++++++++++

This was the first configuration I tested. Apache was serving both the static
files and dynamic content via mod_wsgi which ran in daemon mode with 5 processes
and 1 thread per process.

Nginx + Apache with mod_wsgi
++++++++++++++++++++++++++++

My preferred configuration for running django sites. Apache with mod_wsgi
was used only for the dynamic content, requests to these urls were proxied
by nginx. Static files were served by nginx directly.

Nginx + fcgi
++++++++++++

Here nginx is used for serving the static content while the dynamic content 
was handled by FastCGI processes. I used all the defaults from the runfcgi
management command and used a TCP socket instead of a socket file because I
was bumping into issues with access to the socket file at large numbers of 
concurrent requests.

Cherokee + SCGI
+++++++++++++++

This was set up from the Cherokee web based wizard for deploying django 
applications. Static files were served by Cherokee directly. I have to say 
this is by far the  easiest method of deploying Django applications in 
production environments.

Cherokee + Apache with mod_wsgi
+++++++++++++++++++++++++++++++

This is essentially the same as Nginx + Apache and mod_wsgi except here
Cherokee was used as a proxy and for serving static content. Since it's the
first time I'm using Cherokee everything was configured via the web based admin
interface and all parameters were left to default values.

Nginx + Cherrypy WSGI server
++++++++++++++++++++++++++++

Here I used the `django-cpserver <http://github.com/lincolnloop/django-cpserver>`_ 
management command to run the application in the Cherrypy WSGI server. 5 
Instances of the WSGI server were running behind Nginx as a load balancer.
Nginx was serving the static files.

Configurations that are left out
--------------------------------

Apache with mod_python
++++++++++++++++++++++

This was left out because I couldn't get consistent results at 250 concurrent
requests and the application would often error out at this concurrency level.
The benchmark already took a significant amount of my time and I'm not
experienced with mod_python so I decided not to proceed with locating the
problem or publishing any shaky results.

uWSGI
+++++

I tried to deploy the application on uWSGI with the Cherokee web based wizard.
With the default configuration (1 process) the tests ran 4 times slower at high
concurrency compared to the other configurations. Bumping up the number of
process to 5 still didn't yield comparable results. At 25 processes I got
comparable results but memory usage skyrocketed. I still suspect I was doing
something wrong here, so I didn't publish the results.

lighttpd
++++++++

Personally I avoid using lighty for a number of subjective reasons. When I have
the time I may update this post with some configurations based on lighty,
although I wouldn't expect the results to be much different than the ones
for the Nginx or Cherokee configurations.

The results
-----------

.. image:: http://spreadsheets.google.com/oimg?key=0ApNjbkQcMGV4dGdJOFVicHNGSFJGemFRT1pGMnVQMlE&amp&oid=5&amp&v=1263914004562
    :target: http://spreadsheets.google.com/oimg?key=0ApNjbkQcMGV4dGdJOFVicHNGSFJGemFRT1pGMnVQMlE&amp&oid=5&amp&v=1263914004562


.. image:: http://spreadsheets.google.com/oimg?key=0ApNjbkQcMGV4dGdJOFVicHNGSFJGemFRT1pGMnVQMlE&amp&oid=7&amp&v=1263914042360
    :target: http://spreadsheets.google.com/oimg?key=0ApNjbkQcMGV4dGdJOFVicHNGSFJGemFRT1pGMnVQMlE&amp&oid=7&amp&v=1263914042360

.. image:: http://spreadsheets.google.com/oimg?key=0ApNjbkQcMGV4dGdJOFVicHNGSFJGemFRT1pGMnVQMlE&amp&oid=6&amp&v=1263914066019
    :target: http://spreadsheets.google.com/oimg?key=0ApNjbkQcMGV4dGdJOFVicHNGSFJGemFRT1pGMnVQMlE&amp&oid=6&amp&v=1263914066019

Memory usage
++++++++++++

I measured memory usage only at 250 concurrent requests. All the tests ran for
60 seconds, so you can work out where the load on the server happened from the
graphs.

Apache with mod_wsgi
____________________

.. image:: /static/uploads/djbenchmark/mod_wsgi2-300x225.png
    :target: /static/uploads/djbenchmark/mod_wsgi2.png

Nginx + Apache with mod_wsgi
____________________________

.. image:: /static/uploads/djbenchmark/nginxmod_wsgi3-300x225.png
    :target: /static/uploads/djbenchmark/nginxmod_wsgi3.png

Nginx + FCGI
____________

.. image:: /static/uploads/djbenchmark/nginxcgi1-300x225.png
    :target: /static/uploads/djbenchmark/nginxcgi1.png

Nginx + Cherrypy
________________

.. image:: /static/uploads/djbenchmark/nginxcp1-300x225.png
    :target: /static/uploads/djbenchmark/nginxcp1.png

Cherokee + SCGI
_______________

.. image:: /static/uploads/djbenchmark/cherokeewscgi1-300x225.png
    :target: /static/uploads/djbenchmark/cherokeewscgi1.png

Cherokee + Apache with mod_wsgi
_______________________________

.. image:: /static/uploads/djbenchmark/cherokeewsgi1-300x225.png
    :target: /static/uploads/djbenchmark/cherokeewsgi1.png

