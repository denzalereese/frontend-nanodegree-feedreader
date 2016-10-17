/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have defined URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('have defined names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('toggles visibility on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        /* Since loadFeed() is an asynchronous function,
        we must call it and make sure it is done working before our tests. */
        beforeEach(function(done) {
            loadFeed(0, done());
        });

        it('should have at least one entry', function() {
            expect($('.feed .entry')).toBeTruthy();
        });
    });

    describe('New Feed Selection', function() {
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

        it('should change content when a new feed is loaded', function() {
            //checks if the title of the first entry has changed after loadFeed(1) is done.
            var nextFirstEntryTitle = $('.title').first().text();
            expect(initialFirstEntryTitle).not.toBe(nextFirstEntryTitle);
        });
    });

}());
