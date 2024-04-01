import { Card, Empty, Pagination } from "antd";
import TaskCard from "./TaskCard";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { useState } from "react";
import { Response } from "./AllTypes";
type Props={
    refetcher:string | boolean | undefined
    setRefetcher:React.Dispatch<React.SetStateAction<string | boolean | undefined>>
  }
const CompleteDiv = ({refetcher,setRefetcher}:Props) => {
    const { user } = useAuth();
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const caxios = useAxios();
    const queryCompleted = useQuery({
      queryKey: [user?.email, "completed"],
      queryFn: async () => {
        const res = await caxios.get(
          `/tasks?limit=${limit}&page=${page}&status=completed`
        );
        return res.data as Response;
      },
      refetchOnWindowFocus: false,
      retry: 2,
    });
    async function onChange(page: number, pageSize: number) {
        await setPage(page);
        await setLimit(pageSize);
        queryCompleted.refetch();
      }
  if (refetcher=="complete") {  
    queryCompleted.refetch();
  }
  return (
    <Card
      className="bg-orange-100"
      loading={
        queryCompleted.isFetching || queryCompleted.isLoading || queryCompleted.isRefetching
      }
    >
      <div>
        <p className="text-xl underline underline-offset-8 font-roboto-slab font-bold text-center">
          Completed
        </p>
        <div>
          {queryCompleted.isSuccess ? (
            queryCompleted.data.docs.length != 0 ? (
                queryCompleted.data.docs.map((x) => {
                return <TaskCard setRefetcher={setRefetcher} doc={x} type="completed"></TaskCard>;
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
          total={queryCompleted.data?.totalDocs}
          defaultPageSize={5}
          pageSize={limit}
          showSizeChanger
        ></Pagination>
      </div>
    </Card>
  );
};

export default CompleteDiv;
