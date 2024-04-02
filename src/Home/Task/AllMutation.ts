import useAxios from "../../Hook/useAxios";
import SuccessResponse from "../../Utility/SuccessResponse";
import ErrorResponse from "../../Utility/ErrorResponse";
import { AxiosError } from "axios";
import { useInProgress, useQueryCompleted, useQueryTodo } from "./AllQuery";
import { useMutation } from "@tanstack/react-query";
import { UpdateDoc } from "./AllTypes";
import dayjs from "dayjs";
export type FormDataType = {
  title: string;
  description?: string;
};

export const useInsertTask = () => {
  const caxios = useAxios();
  const queryTodo = useQueryTodo(5, 1, false);
  return useMutation({
    mutationFn: async (data: FormDataType) => {
      const res = await caxios.post("/task", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryTodo.refetch();
      SuccessResponse(data);
    },
    onError: (err: AxiosError) => {
      ErrorResponse(err);
    },
  });
};

export const useTaskUpdate = () => {
  const caxios = useAxios();
  const queryTodo = useQueryTodo(5, 1, false);
  const querInProgress = useInProgress(5, 1, false);
  const queryCompleted = useQueryCompleted(5, 1, false);
  return useMutation({
    mutationFn: async ({
      id,
      who,
    }: {
      id: string;
      who: "in-progress" | "completed";
    }) => {
      const data: UpdateDoc = {};
      if (who == "in-progress") {
        data.status = "in-progress";
        data.startDate = dayjs().format("DD-MM-YY hh:mm:ss A");
      } else if (who == "completed") {
        data.status = "completed";
        data.completeDate = dayjs().format("DD-MM-YY hh:mm:ss A");
      }
      if (Object.keys(data).length != 0) {
        const res = await caxios.patch(`/task/${id}`, data);
        return res.data;
      } else {
        throw "Empty Body";
      }
    },
    onSuccess: (
      data,
      variables: {
        id: string;
        who: "in-progress" | "completed";
      }
    ) => {
      if (variables.who == "in-progress") {
        queryTodo.refetch();
        querInProgress.refetch();
      } else if (variables.who == "completed") {
        querInProgress.refetch();
        queryCompleted.refetch();
      }
      SuccessResponse(data);
    },
    onError: (err: AxiosError) => {
      ErrorResponse(err);
    },
  });
};

export const useTaskDelete = (type: string) => {
  const caxios = useAxios();
  const queryTodo = useQueryTodo(5, 1, false);
  const querInProgress = useInProgress(5, 1, false);
  const queryCompleted = useQueryCompleted(5, 1, false);
  return useMutation({
    mutationFn: async (id: string | undefined) => {
      if (id) {
        const res = await caxios.delete(`/task/${id}`);
        return res.data;
      } else {
        throw "Undefine Id";
      }
    },
    onSuccess: (data) => {
      if (type == "todo") {
        queryTodo.refetch();
      } else if (type == "in-progress") {
        querInProgress.refetch();
      } else if (type == "completed") {
        queryCompleted.refetch();
      }
      SuccessResponse(data);
    },
    onError: (err: AxiosError) => {
      ErrorResponse(err);
    },
  });
};
