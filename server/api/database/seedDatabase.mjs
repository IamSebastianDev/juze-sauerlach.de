/** @format */

import '../../../.config/dotenv.config.mjs';
import { useDB } from './useDatabase.mjs';
import { request, response } from '../../utils/requestMock.util.mjs';
import { userService } from '../services/user.service.mjs';
import { contentService } from '../services/content.service.mjs';

if (process.env.NODE_ENV === 'production') {
    console.log('Exiting Seeder. Seeding should not happen in a production environment.');
    process.exit(0);
}

// drop all collections
const collections = useDB(process.env.DB_NAME);
const userCollection = collections('users');
await userCollection(async (collection) => await collection.insertOne({}));
await userCollection(async (collection) => await collection.drop());
const contentCollection = collections('content');
await contentCollection(async (collection) => await collection.insertOne({}));
await contentCollection(async (collection) => await collection.drop());

await userService.post(
    request({ email: 'admin@juze-sauerlach.de', password: 'admin', key: process.env.USER_KEY }),
    response()
);

for (const entry of ['home', 'about', 'contact']) {
    console.log({ entry });
    await contentService.postPage(request({ dest: entry, icon: entry, tooltip: entry, title: entry }), response());
}
