This repository contains a simple react component which wraps the navigator.geolocation api.

## Usage
```bash
$ git clone ...
$ cd react-geolocation
$ npm run start
```

## Options
The following options can be set as props:
  * enableHighAccuracy: Higher accuracy, but slower and power consuming.
  * maximumAge: Defines how old the cached position is allowed to be before returning a new position.
  * timeout: Time before the query times out.
  * watch: Defines if the geolocation should be watched.
  * errorMessages: Array of error messages corrensponding to the three error codes (1, 2, 3).
  * onChange: Subscription callback, which gets called every time the location changes or an error is thrown.