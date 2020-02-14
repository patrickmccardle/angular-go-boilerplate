# How To Build
From within the root directory, run `build` and then `make docker_build` to build the docker container with the volume that is defined in the docker-compose file

# Running
Running `make docker_run` with run the docker-compose file, and bash the user into the newly created docker container with `docker exec -it goang bash`

# In the container
From within the container, you can run `npm run install-dependencies` to get all necessary Go libraries and also runs the regular `npm install` command to get all necessary node_module packages.

# Starting the servers
After the dependencies have been installed, you can run `npm start` which calls a bash script `serve.sh` which starts the angular local-dev server on `--host 0.0.0.0`. This makes sure that the frontend is reachable from out host machine even though it is hosted in the docker container. This command also tells Gin (our RESTapi server in Go) to spin up as well given a specific port (4201)

# Hot reload
Make any changes to frontend or backend code and save to see the changes reload in front of you. 

# Take aways
Currently there is no implementation of a database or ORM in the project. Also there is no real means for authentication yet. Those ideally will be the next 2 things to add
