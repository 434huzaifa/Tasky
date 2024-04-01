import { useState } from "react";
import CompleteDiv from "./Task/CompleteDiv";
import InProgressDiv from "./Task/InProgressDiv";
import TaskForm from "./Task/TaskForm";
import TodoDiv from "./Task/TodoDiv";
const Home = () => {
    const [refetcher,setRefetcher]=useState<string|boolean>()
  return (
    <div className="flex flex-col gap-7 mt-4">
      <TaskForm ></TaskForm>
      <TodoDiv refetcher={refetcher} setRefetcher={setRefetcher}></TodoDiv>
      <InProgressDiv refetcher={refetcher} setRefetcher={setRefetcher}></InProgressDiv>
      <CompleteDiv refetcher={refetcher} setRefetcher={setRefetcher}></CompleteDiv>
    </div>
  );
};

export default Home;
