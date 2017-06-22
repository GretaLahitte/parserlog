This script is listening for an input and add it to mongoDB.

Pipe a json file to this script:

$tail -F -n 0 file.json|node parserlog.js

Each new line will be inserted in mongoDB
