import React from 'react';
import { Button, Modal, DatePicker, Form, Input, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


const AccountModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    const dateFormat = 'YYYY-MM-DD'
    return (
        <>
            <Modal
                open={open}
                title="Enter expense"
                okText="OK"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            values.date = values.date.format().split('T')[0];
                            console.log(values)
                            onCreate(values);
                        })
                        .catch((e) => {
                            window.alert(e);
                        })
                }}
            >
                <Form form={form} name="dynamic_form_item" /*{...formItemLayoutWithOutLabel}*/ >
                    <Form.Item
                        name='date'
                        label="Date"
                        rules={
                            [{
                                required: true,
                                message: 'Please enter the date!'
                            },]
                        }
                    >
                        <DatePicker format={dateFormat} />
                    </Form.Item>
                    <Form.Item
                        name='cost'
                        label='Cost'
                        rules={
                            [{
                                required: 'number',
                                message: 'Please enter the amount of cost!'
                            },]
                        }>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        name='whoPaid'
                        label='Who paid?'
                        rules={
                            [{
                                required: true,
                                message: 'Please enter the name of whom paid!'
                            }]
                        }
                    >
                        <Input />
                    </Form.Item>
                    <Form.List
                        name="tags"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                        return Promise.reject(new Error('At least 1 tag'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        //   {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Tags' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input a tag or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="enter a tag" style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '60%' }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add a tag
                                    </Button>

                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </Form>


            </Modal>
        </>
    )
}
export default AccountModal;