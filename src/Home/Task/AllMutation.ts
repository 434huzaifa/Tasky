import useAxios from "../../Hook/useAxios";
import SuccessResponse from "../../Utility/SuccessResponse";
import ErrorResponse from "../../Utility/ErrorResponse";
import { AxiosError } from "axios";
import { useInProgress, useQueryCompleted, useQueryTodo, useStatistic } from "./AllQuery";
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
  const queryHome=useStatistic(false)
  return useMutation({
    mutationFn: async (data: FormDataType) => {
      const res = await caxios.post("/task", data);
      return res.data;
    },
    onSuccess: (data) => {
      queryTodo.refetch();
      queryHome.refetch()
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
  const queryHome=useStatistic(false)
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
        data.startDate = dayjs().format();
      } else if (who == "completed") {
        data.status = "completed";
        data.completeDate = dayjs().format();
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
        queryHome.refetch()
      } else if (variables.who == "completed") {
        querInProgress.refetch();
        queryCompleted.refetch();
        queryHome.refetch()
      }
      SuccessResponse(data);
    },
    onError: (err: AxiosError) => {
      ErrorResponse(err);
    },
  });
};

export const useTaskFullUpdate = () => {
  const caxios = useAxios();
  const queryTodo = useQueryTodo(5, 1, false);
  const querInProgress = useInProgress(5, 1, false);
  const queryCompleted = useQueryCompleted(5, 1, false);
  const queryHome=useStatistic(false)
  return useMutation({
    mutationFn: async ({
      id,
      UpdateDoc,
      type,
    }: {
      id: string | undefined;
      UpdateDoc: UpdateDoc;
      type: string;
    }) => {
      type;
      const res = await caxios.put(`/task/${id}`, UpdateDoc);
      return res.data;
    },
    onSuccess: (data, variables) => {
      SuccessResponse(data);
      if (variables.type == "todo") {
        queryTodo.refetch();
      } else if (variables.type == "in-progress") {
        querInProgress.refetch();
      } else if (variables.type == "completed") {
        queryCompleted.refetch();
      }
      if (variables.type != variables.UpdateDoc.status) {
        if (variables.UpdateDoc.status == "todo") {
          queryTodo.refetch();
        } else if (variables.UpdateDoc.status == "in-progress") {
          querInProgress.refetch();
        } else if (variables.UpdateDoc.status == "completed") {
          queryCompleted.refetch();
        }
      }
      queryHome.refetch()
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
  const queryHome=useStatistic(false)
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
      queryHome.refetch()
      SuccessResponse(data);
    },
    onError: (err: AxiosError) => {
      ErrorResponse(err);
    },
  });
};
