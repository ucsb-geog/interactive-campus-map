UCSB Interactive Campus Map
======================

This is the source code for the [UCSB Interactive Campus Map](http://map.geog.ucsb.edu/) by the [UCSB Geography Department](http://geog.ucsb.edu).

Installation
------------

1. clone the reposotory

        $ git clone https://github.com/ucsb-geog/interactive-campus-map.git

2. make sure you have Node.js installed, then run to install [cordova](http://cordova.apache.org/)

		$ sudo npm install -g cordova

3. install [ionic](http://ionicframework.com/)

        $ sudo npm install -g ionic


Test this project
---------------------
1. ####Desktop browser testing
Testing this app in a browser is as simple as running the serve command in this project's root folder.

		$ ionic serve
This will start a live-reload server for your project. When changes are made to any HTML, CSS, or JavaScript files, the browser will automatically reload when the files are saved.

2. ####Simulator testing
You can also test right in the simulator using the cordova library which is integrated into ionic. For example, to test in the iOS simulator, run:

		$ ionic build ios
		$ ionic emulate ios
