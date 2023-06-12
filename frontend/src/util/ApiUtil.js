import { useSelector } from 'react-redux';

export function useLoggedIn() {
    const sessionUser = useSelector(state => state.session.user)

    return !!sessionUser
}