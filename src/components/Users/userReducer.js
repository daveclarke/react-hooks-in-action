export default function reducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            return { ...state, usersIndex: action.payload };
        case "NEXT_USER":
            const count = state.users.length;
            return { ...state, usersIndex: (state.usersIndex + 1) % count };
        case "FETCH_USERS_REQUEST":
            return { ...state, isLoading: true, error: false, users: [] };
        case "FETCH_USERS_SUCCESS":
            return { ...state, isLoading: false, users: action.payload };
        case "FETCH_USERS_FAILED":
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
}