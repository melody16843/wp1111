import {useChat} from "./hooks/useChat";
import LogIn from '../components/Login'
import AppTitle from '../components/Title'

const SignedIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();
    const handleLogin = (name) => {
        console.log(name)
        if (!name)
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        else {
            console.log('create new user')
            setSignedIn(true);
        }
    }

    return (
        <>
            <AppTitle/>
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
        // <h1>test</h1>
    );
}

export default SignedIn