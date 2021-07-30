module.exports = {
  Query: {
    images: require('./getImages')
  },
  Mutation: {
    uploadImage: require('./uploadImage')
  }
}
