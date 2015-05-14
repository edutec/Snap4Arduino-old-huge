// userMenu proxy

SpriteIconMorph.prototype.originalUserMenu = SpriteIconMorph.prototype.userMenu;

SpriteIconMorph.prototype.userMenu = function () {
    menu = this.originalUserMenu();
    menu.addLine();
    var myself = this;
    menu.addItem('connect to Arduino', function() { myself.object.arduino.attemptConnection() });
    menu.addItem('disconnect Arduino', function() { myself.object.arduino.disconnect() });
    return menu;
}


// Addessing issue #24 : https://github.com/edutec/Snap4Arduino/issues/24
// Remove all items that are not usable from menus, plus add a few more

// Remove cloud button from control bar

IDE_Morph.prototype.originalBuildPanes = IDE_Morph.prototype.buildPanes;

IDE_Morph.prototype.buildPanes = function (){
    var myself = this;

    this.originalBuildPanes();
    this.controlBar.cloudButton.hide();

    this.controlBar.originalFixLayout = this.controlBar.fixLayout;

    this.controlBar.fixLayout = function () {
        myself.controlBar.originalFixLayout();
        myself.controlBar.projectButton.setLeft(150);
        myself.controlBar.updateLabel()
    };
};

// Hide cloud button when toggleAppMode is called (when changing language, opening projects, ...)
IDE_Morph.prototype.originalToggleAppMode = IDE_Morph.prototype.toggleAppMode;

IDE_Morph.prototype.toggleAppMode = function(mode) {
    this.originalToggleAppMode(mode);
    this.controlBar.cloudButton.hide();
}


// Remove cloud button from dialogs

ProjectDialogMorph.prototype.originalAddSourceButton = ProjectDialogMorph.prototype.addSourceButton;

ProjectDialogMorph.prototype.addSourceButton = function(source, label, symbol) {
    if (source != 'cloud') { this.originalAddSourceButton(source, label, symbol) }
}


// Override Snap! menus
// ToDo: Duplicate code! This is terrible style... we need to think of a better way 

IDE_Morph.prototype.snapMenu = function () {
    var menu,
    world = this.world();

    menu = new MenuMorph(this);
    menu.addItem('About Snap!...', 'aboutSnap');
    menu.addLine();
    menu.addItem(
        'Snap! reference manual',
        function () {
            window.open('http://snap.berkeley.edu/snapsource/help/SnapManual.pdf', 'SnapReferenceManual');
        }
    );
    menu.addItem(
        'Snap! website',
        function () {
            window.open('http://snap.berkeley.edu/', 'SnapWebsite');
        }
    );
    menu.addItem('Snap4Arduino website', 
                 function() {
                     window.open('http://s4a.cat/snap', 'Snap4ArduinoWebsite'); 
                 }
                );
                menu.addItem(
                    'Download Snap! source',
                    function () {
                        window.open(
                            'http://snap.berkeley.edu/snapsource/snap.zip',
                            'SnapSource'
                        );
                    }
                );
                menu.addItem(
                    'Snap4Arduino repository',
                    function () {
                        window.open(
                            'http://github.com/edutec/Snap4Arduino',
                            'SnapSource'
                        );
                    }
                );

                if (world.isDevMode) {
                    menu.addLine();
                    menu.addItem(
                        'Switch back to user mode',
                        'switchToUserMode',
                        'disable deep-Morphic\ncontext menus'
                        + '\nand show user-friendly ones',
                        new Color(0, 100, 0)
                    );
                } else if (world.currentKey === 16) { // shift-click
                    menu.addLine();
                    menu.addItem(
                        'Switch to dev mode',
                        'switchToDevMode',
                        'enable Morphic\ncontext menus\nand inspectors,'
                        + '\nnot user-friendly!',
                        new Color(100, 0, 0)
                    );
                }
                menu.popup(world, this.logo.bottomLeft());
};

