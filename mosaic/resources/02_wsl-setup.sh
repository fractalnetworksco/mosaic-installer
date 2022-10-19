#!/bin/bash

## Install Docker
curl https://get.docker.com |bash


## Add $USER to docker group
sudo usermod -aG docker $USER

