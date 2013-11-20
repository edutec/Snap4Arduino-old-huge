/*

    lang-ca.js

    Catalan translation for SNAP!

    written by Jens Mönig

    Copyright (C) 2013 by Jens Mönig

    This file is part of Snap!.

    Snap! is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.



    Note to Translators:
    --------------------
    At this stage of development, Snap! can be translated to any LTR language
    maintaining the current order of inputs (formal parameters in blocks).

    Translating Snap! is easy:


    1. Download

    Download the sources and extract them into a local folder on your
    computer:

        <http://snap.berkeley.edu/snapsource/snap.zip>

    Use the German translation file (named 'lang-de.js') as template for your
    own translations. Start with editing the original file, because that way
    you will be able to immediately check the results in your browsers while
    you're working on your translation (keep the local copy of snap.html open
    in your web browser, and refresh it as you progress with your
    translation).


    2. Edit

    Edit the translation file with a regular text editor, or with your
    favorite JavaScript editor.

    In the first non-commented line (the one right below this
    note) replace "de" with the two-letter ISO 639-1 code for your language,
    e.g.

        fr - French => SnapTranslator.dict.fr = {
        it - Italian => SnapTranslator.dict.it = {
        pl - Polish => SnapTranslator.dict.pl = {
        pt - Portuguese => SnapTranslator.dict.pt = {
        es - Spanish => SnapTranslator.dict.es = {
        el - Greek => => SnapTranslator.dict.el = {

    etc. (see <http://en.wikipedia.org/wiki/ISO_639-1>)


    3. Translate

    Then work through the dictionary, replacing the German strings against
    your translations. The dictionary is a straight-forward JavaScript ad-hoc
    object, for review purposes it should be formatted as follows:

        {
            'English string':
                'Translation string',
            'last key':
        }       'last value'

    and you only edit the indented value strings. Note that each key-value
    pair needs to be delimited by a comma, but that there shouldn't be a comma
    after the last pair (again, just overwrite the template file and you'll be
    fine).

    If something doesn't work, or if you're unsure about the formalities you
    should check your file with

        <http://JSLint.com>

    This will inform you about any missed commas etc.


    4. Accented characters

    Depending on which text editor and which file encoding you use you can
    directly enter special characters (e.g. Umlaut, accented characters) on
    your keyboard. However, I've noticed that some browsers may not display
    special characters correctly, even if other browsers do. So it's best to
    check your results in several browsers. If you want to be on the safe
    side, it's even better to escape these characters using Unicode.

        see: <http://0xcc.net/jsescape/>


    5. Block specs:

    At this time your translation of block specs will only work
    correctly, if the order of formal parameters and their types
    are unchanged. Placeholders for inputs (formal parameters) are
    indicated by a preceding % prefix and followed by a type
    abbreviation.

    For example:

        'say %s for %n secs'

    can currently not be changed into

        'say %n secs long %s'

    and still work as intended.

    Similarly

        'point towards %dst'

    cannot be changed into

        'point towards %cst'

    without breaking its functionality.


    6. Submit

    When you're done, rename the edited file by replacing the "de" part of the
    filename with the two-letter ISO 639-1 code for your language, e.g.

        fr - French => lang-fr.js
        it - Italian => lang-it.js
        pl - Polish => lang-pl.js
        pt - Portuguese => lang-pt.js
        es - Spanish => lang-es.js
        el - Greek => => lang-el.js

    and send it to me for inclusion in the official Snap! distribution.
    Once your translation has been included, Your name will the shown in the
    "Translators" tab in the "About Snap!" dialog box, and you will be able to
    directly launch a translated version of Snap! in your browser by appending

        lang:xx

    to the URL, xx representing your translations two-letter code.


    7. Known issues

    In some browsers accents or ornaments located in typographic ascenders
    above the cap height are currently (partially) cut-off.

    Enjoy!
    -Jens
*/

/*global SnapTranslator*/

