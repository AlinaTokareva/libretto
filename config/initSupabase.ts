import AsyncStorage from '@react-native-async-storage/async-storage'
import 'react-native-url-polyfill/auto'

import {createClient} from '@supabase/supabase-js'

const url = process.env.EXPO_PUBLIC_SUPABASE_URL as string
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY as string

export const supabase = createClient(url, key, {
    auth: {
        storage: AsyncStorage,
        detectSessionInUrl: false,
    },
})
