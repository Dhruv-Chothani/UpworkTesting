import { Content } from '../models/Content.js';
import { defaultContent } from '../seed/defaultData.js';

const CONTENT_KEY = 'home';

export const getContent = async (_req, res) => {
  let content = await Content.findOne({ key: CONTENT_KEY });
  if (!content) {
    content = await Content.create({ key: CONTENT_KEY, data: defaultContent });
  }
  res.json(content.data);
};

export const updateContent = async (req, res) => {
  const content = await Content.findOneAndUpdate(
    { key: CONTENT_KEY },
    { data: req.body },
    { new: true, upsert: true }
  );
  res.json(content.data);
};

