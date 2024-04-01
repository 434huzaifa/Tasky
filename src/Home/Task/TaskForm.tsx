import { useMutation } from "@tanstack/react-query";
import { Button, Card, Form, Input } from "antd";
import useAxios from "../../Hook/useAxios";
import SuccessResponse from "../../Utility/SuccessResponse";
import ErrorResponse from "../../Utility/ErrorResponse";
import { AxiosError } from "axios";

type FormDataType = {
  title: string;
  description?: string;
};

const TaskForm = () => {
  const [form] = Form.useForm();
  const caxios=useAxios()
  const mutateInsertTask=useMutation({
    mutationFn:async(data:FormDataType)=>{
      const res= await caxios.post("/task",data)
      return res.data
    },
    onSuccess:(data)=>{
      SuccessResponse(data)
    },
    onError:(err:AxiosError)=>{
      ErrorResponse(err)
    },

  })
  async function onFinish(values: FormDataType) {
    await mutateInsertTask.mutateAsync(values)
    form.resetFields()
    
  }
  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish} form={form}>
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
          <Button htmlType="submit" className="bg-blue-200 text-blue-800 font-roboto-slab font-semibold px-10 " >Add</Button>
        </div>
      </Form>
    </Card>
  );
};

export default TaskForm;
