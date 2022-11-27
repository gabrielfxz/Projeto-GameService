import axios from "axios";

const API_URL = "http://localhost:5172/api/";
// Cadastro Aluno: role professor
// Cadastro Curso: role professor
// Carômetro: todos
let user="";
if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('user'));
}

const getPublicContent = () => {
    return axios.get(API_URL + "servico");
};
const getProfessorBoard = async () => {
    return await axios.get(API_URL + "servico", {
        headers: {
            Authorization:
                'Bearer ' + user.token
        }
    });
};
const UserService = {
    getPublicContent,
    getProfessorBoard
};

export default UserService;