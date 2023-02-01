import {useState} from "react";

const MissionEdit = ()=>{
    const [isLoading, setIsLoading ] = useState(false);

    return <div> { isLoading ? <p>Loading...</p> : <>

        Editing a mission ?
    </>
    }
    </div>
}

export default MissionEdit;