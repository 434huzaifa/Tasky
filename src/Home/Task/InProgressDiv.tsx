import { Card, Empty, Pagination } from "antd";
import TaskCard from "./TaskCard";
import useAuth from "../../Hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hook/useAxios";
import { useState } from "react";
import { Response } from "./AllTypes";
type Props = {
  refetcher: string | boolean | undefined;
  setRefetcher: React.Dispatch<
    React.SetStateAction<string | boolean | undefined>
  >;
};
const InProgressDiv = ({ refetcher, setRefetcher }: Props) => {
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const caxios = useAxios();
  const queryInProgress = useQuery({
    queryKey: [user?.email, "in-progress"],
    queryFn: async () => {
      const res = await caxios.get(
        `/tasks?limit=${limit}&page=${page}&status=in-progress`
      );
      return res.data as Response;
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
  async function onChange(page: number, pageSize: number) {
    await setPage(page);
    await setLimit(pageSize);
    queryInProgress.refetch();
  }
  if (refetcher == "in-progress") {
    queryInProgress.refetch();
  }
  return (
    <Card
      className="bg-orange-100"
      loading={
        queryInProgress.isFetching ||
        queryInProgress.isLoading ||
        queryInProgress.isRefetching
      }
    >
      <div>
        <p className="text-xl underline underline-offset-8 font-roboto-slab font-bold text-center">
          In Progress
        </p>
        <div>
          {queryInProgress.isSuccess ? (
            queryInProgress.data.docs.length != 0 ? (
              queryInProgress.data.docs.map((x) => {
                return (
                  <TaskCard
                    setRefetcher={setRefetcher}
                    doc={x}
                    type="in-progress"
                  ></TaskCard>
                );
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
        {queryInProgress.isSuccess && queryInProgress.data.docs.length != 0 && (
          <Pagination
            current={page}
            onChange={onChange}
            size="small"
            total={queryInProgress.data?.totalDocs}
            defaultPageSize={5}
            pageSize={limit}
            showSizeChanger
          ></Pagination>
        )}
      </div>
    </Card>
  );
};

export default InProgressDiv;
