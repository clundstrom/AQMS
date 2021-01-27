# PM10 Sensor Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Production build

The build process is automated by a multi-stage ``Dockerfile`` which compiles an image with the build output from 
the Angular build with ahead of time compilation, production optimizations and configured with the latest version of nginx.

Below are the are the steps for building, deploying and stopping containers. 

### Build image
```
docker build -t production:latest .
```

### Deploying container

```
docker run -p 80:80 production:latest
```

### Stopping containers

Uses a filter to stop by tag name. An alternative is running docker ps and docker stop <container id>

```
docker stop $(docker ps -q --filter ancestor=production:latest )
```

