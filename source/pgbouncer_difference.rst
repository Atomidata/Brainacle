Pgbouncer Makes a Difference
=============================
:author: Vasil Vangelovski
:date: 2010-06-15 23:17
:tags: django, pgbouncer, pgpool, postgresql
:category: Sys

Last week I was building VMware images for database and web server
appliances that would host a fairly large Django application. The
application is backed by a PostgreSQL database and I was looking for
some info on compiling/configuring pgpool on Debian (I like to compile
stuff when I can, especially when the last version of Debian is 2
years old). Googling around I came across some very interesting posts
on mailing lists and SO regarding Django, PostgeSQL and connection
pooling.

Among other things, people seem to have a notion that using pooling
middleware won’t accomplish much as the web server still needs to open
a TCP connection and that is the source of a noticeable overhead for
each request. So they’ve come up with solutions to avoid opening TCP
connections as much as possible, trying to accomplish something
similar to what SQLAlchemy’s connection pool does, keeping the web
server connected to the database with multiple connections at all
times. These solutions of course range from changing the code in
django.db.backends.... to monkey-patching it.

When you change Django’s code you’ve just created a fork of a growing
and evolving open source project and based your own project around
that fork you have to maintain yourself. Monkey-patching is not as
bad, but comes very close regarding maintenance problems. And is all
that really necessary?

The Overhead Doesn’t Stem From Opening TCP Connections
-------------------------------------------------------

Every time you open a database connection (session) to execute some
SQL on a Postgres database the Postgres server spawns a new process
and upon closing the connection (session) from your application that
process is shut down. With the way Django handles database sessions
this is repeated for every request. Which means for every request
Postgres will have to spawn a new worker process that will last for
the duration of the database session involved in responding to that
HTTP request. The overhead involved in opening a TCP connection to a
process running on the same machine or on the same network is not much
compared to the overhead involved in spawning a new process.


Solutions Do Exist
-------------------

So if the overhead for each request comes from spawning new processes
then the obvious solution would be to keep that at a minimum level. If
you keep the connections to the database server open and reuse them
for every request then the processes spawned at the time the
connections were established would be reused as the connections are
reused.

But you don’t have to keep your web server connected to the database
server to achieve this. Two more popular solutions are pgpool II and
pgbouncer. Both are designed as sort of middleware proxies that sit
between your application and your database. Pgpool is more of a
replication and load balancing solution than a connection pool. It
works as a connection pool because at each connection opened by your
application to pgpool it will have a separate process handling that
connection, but it will keep those processes alive and connected to
the Postgres server even after your application closes those
connections. So using it would have the effect of lowering the net
amount of new processes created to serve a certain number of requests
to your web application. Pgbouncer on the other hand handles all the
requests between your application and Postgres in a highly efficient
asynchronous manner by utilizing libevent and not using
multiprocessing at all, and it will keep the initially opened
connections for a longer time after your application closes them, so
making a new connection to pgbouncer will rarely result in Postges
spawning a process.

The Proof
----------

To prove that solutions like pgbouncer do make a difference I created
a simple test scenario. A very small Django project with one page
displaying 5 rows from a table in a PostgreSQL database. Both the
database server and the web server (Apache with mod-wsgi in daemon
mode) running on one small VM with 1GB of RAM and 4 CPU cores
assigned.

In the first test I configured the application to connect to the
database server directly and put the page under 
`siege <http://www.joedog.org/index/siege-home>`_ with 1, 5, 15,

50, 100 and 200 concurrent requests, each session lasting for 1
minute. Then I repeated the process with the application configured to
connect to pgbouncer instead. The results show something close to a
50% increase in responsiveness:

.. image:: https://spreadsheets.google.com/oimg?key=0ApNjbkQcMGV4dGktNUpCUmtsbWFoWHc5WFRjQjFXV0E&oid=2&zx=8zp184e7ixus
