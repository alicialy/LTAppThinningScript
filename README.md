# LTAppThinningScript

It's a nodejs script to find unused OC class in iOS

### Usage

install nodejs, then run command in terminal

### Find Not Import Class By Analyze LinkMap File


##### Settings to create LinkMap file

Xcode -> Project -> Build Settings -> Write LinkMap File -> YES，

Set "Path to Link Map File" to where you want to create LinkMap file, Default in "~/Library/Developer/Xcode/DerivedData/XXX-eumsvrzbvgfofvbfsoqokmjprvuh/Build/Intermediates/XXX.build/Debug-iphoneos/XXX.build/"

Xcode -> Build


##### Run command

node linkmap_ext.js filepath -hl

node linkmap_ext.js filepath -u

-h: format size

-l: stat libs

-u: stat unused class


filePath refers to the path of the link map file.

like this:

node linkmap_ext.js /Users/xxx/Downloads/script/linkMap.txt  -u


### New Added - Find Unused Import Files

linkmap_ext command can help you find out the unimport files, if you want to find unused import files use below command


##### Run command

node unused_import.js filepath

(now it only can find unused import files in one file)


like this:

node unused_import.js /Users/xxx/Downloads/LTSampleViewController.m

output:

WSSampleModule.h

NSString+Additions.h

WSSampleTestViewController.h

These files is imported in LTSampleViewController, but may not used in this file.

Note that some files you may use, like 'NSString+Additions.h', so be careful when you delete it


