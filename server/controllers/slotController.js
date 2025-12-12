import { Slot } from '../models/Slot.js';

export const listSlots = async (_req, res) => {
  const slots = await Slot.find().sort({ time: 1 });
  res.json(slots);
};

export const createSlot = async (req, res) => {
  const { time, label } = req.body;
  if (!time || !label) {
    return res.status(400).json({ message: 'Time and label are required' });
  }
  const slot = await Slot.create({ time, label, isActive: true });
  res.status(201).json(slot);
};

export const removeSlot = async (req, res) => {
  await Slot.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

export const toggleSlot = async (req, res) => {
  const slot = await Slot.findById(req.params.id);
  if (!slot) return res.status(404).json({ message: 'Slot not found' });
  slot.isActive = !slot.isActive;
  await slot.save();
  res.json(slot);
};

export const updateSlot = async (req, res) => {
  const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!slot) return res.status(404).json({ message: 'Slot not found' });
  res.json(slot);
};

