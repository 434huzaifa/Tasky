import { Card, Popconfirm, Tooltip } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbClockDown } from "react-icons/tb";
import { FaPen } from "react-icons/fa";
import { TbClockCheck } from "react-icons/tb";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import { Doc, UpdateDoc } from "./AllTypes";
import useAxios from "../../Hook/useAxios";
import { useMutation } from "@tanstack/react-query";
import showToast from "../../Utility/showToast";
type Props = {
  doc?: Doc;
  type?: "todo" | "in-progress" | "completed";
  setRefetcher:React.Dispatch<React.SetStateAction<string | boolean | undefined>>
};

const TaskCard = ({ doc, type = "todo",setRefetcher }: Props) => {
  const caxios = useAxios();
  const mutationTaskUpdate = useMutation({
    mutationFn: async ({ id, who }: { id: string; who: "in-progress"|"completed" }) => {
      const data: UpdateDoc = {};
      if (who == "in-progress") {
        data.status = "in-progress";
        data.startDate=dayjs().format("DD-MM-YY hh:mm:ss A")
        setRefetcher("in-progress")
      }else if(who=="completed"){
        data.status = "completed";
        data.completeDate=dayjs().format("DD-MM-YY hh:mm:ss A")
        setRefetcher("completed")
      }
      if (Object.keys(data).length!=0) {
        const res = await caxios.patch(`/tasks/${id}`, data);
        return res.data;
      }else{
        throw "Empty Body";
      }
    },
  });
  let cardstyle = "";
  if (type == "todo") {
    cardstyle = "bg-orange-200";
  } else if (type == "in-progress") {
    cardstyle = "bg-blue-200";
  } else {
    cardstyle = "bg-cyan-200";
  }
  const confirm = (id: string | undefined) => {
    console.log(id);
  };
  async function handelInProgress(id:string|undefined) {
    if (id) {
      await mutationTaskUpdate.mutateAsync({id:id,who:"in-progress"})
    }else{
      showToast("error","Id not found")
    }
  }
  async function handelCompleted(id:string|undefined) {
    if (id) {
      await mutationTaskUpdate.mutateAsync({id:id,who:"completed"})
    }else{
      showToast("error","Id not found")
    }
  }
  return (
    <Card className={`font-roboto-slab mt-4 ${cardstyle}`}>
      <div className="flex items-center">
        <div className="flex-1">
          <div className=" flex gap-3">
            {type == "in-progress" ? (
              <p className="bg-cyan-200 text-cyan-600 rounded-md inline-block p-1 text-xs t">
                Started at {doc?.startDate}{" "}
              </p>
            ) : type == "completed" ? (
              <p className="bg-green-200 text-green-600 rounded-md inline-block p-1 text-xs t">
                Completed at {doc?.completeDate}{" "}
              </p>
            ) : null}
          </div>

          <p className="text-lg  font-bold">{doc?.title || ""}</p>
          <p className="font-semibold">{doc?.description || ""}</p>
        </div>
        <Tooltip title="Edit">
          <div className=" px-4 hover:cursor-pointer">
            <FaPen className="text-2xl text-center text-yellow-500" />
          </div>
        </Tooltip>
        {type == "todo" ? (
          <Tooltip title="Move to in progress">
            {" "}
            <div className="border-l px-4 hover:cursor-pointer" onClick={()=>{handelInProgress(doc?._id)}}>
              <TbClockDown className="text-3xl text-center text-blue-500" />
            </div>
          </Tooltip>
        ) : type == "in-progress" ? (
          <Tooltip title="Move to complete">
            <div className="border-l px-4 hover:cursor-pointer" onClick={()=>{handelCompleted(doc?._id)}}>
              <TbClockCheck className="text-3xl text-center text-blue-500 hover:cursor-pointer" />
            </div>
          </Tooltip>
        ) : null}
        <Tooltip title="Delete">
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              confirm(doc?._id);
            }}
            okButtonProps={{ loading: false }}
            icon={<MdDelete className="text-red-500 text-lg" />}
          >
            <div className="border-l px-4 hover:cursor-pointer">
              <MdOutlineDeleteOutline className="text-3xl text-center text-red-500" />
            </div>
          </Popconfirm>
        </Tooltip>
      </div>
    </Card>
  );
};

export default TaskCard;
