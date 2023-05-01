import {
    createClient
} from "@supabase/supabase-js";

const supabaseURL = "https://qqxmljvyrpvpjgnurubv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxeG1sanZ5cnB2cGpnbnVydWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MDMwMzcsImV4cCI6MTk5NzQ3OTAzN30.vNn5Fie-x-5urgDY831Y0gvOzoKUS_30mBYOo_uMELU";

export const supabase = createClient(supabaseURL, supabaseKey);