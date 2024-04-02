import { useQuery } from "@tanstack/react-query";
import { Response } from "./AllTypes";
import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";


export const useQueryTodo = (limit=5,page=1,enable=true) => {
  const caxios = useAxios();
  const { user } = useAuth();
  return useQuery({
    queryKey: [user?.email, "todo"],
    queryFn: async () => {
      const res = await caxios.get(
        `/tasks?limit=${limit}&page=${page}&status=todo`
      );
      console.log(res);
      return res.data as Response;
    },
    enabled:enable,
  });
};

export const useInProgress = (limit=5,page=1,enable=true) => {
  const caxios = useAxios();
  const { user } = useAuth();
  return useQuery({
    queryKey: [user?.email, "in-progress"],
    queryFn: async () => {
      const res = await caxios.get(
        `/tasks?limit=${limit}&page=${page}&status=in-progress`
      );
      return res.data as Response;
    },
    enabled:enable,
  });
};

export const useQueryCompleted = (limit=5,page=1,enable=true) => {
  const caxios = useAxios();
  const { user } = useAuth();
  return useQuery({
    queryKey: [user?.email, "completed"],
    queryFn: async () => {
      const res = await caxios.get(
        `/tasks?limit=${limit}&page=${page}&status=completed`
      );
      return res.data as Response;
    },
    enabled:enable,
  });
};
