import {drizzle} from 'drizzle-orm/expo-sqlite'
import {openDatabaseSync} from 'expo-sqlite'
import {DATABASE_NAME} from '@/constants/database'


const expoDb = openDatabaseSync(DATABASE_NAME)

export const db = drizzle(expoDb)