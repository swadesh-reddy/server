const { GcsFileUpload } = require('gcs-file-upload')
const path = require('path')
const fs = require('fs')
 const config = require('../_helpers/config')

const serviceKey = path.join(__dirname, '../storage.json')
 
const myBucket = new GcsFileUpload({
  keyFilename: serviceKey,
  projectId: config.projectId,
}, config.bucketname)

module.exports = myBucket; 
