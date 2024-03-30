import axios from 'axios'
const caxios =axios.create({
	baseURL:import.meta.env.backendurl,
	withCredentials:true,
})
const useAxios = () => {
	return caxios
};
	
export default useAxios;