import { Card, Empty, Pagination } from "antd";
import TaskCard from "./TaskCard";
import { useState } from "react";
import { useQueryTodo } from "./AllQuery";
import { UpdateDoc } from "./AllTypes";
import Updater from "./Updater";

const TodoDiv = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const[isModalOpen,setIsModalOpen]=useState(false)
  const [singleTask,setSingleTask]=useState<UpdateDoc>()
  const [id,setId]=useState<string>()
  function handelModal() {
    setIsModalOpen(!isModalOpen)
  }
  function taskUpdater(task:UpdateDoc,id:string|undefined) {
    setSingleTask(task)
    setId(id)
    handelModal();
  }
  const queryTodo = useQueryTodo(limit,page);
  async function onChange(page: number, pageSize: number) {
    await setPage(page);
    await setLimit(pageSize);
    queryTodo.refetch();
  }

  return (
    <>
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
                return <TaskCard taskUpdater={taskUpdater}doc={x} type={"todo"}></TaskCard>;
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
      {queryTodo.isSuccess && queryTodo.data.docs.length != 0 && (
          <Pagination
            current={page}
            onChange={onChange}
            size="small"
            total={queryTodo.data?.totalDocs}
            defaultPageSize={5}
            pageSize={limit}
            showSizeChanger
          ></Pagination>
        )}

      </div>
    </Card>
    <Updater id={id} isModalOpen={isModalOpen} singleTask={singleTask} handelModal={handelModal}></Updater>
    </>
  );
};

export default TodoDiv;
