import {User} from "../components/users";
import { Balance } from "../components/balance";
import { Appbar } from "../components/appbar";

export const DashBoard = function(){
    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={"10,000"}/>
            <User/>
        </div>
    </div>
}
