# SpeedTrack &trade; Bandwidth Speed Monitor

This application is a backend service that provides an API endpoint to be used by 
the React client to fetch speed data.

This application i.e. the whole `/backend` folder must be installed on a web server.
In this example we will host the application we will host it on an Ubuntu server with `apache2`, `nodejs` and `pm2` 
installed and running.

## Server Setup

1. Configure your web server using [lampset](https://github.com/gmurambadoro/lampset). You may also need to 
   install [lampset-vhost-add](https://github.com/gmurambadoro/lampset-vhost-add) to be able to easily add 
   virtual hosts on your server.
1. [Download](https://nodejs.org/en/download/) and install [NodeJs](https://nodejs.org/en/) - preferably install the most recent stable version.
1. Download and install [PM2](https://pm2.keymetrics.io/). PM2 is a process manager and it is responsible for ensuring that your node applications are always online.

## Installation

1. Clone this repository somewhere on your machine.
    - `git clone https://github.com/gmurambadoro/speedtrack-full-stack.git`
1. Run the `install.sh` script in the `speedtrack-full-stack` folder.
    - `bash install.sh`
1. The installer script will ask you for the following environment variables:
   
   - `FRONTEND_DIR` - the directory name relative to `/var/www/` that will hold the frontend files e.g. `frontend.example.com`
   - `BACKEND_DIR` - the directory name relative to `/var/www/` that will hold the backend files e.g. `backend.example.com`
   - `BACKEND_URL` - the hostname for the backend speed API. This is required by the frontend when connecting to the backend
   API service e.g. `http://backend.example.com`.
     
1. When successfully completed, your two apps will be located in the `/var/www/` folder

## Setting Up Virtual Host Configurations 
