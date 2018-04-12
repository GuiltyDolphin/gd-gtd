.PHONY: gd.js
gd.js :
	browserify src/gd.js --standalone gd -o gd.js

TEST_PROG=mocha

.PHONY: test
test :
	@echo "Running tests with '$(TEST_PROG)'"
	@$(TEST_PROG)
