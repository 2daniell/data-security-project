import { db } from "@/database/db";
import { logLevel, systemLogs } from "@/database/schemas/log.schema";

type LogLevel = typeof logLevel.enumValues[number];

interface CreateLogParams {
    level: LogLevel;
    message: string;
}

export async function createSystemLog({ level, message }: CreateLogParams) {
    await db.insert(systemLogs).values({
        level,
        message,
    });
}
