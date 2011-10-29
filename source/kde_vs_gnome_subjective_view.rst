#################################
KDE vs. Gnome - A Subjective View
#################################

:date: 2011-10-29 21:03
:author: Dejan Noveski
:tags: kde, gnome, lxde, xfce, desktop, linux, miscellaneous
:category: Miscellaneous


Past year, a lot has changed with the desktop environments for Linux. Gnome going 3,
Ubuntu going Unity, people going nuts about that. I've been experimenting with all of them trying to
find the one that will serve me good and will evolve at a slower pace. I, being an exclusive computer/Linux user for a
long time, had tough time with the new UIs (I prefer the old style - 1 panel on the bottom, no wobbly-wobbly).
My distro of choice is Arch, and my DE of choice was Gnome + Openbox as a window manager. That combo proved
to be fast, usable, considerate to hardware yet elegant and (at this moment of time) old-school. I should disclose that
I use my primary desktop for everything, not just work (multimedia, internet, gaming) and as such, tilling WMs are a no-no.

Then, Gnome turned 3 and everything changed. Openbox was no longer an option (it has issues even on fall-back mode) so I was 
stuck with either metacity or mutter. At that moment I started looking into the alternatives. Spent some time on KDE,
got LXDE on my netbook (and tried it on my desktop), even tried XFCE for a couple of weeks. This is my subjective
view on why I stuck to Gnome 3 fall-back, what I hate about it, what I love and hate about KDE and why I can't work on KDE.


Testing Ground
==============

Before I start, I have to specify my testing ground. You might think that it's irrelevant, but I assure you,
hardware makes big difference. Also, graphic drivers matter too. So, my spec:

    C2D E4600 2.8GHz (2.4 stock)

    Asus P5P43TD-Pro

    8GB ddr3 ram

    NVidia GT440 OC-ed with Nvidia blob (binary driver)

    1x22"@1680x1050 + 1x24"@1920x1200 monitors

    Archlinux, latest updates

One of the best things about Arch is that you get almost vanilla versions of the DE in question. Kubuntu's KDE is tainted
with additions and configurations, and won't be fair to be judged like that.


KDE
###

.. container:: center-align

    .. image:: ../static/uploads/kde.png

Look at this beauty! KDE is my secret love. It's that good. It looks clean and good, it's the old way (one panel at bottom, desktop is working area),
it is feature packed and it evolves possibly the best of all of the DEs. And I would gladly use it! I will install it and not look
back right this moment, if it weren't for some annoying stuff that make me rage every time I work on KDE:


Dolphin
-------

No mouse back-button?! What's up with this! It's the 21st century. This has been implemented in almost every graphical file
explorer since '98. And yeah... I know about the xautomation and xbindkeys fix, but I want this implemented out of the box.
I really don't think it's hard to be implemented.


KIO
---

So this is the KDE version of gvfs. NOT! It's not even implemented in every general-use software. My pain with this? If I want to
open a movie from a samba share with VLC, I have to wait for it to be temporarily downloaded to my PC and then watch it. On gnome,
I just open it, and watch it. The even funnier part is, if I use Kate in gnome, it automatically works with gvfs. Why don't you
just integrate gvfs or make KIO work similarly?


KDE-Wallet
----------

I don't like to input password every time I do a *git pull/push*, *sudo* etc. The KDE-wallet handles ssh auth poorly.
There is a fix for it to work with ssh-agent, but why should I make fixes and patches when Gnome's keyring works out
of the box?


General / Performance bugs
--------------------------

IMO, my configuration is pretty decent to run the DE on full power. Well, apparently, KDE wants a dual-SLI 580GTX.
If I try to turn on the effects, KDE is unusable. If I turn them off, the interface shows random artifacts on screen.
And this doesn't happen just on NV hardware. ATI story is worse! Same with sandybridge graphics.

Often, it happens, when I click on the start menu, the menu starts at the top of the screen. Or the panel is positioned on the
top half. When I try to reposition it, it slowly falls back to the original place. Happens every restart.

