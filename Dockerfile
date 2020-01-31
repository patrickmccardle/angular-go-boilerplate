FROM golang:1.13-stretch

ENV \
 GOPATH="/go" \
 GOBIN="/go/bin" \
 GOARCH="amd64" \
 PATH="$PATH:/go/bin" \
 GO111MODULE=on


RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get install -y nodejs



WORKDIR /go/src/github.com/atompower/your-awesome-project


#COPY package.json .

#RUN npm run install-dependencies

CMD bash
