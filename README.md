Install Docker
    $ sudo apt update
    $ sudo apt install apt-transport-https ca-certificates curl software-properties-common
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
    $ sudo apt update
    $ sudo apt install docker-ce


Install Docker Compose
    $ sudo pip3 install docker-compose


Clone repo
    $ mkdir start && cd start
    $ git clone https://github.com/Pyrigok/projects_quick_starter.git
    $ cd projects_quick_starter


Set up project settings with docker
    $ sudo docker-compose build
    $ sudo docker-compose up
    
    Open new terminal
    $ sudo docker-compose run django python3 manage.py migrate
    $ sudo docker-compose run django python3 manage.py runserver

    Run in browser next addresses
        - http://127.0.0.1:8000 is the Django app
        - http://127.0.0.1:3000 is the React app

Close down Docker container
    $ docker-compose down
