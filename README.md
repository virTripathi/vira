<p align="center">Mini Jarvis</p>

## About Application

Mini Jarvis is a advanced task management platform where you can create and have a log of your tasks:

## Running Application

To run the app on your local server, please ensure you have php, composer and git installed on your system you may follow these steps:
1. [Clone the repository](https://github.com/virTripathi/mini-jarvis).
If you're using windows, [install WSL2](https://learn.microsoft.com/en-us/windows/wsl/install).
1. [Install docker desktop](https://docs.docker.com/desktop/install/windows-install/).
2. Run Docker Engine
3. go to docker-cli and run:
4. docker-compose build --up
5. Run docker-compose exec mini-jarvis-docker php artisan migrate --seed to migrate tables and seed the db.
6. Wait for a few minutes and your application will start running on localhost:9000/public and mysql_db instance in [9001 port](http://localhost:9001/index.php?route=/).
