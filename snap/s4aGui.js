// userMenu proxy

SpriteIconMorph.prototype.originalUserMenu = SpriteIconMorph.prototype.userMenu;

overridenUserMenu = function () {
	menu = this.originalUserMenu();
	menu.addLine();
	menu.addItem('connect to Arduino', function() { 
		var portMenu = new MenuMorph(this, 'select a port');
		world.arduino.portList.forEach(function(each) {
   			portMenu.addItem(each, function() { 
				// actually connect the Arduino to the port `each`
			})
		});
		portMenu.popUpAtHand(world);
	});
	return menu;
}

SpriteIconMorph.prototype.userMenu = overridenUserMenu;


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

