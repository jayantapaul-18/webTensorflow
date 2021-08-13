console.log("Starting Tensorflow Machine learning using NodeJS");
const tf = require("@tensorflow/tfjs");
require('@tensorflow/tfjs-node');
const PORT = 5600;
const express = require('express');
const app = express();

app.get('/app/v1/train', function (req, res) {
    tf.ready().then(() => {
        console.log("Backend "+ tf.getBackend());
        const message = tf.version.tfjs
        res.send({ "tfVersion": message });
      })
    
})

app.listen(PORT), () => {
    console.log("Tensorflow Nodejs Server listening on port " + PORT);
}
