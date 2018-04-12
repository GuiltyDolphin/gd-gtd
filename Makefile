.PHONY: gd.js
gd.js :
	browserify src/gd.js --standalone gd -o gd.js
