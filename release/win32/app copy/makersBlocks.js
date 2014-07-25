

SyntaxElementMorph.prototype.originalLabelPart_Makers = SyntaxElementMorph.prototype.labelPart;

function overridenLabelPart(spec) {
	var part;
	switch (spec) {
		case '%buzzerval':
            part = new InputSlotMorph(
                null,
                true,
                {
                    '0' : 0,
                    '50' : 50,
                    '100' : 100
                }
            );
            part.setContents(50);
            break;

		default:
			part = SyntaxElementMorph.prototype.originalLabelPart_Makers(spec);
		}
	return part;
}

SyntaxElementMorph.prototype.labelPart = overridenLabelPart

