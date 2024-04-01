import { Card, Empty, Pagination } from "antd";
import TaskCard from "./TaskCard";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { useState } from "react";
import { Response } from "./AllTypes";
const TodoDiv = () => {
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const caxios = useAxios();
  const queryTodo = useQuery({
    queryKey: [user?.email, "todo"],
    queryFn: async () => {
      const res = await caxios.get(
        `/tasks?limit=${limit}&page=${page}&status=todo`
      );
      return res.data as Response;
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
  async function onChange(page: number, pageSize: number) {
    await setPage(page);
    await setLimit(pageSize);
    queryTodo.refetch();
  }

  return (
    <Card
      className="bg-orange-100"
      loading={
        queryTodo.isFetching || queryTodo.isLoading || queryTodo.isRefetching
      }
    >
      <div>
        <p className="text-xl underline underline-offset-8 font-roboto-slab font-bold text-center">
          Todo
        </p>
        <div>
          {queryTodo.isSuccess ? (
            queryTodo.data.docs.length != 0 ? (
              queryTodo.data.docs.map((x) => {
                return <TaskCard doc={x} type={"todo"}></TaskCard>;
              })
            ) : (
              <Empty></Empty>
            )
          ) : (
            <p className="text-lg italic text-red-300">Something Wrong</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Pagination
        current={page}
          onChange={onChange}
          size="small"
          total={queryTodo.data?.totalDocs}
          defaultPageSize={5}
          pageSize={limit}
          showSizeChanger
        ></Pagination>
      </div>
    </Card>
  );
};

export default TodoDiv;
