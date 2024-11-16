import axios from "axios";
import { useEffect, useState } from "react"

export const Balance = function(){
    const [balance, setBalance] = useState(0);

    useEffect(function () {
        async function fetchBalance() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setBalance(response.data.Balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
                setBalance("Error fetching balance");
            }
        }

        fetchBalance(); // Call the async function inside the effect
    }, []);
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}