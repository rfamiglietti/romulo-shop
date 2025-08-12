import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eeweynqisibnultatpcg.supabase.co'; // Substitua pela sua URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVld2V5bnFpc2libnVsdGF0cGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NTYxMDgsImV4cCI6MjA3MDUzMjEwOH0.qInlqPWNfTuvry9n8usvdNQj8amPtXwVvR5QuvphAVc'; // Substitua pela sua chave

export const supabase = createClient(supabaseUrl, supabaseKey);