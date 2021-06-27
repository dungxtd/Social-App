import React, { useState, createContext } from 'react';

const UserContext = createContext([{}, () => { }]);

const UserProvider = (props) => {
    const [state, setState] = useState({
        username: "",
        email: "",
        uid: "",
        name: "",
        bio: "",
        posts: null,
        followers: null,
        following: null,
        isLoggedIn: null,
        profilePhotoUrl: "default",
    })

    return <UserContext.Provider value={[state, setState]}>{props.children}</UserContext.Provider>
}

export { UserContext, UserProvider };