import TaskCard from "./Task/TaskCard";
import TaskForm from "./Task/TaskForm";

const Home = () => {
    return (
        <div>
            <TaskForm></TaskForm>
            <TaskCard></TaskCard>
        </div>
    );
};

export default Home;