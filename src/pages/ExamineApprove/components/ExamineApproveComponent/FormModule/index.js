import React ,{ Component }from 'react';
import {
  Form,
  Input,
  Select,
  Field,
  DatePicker,
  Balloon,
  Icon,
  Grid,
  Button,
  Table,
  Pagination,
  NumberPicker,
  Radio,
  CascaderSelect
 } from "@icedesign/base";
 import addressDataSource from '../../../../LoanApplication/components/addressDataSource';

 const { Row, Col } = Grid;
 const FormItem = Form.Item;
 const { Group: RadioGroup } = Radio;

 const formItemLayout = {
   labelCol: { span: 8 },
   wrapperCol: { span: 16 }
 };
 const formItemLayoutR = {
   labelCol: { span: 2 },
   wrapperCol: { span: 22 }
 };

 const label =(name)=> (
   <span>
     <Balloon
       type="primary"
       trigger={<span>{name}:</span>}
       closable={false}
       triggerType="hover">
       {name}
     </Balloon>
   </span>
 );

 class FormModule extends Component {
   constructor(props) {
     super(props);
     this.state = {}
     this.field = new Field(this);
   }
   handleSubmit(e) {
     e.preventDefault();
     this.field.validate((errors,values) => {
       console.log(values);
       if(errors) {
         return
       }
     })
   }

   defaultValue(options) {
    let target = options.find((n) => {
      return n.isDefault
    })
    let value = target && target.value;
    return value;
   }

   render() {
     const { list } = this.props;
     const { init } = this.field;
     let InputMod = (ele) => {
       switch(ele.type) {
         case 'SELECT':
           return <Select
                     style={{width:"100%"}}
                     dataSource={this.state.dataSource}
                     disabled={ele.isFixed || ele.isReadonly}
                     {...init(ele.name,
                       {
                         'initValue':ele.isFixed? ele.value: 0,
                         rules:[{ required: ele.isRequired, message: `${ele.label}不能为空` }]
                       }
                     )}>
                     {
                       ele.options && ele.options.map((opt,ide) => (
                         <div value={opt.value} key={ide}>{opt.label}</div>
                       ))
                     }
                   </Select>
         case 'STRING':
           return <Input
                   trim
                   style={styles.select}
                   placeholder={ele.type}
                   disabled={ele.isFixed || ele.isReadonly}
                   htmlType='text'
                   {...init(ele.name,
                     {
                       'initValue':ele.isFixed? ele.value: 0,
                       rules:[{ required: ele.isRequired, message:`${ele.label}不能为空` }]
                     }
                   )}
                 />
         case 'DECIMAL':
           return <Input
                   trim
                   style={styles.select}
                   hasLimitHint={true}
                   placeholder={ele.type}
                   disabled={ele.isFixed || ele.isReadonly}
                   htmlType='number'
                   {...init(ele.name,
                     {
                       'initValue':ele.isFixed? ele.value: 0,
                       rules:[
                         { required: ele.isRequired, message:`${ele.label}不能为空` ,min:2},
                         { validator: this.checkNum }
                       ]
                     }
                   )}
                 />
         case 'INT':
           return <NumberPicker
                   disabled={ele.isFixed || ele.isReadonly}
                   type="inline"
                   step={2}
                   min={1}
                   max={12}
                   {...init(ele.name,
                     {
                       'initValue':ele.isFixed? ele.value: 0,
                       rules:[{ required: ele.isRequired, message: `${ele.label}不能为空` }]
                     }
                   )}
                 />
         case 'ADDRESS':
           return <CascaderSelect
                     expandTrigger={this.state.trigger}
                     dataSource={addressDataSource}
                     onChange={this.handleChange}
                     disabled={ele.isFixed || ele.isReadonly}
                   />
         case 'RADIO':
           return <RadioGroup
                     dataSource={ele.options}
                     value={this.defaultValue(ele.options)}
                     disabled={ele.isFixed || ele.isReadonly}
                     {...init(ele.name,
                       {
                         rules:[{ required: ele.isRequired, message:`请选择${ele.label}` }],
                         props:{
                           onChange:(value,e)=> {
                             console.log(value)
                           }
                         }
                       }
                     )}
                   />
         case 'DATE':
           return <DatePicker
                    onChange={(val, str) => console.log(val, str)}
                    style={{width:"100%"}}
                    disabled={ele.isFixed || ele.isReadonly}
                  />
       }
     }
     return(
       <Form
         labelAlign= "left"
         field={this.field}
         >
       {
         list.length>0 && list.map((ele,index) => (
           <div className="part-same part-base-info" id={ele.name}  key={index}>
             <p className="module-name">{ele.name}</p>
             <div className="row-action">
                 {
                   ele.fields && ele.fields.map((flf,idx) => (
                     <FormItem
                       key={idx}
                       labelCol={{span: flf.type == 'RADIO'?2:8}}
                       wrapperCol={{span: 14 }}
                       label={label(flf.label)}
                       className={`item ${flf.type == 'RADIO'?'full-line':''}`}
                       >
                       {
                         InputMod(flf)
                       }
                     </FormItem>
                   ))
                 }
             </div>
           </div>
         ))
       }
        <Button onClick={this.handleSubmit.bind(this)}>提交</Button>
       </Form>
     )
   }
 }

 const styles = {
   normalInput: {
     width:'140px'
   }
 }

 export default FormModule;
