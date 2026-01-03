"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Record } from "@/types/Record";
import { checkUser } from "@/lib/checkUser";

async function getRecords(): Promise<{
  records?: Record[];
  error?: string;
}> {
  // Ensure user exists in database
  const user = await checkUser();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    const records = await db.record.findMany({
      where: { userId: user.clerkUserId },
      orderBy: {
        date: "desc", // Sort by the `date` field in descending order
      },
      take: 10, // Limit the request to 10 records
    });

    return { records };
  } catch (error) {
    console.error("Error fetching records:", error); // Log the error
    return { error: "Database error" };
  }
}

export default getRecords;
