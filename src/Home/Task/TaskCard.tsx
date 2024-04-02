import { Card, Popconfirm, Tooltip } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TbClockDown } from "react-icons/tb";
import { FaPen } from "react-icons/fa";
import { TbClockCheck } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Doc } from "./AllTypes";
import showToast from "../../Utility/showToast";
import { useTaskDelete, useTaskUpdate } from "./AllMutation";
type Props = {
  doc?: Doc;
  type?: "todo" | "in-progress" | "completed";
};

const TaskCard = ({ doc, type = "todo" }: Props) => {
  const mutationTaskUpdate = useTaskUpdate();
  const mutationDelete = useTaskDelete(type);
  let cardstyle = "";
  if (type == "todo") {
    cardstyle = "bg-orange-200";
  } else if (type == "in-progress") {
    cardstyle = "bg-blue-200";
  } else {
    cardstyle = "bg-cyan-200";
  }
  const confirm = async (id: string | undefined) => {
    await mutationDelete.mutateAsync(id);
  };
  async function handelInProgress(id: string | undefined) {
    if (id) {
      await mutationTaskUpdate.mutateAsync({ id: id, who: "in-progress" });
    } else {
      showToast("error", "Id not found");
    }
  }
  async function handelCompleted(id: string | undefined) {
    if (id) {
      await mutationTaskUpdate.mutateAsync({ id: id, who: "completed" });
    } else {
      showToast("error", "Id not found");
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
              <div className="flex gap-3">
                <p className="bg-green-200 text-green-600 rounded-md inline-block p-1 text-xs t">
                  Started at {doc?.startDate}{" "}
                </p>
                <p className="bg-green-200 text-green-600 rounded-md inline-block p-1 text-xs t">
                  Completed at {doc?.completeDate}{" "}
                </p>
              </div>
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
            <div
              className="border-l px-4 hover:cursor-pointer"
              onClick={() => {
                handelInProgress(doc?._id);
              }}
            >
              <TbClockDown className="text-3xl text-center text-blue-500" />
            </div>
          </Tooltip>
        ) : type == "in-progress" ? (
          <Tooltip title="Move to complete">
            <div
              className="border-l px-4 hover:cursor-pointer"
              onClick={() => {
                handelCompleted(doc?._id);
              }}
            >
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
