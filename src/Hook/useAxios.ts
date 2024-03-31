import axios from 'axios'
const caxios =axios.create({
	baseURL:import.meta.env.VITE_BACK_END_URL,
	withCredentials:true,
})
const useAxios = () => {
	return caxios
};
	
export default useAxios;