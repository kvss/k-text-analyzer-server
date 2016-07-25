# Text Risk Analysis Server

This is a NodeJS server written in TypeScript that uses the `k-text-analyzer` NPM module for text analysis. This is designed to be a quick server to run to get started; the express server is NOT proxied behind any webserver and exposed bare. Therefore, it should 

- be behind a firewall and accessible on by the servers you want to use
- used for testing and demonstrations as it lacks caching and compression

Although self-contained, the server is really a small wrapper around the library itself; therefore you must weigh whether or not it makes sense to separate the lookup analysis from your other services. There are pros and cons to either approach.

## Installation

### With Docker

A `Dockerfile` is available if you would rather just build a container and run it. To run it, you can do the following:

`docker build -t ktas .`

`docker run -d -p 4001:4001 ktas`

### Without Docker

If you want to manually install it, you first must make sure you have NodeJS installed. All other dependencies should be self-contained.

Once the code is checked out, run

`npm install`

`tsd install`

## Testing

To test the code, manually install it and then run

`npm run test`

This will build the project and then use Mocha to test the generated Javascript