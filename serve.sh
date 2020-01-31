#!/bin/sh

ng serve --host 0.0.0.0 &
gin --port 4201 --path . --build ./src/server/ --i --all &

wait
