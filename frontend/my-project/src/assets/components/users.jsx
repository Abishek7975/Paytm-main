import { Button } from "./button"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

export const User = function({}){
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Define async function inside useEffect
        const fetchUsers = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk");
            setUsers(response.data.users); // Adjust response format based on your API
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
    
        fetchUsers();
      }, []); // Empty dependency array to run only once on component mount
    
    return (
        <div className="flex flex-col space-y-4">
          {users.map((user, index) => (
            <div className="flex justify-between" key={index}>
              {/* User Information */}
              <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                  <div className="text-xl font-bold">{user.firstName[0]}</div>
                </div>
                <div className="flex flex-col justify-center">
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                </div>
              </div>
    
              {/* Action Button */}
              <div className="flex flex-col justify-center">
                <Button onClick={function(event){
                    return navigate('/send?id=' + user._id + "&name=" + user.firstName)
                }} label={"Send Money"} />
              </div>
            </div>
          ))}
        </div>
      );
    };

    