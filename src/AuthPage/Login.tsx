import { Button, Card, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./wavy.css"
const Login = () => {
  function onFinish(value:{email:string,pass:string}) {
    console.log(value);
  }
  return (
    <div className=" justify-center flex items-center min-h-screen bg-wavy">
      <Card className="w-96 pb-12 pt-6 backdrop-blur-md bg-opacity-0 bg-white">
        <div>
          <p className="mb-5 text-center text-3xl font-roboto-slab text-black">
            <span className="text-purple-800">Welcome,</span> To Tasky
          </p>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Email"
              className="font-bold"
              rules={[
                { required: true },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input className="font-semibold font-roboto-slab"></Input>
            </Form.Item>
            <Form.Item
              name="pass"
              label="Password"
              className="font-bold"
              rules={[
                { required: true },
                {
                    min:6,
                    message:"Password Less then Six."
                },
                {
                    pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:"At least one uppercase,one lowercase and one number."
                }
              ]}
              validateTrigger="onBlur"
            >
              <Input.Password className="font-semibold font-roboto-slab"></Input.Password>
            </Form.Item>
            <div className="flex justify-center items-center flex-col">
            <Button size="large" htmlType="submit" className="bg-orange-300 text-black font-semibold font-roboto-slab w-1/2">Login</Button>
            <Divider>OR</Divider>
            <div className="my-2">
                <Button size="large"><FcGoogle className="text-2xl"/></Button>
            </div>
            <Divider>OR</Divider>
            <p className="text-lg font-semibold font-roboto-slab">If you don't have an account. <Link to="/reg" className="text-blue-500 underline">Sign Up</Link></p>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
