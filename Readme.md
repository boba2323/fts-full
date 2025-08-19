We might have been better off not using JWT and instead sticking to a session based auth instead.

# This is a file management app. We may also call it Crumpet

## Heavily focussed on Team creation and management.
Crumpet uses intricate permrissions system to keep files in silos that are only avaialable to entities that have been
granted permissions to access them and perform operations on them. 

A flowchart of the models is necessary to understand whats going on. 

supervisor >> teamsL1 >> L2 >> L2 >> temp

### Future scope
Add ONLYOFFICE
AI search (distant possibility)
Notifications and communications
Performance


### Things to check before dockerising and running the nginx server
# Your VITE_API_URL=http://localhost/apiv1. #This is for non dockerised runs
# VITE_API_URL=http://localhost:1337/apiv1

## UPDATE
Just use VITE_API_URL=/apiv1

THIS is for nginx server

# Check your database as well in settings.py, make sure it depends on db

# We use this https://pentacent.medium.com/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71 to get out ssl certs.
Remember, the tutorial must be conducted inside the server, aka your droplet or vps. The 80 port must be free. Then copy the cerbot folder to a data folder inside your actual app’s working dir and go from there. In the process, 
1.	made changes to the existing docker compose file by adding certbot service and adding volumes.
2.	Nginx-ssl.conf a file that overwrites the nginx.conf file inside is bind mounted.
3.	The nginx configuration file lives inside conf.d btw, and is NOT the nginx.conf file you see in the conf.d directory
What we did
1.	Made a compose file 
2.	Made a nginx file
3.	Ran all the scripts
4.	Got the certs (staging set to 0)
5.	Copied cert folder to actual app folder under data
6.	In actual WORKDIR, made a new nginx.conf
7.	Edited the compose file, added certbox service
8.	Bind mounted the nginx file to the service so the standalone nginx file overwrites for ssl.
