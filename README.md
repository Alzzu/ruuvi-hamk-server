# Server for Ruuvi Tags

This project was part of course in HAMK (https://www.hamk.fi/)

## Requirements

- InfluxDB server
- Node 8

## Tested on

We are running server/client and InfluxDB on Raspberry PI 3 b+
We used https://github.com/hypriot/rpi-influxdb to run InfluxDB as a container on RPI

## Installation

First you need to run command `npm install` or `yarn` to install the needed packages

Then you need to rename `.env.example` to `.env` and then fill all the needed information

After that you can run the server by using command `npm start` or `yarn start`

### Optional

You can also build the server as a docker container using command `docker build -t name/containername .`
After building the container you can use command `docker run -p 3000:3000 --restart always --net=host -d --name ruuvi-server name/containername` important is that you forward the right port if you changed it
