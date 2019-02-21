const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
    projectId: "places-app-1550271704119",
    keyFilename: "places.json"
};

const gcs = require('@google-cloud/storage')(gcconfig);

exports.storeImage = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
       // extract image
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/uploadedImage.jpg", body.image, "base64", err => {
            console.log(err);
            return response.status(500).json({err: err});
        });

        const uuid = UUID();

        // store image on Firebase Storage
        const bucket = gcs.bucket("places-app-1550271704119.appspot.com");
        return bucket.upload("/tmp/uploadedImage.jpg", {
           uploadType: "media",
           destination: `/places/${uuid}.jpg`,
            metadata: {
               contentType: "image/jpg",
                firebaseStorageDownloadTokens: uuid
            }
        });
    });
});
