import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchUsers = async()=>{
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/users/list')
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError('An error occurred')
      };
    };
    fetchUsers();
  }, []);

  if (loading) return <h1>Loading users...</h1>;
  if (error) return <h1>Error fetching users... {error}</h1>;

  return (
    <>
      <h1>Users</h1>
      {users.length > 0 ? (
        <ul>
          {users?.map((user)=>(
            <li key={users?._id}>{user?.name} - {user?.email}</li>
          ))}
        </ul>
      ):(
        <div>No user found</div>
      )}
    </>
  )
}

export default App;
