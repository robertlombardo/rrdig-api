'use strict'

const AWS = require('aws-sdk')

// Configure client for use with Spaces
const s3client = new AWS.S3({
  endpoint: new AWS.Endpoint('nyc3.digitaloceanspaces.com'),
  region: 'nyc3',
  accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET_KEY
})

module.exports = s3client
