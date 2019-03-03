const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const fs = require('fs');
const UUID = require('uuid-v4');

const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "places-app-1550271704119",
    keyFilename: "./places.json"
});

admin.initializeApp({
   credential: admin.credential.cert(require('./places'))
});

exports.storeImage = functions.https.onRequest((request, response) => {
    return cors(request, response, () => {
        if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer ")) {
            console.log('No token was found');
            response.status(403).json({error: "Unauthorised"});
            return;
        }
        let idToken;
        idToken = request.headers.authorization.split("Bearer ")[1];
        admin.auth().verifyIdToken(idToken)
            .then(decodedToken => {
                // extract image
                const body = JSON.parse(request.body);
                fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
                    console.log(err);
                    return response.status(500).json({err: err});
                });

                const bucket = storage.bucket("places-app-1550271704119.appspot.com");
                const uuid = UUID();

                // store image on Firebase Storage
                return bucket.upload("/tmp/uploaded-image.jpg", {
                    uploadType: "media",
                    destination: `/places/${uuid}.jpg`,
                    metadata: {
                        metadata: {
                            contentType: "image/jpeg",
                            firebaseStorageDownloadTokens: uuid
                        }
                    }
                }, (err, file) => {
                    if (!err) {
                        return response.status(201).json({
                            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${uuid}`
                        });
                    } else {
                        console.log('function failed');
                        console.log(err);
                        return response.status(500).json({error: err});
                    }
                });
            })
            .catch(err => {
                console.log('Token is invalid');
                response.status(403).json({err})
            });
    });
});
