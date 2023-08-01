import express from 'express';
const router = express.Router();

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobsController.js';

import testUser from '../middleware/testUser.js';

router.route('/').post(testUser, createJob);
router.route('/').get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(testUser, deleteJob);
router.route('/:id').patch(testUser, updateJob);

export default router;