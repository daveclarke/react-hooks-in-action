import { useReducer } from 'react';
import UsersList from './UsersList';
import UserDetails from './UserDetails';
import reducer from './userReducer';

const initialState = {
    usersIndex: 0,
    users: null,
    error: false,
    isLoading: true
};

export default function UsersPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { users } = state;
    const user = users && users[state.usersIndex];

    return (
        <main className="users-page">
            <UsersList state={state} dispatch={dispatch} />
            <UserDetails user={user} />
        </main>
    );
}
