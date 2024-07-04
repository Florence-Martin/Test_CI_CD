import { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <h1>List of users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} - {user.lastName} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