SnapTranslator.dict.ca = {

/*
    Special characters: (see <http://0xcc.net/jsescape/>)

    Ä, ä   \u00c4, \u00e4
    Ö, ö   \u00d6, \u00f6
    Ü, ü   \u00dc, \u00fc
    ß      \u00df
*/

    // translations meta information
    'language_name':
        'Català', // the name as it should appear in the language menu
    'language_translator':
        'Bernat Romagosa Carrasquer', // your name for the Translators tab
    'translator_e-mail':
        'tibabenfortlapalanca@gmail.com', // optional
    'last_changed':
        '2013-11-20', // this, too, will appear in the Translators tab

    // GUI
    // control bar:
    'untitled':
        'Sense títol',
    'development mode':
        'mode de desenvolupament',

    // categories:
    'Motion':
        'Moviment',
    'Looks':
        'Aparença',
    'Sound':
        'So',
    'Pen':
        'Llapis',
    'Control':
        'Control',
    'Sensing':
        'Sensors',
    'Operators':
        'Operadors',
    'Variables':
        'Variables',
    'Lists':
        'Llistes',
    'Other':
        'Altres',

    // editor:
    'draggable':
        'arrossegable',

    // tabs:
    'Scripts':
        'Programes',
    'Costumes':
        'Vestits',
    'Sounds':
        'Sons',

    // names:
    'Sprite':
        'Objecte',
    'Stage':
        'Escenari',

    // rotation styles:
    'don\'t rotate':
        'no girar',
    'can rotate':
        'pot girar',
    'only face left/right':
        'només mirar esquerra/dreta',

    // new sprite button:
    'add a new sprite':
        'afegir un nou objecte',

    // tab help
    'costumes tab help':
        'podeu importar una imatge des d\'un altre lloc Web o des del\n'
            + 'vostre ordinador arrossegant-la fins aquí',
    'import a sound from your computer\nby dragging it into here':
        'podeu importar un so des del vostre ordinador\narrossegant-lo fins aquí',

    // primitive blocks:

    /*
        Attention Translators:
        ----------------------
        At this time your translation of block specs will only work
        correctly, if the order of formal parameters and their types
        are unchanged. Placeholders for inputs (formal parameters) are
        indicated by a preceding % prefix and followed by a type
        abbreviation.

        For example:

            'say %s for %n secs'

        can currently not be changed into

            'say %n secs long %s'

        and still work as intended.

        Similarly

            'point towards %dst'

        cannot be changed into

            'point towards %cst'

        without breaking its functionality.
    */

    // motion:
    'Stage selected:\nno motion primitives':
        'Escenari seleccionat:\nno hi ha primitives de moviment\n'
            + 'disponibles',

    'move %n steps':
        'moure %n passos',
    'turn %clockwise %n degrees':
        'gira %clockwise %n graus',
    'turn %counterclockwise %n degrees':
        'gira %counterclockwise %n graus',
    'point in direction %dir':
        'apunta en direcció %dir',
    'point towards %dst':
        'apunta cap a %dst',
    'go to x: %n y: %n':
        'vés a x: %n y: %n',
    'go to %dst':
        'vés a %dst',
    'glide %n secs to x: %n y: %n':
        'llisca en %n segons fins a x: %n y: %n',
    'change x by %n':
        'suma %n a x',
    'set x to %n':
        'assigna el valor %n a x',
    'change y by %n':
        'suma %n a y',
    'set y to %n':
        'assigna el valor %n a y',
    'if on edge, bounce':
        'rebota en tocar una vora',
    'x position':
        'posició x',
    'y position':
        'posició y',
    'direction':
        'direcció',

    // looks:
    'switch to costume %cst':
        'canvia el vestit a %cst',
    'next costume':
        'següent vestit',
    'costume #':
        'número de vestit',
    'say %s for %n secs':
        'digues %s durant %n segons',
    'say %s':
        'digues %s',
    'think %s for %n secs':
        'pensa %s durant %n segons',
    'think %s':
        'pensa %s',
    'Hello!':
        'Hola!',
    'Hmm...':
        'Hmm...',
    'change %eff effect by %n':
        'augmenta l\'efecte %eff en %n',
    'set %eff effect to %n':
        'fixa l\'efecte %eff a %n',
    'clear graphic effects':
        'treu els efectes gràfics',
    'change size by %n':
        'augmenta %n la mida',
    'set size to %n %':
        'fixa la mida a %n %',
    'size':
        'mida',
    'show':
        'mostra',
    'hide':
        'amaga',
    'go to front':
        'vés al front',
    'go back %n layers':
        'vés %n capes darrera',

    'development mode \ndebugging primitives:':
        'mode de desenvolupament \nprimitives de depuració',
    'console log %mult%s':
        'log per consola: %mult%s',
    'alert %mult%s':
        'alerta: %mult%s',

    // sound:
    'play sound %snd':
        'toca el so %snd',
    'play sound %snd until done':
        'toca el so %snd fins que acabi',
    'stop all sounds':
        'atura tots els sons',
    'rest for %n beats':
        'fes silenci durant %n temps',
    'play note %n for %n beats':
        'toca la nota %n durant %n temps',
    'change tempo by %n':
        'augmenta el tempo en %n',
    'set tempo to %n bpm':
        'fixa el tempo a %n',
    'tempo':
        'tempo',

    // pen:
    'clear':
        'neteja',
    'pen down':
        'baixa el llapis',
    'pen up':
        'puja el llapis',
    'set pen color to %clr':
        'fixa el color del llapis a %clr',
    'change pen color by %n':
        'augmenta en %n el color del llapis',
    'set pen color to %n':
        'fixa el color del llapis a %n',
    'change pen shade by %n':
        'augmenta en %n la intensitat del llapis',
    'set pen shade to %n':
        'fixa la intensitat del llapis a %n',
    'change pen size by %n':
        'augmenta en %n la mida del llapis',
    'set pen size to %n':
        'fixa la mida del llapis en %n',
    'stamp':
        'estampa',

    // control:
    'when %greenflag clicked':
        'Quan la %greenflag es premi',
    'when %keyHat key pressed':
        'Quan la tecla %keyHat es premi',
    'when I am clicked':
        'Quan es cliqui aquest personatge',
    'when I receive %msgHat':
        'Quan rebi %msgHat',
    'broadcast %msg':
        'Envia a tots %msg',
    'broadcast %msg and wait':
        'Envia a tots %msg i espera',
    'Message name':
        'Nom del missatge',
    'wait %n secs':
        'espera %n segons',
    'wait until %b':
        'espera fins %b',
    'forever %c':
        'per sempre %c',
    'repeat %n %c':
        'repeteix %n vegades %c',
    'repeat until %b %c':
        'repeteix fins %b %c',
    'if %b %c':
        'si %b llavors %c',
    'if %b %c else %c':
        'si %b llavors %c si no %c',
    'report %s':
        'retorna %s',
    'stop block':
        'atura el bloc',
    'stop script':
        'atura aquest programa',
    'stop all %stop':
        'atura-ho tot %stop',
    'run %cmdRing %inputs':
        'executa %cmdRing %inputs',
    'launch %cmdRing %inputs':
        'llança %cmdRing %inputs',
    'call %repRing %inputs':
        'crida %repRing %inputs',
    'run %cmdRing w/continuation':
        'executa %cmdRing amb continuació',
    'call %cmdRing w/continuation':
        'crida %cmdRing amb continuació',
    'warp %c':
        'executa de cop %c',

    // sensing:
    'touching %col ?':
        'tocant %col ?',
    'touching %clr ?':
        'tocant el color %clr ?',
    'color %clr is touching %clr ?':
        'color %clr sobre %clr ?',
    'ask %s and wait':
        'pregunta %s i espera',
    'what\'s your name?':
        'Com et dius?',
    'answer':
        'resposta',
    'mouse x':
        'ratolí x',
    'mouse y':
        'ratolí y',
    'mouse down?':
        'ratolí clicat?',
    'key %key pressed?':
        'tecla %key premuda?',
    'distance to %dst':
        'distància a %dst',
    'reset timer':
        'reinicia el cronòmetre',
    'timer':
        'cronòmetre',
    'http:// %s':
        'http:// %s',

    'filtered for %clr':
        'filtrat per a %clr',
    'stack size':
        'mida de la pila',
    'frames':
        'frames',

    // operators:
    '%n mod %n':
        'residu de dividir %n entre %n',
    'round %n':
        'arrodoneix %n',
    '%fun of %n':
        '%fun de %n',
    'pick random %n to %n':
        'nombre a l\'atzar entre %n i %n',
    '%b i %b':
        '%b y %b',
    '%b or %b':
        '%b o %b',
    'not %b':
        'no %b',
    'true':
        'cert',
    'false':
        'fals',
    'join %words':
        'unir %words',
    'hello':
        'hola',
    'world':
        'món',
    'letter %n of %s':
        'lletra %n de %s',
    'length of %s':
        'longitud de %s',
    'unicode of %s':
        'Valor Unicode de %s',
    'unicode %n as letter':
        'Lletra amb valor Unicode %n',
    'is %s a %typ ?':
        'És %s un %typ ?',
    'is %s identical to %s ?':
        'És %s idèntic a %s ?',

    'type of %s':
        'tipus de %s',

    // variables:
    'Make a variable':
        'Crear una variable',
    'Variable name':
        'Nom de variable',
    'Delete a variable':
        'Esborrar una variable',

    'set %var to %s':
        'assigna a %var el valor %s',
    'change %var by %n':
        'augmenta %var en %n',
    'show variable %var':
        'mostra la variable %var',
    'hide variable %var':
        'amaga la variable %var',
    'script variables %scriptVars':
        'variables de programa %scriptVars',

    // lists:
    'list %exp':
        'llista %exp',
    '%s in front of %l':
        '%s afegit davant de %l',
    'item %idx of %l':
        'element %idx de %l',
    'all but first of %l':
        '%l sense el primer element',
    'length of %l':
        'longitud de %l',
    '%l contains %s':
        '%l conté %s',
    'thing':
        'cosa',
    'add %s to %l':
        'afegeix %s a %l',
    'delete %ida of %l':
        'esborra %ida de %l',
    'insert %s at %idx of %l':
        'insereix %s a la posició %idx de %l',
    'replace item %idx of %l with %s':
        'substitueix l\'element %idx de %l per %s',

    // other
    'Make a block':
        'Crea un bloc',

    // menus
    // snap menu
    'About...':
        'Sobre Snap!',
    'Snap! website':
        'Web de Snap!',
    'Download source':
        'Descarregar codi font',
    'Switch back to user mode':
        'Tornar a mode d\'usuari',
    'disable deep-Morphic\ncontext menus\nand show user-friendly ones':
        'canviar menús contextuals\nprimitius de Morphic\nper menús més amigables',
    'Switch to dev mode':
        'Canviar a mode desenvolupador',
    'enable Morphic\ncontext menus\nand inspectors,\nnot user-friendly!':
        'habilitar menús\ncontextuals de\nMorphic i inspectors,\nmode expert!',

    // project menu
    'Project notes...':
        'Notes del projecte...',
    'New':
        'Nou',
    'Open...':
        'Obrir...',
    'Save':
        'Desar',
    'Save As...':
        'Desar com...',
    'Import...':
        'Importar...',
    'file menu import hint':
        'pistes del menú d\'importació',
    'Export project as plain text...':
        'Exportar projecte en text pla...',
    'Export project...':
        'Exportar projecte...',
    'show project data as XML\nin a new browser window':
        'mostrar tot el projecte en format XML\nen una altra finestra del navegador',
    'Export blocks...':
        'Exportar blocs...',
    'show global custom block definitions as XML\nin a new browser window':
        'mostrar definicions de blocs personalitzats\nen format XML en una altra finestra del\nnavegador',
    'Import tools':
        'Importar eines',
    'load the official library of\npowerful blocks':
        'carregar la llibreria\noficial de blocs avançats',

    // settings menu
    'Language...':
        'Idioma...',
    'Blurred shadows':
        'Sombras borrosas',
    'uncheck to use solid drop\nshadows and highlights':
        'desmarque para usar sombras s\u00F3lidas \ne iluminaciones',
    'check to use blurred drop\nshadows and highlights':
        'marcar para usar sombras borrosas\ne iluminaciones',
    'Zebra coloring':
        'Coloraci\u00F3n de cebra',
    'check to enable alternating\ncolors for nested blocks':
        'marcar para habilitar alternaci\u00F3n\nde colores para bloques anidados',
    'uncheck to disable alternating\ncolors for nested block':
        'desmarcar para inhabilitar alternaci\u00F3n\nde colores para bloques anidados',
    'Dynamic input labels':
        'Etiquetas de entradas din\u00E1micas',
    'uncheck to disable dynamic\nlabels for variadic inputs':
        'desmarcar para inhabilitar etiquetas\ndin\u00E1micas para entradas varidic',
    'check to enable dynamic\nlabels for variadic inputs':
        'marcar para habilitar etiquetas\ndin\u00E1micas para entradas varidic',
    'Prefer empty slot drops':
        'Preferir ranuras de gotas vac\u00EDas',
    'settings menu prefer empty slots hint':
        'men\u00FA de ajustes prefiere pistas de ranuras vac\u00EDas',
    'uncheck to allow dropped\nreporters to kick out others':
        'desmarcar para permitir reporteros\nca\u00EDdos para echar a otros',
    'Long form input dialog':
        'di\u00E1logo de entradas de forma larga',
    'check to always show slot\ntypes in the input dialog':
        'marcar para siempre mostrar tipos\nde espacios en el di\u00E1logo de insumo',
    'uncheck to use the input\ndialog in short form':
        'desmarcar para usar el di\u00E1logo\nde insumo en forma corta',
    'Virtual keyboard':
        'Teclado virtual',
    'uncheck to disable\nvirtual keyboard support\nfor mobile devices':
        'desmarcar para inhabilitar\nsoporte al teclado virtual\npara dispositivos m\u00F3viles',
    'check to enable\nvirtual keyboard support\nfor mobile devices':
        'marcar para habilitar\nsoporte para el teclado virtual\npara dispositivos m\u00F3viles',
    'Input sliders':
        'Deslizadores de insumo',
    'uncheck to disable\ninput sliders for\nentry fields':
        'desmarcar para inhabilitar\ndeslizadores de insumo para\ncampos de entrada',
    'check to enable\ninput sliders for\nentry fields':
        'marcar para habilitar\ndeslizadores de entrada para\ncampos de entrada',
    'Clicking sound':
        'Sonido de clic',
    'uncheck to turn\nblock clicking\nsound off':
        'desmarcar para encender\nbloquear clic\napagar sonido',
    'check to turn\nblock clicking\nsound on':
        'marcar para encender\nbloque de clic\nencender sonido',
    'Animations':
        'Animaciones',
    'uncheck to disable\nIDE animations':
        'desmarcar para inhabilitar\nanimaciones IDE',
    'check to enable\nIDE animations':
        'marcar para habilitar\nanimaciones IDE',
    'Thread safe scripts':
        'Programas seguros para serie',
    'uncheck to allow\nscript reentrancy':
        'desmarcar para permitir\nreingreso de programa',
    'check to disallow\nscript reentrancy':
        'marcar para no permitir\nreingreso de programa',

    // inputs
    'with inputs':
        'con entradas',
    'input names:':
        'nombres de entradas:',
    'Input Names:':
        'Nombres de entradas:',
    'input list:':
        'lista de entradas:',

    // context menus:
    'help':
        'ayuda',

    // blocks:
    'help...':
        'ayuda...',
    'relabel...':
        'renombrar...',
    'duplicate':
        'duplicar',
    'make a copy\nand pick it up':
        'crear una copia y recogerla',
    'only duplicate this block':
        's\u00F3lo duplicar este bloque',
    'delete':
        'borrar',
    'script pic...':
        'foto de programa...',
    'open a new window\nwith a picture of this script':
        'abrir una nueva ventana\ncon una foto de este programa',
    'ringify':
        'zumbar',
    'unringify':
        'deszumbar',

    // custom blocks:
    'delete block definition...':
        'borrar definici\u00F3n de bloque',
    'edit...':
        'editar...',

    // sprites:
    'edit':
        'editar',
    'export...':
        'exportar...',

    // stage:
    'show all':
        'mostrar todos',

    // scripting area
    'clean up':
        'limpiar',
    'arrange scripts\nvertically':
        'alinear programas\nverticalmente',
    'add comment':
        'agregar comentario',
    'make a block...':
        'crear un bloque...',

    // costumes
    'rename':
        'renombrar',
    'export':
        'exportar',
    'rename costume':
        'renombrar disfraz',

    // sounds
    'Play sound':
        'Tocar sonido',
    'Stop sound':
        'Detener sonido',
    'Stop':
        'Detener',
    'Play':
        'Tocar',
    'rename sound':
        'renombrar sonido',

    // dialogs
    // buttons
    'OK':
        'OK',
    'Ok':
        'Ok',
    'Cancel':
        'Cancelar',
    'Yes':
        'Si',
    'No':
        'No',

    // help
    'Help':
        'Ayuda',

    // Project Manager
    'Untitled':
        'Sin T\u00EDtulo',
    'Open Project':
        'Abrir Proyecto',
    '(empty)':
        '(vacio)',
    'Saved!':
        '\u00A1Guardado!',
    'Delete Project':
        'Borrar Proyecto',
    'Are you sure you want to delete':
        '\u00BFEst\u00E1s seguro que deseas borrar?',
    'rename...':
        'renombrar...',

    // costume editor
    'Costume Editor':
        'Editor de disfraz',
    'click or drag crosshairs to move the rotation center':
        'da clic o arrastra punto de mira para mover el centro de rotaci\u00F3n',

    // project notes
    'Project Notes':
        'Notas de proyecto',

    // new project
    'New Project':
        'Nuevo Proyecto',
    'Replace the current project with a new one?':
        '\u00BFReemplazar este proyecto con uno nuevo?',

    // save project
    'Save Project As...':
        'Guardar Proyecto Como...',

    // export blocks
    'Export blocks':
        'Exportar bloques',
    'Import blocks':
        'Importar bloques',
    'this project doesn\'t have any\ncustom global blocks yet':
        'este proyecto no tiene ning\u00FAn bloque personalizado todab\u00EDa',
    'select':
        'seleccionar',
    'all':
        'todos',
    'none':
        'ninguno',

    // variable dialog
    'for all sprites':
        'para todos los objetos',
    'for this sprite only':
        'para este objeto solamente',

    // block dialog
    'Change block':
        'Cambiar bloque',
    'Command':
        'Comando',
    'Reporter':
        'Reportero',
    'Predicate':
        'Predicado',

    // block editor
    'Block Editor':
        'Bloquear editor',
    'Apply':
        'Aplicar',

    // block deletion dialog
    'Delete Custom Block':
        'Borrar Bloque Personalizado',
    'block deletion dialog text':
        'supreci\u00F3n de bloque de texto de di\u00E1logo',

    // input dialog
    'Create input name':
        'Crear nombre de insumo',
    'Edit input name':
        'Editar nombre de insumo',
    'Edit label fragment':
        'Editar fragmento de etiqueta',
    'Title text':
        'Texto de t\u00EDtulo',
    'Input name':
        'Nombre de insumo',
    'Delete':
        'Borrar',
    'Object':
        'Objeto',
    'Number':
        'N\u00FAmero',
    'Text':
        'Texto',
    'List':
        'Lista',
    'Any type':
        'Cualquier tipo',
    'Boolean (T/F)':
        'Booleano (C/F)',
    'Command\n(inline)':
        'Comando\n(en l\u00EDnea)',
    'Command\n(C-shape)':
        'Comando\n(forma C)',
    'Any\n(unevaluated)':
        'Cualquier\n(sin evaluar)',
    'Boolean\n(unevaluated)':
        'Booleano\n(sin evaluar)',
    'Single input.':
        'Entrada sola.',
    'Default Value:':
        'Valor Predeterminado:',
    'Multiple inputs (value is list of inputs)':
        'M\u00FAltiples entradas (valor es lista de insumos)',
    'Upvar - make internal variable visible to caller':
        'Crear variable interno visible al llamador',

    // About Snap
    'About Snap':
        'Acerca de Snap',
    'Back...':
        'Atr\u00E1s...',
    'License...':
        'Licencia...',
    'Modules...':
        'M\u00F3dulos...',
    'Credits...':
        'Creditos...',
    'Translators...':
        'Traductores',
    'License':
        'Licencia',
    'current module versions:':
        'versiones del m\u00F3dulo actual',
    'Contributors':
        'Contribuidores',
    'Translations':
        'Traducciones',

    // variable watchers
    'normal':
        'normal',
    'large':
        'grande',
    'slider':
        'deslizador',
    'slider min...':
        'm\u00EDnimo de deslizador...',
    'slider max...':
        'm\u00E1ximo de deslizador...',
    'Slider minimum value':
        'm\u00EDnimo valor de deslizador',
    'Slider maximum value':
        'm\u00E1ximo valor de deslizador',

    // list watchers
    'length: ':
        'longitud: ',

    // coments
    'add comment here...':
        'agregar comentario aqu\u00ED',

    // drow downs
    // directions
    '(90) right':
        '(90) derecha',
    '(-90) left':
        '(-90) izquierda',
    '(0) up':
        '(0) arriba',
    '(180) down':
        '(180) abajo',

    // collision detection
    'mouse-pointer':
        'puntero del rat\u00F3n',
    'edge':
        'borde',
    'pen trails':
        'rastro del l\u00E1piz',

    // costumes
    'Turtle':
        'Tortuga',

    // graphical effects
    'ghost':
        'fantasma',

    // keys
    'space':
        'espacio',
    'up arrow':
        'flecha de arriba',
    'down arrow':
        'flecha de abajo',
    'right arrow':
        'flecha derecha',
    'left arrow':
        'flecha izquierda',
    'a':
        'a',
    'b':
        'b',
    'c':
        'c',
    'd':
        'd',
    'e':
        'e',
    'f':
        'f',
    'g':
        'g',
    'h':
        'h',
    'i':
        'i',
    'j':
        'j',
    'k':
        'k',
    'l':
        'l',
    'm':
        'm',
    'n':
        'n',
    'o':
        'o',
    'p':
        'p',
    'q':
        'q',
    'r':
        'r',
    's':
        's',
    't':
        't',
    'u':
        'u',
    'v':
        'v',
    'w':
        'w',
    'x':
        'x',
    'y':
        'y',
    'z':
        'z',
    '0':
        '0',
    '1':
        '1',
    '2':
        '2',
    '3':
        '3',
    '4':
        '4',
    '5':
        '5',
    '6':
        '6',
    '7':
        '7',
    '8':
        '8',
    '9':
        '9',

    // messages
    'new...':
        'nuevo...',

    // math functions
    'abs':
        'abs',
    'sqrt':
        'ra\u00EDz cuadrada',
    'sin':
        'sin',
    'cos':
        'cos',
    'tan':
        'tan',
    'asin':
        'asin',
    'acos':
        'acos',
    'atan':
        'atan',
    'ln':
        'ln',
    'e^':
        'e^',

    // data types
    'number':
        'n\u00FAmero',
    'text':
        'texto',
    'Boolean':
        'Booleano',
    'list':
        'lista',
    'command':
        'comando',
    'reporter':
        'reportero',
    'predicate':
        'predicado',

    // list indices
    'last':
        '\u00FAltimo',
    'any':
        'cualquier'
};
