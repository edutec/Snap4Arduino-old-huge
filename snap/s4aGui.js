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

// OVERRIDE
// We did this override for when we want to block any action when our windows is UP

IDE_Morph.prototype.settingsMenu = function () {
	if(this.window){return;}
    	var menu,
        stage = this.stage,
        world = this.world(),
        myself = this,
        pos = this.controlBar.settingsButton.bottomLeft(),
        shiftClicked = (world.currentKey === 16);

    function addPreference(label, toggle, test, onHint, offHint, hide) {
        var on = '\u2611 ',
            off = '\u2610 ';
        if (!hide || shiftClicked) {
            menu.addItem(
                (test ? on : off) + localize(label),
                toggle,
                test ? onHint : offHint,
                hide ? new Color(100, 0, 0) : null
            );
        }
    }

    menu = new MenuMorph(this);
    menu.addItem('Language...', 'languageMenu');
    menu.addItem(
        'Zoom blocks...',
        'userSetBlocksScale'
    );
    menu.addItem(
        'Stage size...',
        'userSetStageSize'
    );
    menu.addLine();
    addPreference(
        'Blurred shadows',
        'toggleBlurredShadows',
        useBlurredShadows,
        'uncheck to use solid drop\nshadows and highlights',
        'check to use blurred drop\nshadows and highlights',
        true
    );
    addPreference(
        'Zebra coloring',
        'toggleZebraColoring',
        BlockMorph.prototype.zebraContrast,
        'uncheck to disable alternating\ncolors for nested block',
        'check to enable alternating\ncolors for nested blocks',
        true
    );
    addPreference(
        'Dynamic input labels',
        'toggleDynamicInputLabels',
        SyntaxElementMorph.prototype.dynamicInputLabels,
        'uncheck to disable dynamic\nlabels for variadic inputs',
        'check to enable dynamic\nlabels for variadic inputs',
        true
    );
    addPreference(
        'Prefer empty slot drops',
        'togglePreferEmptySlotDrops',
        ScriptsMorph.prototype.isPreferringEmptySlots,
        'uncheck to allow dropped\nreporters to kick out others',
        'settings menu prefer empty slots hint',
        true
    );
    addPreference(
        'Long form input dialog',
        'toggleLongFormInputDialog',
        InputSlotDialogMorph.prototype.isLaunchingExpanded,
        'uncheck to use the input\ndialog in short form',
        'check to always show slot\ntypes in the input dialog'
    );
    addPreference(
        'Plain prototype labels',
        'togglePlainPrototypeLabels',
        BlockLabelPlaceHolderMorph.prototype.plainLabel,
        'uncheck to always show (+) symbols\nin block prototype labels',
        'check to hide (+) symbols\nin block prototype labels'
    );
    addPreference(
        'Virtual keyboard',
        'toggleVirtualKeyboard',
        MorphicPreferences.useVirtualKeyboard,
        'uncheck to disable\nvirtual keyboard support\nfor mobile devices',
        'check to enable\nvirtual keyboard support\nfor mobile devices',
        true
    );
    addPreference(
        'Input sliders',
        'toggleInputSliders',
        MorphicPreferences.useSliderForInput,
        'uncheck to disable\ninput sliders for\nentry fields',
        'check to enable\ninput sliders for\nentry fields'
    );
    if (MorphicPreferences.useSliderForInput) {
        addPreference(
            'Execute on slider change',
            'toggleSliderExecute',
            InputSlotMorph.prototype.executeOnSliderEdit,
            'uncheck to supress\nrunning scripts\nwhen moving the slider',
            'check to run\nthe edited script\nwhen moving the slider'
        );
    }
    addPreference(
        'Clicking sound',
        function () {
            BlockMorph.prototype.toggleSnapSound();
            if (BlockMorph.prototype.snapSound) {
                myself.saveSetting('click', true);
            } else {
                myself.removeSetting('click');
            }
        },
        BlockMorph.prototype.snapSound,
        'uncheck to turn\nblock clicking\nsound off',
        'check to turn\nblock clicking\nsound on'
    );
    addPreference(
        'Animations',
        function () {myself.isAnimating = !myself.isAnimating; },
        myself.isAnimating,
        'uncheck to disable\nIDE animations',
        'check to enable\nIDE animations',
        true
    );
    addPreference(
        'Turbo mode',
        'toggleFastTracking',
        this.stage.isFastTracked,
        'uncheck to run scripts\nat normal speed',
        'check to prioritize\nscript execution'
    );
    addPreference(
        'Rasterize SVGs',
        function () {
            MorphicPreferences.rasterizeSVGs =
                !MorphicPreferences.rasterizeSVGs;
        },
        MorphicPreferences.rasterizeSVGs,
        'uncheck for smooth\nscaling of vector costumes',
        'check to rasterize\nSVGs on import',
        true
    );
    addPreference(
        'Flat design',
        function () {
            if (MorphicPreferences.isFlat) {
                return myself.defaultDesign();
            }
            myself.flatDesign();
        },
        MorphicPreferences.isFlat,
        'uncheck for default\nGUI design',
        'check for alternative\nGUI design',
        false
    );
    addPreference(
        'Sprite Nesting',
        function () {
            SpriteMorph.prototype.enableNesting =
                !SpriteMorph.prototype.enableNesting;
        },
        SpriteMorph.prototype.enableNesting,
        'uncheck to disable\nsprite composition',
        'check to enable\nsprite composition',
        true
    );
    menu.addLine(); // everything below this line is stored in the project
    addPreference(
        'Thread safe scripts',
        function () {stage.isThreadSafe = !stage.isThreadSafe; },
        this.stage.isThreadSafe,
        'uncheck to allow\nscript reentrance',
        'check to disallow\nscript reentrance'
    );
    addPreference(
        'Prefer smooth animations',
        'toggleVariableFrameRate',
        StageMorph.prototype.frameRate,
        'uncheck for greater speed\nat variable frame rates',
        'check for smooth, predictable\nanimations across computers'
    );
    addPreference(
        'Flat line ends',
        function () {
            SpriteMorph.prototype.useFlatLineEnds =
                !SpriteMorph.prototype.useFlatLineEnds;
        },
        SpriteMorph.prototype.useFlatLineEnds,
        'uncheck for round ends of lines',
        'check for flat ends of lines'
    );
    addPreference(
        'Codification support',
        function () {
            StageMorph.prototype.enableCodeMapping =
                !StageMorph.prototype.enableCodeMapping;
            myself.currentSprite.blocksCache.variables = null;
            myself.currentSprite.paletteCache.variables = null;
            myself.refreshPalette();
        },
        StageMorph.prototype.enableCodeMapping,
        'uncheck to disable\nblock to text mapping features',
        'check for block\nto text mapping features',
        false
    );
    menu.popup(world, pos);
};

