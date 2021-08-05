# Rob's Razzle Dazzle Image Gallery (API)

This is an [Apollo](https://www.apollographql.com/) server. 

### Pulling the code

```bash
git clone https://github.com/robertlombardo/rrdig-api
cd rrdig-api
```

### Running the Dev Server

##### .env file
A local API instance will have to be configured to connect with a live S3-compatible endpoint. Add an .env file with these vars:

```bash
# .env
S3_ENDPOINT=example.s3host.com
S3_REGION=example_region
S3_ACCESS_KEY=XXXXXXXXXXXXXXXXX
S3_SECRET_KEY=XXXXXXXXXXXXXXXXX
S3_BUCKET=example_bucket_name
```


([NodeJS](https://nodejs.org/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are required for installing dependencies & starting the server...)

```bash
npm install
npm run dev
```
***

### Public [Web Client](https://github.com/robertlombardo/rrdig-client) Deployment 
##### Visit [https://rrdig-client-mvlfu.ondigitalocean.app/](https://rrdig-client-mvlfu.ondigitalocean.app/)

_Thanks for checking out Rob's Razzle Dazzle Image Gallery! I hope you enjoy it as much as I've enjoyed working on it :)
-- Rob_
***
