import React from "react";
import moment from "moment";
export default [{
          title: '编号',
          dataIndex: 'id',
          key: 'id',
          sorter:true
        }, {
          title: '缩略图',
          dataIndex: 'avatar',
          key: 'avatar',
          render:(zhi,info)=>{
            return <img
                style={{"width":"80px"}}
                src={`carimages_small/${info.id}/view/${zhi}`}
                className="suoluetu"
                data-id={info.id}
            />
          }
        },{
          title: '车系',
          dataIndex: 'brand',
          key: 'brand',
          render:(zhi,info)=>{
            return info.brand + info.series;
          }
        }, {
          title: '购买日期',
          dataIndex: 'buydate',
          key: 'buydate',
          render:(zhi,info)=>{
            return moment(zhi).format("YYYY年MM月")
          }
        },{
          title: '里程',
          dataIndex: 'km',
          key: 'km',
          sorter:true
        }, {
          title: '售价',
          dataIndex: 'price',
          key: 'price',
          sorter:true
        },{
          title: '颜色',
          dataIndex: 'color',
          key: 'color'
        }, {
          title: '发动机',
          dataIndex: 'engine',
          key: 'engine'
        },{
          title: '排放',
          dataIndex: 'exhaust',
          key: 'exhaust'
        }, {
          title: '燃料',
          dataIndex: 'fuel',
          key: 'fuel'
        },{
          title: '变速箱',
          dataIndex: 'gearbox',
          key: 'gearbox'
        },{
          title: '车型',
          dataIndex: 'type',
          key: 'type'
        }, {
          title: '座位数',
          dataIndex: 'seat',
          key: 'seat'
        },{
          title: '是否上牌',
          dataIndex: 'license',
          key: 'license',
          render:(zhi,info)=>{
                return zhi ? <span>是</span> : <span>否</span>
          }
        }
]