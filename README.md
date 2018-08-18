# Image-upload

For routehappy!!!

## install

`npm i`

## Build

`npm run build`

## Start

`npm run start`

## Unit Tests

`npm test`

## API Test

Can be tested in Postman or similar by making a POST request to `localhost:1234/api/v1/upload` and including a `jpg` or `png` file with dimensions between 350x350 and 5000x5000.

By default, images will be saved to `[your home directory]/images`.

The sever port and the image-storage location can be configured with environmental variables PORT and STORAGE_PATH

## About

I decided to write this as a simple express app, without using AWS Lambda, because there's some complexity around parsing images that hit lambdas via API Gateway.

See [this thread](https://forum.serverless.com/t/returning-binary-data-jpg-from-lambda-via-api-gateway/796/25) for a full discussion

While it's trivial to get a lambda to pipe an uploaded file into an s3 bucket, there doesn't seem to be a non-hacky way to parse the binary data within the lambda, which makes it hard to know if the image is the right type and dimensions.

There are a few workarounds for this we could explore, if we still want to use lambdas:

(1) Use one of the hacks described in the thread, above. I'm not thrilled about that idea, as they're not well tested and they might run afoul of changes to the AWS API

(2) Have the lambda store all images (regardless of type and dimensions) in an s3 bucket. Then have the lambda read the image back from the bucket.

(Lambdas can parse files coming from buckets. They just can't do it easily when the file comes in via API Gateway.)

If the file turnes out to be invalid (e.g. wrong type/dimensions), the lambda could delete it from the bucket.

The only problem with this method is the overhead of temporarily storing invalid files.

(3) Write a non-lambda node script that parses the image, and, if it's valid, stores it in an s3. It doesn't need to use a lambda. It can just use the aws-sdk directly.

This is pretty much what I've written, except I'm storing the image on the server instead of on s3.

(4) Write a non-lambda node script that parses the image, and, if it's valid, calls a lambda that stores the image in an s3 bucket.

(5) Write a lambda that stores the image in an s3 bucket. Then write another lambda that gets triggered when anything hits the s3 bucket. From here, use the same strategy described in option 2, above.

The big downside here is that only the first lambda can communicate back to the browser as a response, which means the user won't know if his image was validated--unless you rig up something using socket communication or polling.
