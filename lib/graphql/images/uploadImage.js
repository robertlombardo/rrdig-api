'use strict'

const { v4: uuidv4 } = require('uuid')
const s3client = require('../../../s3-client')

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
    const { file, tags } = args
    console.log({ file, tags })
    const { createReadStream, filename, mimetype, encoding } = await file

    s3client.upload({
      ...S3_DEFAULT_PARAMS,
      Body: createReadStream(),
      Key: filename
    },
    {
      tags: tags.map(tag => ({ Key: uuidv4(), Value: tag }))
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
