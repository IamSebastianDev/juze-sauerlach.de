/** @format */

import { fromRoot } from './utils/fromRoot.util.mjs';
import express from 'express';
import { fileService } from './api/services/file.service.mjs';
import { mailService } from './api/services/mail.service.mjs';
import { userService } from './api/services/user.service.mjs';
import { authService } from './api/services/auth.service.mjs';
import { contentService } from './api/services/content.service.mjs';

export const router = express.Router();

router
    // app routes
    .post('/login', authService.login())
    .get('/logout', (req, res) => authService.logout(req, res))
    .get('/dashboard', authService.isAuthenticated, (req, res) =>
        res.status(200).sendFile(fromRoot('./web/public/dashboard.html'))
    )
    .get('/admin', authService.isNotAuthenticated, (req, res) =>
        res.status(200).sendFile(fromRoot('./web/public/admin.html'))
    )
    // mail routes
    .post('/api/v1/mail', async (req, res) => await mailService.send(req, res))
    // user routes
    .get('/api/v1/user/:id', async (req, res) => await userService.get(req, res))
    .post('/api/v1/user', async (req, res) => await userService.post(req, res))
    .put('/api/v1/user', async (req, res) => await userService.put(req, res))
    .delete('/api/v1/user', async (req, res) => await userService.delete(req, res))
    // file routes
    .get('/api/v1/files', authService.isAuthenticated, async (req, res) => await fileService.get(req, res))
    .post('/api/v1/files', authService.isAuthenticated, async (req, res) => await fileService.post(req, res))
    .put('/api/v1/files', authService.isAuthenticated, async (req, res) => await fileService.put(req, res))
    .delete('/api/v1/files', authService.isAuthenticated, async (req, res) => await fileService.delete(req, res))
    // content routes
    .get('/api/v1/page', async (req, res) => await contentService.getAllPages(req, res))
    .get('/api/v1/page/:id', async (req, res) => await contentService.getPage(req, res))
    .post('/api/v1/page', authService.isAuthenticated, async (req, res) => await contentService.postPage(req, res))
    .put('/api/v1/page/:id', authService.isAuthenticated, async (req, res) => await contentService.putPage(req, res))
    .delete(
        '/api/v1/page/:id',
        authService.isAuthenticated,
        async (req, res) => await contentService.deletePage(req, res)
    )
    .get(
        '/api/v1/page/:id/content',
        authService.isAuthenticated,
        async (req, res) => await contentService.getContent(req, res)
    )
    .post(
        '/api/v1/page/:id/content',
        authService.isAuthenticated,
        async (req, res) => await contentService.postContent(req, res)
    );
