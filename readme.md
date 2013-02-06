bigfile
=======

Quickly find the biggest files lurking deep in a directory.

Installation:

    git clone https://github.com/breck7/bigfile.git
    sudo npm install -g bigfile/

Example use:

    bigfile .
    # pass an i to ignore hidden files
    bigfile . i

Example output:

    Total: 0.0MB
    3 biggest files:
    ./bigfile.js 0.0MB 62%
    ./package.json 0.0MB 22%
    ./readme.md 0.0MB 15%

