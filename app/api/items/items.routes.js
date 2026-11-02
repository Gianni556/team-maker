import express from 'express';
import { Router } from 'express';
import { itemsHandlers } from './items.handlers.js';

export const router = Router();

router.use(express.json());

router.get('/', (_req, res) => {
  res.json(itemsHandlers.getAll());
});



router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const item = itemsHandlers.addItem(name.trim());
  res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  //const { id } = req.params;
  const id = req.params.id;

  const item = itemsHandlers.deleteItem(id);

  if (item === null) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.status(204).send();
});

