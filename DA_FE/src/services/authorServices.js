import axios from 'axios';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

const checkIsToken = () =>{
    if (token==='') {
        return true;
    }else{
        axios
        .get('http://localhost:8080/auth/'+token)
        .then((response) => {
                return response.data;
        })
    }
    
}

window.onload = () => {
    if (checkIsToken() === true) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('dateTimeStart');
        localStorage.removeItem('role');
    }
};

export default { token,role, checkIsToken };
