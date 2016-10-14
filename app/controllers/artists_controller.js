load('application');

before(loadArtist, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New artist';
    this.artist = new Artist;
    render();
});

action(function create() {
    Artist.create(req.body.Artist, function (err, artist) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: artist && artist.errors || err});
                } else {
                    send({code: 200, data: artist.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Artist can not be created');
                    render('new', {
                        artist: artist,
                        title: 'New artist'
                    });
                } else {
                    flash('info', 'Artist created');
                    redirect(path_to.artists);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Artists index';
    Artist.all(function (err, artists) {
        switch (params.format) {
            case "json":
                send({code: 200, data: artists});
                break;
            default:
                render({
                    artists: artists
                });
        }
    });
});

action(function show() {
    this.title = 'Artist show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.artist});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Artist edit';
    switch(params.format) {
        case "json":
            send(this.artist);
            break;
        default:
            render();
    }
});

action(function update() {
    var artist = this.artist;
    this.title = 'Edit artist details';
    this.artist.updateAttributes(body.Artist, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: artist && artist.errors || err});
                } else {
                    send({code: 200, data: artist});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Artist updated');
                    redirect(path_to.artist(artist));
                } else {
                    flash('error', 'Artist can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.artist.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy artist');
                } else {
                    flash('info', 'Artist successfully removed');
                }
                send("'" + path_to.artists + "'");
            });
        });
    });
});

function loadArtist() {
    Artist.find(params.id, function (err, artist) {
        if (err || !artist) {
            if (!err && !artist && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.artists);
        } else {
            this.artist = artist;
            next();
        }
    }.bind(this));
}
