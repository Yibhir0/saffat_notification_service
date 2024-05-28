# saffat_notification_service
# Step 1: Setting up cloud environment:
- Create azure virtual machine (note we are using ubuntu)
- ssh to the machine
# Step 2: Installing and setting up NodeJS:
- sudo apt update
- sudo apt install nodejs
- node --version
- sudo apt install npm
- adduser saffat
- su -l saffat
- ssh-keygen -t rsa -----> add key to github ssh key
- git clone git@github.com:Yibhir0/saffat_notification_service.git
- cd saffat_notification_service
- npm i
- sudo npm install -g pm2
- touch .env file -----> look at the .env_template
- pm2 start app.js
- pm2 status
- pm2 stop <application_name/ID>
- pm2 restart <application_name/ID>
- curl localhost:5000
# Step 3: Setting up Nginx Proxy
- sudo apt install nginx
- sudo vim  /etc/nginx/sites-available/default
- paste this:
location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

- sudo systemctl restart nginx
- http://<azure_ip_address>






