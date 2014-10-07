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
IDE_Morph.prototype.setLanguage = function (lang, callback) {
    var translation = document.getElementById('language'),
        src = 'lang-' + lang + '.js',
        myself = this;
    SnapTranslator.unload();
    if (translation) {
        document.head.removeChild(translation);
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback);
    }
    translation = document.createElement('script');
    translation.id = 'language';
    translation.onload = function () {
        myself.reflectLanguage(lang, callback);
    };
    document.head.appendChild(translation);
    translation.src = src;

    // Load language script for s4a related functions
    var s4a_translation = document.getElementById('s4a-language'),
        s4a_src = 's4a-lang-' + lang + '.js',
        myself = this;
    SnapTranslator.unload();
    if (s4a_translation) {
        document.head.removeChild(s4a_translation);
    }
    if (lang === 'en') {
        return this.reflectLanguage('en', callback);
    }
    s4a_translation = document.createElement('script');
    s4a_translation.id = 's4a-language';
    s4a_translation.onload = function () {
        myself.reflectLanguage(lang, callback);
    };
    document.head.appendChild(s4a_translation);
    s4a_translation.src = s4a_src;

};

// Fix probelm with connected board when creating a new project 
// If the board is connected (it is not freed for the new srpites)
IDE_Morph.prototype.originalnNewProject = IDE_Morph.prototype.newProject


IDE_Morph.prototype.newProject = function () {
    // Disconnect each sprite before creating the new project
    var sprites = this.sprites.asArray()
    sprites.forEach(function(sprite) {
        if (sprite.arduino && sprite.arduino.board) {
            sprite.arduino.disconnect();
        }
    })
    this.originalnNewProject();
};

