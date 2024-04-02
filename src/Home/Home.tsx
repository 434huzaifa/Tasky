/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Statistic } from "antd";
import CompleteDiv from "./Task/CompleteDiv";
import InProgressDiv from "./Task/InProgressDiv";
import TaskForm from "./Task/TaskForm";
import TodoDiv from "./Task/TodoDiv";
import { TbClockPlus, TbClockBolt, TbClockCheck } from "react-icons/tb";
import { useStatistic } from "./Task/AllQuery";
const Home = () => {
  const quryHome = useStatistic();
  const cardList = ["todo","in-progress", "completed",];
  return (
    <div className="flex flex-col gap-7 mt-4">
      <div className="flex gap-4 justify-between">
        {quryHome.isSuccess ? (
          (
            cardList.map((x) => {
              let prefix,title;
              if (x=="todo") {
                title="To Do"
                prefix=<TbClockPlus/>
              }else if(x=="completed"){
                title="Completed"
                prefix=<TbClockCheck />
              }else if(x=="in-progress"){
                title="In Progress"
                prefix=<TbClockBolt />
              }
              const data = quryHome.data.filter((y:any) => y._id == x)[0];
              return (
                <Card className="flex-1">
                  <Statistic
                    title={title}
                    value={data?.count || 0}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={prefix}
                    loading={
                      quryHome.isLoading ||
                      quryHome.isRefetching ||
                      quryHome.isFetching
                    }
                  />
                </Card>
              );
            })
          )
        ) : (
          <p className="text-lg italic text-red-300">Something Wrong</p>
        )}
      </div>
      <TaskForm></TaskForm>
      <TodoDiv></TodoDiv>
      <InProgressDiv></InProgressDiv>
      <CompleteDiv></CompleteDiv>
    </div>
  );
};

export default Home;
