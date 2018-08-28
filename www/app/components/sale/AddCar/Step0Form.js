import React from 'react';
import { Form, Input ,Cascader,DatePicker,Select } from 'antd';
import carBrandAndSeries from "../../../../api/carBrandAndSeries.js";
import { connect } from "dva";
const FormItem = Form.Item;
const Option = Select.Option
class Step0Form extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const formItemLayout = {
             labelCol: {
               xs: { span: 24 },
               sm: { span: 4 },
             },
             wrapperCol: {
               xs: { span: 24 },
               sm: { span: 10 },
             },
           };
           // 得到保单域的装饰器的参数,这些参数都是从父亲中传入的，父亲是用From.create()(Step0Form)装饰的。
           const { getFieldDecorator } = this.props.form;

           // 品牌的option，这里写写一个格式转换
           const options = (function(){
                var arr= [];
                for (let k in carBrandAndSeries) {
                    arr.push({
                        "value":k,
                        "label":k,
                        "children":(function(){
                            var arr = [];
                            for (let i = 0; i <carBrandAndSeries[k].length;i++ ) {
                                arr.push({
                                    "value":carBrandAndSeries[k][i].name,
                                    "label":carBrandAndSeries[k][i].name,
                                    "children":(function(){
                                        var arr = [];
                                        for (let j = 0; j <carBrandAndSeries[k][i].series.length;j++ ) {
                                            arr.push({
                                                "value":carBrandAndSeries[k][i].series[j],
                                                "label":carBrandAndSeries[k][i].series[j],
                                            })
                                        }
                                        return arr;
                                    })()
                                })
                            }
                            return arr;
                        })()
                    })
                };
                return arr;
           })();
        return (
            <div>
                <Form>

                    <FormItem
                         {...formItemLayout}
                         label="品牌和车系"
                    >
                        {
                            getFieldDecorator('brandandseries', {
                               rules: [
                                     {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(<Cascader options={options} />)
                        }
                    </FormItem>
                    <FormItem
                         {...formItemLayout}
                         label="购买时间"
                    >
                        {
                            getFieldDecorator('buydate', {
                               rules: [
                                     {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(<DatePicker style={{"width":"100%"}} />)
                        }
                    </FormItem>
                    <FormItem
                         {...formItemLayout}
                         label="里程表的读数（公里）"
                         extra="公司规定，如果虚假填写里程表的读数，报警处理，一经发现，绝不姑息"
                    >
                        {
                            getFieldDecorator('km', {
                               rules: [
                                    {
                                        pattern: /^\d+$/, message: '请输入数字！',
                                    }, {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(<Input />)
                        }
                    </FormItem>
                    <FormItem
                         {...formItemLayout}
                         label="卖家意向售价最低（万元）"
                         extra="卖家所能承受的最低售价"
                    >
                        {
                            getFieldDecorator('price1', {
                               rules: [
                                    {
                                        pattern: /^\d+$/, message: '请输入数字！',
                                    }, {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(<Input />)
                        }
                    </FormItem>
                    <FormItem
                         {...formItemLayout}
                         label="卖家意向售价最高（万元）"
                         extra="卖家所能承受的最高售价"
                    >
                        {
                            getFieldDecorator('price2', {
                               rules: [
                                    {
                                        pattern: /^\d+$/, message: '请输入数字！',
                                    }, {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(<Input />)
                        }
                    </FormItem>
                    <FormItem
                         {...formItemLayout}
                         label="座位数"
                    >
                        {
                            getFieldDecorator('seat', {
                               rules: [
                                    {
                                        pattern: /^\d+$/, message: '请输入数字！',
                                    }, {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(<Input />)
                        }
                    </FormItem>
                    <FormItem
                         {...formItemLayout}
                         label="燃料"
                    >
                        {
                            getFieldDecorator('fuel', {
                               rules: [
                                     {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(
                                <Select placeholder = "汽油">
                                   <Option value="汽油">汽油</Option>
                                   <Option value="柴油">柴油</Option>
                                   <Option value="油电混合">油电混合</Option>
                                   <Option value="纯电动">纯电动</Option>
                                 </Select>
                             )
                        }
                    </FormItem>
                    <FormItem
                         {...formItemLayout}
                         label="排放标准"
                    >
                        {
                            getFieldDecorator('exhaust', {
                               rules: [
                                     {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(
                                <Select placeholder = "国一">
                                   <Option value="国一">国一</Option>
                                   <Option value="国二">国二</Option>
                                   <Option value="国三">国三</Option>
                                   <Option value="国四">国四</Option>
                                   <Option value="国五">国五</Option>
                                   <Option value="国六">国六</Option>
                                 </Select>
                             )
                        }
                    </FormItem>
                    <FormItem
                         {...formItemLayout}
                         label="变速箱"
                    >
                        {
                            getFieldDecorator('gearbox', {
                               rules: [
                                     {
                                        required: true, message: '请输入本项！',
                                    }
                               ],
                             })(
                                <Select placeholder = "自动">
                                   <Option value="自动">自动</Option>
                                   <Option value="手动">手动</Option>
                                 </Select>
                             )
                        }
                    </FormItem>
                </Form>
            </div>
        );
    }
}
export default connect()(Step0Form);