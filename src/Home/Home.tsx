import CompleteDiv from "./Task/CompleteDiv";
import InProgressDiv from "./Task/InProgressDiv";
import TaskForm from "./Task/TaskForm";
import TodoDiv from "./Task/TodoDiv";
const Home = () => {
  return (
    <div className="flex flex-col gap-7 mt-4">
      <TaskForm></TaskForm>
      <TodoDiv></TodoDiv>
      <InProgressDiv></InProgressDiv>
      <CompleteDiv></CompleteDiv>
    </div>
  );
};

export default Home;
