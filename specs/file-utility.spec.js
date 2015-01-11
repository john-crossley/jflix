var Utility = require('../lib/file-utility');

describe('When converting a file path to a slug', function() {

    var utility;

    before(function() {
        utility = new Utility(),
        pathData = [{
            path: '/Volumes/HULK/TV Shows/Season 01/QI Season G Episode 01 Garden (XL).avi',
            slug: 'qi-season-g-episode-01-garden-xl',
            filename: 'QI Season G Episode 01 Garden (XL)'
        }, {
            path: '/Volumes/HULK/TV Shows/American Horror Story/Season 1/American Horror Story - S01E06 - Piggy',
            slug: 'american-horror-story-s01e06-piggy',
            filename: 'American Horror Story - S01E06 - Piggy'
        }, {
            path: '/Volumes/HULK/TV Shows/Family Guy/Season 12/Family Guy - S12E21 - Chap Stewie.mkv',
            slug: 'family-guy-s12e21-chap-stewie',
            filename: 'Family Guy - S12E21 - Chap Stewie'
        }, {
            path: '/Volumes/HULK/TV Shows/Game of Thrones/Season 1/Game of Thrones - S01E01 - Winter is Coming.avi',
            slug: 'game-of-thrones-s01e01-winter-is-coming',
            filename: 'Game of Thrones - S01E01 - Winter is Coming'
        }, {
            path: '/Volumes/HULK/TV Shows/New Girl/Season 1/New Girl - S01E03 - Wedding.avi',
            slug: 'new-girl-s01e03-wedding',
            filename: 'New Girl - S01E03 - Wedding'
        }, {
            path: '/Volumes/HULK/TV Shows/Show/Season/Name of program!?.avi',
            slug: 'name-of-program',
            filename: 'Name of program!?'
        }];
    });

    it('should return the correct slug name from the file path', function() {
        pathData.forEach(function(data) {
            utility.setPath(data.path);
            var slug = utility.getSlug();
            expect(slug).equal(data.slug);
        });
    });

    it('should return the correct filename from the path', function() {
        pathData.forEach(function(data) {
            utility.setPath(data.path);
            var filename = utility.getFilename();
            expect(filename).equal(data.filename);
        });
    });

});