import { useState } from "react"; // import useState
import UsersList from "./UsersList";
import UserDetails from "./UserDetails"; // import new component
import { useUser } from "./UserContext";


export default function UsersPage() {
    // manage selected user state
    const [user, setUser] = useState(null);
    const { user: loggedInUser } = useUser();
    const currentUser = user || loggedInUser;


    // pass user state down
    return (
        <main className="users-page">
            <UsersList user={currentUser} setUser={setUser} />
            <UserDetails user={currentUser} />
        </main>
    );
}