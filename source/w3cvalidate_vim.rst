W3cValidate.vim
===============

:date: 2011-01-23 00:55
:author: Dejan Noveski
:tags: vim, plugin, coding
:category: Coding


W3cValidate.vim is a plugin that enables buffer/url validation using the `W3 Validator <http://validator.w3.org>`_ API.

Usage
-----

Copy w3cvalidate.vim file inside plugin directory, source it or restart Vim. Use 

    :W3cValidate to validate the current buffer 
     
    :W3cValidate "[url_here]" to validate a hosted page 
     
    :W3cValidateDT "[doctype]" to validate the buffer using the [doctype] override. Make sure the doctype is a valid doctype 

The validator service url can be changed if you run an instance of it localy by setting  g:w3_validator_url  in .vimrc 

The script has API timeout default to 20 seconds. You can change it by setting  g:w3_apicall_timeout  in .vimrc 

Source
------

`Bitbucket <https://bitbucket.org/dekomote/w3cvalidate.vim>`_
`GitHub <https://github.com/dekomote/w3cvalidate.vim>`_
`Vim Scripts <http://www.vim.org/scripts/script.php?script_id=3416>`_

