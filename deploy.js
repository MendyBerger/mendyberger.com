const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const mime = require('mime-types');


var s3 = new AWS.S3({
	secretAccessKey: process.env.AwsSecretAccessKey,
	accessKeyId: process.env.AwsAccessKeyID,
	region: "us-east-2"
});

(async () => {

	const bucketName = 'mendyberger.com';
	const localRoot = "./dist/"
	await clearBucket(bucketName);
	let pathList = getPathsToAllFileInDir(localRoot);
	await putList(bucketName, localRoot, pathList);

})();


async function clearBucket(bucketName) {
	const { Contents } = await s3.listObjects({ Bucket: bucketName }).promise();
	if (Contents.length > 0) {
		await s3
			.deleteObjects({
				Bucket: bucketName,
				Delete: {
					Objects: Contents.map(({ Key }) => ({ Key }))
				}
			})
			.promise();
	}
}


function getPathsToAllFileInDir(localRoot) {
	let arr = [];

	function readDir(currentDirPath = "") {
		fs.readdirSync(localRoot + currentDirPath).forEach(name => {
			var filePath = path.join(currentDirPath, name).replace(/\\/g, "/");
			var stat = fs.statSync(localRoot + filePath);
			if (stat.isFile()) {
				arr.push(filePath);
			} else if (stat.isDirectory()) {
				readDir(filePath);
			}
		});
	}

	readDir();

	return arr;
}

function putList(bucketName, localRoot, arr) {
	return Promise.all(arr.map(path => {
		return new Promise((resolve, reject) => {
			let mimeType = pathToMimeType(path);
			s3.putObject(
				{ Bucket: bucketName, Key: path, Body: fs.readFileSync(localRoot + path), ContentType: mimeType },
				(err, data) => {
					if (err) {
						reject(err);
					} else {
						console.log('Successfully uploaded ' + path + ' to ' + bucketName + " as " + mimeType);
						resolve(data);
					}
				}
			);
		});
	}));
}

function pathToMimeType(path) {
	const extension = path.substring(path.lastIndexOf("."));
	return mime.lookup(extension);
}
