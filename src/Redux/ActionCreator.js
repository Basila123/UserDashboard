import axios from "axios";
import { AddRequest, RemoveRequest, UpdateRequest, getAllRequestFail, getAllRequestSuccess, getbycodeSuccess, makeRequest } from "./Action"
import { toast } from "react-toastify";

export const GetAllUsers = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        setTimeout(()=>{
            axios.get("http://localhost:8000/user").then(res => {
                const _list = res.data;
                dispatch(getAllRequestSuccess(_list));
            }).catch(err => {
                dispatch(getAllRequestFail(err.message));
            });
        },1000)
       
    }
}

export const GetUserbycode = (code) => {
    return (dispatch) => {
        //dispatch(makeRequest());
        axios.get("http://localhost:8000/user/"+code).then(res => {
            const _obj = res.data;
            dispatch(getbycodeSuccess(_obj));
        }).catch(err => {
            toast.error('Failed to fetch the data')
        });
    }
}

export const CreateUser = (data) => {
    return (dispatch) => {
        axios.post("http://localhost:8000/user", data).then(res => {
            dispatch(AddRequest(data));
            toast.success('user created successfully.')
        }).catch(err => {
            toast.error('Failed to create user due to :' + err.message)
        });
    }
}

export const UpdateUser = (data) => {
    return (dispatch) => {
        axios.put("http://localhost:8000/user/"+data.id, data).then(res => {
            dispatch(UpdateRequest(data));
            toast.success('user updated successfully.')
        }).catch(err => {
            toast.error('Failed to update user due to :' + err.message)
        });
    }
}

export const RemoveUser = (code) => {
    return (dispatch) => {
        axios.delete("http://localhost:8000/user/"+code).then(res => {
            dispatch(RemoveRequest(code));
            toast.success('Company Removed successfully.')
        }).catch(err => {
            toast.error('Failed to remove user due to :' + err.message)
        });
    }
}


