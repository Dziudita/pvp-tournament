// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://innwjrnhjwxlwaimquex.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlubndqcm5oand4bHdhaW1xdWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTg5NjksImV4cCI6MjA2MDI5NDk2OX0.vrIqtSRb1oFNmK4WtkoYWlQn_TxAxhvmoNblfteSPVA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
