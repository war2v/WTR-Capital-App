import { supabase } from "@/utils/supabase/client";

const Dashboard = async () => {
    const { data, error } = await supabase.auth.getSession()

    console.log(data)
    return (
        <div className="mt-24">
            <div>
                <h1>Welcome</h1>
            </div>
        </div>
    )
}

export default Dashboard;