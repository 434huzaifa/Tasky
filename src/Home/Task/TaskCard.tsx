import { Card, Popconfirm, Spin, Tooltip } from "antd";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { TbClockPlus, TbClockBolt } from "react-icons/tb";
import { TbClockCheck } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Doc, UpdateDoc } from "./AllTypes";
import showToast from "../../Utility/showToast";
import { useTaskDelete, useTaskUpdate } from "./AllMutation";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  doc?: Doc;
  type?: "todo" | "in-progress" | "completed";
  taskUpdater?: (task: UpdateDoc, id: string) => void;
};

const TaskCard = ({ doc, type = "todo", taskUpdater }: Props) => {
  const mutationTaskUpdate = useTaskUpdate();
  const mutationDelete = useTaskDelete(type);
  function handelEdit() {
    taskUpdater(
      {
        completeDate: doc?.completeDate,
        description: doc?.description,
        title: doc?.title,
        startDate: doc?.startDate,
        status: doc?.status,
      },
      doc?._id
    );
  }
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
    <>
      <Card className={`font-roboto-slab mt-4 ${cardstyle}`} hoverable>
        <div className="flex items-center">
          <div className="flex-1">
            <div className=" flex gap-3">
              {type == "in-progress" ? (
                <div className="flex gap-3 font-semibold">
                  <p className="bg-cyan-200 text-cyan-600 rounded-md gap-1 px-1 text-xs flex items-center ">
                    <TbClockPlus className="text-lg text-pink-500" />{" "}
                    {dayjs(doc?.createdAt)
                      .tz(dayjs.tz.guess())
                      .format("MMM DD, hh:mm:ss A")}
                  </p>
                  <p className="bg-cyan-200 text-cyan-600 rounded-md gap-1 px-1 text-xs flex items-center">
                    <TbClockBolt className="text-lg text-pink-500" />{" "}
                    {doc?.startDate}{" "}
                  </p>
                </div>
              ) : type == "completed" ? (
                <div className="flex gap-3 font-semibold">
                  <p className="bg-green-200 text-green-600 rounded-md gap-1 px-1 text-xs flex items-center">
                    <TbClockPlus className="text-lg text-pink-500" />{" "}
                    {dayjs(doc?.createdAt)
                      .tz(dayjs.tz.guess())
                      .format("DD-MM-YY hh:mm:ss A")}
                  </p>
                  <p className="bg-green-200 text-green-600 rounded-md gap-1 px-1 text-xs flex items-center">
                    <TbClockBolt className="text-lg text-pink-500" />{" "}
                    {doc?.startDate}{" "}
                  </p>
                  <p className="bg-green-200 text-green-600 rounded-md gap-1 px-1 text-xs flex items-center">
                    <TbClockCheck className="text-lg text-pink-500" />{" "}
                    {doc?.completeDate}{" "}
                  </p>
                </div>
              ) : type == "todo" ? (
                <div className="font-semibold">
                  <p className="bg-sky-200 text-sky-600 rounded-md gap-1 px-1 text-xs flex items-center">
                    <TbClockPlus className="text-lg text-pink-500" />{" "}
                    {dayjs(doc?.createdAt)
                      .tz(dayjs.tz.guess())
                      .format("DD-MM-YY hh:mm:ss A")}
                  </p>
                </div>
              ) : null}
            </div>

            <p className="text-lg  font-bold">{doc?.title || ""}</p>
            <p className="text-xs italic font-light text-black">
              {doc?.description || ""}
            </p>
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
                <TbClockBolt className="text-3xl text-center text-blue-500" />
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
              okButtonProps={{ loading: mutationDelete.isPending }}
              icon={<MdDelete className="text-red-500 text-lg" />}
            >
              <Spin spinning={mutationDelete.isPending}>
                <div className="border-l px-4 hover:cursor-pointer">
                  <MdOutlineDeleteOutline className="text-3xl text-center text-red-500" />
                </div>
              </Spin>
            </Popconfirm>
          </Tooltip>
        </div>
      </Card>
    </>
  );
};

export default TaskCard;
