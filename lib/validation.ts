import { z } from 'zod';

export const signUpSchema = z.object({
    fullName: z.string().min(3, 'Full name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Confirm Password Does not match'),
    companyName: z.string().min(3, 'Company name is required'),
    terms: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password Does not match",
    path: ["confirmPassword"], // show error on confirmPassword field
});


export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password is required'),
});



export const contentUploadSchema = z.object({
  // 1. Category (name and optional description)
  category: z.string().min(2, "Category name is required"),
  categoryDescription: z.string().optional(),
  categorySlug: z.string().regex(/^[a-z0-9-]+$/, {
    message: "Slug must be lowercase, URL-friendly (letters, numbers, dashes)",
  }),

  // 2. Part (name = same as category?, slug)
  part: z.string().min(2, "Part name is required"),
  slug: z.string().regex(/^[a-z0-9-]+$/, {
    message: "Slug must be lowercase, URL-friendly (letters, numbers, dashes)",
  }),

  // 3. Step
  title: z.string().min(2, "Step title is required"),
  description: z.string().min(10, "Step description is too short"),
  code: z.string().optional(),
  icon: z.enum(['tsx', 'ts', 'js', 'css', 'env', 'json', 'other']).optional(),
  filePath: z.string().optional(),
  order: z.coerce.number().int().positive().lte(1000),
  resources: z.string().optional(), // If it's a stringified JSON, validate format manually
});

export const projectUploadSchema = z.object({
  title: z.string().min(2, "Project title is required"),
  description: z.string().min(10, "Project description is too short"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  videoUrl: z.string().url("Invalid video URL").optional(),
  author: z.string().min(2, "Author name is required"),
  authorImageUrl: z.string().url("Invalid author image URL").optional(),
  isFree: z.enum(['FREE', 'PAID']),
  publishDate: z.coerce.date().optional().default(new Date()),
  githubUrl: z.string().url("Invalid GitHub URL").optional(),
});



