'use strict'

const s3client = require('../../../s3-client')

const { S3_BUCKET } = process.env

const getImages = async (parent, args, context, info) => {
  try {
    const results = []

    // list all objects in the rrdig bucket
    const { Contents } = await s3client.listObjects({ Bucket: S3_BUCKET }).promise()

    // populate results by matching object tags to the request args
    for (const { Key } of Contents) {
      const { TagSet } = await s3client.getObjectTagging({ Bucket: S3_BUCKET, Key }).promise()

      for (const { Value } of TagSet) {
        if (args.tags.includes(Value) || args.tags.includes('all')) {
          results.push({ imgUrl: `https://rrdig.nyc3.digitaloceanspaces.com/${Key}` })
          break
        }
      }
    }

    return results
  } catch (err) {
    // TODO(@robertlombardo): in a real life scenario i would log this somewhere :)
    console.error(err)
  }
}
module.exports = getImages
