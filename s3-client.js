'use strict'

const assert = require('assert')
const AWS = require('aws-sdk')

const {
  S3_ENDPOINT,
  S3_REGION,
  S3_ACCESS_KEY,
  S3_SECRET_KEY,
  S3_BUCKET
} = process.env

assert(S3_ENDPOINT && S3_REGION && S3_ACCESS_KEY && S3_SECRET_KEY && S3_BUCKET, 'missing S3 config. please check your .env file')

// Configure client for use with Spaces
const s3client = new AWS.S3({
  endpoint: new AWS.Endpoint(S3_ENDPOINT),
  region: S3_REGION,
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY
})

module.exports = s3client
