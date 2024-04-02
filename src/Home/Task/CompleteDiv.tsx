import { Card, Empty, Pagination } from "antd";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { useQueryCompleted } from "./AllQuery";

const CompleteDiv = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const queryCompleted = useQueryCompleted(page, limit);
  async function onChange(page: number, pageSize: number) {
    await setPage(page);
    await setLimit(pageSize);
    queryCompleted.refetch();
  }
  return (
    <Card
      className="bg-orange-100"
      loading={
        queryCompleted.isFetching ||
        queryCompleted.isLoading ||
        queryCompleted.isRefetching
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
                return <TaskCard doc={x} type="completed"></TaskCard>;
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
