import React, { useEffect, useState } from 'react';

interface UserType {
    id: number;
    name: string;
}

const MyComponent: React.FC = () => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        let isMounted = true; // to track if the component is mounted
        async function fetchData() {
            try {
                const response = await fetch('/api/user');
                if (!response.ok) throw new Error('Network response was not okay');
                const userData = await response.json();
                if (isMounted) setUser(userData); // only set state if mounted
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }
        fetchData();

        return () => {
            isMounted = false; // cleanup function to mark as unmounted
        };
    }, []);

    return (
        <div>
            {user ? <h1>{user.name}</h1> : <p>Loading...</p>}
        </div>
    );
};

export default MyComponent;
