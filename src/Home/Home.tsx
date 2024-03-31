
import TaskDiv from "./Task/TaskDiv";
import TaskForm from "./Task/TaskForm";


const Home = () => {
    return (
        <div className="flex flex-col gap-7 mt-4">
            <TaskForm></TaskForm>
           <TaskDiv type="todo" cardTitle="Todo"></TaskDiv>
           <TaskDiv type="in-progress" cardTitle="In Progress"></TaskDiv>
           <TaskDiv type="completed" cardTitle="Completed"></TaskDiv>
        </div>
    );
};

export default Home;