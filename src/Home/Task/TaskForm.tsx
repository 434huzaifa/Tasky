import { Button, Card, Form, Input } from "antd";

type FormDataType = {
  title: string;
  description?: string;
};

const TaskForm = () => {
  function onFinish(values: FormDataType) {
    console.log(values);
  }
  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true },
            { min: 5, message: "At least 5 letter." },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea></Input.TextArea>
        </Form.Item>

        <div className="flex justify-center">
          <Button htmlType="submit">Add</Button>
        </div>
      </Form>
    </Card>
  );
};

export default TaskForm;
