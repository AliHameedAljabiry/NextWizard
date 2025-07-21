import { eq, and, isNotNull, lte, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = body as { token: string; password: string };

    if (!token || !password) {
      return Response.json({ message: 'Missing token or password' }, { status: 400 });
    }

    const now = new Date();

    const [user] = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.passwordResetToken, token),
          isNotNull(users.passwordResetExpires),
          gt(users.passwordResetExpires, now)
        )
      );

    if (!user) {
      return Response.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      })
      .where(eq(users.id, user.id));

    return Response.json({ message: 'Password updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('[RESET_PASSWORD_ERROR]', error);
    return Response.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
  