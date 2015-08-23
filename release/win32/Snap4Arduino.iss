; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{79712027-5DAE-425B-8534-1CA699720EA5}
AppName=Snap4Arduino
AppVersion=1.0.5-beta
AppVerName=Snap4Arduino-1.0.5-beta
AppPublisher=Citilab
AppPublisherURL=http://www.s4a.cat/snap
AppSupportURL=http://www.s4a.cat/snap
AppUpdatesURL=http://www.s4a.cat/snap
DefaultDirName={pf}\Snap4Arduino
DefaultGroupName=Snap4Arduino
AllowNoIcons=yes
OutputDir=.
OutputBaseFilename=Snap4Arduino-1.0.5-beta
SetupIconFile=s4a.ico
Compression=lzma
SolidCompression=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "catalan"; MessagesFile: "compiler:Languages\Catalan.isl"
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"
Name: "Nederlands"; MessagesFile: "compiler:Languages\Dutch.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 0,6.1

[Files]
Source: "app.nw"; DestDir: "{app}"; Flags: ignoreversion
Source: "credits.html"; DestDir: "{app}"; Flags: ignoreversion
Source: "ffmpegsumo.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "nw.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "nw.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "s4a.ico"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\Snap4Arduino"; Filename: "{app}\nw.exe"; Parameters: "app.nw"; IconFilename: "{app}\s4a.ico"; WorkingDir: "{app}"
Name: "{group}\{cm:ProgramOnTheWeb,Snap4Arduino}"; Filename: "http://www.s4a.cat/snap"
Name: "{group}\{cm:UninstallProgram,Snap4Arduino}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\Snap4Arduino"; Filename: "{app}\nw.exe"; Parameters: "app.nw"; IconFilename: "{app}\s4a.ico"; Tasks: desktopicon; WorkingDir: "{app}"
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\Snap4Arduino"; Filename: "{app}\nw.exe"; Parameters: "app.nw"; Tasks: quicklaunchicon; WorkingDir: "{app}"

[Run]
Filename: "{app}\nw.exe"; Parameters: "app.nw"; Description: "{cm:LaunchProgram,Snap4Arduino}"; Flags: nowait postinstall skipifsilent
