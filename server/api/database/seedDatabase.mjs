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
    request({ email: 'admin@juzesauerlach.de', password: 'admin', key: process.env.USER_KEY }),
    response()
);

const content = {
    time: 0,
    blocks: [
        {
            id: 'xMAQN3gfxw',
            type: 'header',
            data: {
                text: 'This is a Heading',
                level: 1,
            },
            tunes: {
                textAlign: {
                    alignment: 'left',
                },
            },
        },
    ],
    version: '0.0.0',
};

for (const entry of [
    { title: 'home', dest: 'home', tooltip: 'Alles aktuelle', icon: 'megaphone' },
    { title: 'haus', dest: 'haus', tooltip: 'Wir uns das JuZe', icon: 'house' },
    { title: 'kontakt', dest: 'kontakt', tooltip: 'Kontaktdaten', icon: 'send' },
]) {
    const { dest, title, tooltip, icon } = entry;
    await contentService.postPage(request({ dest, title, tooltip, icon, content }), response());
}
