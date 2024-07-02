import React from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";

const { Option } = Select;
const residences = [
  {
    value: "wb",
    label: "WB",
    children: [
      {
        value: "kolkata",
        label: "Kolkata",
      },
      {
        value: "howrah",
        label: "Howrah",
      },
      {
        value: "darjeeling",
        label: "Darjeeling",
      },
    ],
  },
  {
    value: "ka",
    label: "KA",
    children: [
      {
        value: "bangalore",
        label: "Bangalore",
      },
      {
        value: "manipal",
        label: "Manipal",
      },
      {
        value: "mangalore",
        label: "Mangalore",
      },
    ],
  },
  {
    value: "mh",
    label: "MH",
    children: [
      {
        value: "mumbai",
        label: "Mumbai",
      },
      {
        value: "pune",
        label: "Pune",
      },
      {
        value: "lonavala",
        label: "Lonavala",
      },
    ],
  },
  {
    value: "pj",
    label: "PJ",
    children: [
      {
        value: "chandigarh",
        label: "Chandigarh",
      },
      {
        value: "amritsar",
        label: "Amritsar",
      },
      {
        value: "jalandhar",
        label: "Jalandhar",
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const agreementFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 9,
    },
  },
};

const buttonFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 10,
    },
  },
};

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const addressArray = values.address;
    const addressObject = {
      state: addressArray[0],
      city: addressArray[1],
    };

    const phoneObject = {
      prefix: values.prefix,
      number: values.phone,
    };

    const updatedValues = {
      ...values,
      address: addressObject,
      phone: phoneObject,
    };
    delete updatedValues.prefix;
    delete updatedValues.agreement;
    delete updatedValues.confirm;

    // console.log("Received values of form: ", updatedValues);
    console.log("Form submitted! Sending data to the server...");

    // Sending entered details to the server for storing in the database
    axiosInstance
      .post("/api/register-user", updatedValues)
      .then((response) => {
        console.log("Success:", response.data.message);
        localStorage.setItem("hasRegistered", true);
        navigate("/register-success");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error("Error:", error.response.data.message);
          alert(error.response.data.message);
        } else {
          console.error("Error:", error);
        }
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 67,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="69">+69</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="flex justify-center items-center p-4">
      <div className="">
        <h1 className="text-5xl sm:text-6xl md:text-7xl p-4 mt-[7%] mb-4 text-black flex justify-center">
          Register
        </h1>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["WB", "KA", "MH", "PJ"],
            prefix: "91",
          }}
          style={{
            maxWidth: 1200,
          }}
          scrollToFirstError
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirm"
                label="Confirm PW"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    type: "array",
                    required: true,
                    message: "Please select your state and city!",
                  },
                ]}
              >
                <Cascader options={residences} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="hobbies"
                label="Hobbies"
                tooltip="Use a comma to separate the values."
                rules={[
                  {
                    required: true,
                    message: "Please input your hobbies!",
                    type: "array",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Add your hobbies"
                  tokenSeparators={[","]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  {
                    required: true,
                    message: "Please input your age!",
                    type: "number",
                    min: 13,
                    max: 100,
                  },
                ]}
              >
                <InputNumber min={13} max={100} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            {...agreementFormItemLayout}
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the{" "}
              <a
                href="https://rb.gy/4s23fe"
                target="_blank"
                rel="noopener noreferrer"
              >
                agreement
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item {...buttonFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="px-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-700 md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-4 lg:text-xl"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
