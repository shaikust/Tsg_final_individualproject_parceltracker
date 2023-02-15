import { useState } from "react";
import { Link } from "react-router-dom";
import { updateApi } from "../../redux/actions/authorization";
import { useAppThunkDispatch } from "../../redux/store";
import '../Register/Register.css';

const Update=()=>{
    const[currentLocation,setcurrentLocation]=useState('')
    const[deliveryStatus,setdeliveryStatus]=useState('')
    const[id,settrackingId]=useState('')
    const dispatch = useAppThunkDispatch();
    const [error, setError] = useState<{ id?: string; currentLocation?: string; deliveryStatus?: string}>({});
    const validate = () => {
        const newError: { id?: string; currentLocation?: string; deliveryStatus?: string; } = {};
        if (!id) {
            newError.id = 'Id is required';
        }
        if (!currentLocation) {
            newError.currentLocation = 'currentlocation is required';
        }
        if (!deliveryStatus) {
            newError.deliveryStatus = 'deliverystatus is required';
        }
        setError(newError);
             return Object.keys(newError).length === 0;
    };
    const updateItem=(e:any)=>{
        e.preventDefault();
        if (validate()){
        dispatch(updateApi({
            id,currentLocation,deliveryStatus

        }));
      };

    };
    return(
        <>
         <div className="row">

<div className="col">
    <div className="wrapper">
        <div className="text-center mt-4 name">
            Update here
           
        </div>
        <form className="p-3 mt-3" >
        <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="number"  id="trackingId" placeholder=" Enter Tracking Id" 
                    value={id} onChange={(e)=>settrackingId(e.target.value)}></input>
            </div>
            {error.id && <span className="error">{error.id}</span>}
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="text"  id="currentLocation"  placeholder="New Current Location" value={currentLocation} onChange={(e)=>setcurrentLocation(e.target.value)}></input>
            </div>
            {error.currentLocation && <span className="error">{error.currentLocation}</span>}
            <div className="form-field d-flex align-items-center">
                <span className="fas fa-key"></span>
                <input type="text" id="deliveryStatus"  placeholder="New Delivery Status" value={deliveryStatus} onChange={(e)=>setdeliveryStatus(e.target.value)}></input>
            </div>
            {error.deliveryStatus && <span className="error">{error.deliveryStatus}</span>}
            <button className="btn mt-3" onClick={updateItem}>Update</button>
        </form>
        <div className="text-center fs-6">
        Go back?<Link to='/admin'>back</Link>
    </div>
    </div>
</div>
</div>
        </>

    );
};
export default Update;