// OVERRIDE
// Another override for the same reason as above

IDE_Morph.prototype.projectMenu = function () {
    if(this.window){return;}
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
    if (shiftClicked) {
        menu.addItem(
            'Save to disk',
            'saveProjectToDisk',
            'experimental - store this project\nin your downloads folder',
            new Color(100, 0, 0)
        );
    }
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
    var dir,
        costumes = [];

    dir = this.getURL(dirname);
    dir.split('\n').forEach(
        function (line) {
            var startIdx = line.search(new RegExp('href="[^./?].*"')),
                endIdx,
                name;

            if (startIdx > 0) {
                name = line.substring(startIdx + 6);
                endIdx = name.search(new RegExp('"'));
                name = name.substring(0, endIdx);
                costumes.push(name);
            }
        }
    );
    costumes.sort(function (x, y) {
        return x < y ? -1 : 1;
    });
    return costumes;
};

// Override Snap! menu to show stuff about Snap4Arduino as well
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
IDE_Morph.prototype.showModalMessage = function (msg) {
	this.window = new DialogBoxMorph()
    	var txt = new TextMorph(
			msg,
	        this.fontSize,
			this.fontStyle,
			true,
			false,
			'center',
			null,
			null,
			MorphicPreferences.isFlat ? null : new Point(1, 1),
			new Color(255, 255, 255)
    	);
    	this.window.key = 'Aviso';
    	this.window.labelString = 'Aviso';
    	this.window.createLabel();
    	this.window.addBody(txt);
   	this.window.drawNew();
	this.window.fixLayout();
	this.window.popUp(world);
	this.window.show();
};
IDE_Morph.prototype.hideMessage = function() {
	if (this.window) {
			this.window.cancel();
			this.window = null;
	}
};
IDE_Morph.prototype.newProject = function () {
    if (this.window) {return;}
    else{this.showModalMessage('Conectando ...');}

    // Disconnect each sprite before creating the new project
    var sprites = this.sprites.asArray()
    sprites.forEach(function(sprite) {
        if (sprite.arduino && sprite.arduino.board) {
            sprite.arduino.disconnect();
        }
    });
    //myself.arduino.showMessage('this.message');
    this.originalNewProject();
};

