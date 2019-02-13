# Server for Ruuvi Tags

This project was part of course in HAMK (https://www.hamk.fi/)

Some of the server functionality is currently HAMK specific e.g. Lunch

Frontend client can be found here https://github.com/jonivirtanen/ruuvi-hamk-client

## Requirements

- InfluxDB server
- Node 8

## Tested on

We are running server, client and InfluxDB on Raspberry PI 3 b+

We used https://github.com/hypriot/rpi-influxdb to run InfluxDB as a container on RPI

## Installation

Clone the repository
```
git clone git@github.com:Alzzu/ruuvi-hamk-server.git
```

Then you need to rename `.env.example` to `.env` and then fill all the needed information

After that install packages and run the server
```
cd ruuvi-hamk-server
npm install
npm start
```

### Optional

It is also possible to run server as docker container

Build the server as a docker container using command `docker build -t name/containername .`

After building the container you can use command `docker run --restart always --net=host -d --name ruuvi-server name/containername` to run it