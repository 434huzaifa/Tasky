/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import { UpdateDoc } from "./AllTypes";
import dayjs, { Dayjs } from "dayjs";
import { useTaskFullUpdate } from "./AllMutation";
type Props = {
  handelModal: () => void;
  isModalOpen: boolean;
  singleTask: UpdateDoc | undefined;
  id: string | undefined;
  type: string;
};
type FormValues = {
  title: string;
  description?: string;
  completeDate?: Dayjs | string | null;
  startDate?: Dayjs | string | null;
  status: "todo" | "in-progress";
};
const Updater = ({ handelModal, isModalOpen, singleTask, id, type }: Props) => {
  const mutateUpdater = useTaskFullUpdate();
  const selectValue: any[] = [];
  if (singleTask?.startDate || singleTask?.completeDate) {
    selectValue.push({
      value: "todo",
      label: "To Do",
    });
  }
  if (singleTask?.completeDate) {
    selectValue.push({
      value: "in-progress",
      label: "In Progress",
    });
  }
  console.log("~ selectValue", selectValue);
  function convertFormValuesToUpdateDoc(formValues: FormValues): UpdateDoc {
    const updateDoc: UpdateDoc = {
      title: formValues.title,
      description: formValues.description || undefined,
      startDate: formValues.startDate
        ? dayjs(formValues.startDate).format()
        : null,
      completeDate: formValues.completeDate
        ? dayjs(formValues.completeDate).format()
        : null,
      status: formValues.status,
    };

    return updateDoc;
  }
  async function onFinish(values: FormValues) {
    if (values?.completeDate && typeof values.completeDate != "string") {
      values.completeDate = values?.completeDate?.format();
    }
    if (values?.startDate && typeof values.startDate != "string") {
      values.startDate = values?.startDate?.format();
    }
    if (singleTask?.status != values.status) {
      if (values.status == "todo") {
        values.startDate = null;
        values.completeDate = null;
      } else if (values.status == "in-progress") {
        values.completeDate = null;
      }
    }
    await mutateUpdater.mutateAsync({
      id: id,
      UpdateDoc: convertFormValuesToUpdateDoc(values),
      type: type,
    });
    handelModal();
  }
  return (
    <Modal footer={null} onCancel={handelModal} open={isModalOpen}>
      <Spin spinning={mutateUpdater.isPending}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            initialValue={singleTask?.title}
            rules={[{ required: true }]}
            validateTrigger="onBlur"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            initialValue={singleTask?.description}
          >
            <Input.TextArea></Input.TextArea>
          </Form.Item>

          {(singleTask?.startDate !== undefined ||
            singleTask?.completeDate !== undefined) && (
            <Form.Item name="status" label="Status" initialValue={type}>
              <Select options={selectValue}></Select>
            </Form.Item>
          )}

          {singleTask?.startDate && (
            <Form.Item
              name="startDate"
              label="Started Date"
              initialValue={dayjs(singleTask.startDate)}
              rules={[{ required: true }]}
            >
              <DatePicker
                size="large"
                className="w-full"
                format={"MMM DD YYYY, hh:mm:ss A"}
                showTime
                needConfirm={false}
              ></DatePicker>
            </Form.Item>
          )}
          {singleTask?.completeDate && (
            <Form.Item
              name="completeDate"
              label="Completed Date"
              initialValue={dayjs(singleTask.completeDate)}
              rules={[{ required: true }]}
              className="font-roboto-slab"
            >
              <DatePicker
                size="large"
                className="w-full"
                format={"MMM DD YYYY, hh:mm:ss A"}
                showTime
                needConfirm={false}
              ></DatePicker>
            </Form.Item>
          )}
          <div className="flex gap-5 justify-center">
            <Button
              loading={mutateUpdater.isPending}
              htmlType="submit"
              className="text-yellow-600 border-yellow-400 bg-yellow-100 font-roboto-slab font-semibold"
            >
              Update
            </Button>
            <Button
              loading={mutateUpdater.isPending}
              className="text-red-600 border-red-400 bg-red-100 font-roboto-slab font-semibold"
              onClick={handelModal}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default Updater;
