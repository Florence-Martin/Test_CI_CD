import { useEffect, useState } from "react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>List of users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstname} {user.lastname} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
