import {int, sqliteTable, text} from 'drizzle-orm/sqlite-core'

export const wishTable = sqliteTable('wish', {
    id: int().primaryKey({autoIncrement: true,}),
    name: text().notNull(),
})
