'use strict'

const AWS = require('aws-sdk')

// Configure client for use with Spaces
const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('nyc3.digitaloceanspaces.com'),
  region: 'nyc3',
  accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET_KEY
})

const S3_DEFAULT_PARAMS = {
  ACL: 'public-read',
  Bucket: 'rrdig',
  Conditions: [
    ['content-length-range', 0, 10240000], // 10 Mb
    { acl: 'public-read' },
  ],
}

const uploadImage = async (parent, args, context, info) => {
  try {
    const { createReadStream, filename, mimetype, encoding } = await args.file

    s3.upload({
      ...S3_DEFAULT_PARAMS,
      Body: createReadStream(),
      Key: filename
    },
    (err, data) => {
      if (err) {
        throw err
      } else {
        console.info('successfully uploaded file...', data)
      }
    })

    return {
      filename,
      mimetype,
      encoding
    }
  } catch (err) {
    // TODO(@robertlombardo): in a real life scenario i would log this somewhere :)
    console.error(err)
  }
}
module.exports = uploadImage
