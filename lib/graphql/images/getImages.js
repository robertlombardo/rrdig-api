'use strict'

const s3client = require('../../../s3-client')

const getImages = async (parent, args, context, info) => {
  try {
    const results = []

    // list all objects in the rrdig bucket
    const { Contents } = await s3client.listObjects({ Bucket: 'rrdig' }).promise()

    // populate results by matching object tags to the request args
    for (const { Key } of Contents) {
      const { TagSet } = await s3client.getObjectTagging({ Bucket: 'rrdig', Key }).promise()

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

const MOCK_IMG_DATA_SET = [
  { imgUrl: 'https://i.imgur.com/TBfgUrq.png', tags: ['hire this guy'] },
  { imgUrl: 'https://i.imgflip.com/1qz6f2.jpg', tags: ['hire this guy'] },
  { imgUrl: 'https://memegenerator.net/img/instances/52999294.jpg', tags: ['hire this guy'] },
  { imgUrl: 'https://memegenerator.net/img/instances/76498884.jpg', tags: ['hire this guy'] },
  { imgUrl: 'https://res.cloudinary.com/jerrick/image/upload/f_jpg,fl_progressive,q_auto,w_1024/609c4d04a0c320001d90f203.jpg', tags: ['winning']},
  { imgUrl: 'https://thumbs.dreamstime.com/b/winning-team-gold-trophy-cup-against-shining-sun-sky-195189086.jpg', tags: ['winning'] },
  { imgUrl: 'https://memegenerator.net/img/instances/68644729.jpg', tags: ['winning'] },
  { imgUrl: 'https://external-preview.redd.it/2hcOA6XcEDs4lLfNYrCO_LDItsEKRm49dWxdlOLPJso.jpg?auto=webp&s=3d6c16791dba940a1f33f0ca0108088f76ba6335', tags: ['robert'] },
  { imgUrl: 'https://due.com/wp-content/uploads/2015/08/Dont-let-the-fear-of-losing-be-greater-than-the-excitement-of-winning.-%E2%80%93-Robert-Kiyosaki.jpg', tags: ['winning', 'robert' ]},
  { imgUrl: 'https://images.librarywala.com/book/medium/the%20robert%20half.jpg', tags: ['hire this guy', 'robert' ]}
]
