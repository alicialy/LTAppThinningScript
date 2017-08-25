usage: run below command in terminal


node linkmap_ext.js filepath -hl  


node linkmap_ext.js filepath -u


-h: format size

-l: stat libs

-u: stat unused class

filePath refers to the path of the link map file.

put 'linkmap_ext.js' and  'linkMap.txt' into the same folder then run command like this:

cd folder

node linkmap_ext.js linkMap.txt  -u


中文版详细介绍
http://alicialy.github.io/2017/04/07/iOS-App-Thinning/
