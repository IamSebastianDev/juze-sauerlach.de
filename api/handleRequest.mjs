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
	client.connect((err) => {
		const collection = client.db('test').collection('test');

		let nav = collection
			.findOne()
			.then((data, err) => res.status(200).json(data))
			.catch((err) => console.log(err));

		client.close;
	});
};

export { handleRequest };
