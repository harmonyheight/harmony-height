import { z } from 'zod';
const currentYear = new Date().getFullYear();
const minYear = 1900; // You can adjust this to your desired minimum year.

export const newListingSchema = z.object({
  state: z.string().min(2, { message: 'Please select state' }).default(''),
  city: z.string().min(0, { message: 'Please select city' }).default(''),
  bathrooms: z.string().refine(
    (value) => {
      const numberValue = Number(value);
      return Number.isInteger(numberValue) && numberValue > 0;
    },
    {
      message: 'Please enter bathrooms value',
    },
  ),
  area: z.string().refine(
    (value) => {
      const numberValue = Number(value);
      return Number.isInteger(numberValue) && numberValue > 0;
    },
    {
      message: 'Please enter a positive integer',
    },
  ),
  spaces: z.string().refine(
    (value) => {
      const numberValue = Number(value);
      return Number.isInteger(numberValue) && numberValue > 0;
    },
    {
      message: 'Please enter a positive integer',
    },
  ),
  bedrooms: z.string().refine(
    (value) => {
      const numberValue = Number(value);
      return Number.isInteger(numberValue) && numberValue > 0;
    },
    {
      message: 'Please enter bedrooms value',
    },
  ),
  type: z.string().min(3, { message: 'Please select property type' }),
  lease: z.boolean().default(false),
  leasePeroid: z.string().min(0, { message: 'Please select city' }).default(''),
  parking: z.boolean().default(false),
  water: z.boolean().default(false),
  electricity: z.boolean().default(false),
  wifi: z.boolean().default(false),
  oldYear: z
    .string()
    .regex(/^\d{4}$/, 'Please enter a valid 4-digit year')
    .refine((year) => {
      const numericYear = parseInt(year, 10);
      return numericYear >= minYear && numericYear <= currentYear;
    }, 'Year is not within the valid range'),
  zipcode: z.string().min(1, { message: 'ZIP Code is required' }),
});

export type newListingFormData = z.infer<typeof newListingSchema>;
