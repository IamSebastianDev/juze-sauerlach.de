/** @format */

import '../.config/dotenv.config.mjs';
import express from 'express';
import { session } from './middleware/session.middleware.mjs';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import compression from 'compression';
import { router } from './routes.mjs';
import { fromRoot } from './utils/fromRoot.util.mjs';
import { authService } from './api/services/auth.service.mjs';
import { blacklist } from './middleware/blacklist.middleware.mjs';

const app = express();
[
    express.json(),
    fileUpload(),
    express.urlencoded({ extended: true }),
    helmet({ contentSecurityPolicy: false }), // CSP must be disabled because 'editor.js' uses eval.
    blacklist({ blacklist: ['/src/'], matchFull: false }),
    compression(),
    session(),
    authService.initialize(),
    authService.session(),
    router,
    express.static(fromRoot('./site/public/'), { extensions: 'html' }),
].forEach((w) => app.use(w));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
