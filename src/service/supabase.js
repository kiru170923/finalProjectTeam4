// src/service/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bbjykwxpuxcpwgzypqzw.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJianlrd3hwdXhjcHdnenlwcXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTE0MzIsImV4cCI6MjA1ODY2NzQzMn0.C3sUbAwuEBC1408qVtRy13mzLsvL_VIG3fGaTNLzNwc"; // thay bằng key của bạn

export const supabase = createClient(supabaseUrl, supabaseKey);
