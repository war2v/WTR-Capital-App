import { useState } from "react";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [sessoint, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => )
    return {user, session, loading};
}
 
export default useUser;