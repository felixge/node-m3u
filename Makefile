SHELL := /bin/bash

test-integration:
	@find test/integration/test-*.js | xargs -n 1 -t node
