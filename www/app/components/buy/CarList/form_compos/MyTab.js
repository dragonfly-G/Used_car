import React from "react";
import {Tabs} from "antd";
import cn from "classnames";
const TabPane = Tabs.TabPane;
import carBrandAndSeries from "../api/carBrandAndSeries.js";
export default (props)=>{

    return  <Tabs defaultActiveKey="A">
        {
            Object.keys(carBrandAndSeries).map(char=>{
                return  <TabPane tab={char} key={char}>
                   {
                        carBrandAndSeries[char].map(brand=>{
                             return <a
                                     href="javascript:void(0);"
                                     key={brand.name}
                                     className={cn({"cur":props.brand == brand.name,"line":true})}
                                     onClick = {()=>{
                                        props.onChoose(brand.name,char)
                                     }}
                                 >
                                 {brand.name}
                             </a>
                        })
                   }
                </TabPane>
            })
        }

  </Tabs>
}