import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zplvyvjoewrhegyioeow.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwbHZ5dmpvZXdyaGVneWlvZW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0ODU4NzgsImV4cCI6MjAyNTA2MTg3OH0.yo8M20xewPgWBTnmS6vAqK_mrAqYB6NnvB4vxYjIgOU'
export const supabase = createClient(supabaseUrl, supabaseKey)