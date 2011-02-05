How to write vim plugins with python
####################################

:date: 2011-02-03 14:58
:author: Dejan Noveski
:category: Coding
:tags: python, plugin, vim, coding


I'm not going to dive into how good or extendible Vim is. If you are reading this
article, you probably know that. The thing that makes Vim so good, is the
scripting environment behind it called VimL. Using this scripting language,
you can write any functionality/plugin you need for Vim. Each plugin you use
is written in this language. Here's the best part. You only need very little
knowledge of VimL to be able to write plugins, if you know Python (or Ruby).

What's a vim plugin anyway
==========================

A Vim plugin is a .vim script that defines functions, mappings, syntax rules, 
commands that may, or may
not, manipulate the windows, buffers, lines. It is a complete piece of code with
some specific functionality. Usually, a plugin consists of several functions 
mappings command definitions and event hooks. When writing vim plugins with Python, often, everything
outside the functions is written in VimL. But those are vim commands and they
can be learned fast. In fact, VimL can be learned fast, but using python gives
so much flexibility. Think about using urllib/httplib/simplejson for accessing
some web service that helps editing in Vim. This is why most of the plugins that
work with web services are usually done in VimL+Python.

Any prerequisites?
==================

You must have vim compiled with +python support. You can check that using the
command:

.. code-block:: bash

    vim --version | grep +python

Vim package in Ubuntu and it's derivatives comes with +python support.

To Work - Vimmit.vim
====================

What's better than starting with a simple example? This is a plugin that,
when called, will retrieve the homepage of `Reddit <http://reddit.com>`_
and will display it in the current buffer.

Start by opening "vimmit.vim" file (in vim). Since we are writing python code,
its good to check if Vim supports Python:

.. code-block:: vim

    if !has('python')
        echo "Error: Required vim compiled with +python"
        finish
    endif

This piece is writen in VimL. It's best if we stick to VimL for things like this,
mappings and event hooks. This function will check if Vim has python support or
it will end the script with an error message.

We continue with the main function Reddit(). This is where we use Python and do
the main functionality:

.. code-block:: python

    " Vim comments start with a double quote.
    " Function definition is VimL. We can mix VimL and Python in
    " function definition.
    function! Reddit()

    " We start the python code like the next line.

    python << EOF
    # the vim module contains everything we need to interface with vim from
    # python. We need urllib2 for the web service consumer.
    import vim, urllib2
    # we need json for parsing the response
    import json

    # we define a timeout that we'll use in the API call. We don't want
    # users to wait much.
    TIMEOUT = 20
    URL = "http://reddit.com/.json"

    try:
        # Get the posts and parse the json response
        response = urllib2.urlopen(URL, None, TIMEOUT).read()
        json_response = json.loads(response)

        posts = json_response.get("data", "").get("children", "")

        # vim.current.buffer is the current buffer. It's list-like object.
        # each line is an item in the list. We can loop through them delete
        # them, alter them etc.
        # Here we delete all lines in the current buffer
        del vim.current.buffer[:]

        # Here we append some lines above. Aesthetics.
        vim.current.buffer[0] = 80*"-"

        for post in posts:
            # In the next few lines, we get the post details
            post_data = post.get("data", {})
            up = post_data.get("ups", 0)
            down = post_data.get("downs", 0)
            title = post_data.get("title", "NO TITLE").encode("utf-8")
            score = post_data.get("score", 0)
            permalink = post_data.get("permalink").encode("utf-8")
            url = post_data.get("url").encode("utf-8")
            comments = post_data.get("num_comments")

            # And here we append line by line to the buffer.
            # First the upvotes
            vim.current.buffer.append("↑ %s"%up)
            # Then the title and the url
            vim.current.buffer.append("    %s [%s]"%(title, url,))
            # Then the downvotes and number of comments
            vim.current.buffer.append("↓ %s    | comments: %s [%s]"%(down, comments, permalink,))
            # And last we append some "-" for visual appeal.
            vim.current.buffer.append(80*"-")

    except Exception, e:
        print e

    EOF
    " Here the python code is closed. We can continue writing VimL or python again.
    endfunction

Save the file, source it in vim (:source vimmit.vim) and:

.. code-block:: bash

    :call Reddit()

Now, the way we call the function is not so elegant. So we define a command:

.. code-block:: vim 

    command! -nargs=0 Reddit call Reddit()

We define the command :Reddit to call the function. After adding this, open a
new bufer and do :Reddit . Home page will be loaded in the buffer. The -nargs
argument states how many arguments the command will take.

Function Arguments, Eval and Command
====================================

Q: How does one access functional arguments?

.. code-block:: vim 

    function! SomeName(arg1, arg2, arg3)
        " Get the first argument by name in VimL
        let firstarg=a:arg1

        " Get the second argument by position in Viml
        let secondarg=a:1

        " Get the arguments in python
        
        python << EOF
        import vim

        first_argument = vim.eval("a:arg1") #or vim.eval("a:0")
        second_argument = vim.eval("a:arg2") #or vim.eval("a:1")

You can define a function with arbitrary number of arguments by putting "..."
instead of argument names. You can access these arguments only by position, 
and you can mix them with named arguments (arg1, arg2, ...)

Q: How can I call Vim commands from Python?

.. code-block:: vim
    
    vim.command("[vim-command-here]")

Q: How to define global variables and access them in VimL and Python?

Global vars are prefixed with g:. If you want to define one in your script, 
best thing to do is check if it exists and if doesn't define it and assign some
default value to it:

.. code-block:: vim 

    if !exists("g:reddit_apicall_timeout")
        let g:reddit_apicall_timeout=40
    endif

You can access it from python using the vim module:

.. code-block:: python

    TIMEOUT = vim.eval("g:reddit_apicall_timeout")

If you want to override this setting, you can write:

.. code-block:: vim

    let g:reddit_apicall_timeout=60

in .vimrc .

Additional Notes
================

VimL is pretty easy once you try it. Remember that print works and
everything you can do with python, you can do in here. `Here <http://vimdoc.sourceforge.net/htmldoc/if_pyth.html#python-vim>`_
you can find the documentation for the vim python module. Vimdoc is the possibly
the only resource you will need when writing vim plugins.

You can also check this `IBM developerWorks article <https://www.ibm.com/developerworks/aix/library/au-vimplugin/>`_ .

Now, try to extend "vimmit.vim" so the user is able to choose a subreddit (as a
first functional argument).
