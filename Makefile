
# Usage:
#   [VERSION=v3] [REGISTRY="staging-k8s.gcr.io"] make build
VERSION?=v3
REGISTRY?=staging-k8s.gcr.io

release: clean build push clean

# builds a docker image that builds the app and packages it into a minimal docker image
build:
	docker build -t ${REGISTRY}/demo:${VERSION} .

# push the image to an registry
push:
	gcloud docker -- push ${REGISTRY}/demo:${VERSION}

# remove previous images and containers
clean:
	docker rm -f ${REGISTRY}/demo:${VERSION} 2> /dev/null || true

.PHONY: release clean build push
