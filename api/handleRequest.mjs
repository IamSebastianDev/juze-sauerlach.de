/** @format */

// import dependencies
import mongoDB from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// configure mongo
const MongoClient = mongoDB.MongoClient;

const client = new MongoClient(process.env.MONGO_KEY, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const handleRequest = (req, res) => {
	// handle db request async

	(async () => {
		try {
			// connect to the db
			await client.connect();

			// retrieve the collection
			const collection = client.db('test').collection('test');

			// create an array from all documents inside the array
			const docs = await collection.find().toArray();

			// send the array
			res.status(200).json(docs);
		} catch (err) {
			//console.log(err.stack);
			res.send(err.stack);
		}
	})();
};

const saveRequest = (req, res) => {};

export { handleRequest, saveRequest };
