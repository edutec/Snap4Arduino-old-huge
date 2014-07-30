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
