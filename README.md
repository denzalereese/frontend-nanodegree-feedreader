# Project Overview

In this project I was given a web-app that reads RSS feeds as starter code, and tasked with writing tests for this code.

To open, clone/download the repo and open 'index.html' in your browser.

##Technologies used
###[Jasmine]('http://jasmine.github.io/')

*A Behavor-Driven Development Framework for Testing JavaScript*

##Usage
In order to use the app, click the menu button in the top left corner to show the menu with a list of available feeds. Click on one of the links in the menu to change the current feed.

##Testing

1.) Ensured each object in the ```allFeeds``` array has a defined ```name``` and ```url```.

~~~~
	 it('have defined URLs', function() {
	     allFeeds.forEach(function(feed) {
		     expect(feed.url).toBeDefined();
		     expect(feed.url.length).not.toBe(0);
	     });
     });
~~~~

~~~~
	 it('have defined names', function() {
     	allFeeds.forEach(function(feed) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
       });
     });
~~~~

2.) Wrote a new test suite described as "The menu".

~~~~
	describe('The menu', function() {
		//will test menu functionality
	});
~~~~

3.) Ensured menu was hidden by default

~~~~
	it('is hidden by default', function() {
   		expect($('body').hasClass('menu-hidden')).toBe(true);
    });
~~~~

....and that its visibility is toggled on click.

~~~~
	it('toggles visibility on click', function() {
       $('.menu-icon-link').trigger('click');
       expect($('body').hasClass('menu-hidden')).toBe(false);
       $('.menu-icon-link').trigger('click');
       expect($('body').hasClass('menu-hidden')).toBe(true);
    });
~~~~

4.) Wrote a new test suite described as "Initial Entries".

~~~~
	describe('Initial Entries', function() {
		/* will test that initial entries from feed
		   are loaded successfuly */
	});
~~~~

5.) Ensured there is at least a single entry in the feed container.

~~~~
	/* Since loadFeed() is an asynchronous function,
      we must call it and make sure it is done working before our tests. */

	   beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });
~~~~

~~~~
	it('should have at least one entry', function() {
   		expect(('.feed').children().length).toBeGreaterThan(0);
    });
~~~~

6.) Wrote a new test suite described as "New Feed Selection".

~~~~
	describe('New Feed Selection', function() {
		/* will test that there are new entries loaded
		   when a new feed is selected */
	});
~~~~

7.) Ensured content changes when a new feed is loaded.

~~~~
	/* calls loadFeed(0) and gets the title of the first entry,
	   then calls loadFeed(1) to load a new feed before each test. Uses done()
	   since loadFeed() is an asynchronous function */

	var initialFirstEntryTitle = "";
      beforeEach(function(done) {
        loadFeed(0, function() {
          initialFirstEntryTitle = $('.title').first().text();
          loadFeed(1, function() {
            done();
          });
        });
     });
~~~~

~~~~
	/* checks if the title of the first entry has changed
	after loadFeed(1) is done. */

	it('should change content when a new feed is loaded', function() {
           var nextFirstEntryTitle = $('.title').first().text();
		   expect(initialFirstEntryTitle == nextFirstEntryTitle).toBe(false);
    });
~~~~

##Error Handling

1.) Throw error if ```id``` passed in to the ```loadFeed()``` function is outside the index bounds of the ```allFeeds``` array

~~~~
	function loadFeed(id, cb) {
     //ensure the id for the loaded feed is a valid index in the allFeeds array
     if (id <= allFeeds.length - 1) {
       var feedUrl = allFeeds[id].url,
           feedName = allFeeds[id].name;
     } else {
       throw new RangeError('Feed id is outside range of allFeeds array');
     }
~~~~

2.) Throw error if ```result.feed.entries``` is null or empty

~~~~
	if (entries != null && entriesLen > 0) {
       entries.forEach(function(entry) {
       	container.append(entryTemplate(entry));
        });
        } else {
        	throw new Error('There are no entries in this feed');
     }
~~~~