IDE_Morph.prototype.projectMenu = function () {
    var menu,
    myself = this,
        world = this.world(),
        pos = this.controlBar.projectButton.bottomLeft(),
        graphicsName = this.currentSprite instanceof SpriteMorph ?
        'Costumes' : 'Backgrounds',
    shiftClicked = (world.currentKey === 16);

    menu = new MenuMorph(this);
    menu.addItem('Project notes...', 'editProjectNotes');
    menu.addLine();
    menu.addItem('New', 'createNewProject');
    menu.addItem('Open...', 'openProjectsBrowser');
    menu.addItem('Save', "save");
    menu.addItem('Save As...', 'saveProjectsBrowser');
    menu.addLine();
    menu.addItem(
        'Import...',
        function () {
            var inp = document.createElement('input');
            if (myself.filePicker) {
                document.body.removeChild(myself.filePicker);
                myself.filePicker = null;
            }
            inp.type = 'file';
            inp.style.color = "transparent";
            inp.style.backgroundColor = "transparent";
            inp.style.border = "none";
            inp.style.outline = "none";
            inp.style.position = "absolute";
            inp.style.top = "0px";
            inp.style.left = "0px";
            inp.style.width = "0px";
            inp.style.height = "0px";
            inp.addEventListener(
                "change",
                function () {
                    document.body.removeChild(inp);
                    myself.filePicker = null;
                    world.hand.processDrop(inp.files);
                },
                false
            );
            document.body.appendChild(inp);
            myself.filePicker = inp;
            inp.click();
        },
        'file menu import hint' // looks up the actual text in the translator
    );

    menu.addItem(
        shiftClicked ?
            'Export project as plain text...' : 'Export project...',
        function () {
            if (myself.projectName) {
                myself.exportProject(myself.projectName, shiftClicked);
            } else {
                myself.prompt('Export Project As...', function (name) {
                    myself.exportProject(name);
                }, null, 'exportProject');
            }
        },
        'show project data as XML\nin a new browser window',
        shiftClicked ? new Color(100, 0, 0) : null
    );

    menu.addItem(
        'Export blocks...',
        function () {myself.exportGlobalBlocks(); },
        'show global custom block definitions as XML\nin a new browser window'
    );

    if (shiftClicked) {
        menu.addItem(
            'Export all scripts as pic...',
            function () {myself.exportScriptsPicture(); },
            'show a picture of all scripts\nand block definitions',
            new Color(100, 0, 0)
        );
    }

    menu.addLine();
    menu.addItem(
        'Import tools',
        function () {
            myself.droppedText(
                myself.getURLsbeOrRelative(
                    'tools.xml'
                ),
                'tools'
            );
        },
        'load the official library of\npowerful blocks'
    );
    menu.addItem(
        'Libraries...',
        function () {
            // read a list of libraries from an external file,
            var libMenu = new MenuMorph(this, 'Import library'),
                libUrl = 'http://snap.berkeley.edu/snapsource/libraries/' +
            'LIBRARIES';

            function loadLib(name) {
                var url = 'http://snap.berkeley.edu/snapsource/libraries/'
                + name
                + '.xml';
                myself.droppedText(myself.getURL(url), name);
            }

            myself.getURL(libUrl).split('\n').forEach(function (line) {
                if (line.length > 0) {
                    libMenu.addItem(
                        line.substring(line.indexOf('\t') + 1),
                        function () {
                            loadLib(
                                line.substring(0, line.indexOf('\t'))
                            );
                        }
                    );
                }
            });

            libMenu.popup(world, pos);
        },
        'Select categories of additional blocks to add to this project.'
    );

    menu.addItem(
        localize(graphicsName) + '...',
        function () {
            var dir = graphicsName,
                names = myself.getCostumesList(dir),
                libMenu = new MenuMorph(
                    myself,
                    localize('Import') + ' ' + localize(dir)
            );

            function loadCostume(name) {
                var url = dir + '/' + name,
                    img = new Image();
                img.onload = function () {
                    var canvas = newCanvas(new Point(img.width, img.height));
                    canvas.getContext('2d').drawImage(img, 0, 0);
                    myself.droppedImage(canvas, name);
                };
                img.src = url;
            }

            names.forEach(function (line) {
                if (line.length > 0) {
                    libMenu.addItem(
                        line,
                        function () {loadCostume(line); }
                    );
                }
            });
            libMenu.popup(world, pos);
        },
        'Select a costume from the media library'
    );
    menu.addItem(
        localize('Sounds') + '...',
        function () {
            var names = this.getCostumesList('Sounds'),
                libMenu = new MenuMorph(this, 'Import sound');

            function loadSound(name) {
                var url = 'Sounds/' + name,
                    audio = new Audio();
                audio.src = url;
                audio.load();
                myself.droppedAudio(audio, name);
            }

            names.forEach(function (line) {
                if (line.length > 0) {
                    libMenu.addItem(
                        line,
                        function () {loadSound(line); }
                    );
                }
            });
            libMenu.popup(world, pos);
        },
        'Select a sound from the media library'
    );

    menu.popup(world, pos);
};


IDE_Morph.prototype.getCostumesList = function (dirname) {
    var fs = require('fs'),
        dir,
        costumes = [];

    dir = fs.readdirSync(dirname);
    dir.forEach(
        function (each) {
            costumes.push(each);
        }
    );
    costumes.sort(function (x, y) {
        return x < y ? -1 : 1;
    });
    return costumes;
};


