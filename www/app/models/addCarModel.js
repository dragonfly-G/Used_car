import fp from "lodash/fp";
export default {
    "namespace":"addCar",
    "state":{
        step:0 ,//从0开始
        form0:{

        },
        form1:{

        },
        form2:[]

    },
    "reducers":{
        // 更改步骤
        changeStep(state,{step}){
            return fp.set("step",step,state)
        },
        //更改汽车的信息
        changeForm0(state,{form0}){
            return fp.set("form0",form0,state)
        },
        //更改图片的信息
        changeForm1(state,{form1}){
            return fp.set("form1",form1,state)
        },
        //更改图片的信息
        addForm2(state,{fileinfo}){
            return fp.set("form2",
                    [
                        ...state.form2,
                        fileinfo
                    ]
                ,state)
        },
    }
}