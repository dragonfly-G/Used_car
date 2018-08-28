import React from 'react';
import { Form, Input, DatePicker, Col, TimePicker, Select, Cascader, InputNumber , Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class MyForm extends React.Component {

    constructor(props) {
        super(props);
    }
    handleSubmit(e){
       e.preventDefault();
       this.props.form.validateFields((err, values) => {
         if (!err) {
           console.log('Received values of form: ', values);
         }
       });
     }
    render() {
         const {getFieldDecorator,getFieldsError,isFieldTouched } = this.props.form;
         const formItemLayout = {
           labelCol: {
             xs: { span: 24 },
             sm: { span: 5 },
           },
           wrapperCol: {
             xs: { span: 24 },
             sm: { span: 12 },
           },
         };
         // Only show error after a field is touched.
        const emailtext = isFieldTouched('Email') && getFieldError('Email');
        const adminidtext = isFieldTouched('员工编号') && getFieldError('员工编号');
        const nametext = isFieldTouched('真实的姓名') && getFieldError('真实的姓名');
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                     <FormItem
                          {...formItemLayout}
                          label="Email"
                          validateStatus={emailtext ? 'error' : ''}
                          help={emailtext || ''}
                        >
                         {
                             getFieldDecorator("email",{
                                 rules:[
                                     {
                                         type:'email',message:"请输入正确的Email的地址"
                                     },
                                     {
                                         required:true,message:"本项为必填项,请完成"
                                     }
                                 ]
                             })(<Input/>)
                         }
                     </FormItem>
                     <FormItem
                          {...formItemLayout}
                          label="员工编号"
                          validateStatus={adminidtext ? 'error' : ''}
                          help={adminidtext || ''}
                        >
                         {
                             getFieldDecorator("adminid",{
                                 rules:[
                                     {
                                         pattern:/^\d{5}$/,message:"请输入正确的员工编号"
                                     },
                                     {
                                         required:true,message:"本项为必填项,请完成"
                                     }
                                 ]
                             })(<Input/>)
                         }
                     </FormItem>
                     <FormItem
                          {...formItemLayout}
                          label="真实的姓名"
                          validateStatus={nametext ? 'error' : ''}
                          help={nametext || ''}
                        >
                         {
                             getFieldDecorator("name",{
                                 rules:[
                                     {
                                         pattern:/^([\u4e00-\u9fa5]){2,7}$/,message:"请输入正确的中文姓名"
                                     },
                                     {
                                         required:true,message:"本项为必填项,请完成"
                                     }
                                 ]
                             })(<Input/>)
                         }
                     </FormItem>
                     <FormItem>
                         <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>Submit</Button>
                     </FormItem>
                 </Form>
            </div>
        );
    }
}
const WrappedHorizontalLoginForm = Form.create()(MyForm);

export default WrappedHorizontalLoginForm;