// Snap4Arduino logo

IDE_Morph.prototype.createLogo = function () {
    var myself = this;

    if (this.logo) {
        this.logo.destroy();
    }

    this.logo = new Morph();
    this.logo.texture = 's4a_logo_sm.png'; // Overriden
    this.logo.drawNew = function () {
        this.image = newCanvas(this.extent());
        var context = this.image.getContext('2d'),
            gradient = context.createLinearGradient(
                0,
                0,
                this.width(),
                0
        );
        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, myself.frameColor.toString());
        context.fillStyle = MorphicPreferences.isFlat ?
            myself.frameColor.toString() : gradient;
        context.fillRect(0, 0, this.width(), this.height());
        if (this.texture) {
            this.drawTexture(this.texture);
        }
    };

    this.logo.drawCachedTexture = function () {
        var context = this.image.getContext('2d');
        context.drawImage(
            this.cachedTexture,
            5,
            Math.round((this.height() - this.cachedTexture.height) / 2)
        );
        this.changed();
    };

    this.logo.mouseClickLeft = function () {
        myself.snapMenu();
    };

    this.logo.color = new Color();
    this.logo.setExtent(new Point(200, 28)); // dimensions are fixed
    this.add(this.logo);
};

// Exporting

IDE_Morph.prototype.exportProject = function (name, plain) {
    var menu, str;
    var myself = this;
    if (name) {
        this.setProjectName(name);
        if (Process.prototype.isCatchingErrors) {
            try {
                menu = this.showMessage('Exporting');
                str = this.serializer.serialize(this.stage);
                saveFile(name, str);
                menu.destroy();
            } catch (err) {
                this.showMessage('Export failed: ' + err);
            }
        } else {
            menu = this.showMessage('Exporting');
            str = this.serializer.serialize(this.stage);
            saveFile(name, str);
            menu.destroy();
        }
    }

    function saveFile(name, contents) {
        var inp = document.createElement('input');
        if (myself.filePicker) {
            document.body.removeChild(myself.filePicker);
            myself.filePicker = null;
        }
        inp.nwsaveas = homePath() + name + '.xml';
        inp.type = 'file';
        inp.style.color = "transparent";
        inp.style.backgroundColor = "transparent";
        inp.style.border = "none";
        inp.style.outline = "none";
        inp.style.position = "absolute";
        inp.style.top = "0px";
        inp.style.left = "0px";
        inp.style.width = "0px";
        inp.style.height = "0px";
        inp.addEventListener(
            "change",
            function (e) {
                document.body.removeChild(inp);
                myself.filePicker = null;

                var fs = require('fs');
                fs.writeFileSync(e.target.files[0].path, contents);
                myself.showMessage('Exported!', 1);
            },
            false
        );
        document.body.appendChild(inp);
        myself.filePicker = inp;
        inp.click();
    }
};


function homePath() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + ((process.platform == 'win32') ? '\\' : '/')
}

/**
 * Override setLanguage function
 */

IDE_Morph.prototype.originalSetLanguage = IDE_Morph.prototype.setLanguage;

IDE_Morph.prototype.setLanguage = function(lang, callback) {
    var myself = this;

    myself.originalSetLanguage(lang, function() {
        myself.setLanguageS4A(lang, callback);
    });
};

IDE_Morph.prototype.setLanguageS4A = function (lang, callback) {
    // Load language script for s4a related functions
    var s4aTranslation = document.getElementById('s4a-language'),
        s4aSrc = 's4a-lang-' + lang + '.js',
        myself = this;
    if (s4aTranslation) {
        document.head.removeChild(s4aTranslation);
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback);
    }
    s4aTranslation = document.createElement('script');
    s4aTranslation.id = 's4a-language';
    s4aTranslation.onload = function () {
        myself.reflectLanguage(lang, callback);
    };
    document.head.appendChild(s4aTranslation);
    s4aTranslation.src = s4aSrc; 
};

// Fix problme with connected board when creating a new project 
// If the board is connected (it is not freed for the new sprites)
IDE_Morph.prototype.originalNewProject = IDE_Morph.prototype.newProject

IDE_Morph.prototype.newProject = function () {
    // Disconnect each sprite before creating the new project
    var sprites = this.sprites.asArray()
    sprites.forEach(function(sprite) {
        if (sprite.arduino && sprite.arduino.board) {
            sprite.arduino.disconnect();
        }
    });
    this.originalNewProject();
};