That being said, KDE handles multiple monitors best of all DEs. I have to give credit for that.


All in all, KDE is pretty decent DE. If they fix this few things, I will move back to it immediately and use it for good.


Gnome 3
#######

.. container:: center-align

    .. image:: ../static/uploads/gnome.png

My current setup. Fallback mode. Never really settled for shell. It's hard for a man working years and years under one desktop
model, to switch to something new. I'm fairly satisfied with Gnome3.2 fallback, but, i'm here to bash the things I don't like:


Looks
-----

Who thought that having a solid black bar for a panel was a good idea? Tint2 has better design out of the box. And, I was under
the impression that Gnome had some good designers in their team. Well, compare Faenza icons to default gnome ones, and Adwaita to
Zukitwo theme. You can do better than this Gnome. We care about the design too.


Gnome settings
--------------

Take a look at KDE's settings manager. Now, back to yours. KDE is superior in this matter and you should learn from it.
I assume it's laziness that made you throw everything in a registry-like structure (gconf/dconf), but you could move some
important stuff in the settings manager. Now, if I want to change your mediocre theme for something better, I have to
install third party software for that. Or try to remember *Was it dconf or gconf?*; *Was it desktop/ or apps/*. Seriously,
work on this. And don't even get me started on the screen-saver thing.


Plain Wrong stuff
-----------------

Mutter in shell, metacity in fall-back. Did you stop to think that some people would want snap-to-edges in fall-back mode too?
Do you punish us, fall-back users, and stick us with metacity? Metacity has an awful compositor. Out of the box, when minimizing
the windows, you see this **ugly** black border. So, the fix is, put metacity in low resources. How is rendering a full window
minimizing vs. rendering a black border use lower resources? If you, however, turn that on, you see a wireframe each time you drag
a window. So you gotta turn on some other thing (I can't remember which was it and I never can!). It's not documented properly,
and I have to google it every time I install a new machine.

When I assign a primary monitor, that means I want that monitor to be PRIMARY! Not the one on the LEFT! KDE handles this better.
Learn from it.

QT apps looked good in Gnome. Now, the look good, but they don't work good. Menus flying all around.

Theme manager.

Bundle bash
+++++++++++

Brasero sucks hard. K3b is much much better. If you don't trust me, I will show you my bag full of failed DVDs.

Evince is good. But please... Bookmarks. A bit more functionality. You are trying to push Linux on a normal user.

Seriously... Theme manager.


Shell
-----

Oh, my "favorite". I gotta say this - it works better than Unity. Not good enough. 

- It handles dual monitor poorly. Each time I open window preview, If I have a window on the other monitor, it's also shown in a preview.

- Notifications are far from noticeable - fallback mode handles notifications better.

- If you have Nautilus managing the desktop, you are in for headaches.

- Again, black bar?!

- How can I access Home folder without opening window preview?

- Constant crashes!

- Addons become incompatible fast.

- Ati blob issues.

- Wrong crash management. Shell crashes, I don't want to restart GDM. Show me ANYTHING. Just let me hit save before restarting X.

- And the worst part - Recent files in menu. When you open up the menu, If you don't *magically* disable (there's a hack for this) recent files, shell becomes awfully slow. Give me a checkbox where I can disable them.

- THEME MANAGER!


With all this said, Gnome has less impact on productivity, and I can live with these issues. But as soon as KDE fixes it's quirks, I'm moving to it.


Conclusion
##########

Now, don't focus on the negative stuff I wrote above. It's subjective. Both DE's are good and both flawed. For me, there's a handful of issues that keep me from moving to KDE, and I really hope, they will be fixed soon.

I salute the community for making things like KDE and Gnome. They rock and they should be praised for that. But,
if we want Linux to be a choice of the normal (non-tech-savvy) user, you gotta get some things straight. Not everyone knows how 
to configure using gconf/dconf, or configure xautomation/xbindkeys. Make it perfect.

What ticks you about this Desktop Environments?

P.S. For the purists s/Linux/Gnu\\/Linux/