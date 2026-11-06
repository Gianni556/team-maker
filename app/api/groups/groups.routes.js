import express from 'express';
import { groupsHandlers } from './groups.handlers.js';

export const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    groupsHandlers.getAll()
    .then( groups => res.json(groups))
    .catch( err => res.status(400).json({error: err}));
    // res.json(groupsHandlers.getAll())
})
