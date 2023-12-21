import { z } from 'zod';

export const AnimalSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(50),
  photoURL: z.string().url(),
});
