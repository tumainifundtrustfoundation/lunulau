import { db } from './index.ts';
import { users, entries } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        name: name || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(name ? { name } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database user upsert failed:", error);
    throw new Error("Database user operation failed.", { cause: error });
  }
}

export async function getUserEntries(userUid: string) {
  try {
    return await db.select({
      id: entries.id,
      content: entries.content,
      date: entries.date,
      createdAt: entries.createdAt,
    })
    .from(entries)
    .innerJoin(users, eq(entries.userId, users.id))
    .where(eq(users.uid, userUid))
    .orderBy(desc(entries.createdAt));
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Database query failed. Please try again later.", { cause: error });
  }
}

export async function createEntry(userUid: string, content: string, date: string) {
  try {
    const user = await getOrCreateUser(userUid, '');
    const result = await db.insert(entries)
      .values({
        userId: user.id,
        content,
        date,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database insert failed:", error);
    throw new Error("Failed to create entry.", { cause: error });
  }
}
