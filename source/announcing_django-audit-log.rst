Announcing Django-audit-log
===========================

:date: 2009-12-22 21:39
:author: Vasil Vangelovski
:tags: django, python, audit-log
:category: Coding

For those unfamiliar with the term, a definition from Wikipedia:
    
    Audit trail or audit log is a chronological sequence of audit records, each
    of which contains evidence directly pertaining to and resulting from the 
    execution of a business process or system function.
    
How does this come into play in a web application?

Lets examine the case of a simple application for keeping track of a store's 
inventory:

In the most simple case there would be a single database table in which 
we'd keep details on different products in the store. In the case where
multiple users would have access to INSERT/UPDATE/DELETE records in the
products table, one user could insert a product with name, description
and price, later another user could change the description or even delete 
the whole record. If at some later point we wanted to restore the original 
record or see who made the latest changes we'd have to ask all the users to 
remember what they did. An audit log for this table would provide the means
of keeping track of all the changes that were made to it and who made the 
changes in a chronological order.

`django-audit-log <https://code.google.com/p/django-audit-log/>`_ provides such
facilities for your Django models. It's designed to be very simple to add 
chronological tracking to any django model with the least amount of changes 
to your existing code. Adding an audit log for your models is done in 
three steps:

- Add a middleware class in settings.py.
- Add a manager property to every model you need to keep track of.
- Execute the syncdb management command.

To keep track of all the changes a separate table will be created for 
each tracked model. This table would have the same column structure as 
the original model plus columns for tracking the time, type of action 
(create, change or delete) and user who did the action. Queries on the 
audit log for a model are made via the manager added in step 2.

The project is still under heavy development and there's no 
official release yet. Keep that in mind if you consider using it in
production. The code can be downloaded from the mercurial repository:

.. code-block:: bash

    hg clone https://django-audit-log.googlecode.com/hg/ django-audit-log

Basic usage instructions can be found on
`this wiki page <https://code.google.com/p/django-audit-log/wiki/UsageInstructions>`_ .
**Feature requests are always welcome.**

Details on how it works and extension points will be coming up on 
the project wiki page soon.
