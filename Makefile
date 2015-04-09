#
# Vars
#

NODE_BIN = ./node_modules/.bin

#
# Tasks
# 

validate:
	@${NODE_BIN}/noiit
	@${NODE_BIN}/jshint index.js test/**

test:
	@${NODE_BIN}/mocha test/index.js

ci: validate test

.PHONY: test validate ci