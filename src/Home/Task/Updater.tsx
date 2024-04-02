import { Button, DatePicker, Form, Input, Modal } from "antd";
import { UpdateDoc } from "./AllTypes";
import dayjs from "dayjs";
type Props = {
  handelModal: () => void;
  isModalOpen: boolean;
  singleTask: UpdateDoc | undefined;
  id: string | undefined;
};
const Updater = ({ handelModal, isModalOpen, singleTask, id }: Props) => {
  function onFinish(values: UpdateDoc) {
    console.log(values);
    if (id) {
      console.log(id);
    }
  }
  return (
    <Modal footer={null} onCancel={handelModal} open={isModalOpen}>

        <Form layout="vertical" onFinish={onFinish} >
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
              htmlType="submit"
              className="text-yellow-600 border-yellow-400 bg-yellow-100 font-roboto-slab font-semibold"
            >
              Update
            </Button>
            <Button className="text-red-600 border-red-400 bg-red-100 font-roboto-slab font-semibold" onClick={handelModal}>Cancel</Button>
          </div>
        </Form>
    </Modal>
  );
};

export default Updater;
