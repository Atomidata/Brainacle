HOW-TO: Use multiple WMD editors on a same page
===============================================

:date: 2011-10-27 15:30
:author: Dejan Noveski
:tags: wmd, markdown, javascript, how-to, coding
:category: Coding


`WMD <http://code.google.com/p/wmd/>`_ editor resembles Stackoverflow's Markdown editor and it's probably one of 
the best WYSIWYG editors that work with Markdown as input. Because of that, it's widely used in
Stackoverflow clones (i.e. `OSQA <http://http://www.osqa.net/>`_). It's easy to install and use (just tie it to a 
textarea), it supports the mostly used features, provided by this type of editors, but has 1 major flaw: 
It doesn't support multiple textareas/multiple editors per page.

I've been working on an OSQA based platform recently when I stumbled across this issue. Since we didn't want to change
the editor completely, I had to improvise.

Javascript to the rescue!
-------------------------

Going through WMD's code, I found a way to re-initialize the editor with different textarea. When that goes through, the
tool bar will be bound to the newly marked textarea and it will edit it's content. The fix is pretty simple actually 
(my example uses jQuery, but i'm sure you will understand what it does):

.. code-block:: javascript

	$(".wmd-textarea").focus(function(){
		// Execute this when a textarea with a class .wmd-textarea gains focus

        $("#wmd-button-bar").prependTo($(this).parent("div")); // Prepend the toolbox to the parent div of the textarea

        Attacklab.panels.input = this; // Set WMD's textarea input to this textarea
        Attacklab.editor(); // Re-init the editor.
    });


What this block does is hook a function to the *focus* event of the textarea. Each time the textarea gains focus, it prepends
the toolbox to the input's parent element, sets it as the input and reinitializes the WMD editor. That simple.

If you don't want the toolbox to move -- i.e. you want a toolbox above each textarea, just paste the toolbox HTML as desired,
point *Attacklab.panels.buttonBar* to the toolbox tied to the textarea with the focus on it, and re-init the editor:


.. code-block:: javascript

	$(".wmd-textarea").focus(function(){
		// Execute this when a textarea with a class .wmd-textarea gains focus

        $("#wmd-button-bar").prependTo($(this).parent("div")); // Prepend the toolbox to the parent div of the textarea
        Attacklab.panels.buttonBar = $(this).parent("div").find(".wmd-toolbox"); // Set WMD's textarea toolbox
        Attacklab.panels.input = this; // Set WMD's textarea input to this textarea
        Attacklab.editor(); // Re-init the editor.
    });


**Note** The above code blocks would work with this markup:

.. code-block:: html
	
	<!-- HAVE A WMD EDITOR INITIALIZED SOMEWHERE IN YOUR HTML -->
	<div>
		<div class="wmd-toolbox"><!-- HERE GOES TOOLBOX HTML - ONLY FOR PRESENTATION - REMOVE ID'S. COPY IT FROM YOUR FULLY RENDERED PAGE SOURCE. --></div>
		<textarea class=".wmd-textarea"></textarea>
	</div>
	<div>
		<div class="wmd-toolbox"><!-- HERE GOES TOOLBOX HTML - ONLY FOR PRESENTATION - REMOVE ID'S. COPY IT FROM YOUR FULLY RENDERED PAGE SOURCE. --></div>
		<textarea class=".wmd-textarea"></textarea>
	</div>