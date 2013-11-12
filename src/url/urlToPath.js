'use strict';

var pathModule = require('path');
var urlModule = require('url');

var urlToPath = {};

urlToPath.setBase = function(path) {
	this.basePath = pathModule.resolve(path);
};

urlToPath.getPath = function(url) {
	url = urlModule.parse(url);
	
	var path = [this.basePath, url.hostname];
	path = path.concat(decodeURIComponent(url.pathname).split('/').slice(1));
        if (path[path.length - 1] === '' || path[path.length - 1] == null) {
            // URL ends with a slash. It is a folder
            path[path.length - 1] = 'index.html';
        } else if (path[path.length-1] != null && path[path.length - 1].indexOf('.') === -1 ) {
            // Last part looks like a folder
            path.push('index.html');
        }else{
            path[path.length - 1] = 'index__.html'
        }
	return pathModule.join.apply(null, path);
};

module.exports = urlToPath;
