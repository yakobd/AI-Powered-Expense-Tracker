"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { checkUser } from "@/lib/checkUser";

async function deleteRecord(recordId: string): Promise<{
  message?: string;
  error?: string;
}> {
  // Ensure user exists in database
  const user = await checkUser();

  if (!user) {
    return { error: "User not found" };
  }

  try {
    await db.record.delete({
      where: {
        id: recordId,
        userId: user.clerkUserId,
      },
    });

    revalidatePath("/");

    return { message: "Record deleted" };
  } catch (error) {
    console.error("Error deleting record:", error); // Log the error
    return { error: "Database error" };
  }
}

export default deleteRecord;
