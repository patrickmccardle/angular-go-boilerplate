# ==================== [START] Global Variable Declaration =================== #
SHELL := /bin/bash
BASE_DIR := $(shell pwd)
UNAME_S := $(shell uname -s)
APP_NAME := your-awesome-project
WORK_DIR := your-awesome-project
export
# ===================== [END] Global Variable Declaration ==================== #
# =========================== [START] Build Scripts ========================== #
clean:
		@rm -rf $(BASE_DIR)/vendor $(BASE_DIR)/_vendor-*
		@rm -f *.linux
		@rm -f *.darwin
.PHONY: build
build: clean
		@cd $(BASE_DIR) && env GOOS=linux GOARCH=amd64 go build -o $(APP_NAME).linux
		@cd $(BASE_DIR) && env GOOS=darwin GOARCH=amd64 go build -o $(APP_NAME).darwin
docker_build:
		@docker build -t atompower/$(APP_NAME):latest .
# ============================ [END] Build Scripts =========================== #
# ============================ [START] Run Scripts =========================== #
docker_run:
		@docker-compose up -d
		@docker exec -it goang bash

docker_stop:
		@docker-compose down
# ============================= [END] Run Scripts ============================ #
# ========================= [START] Formatting Script ======================== #
gofmt:
		@go fmt github.com/atompower/$(WORK_DIR)/...
golint:
		@golint github.com/atompower/$(WORK_DIR)/...
govet:
		@go vet github.com/atompower/$(WORK_DIR)/...
lint: gofmt golint govet
# ========================== [END] Formatting Script ========================= #
test_by_pkg:
		@go test -v github.com/atompower/$(WORK_DIR)
cvg:
		@go test -v -cover github.com/atompower/$(WORK_DIR)
# ======================= [START] Documentation Scripts ====================== #
godoc:
		@godoc -http=":6060"
# ==============-========= [END] Documentation Scripts =========-============= #
