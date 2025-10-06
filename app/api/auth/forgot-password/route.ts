
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import { sendEmail } from '@/lib/workflow';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import config from '@/lib/config';

export async function POST(req: Request) {
  const { email } = await req.json();

  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) {
    return Response.json({ message: "If this email exists, we sent a reset link." });
  }

  const token = randomBytes(32).toString('hex');
  const expires = addHours(new Date(), 1);

  await db.update(users)
    .set({ passwordResetToken: token, passwordResetExpires: expires })
    .where(eq(users.id, user.id));

  const resetLink = `${config.env.prodApiEndpoint}/reset-password?token=${token}`;

  await sendEmail({
    email,
    subject: 'Reset your password',
    message: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`
  });

  return Response.json({ message: 'If this email exists, we sent a reset link.' });
}
