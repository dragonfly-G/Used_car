import fp from "lodash/fp";
import { fetchCarServer } from "./utils/carlistUtils.js";
export default {
    "namespace":"carlist",
    "state":{
        "nowfilters":[
        ],
        "cars":[],
        "pagination":{
            "total":0,
            "page":1 , //当前的页数
            "pagesize":10 //每页条数
        },
        "sorter":{
            "sortby":"id", //默认按id排序
            "sortdirection":"ascend" //升序
        }

    },
    "reducers":{
        changeCars(state,{cars}){
            return fp.set("cars",cars,state);
        },
        // 改变
        changeFilter(state,{k,v}){
            return fp.set("nowfilters",
                    fp.map(item=>item.k == k ? fp.set("v",v,item):item,state.nowfilters)
                   ,state);
        },
        // 增加
        addFilter(state,{k,v}){
            var nowfilters = fp.clone(state.nowfilters);
            nowfilters.push({k,v})
            return fp.set("nowfilters",nowfilters,state);
        },
        // 删除
        removeFilterSync(state,{k}){
            return fp.set("nowfilters",fp.filter(item=>item.k != k ,state.nowfilters),state)
        },
        // 改变Pagination
        changePagination(state,{total=state.pagination.total,page=state.pagination.page,pagesize=state.pagination.pagesize}){
            return fp.set("pagination",{total,page,pagesize},state)
        },
        // 改变sorter
        changeSorter(state,{sortby=state.sorter.sortby,sortdirection=state.sorter.sortdirection}){
            return fp.set("sorter",{sortby,sortdirection},state)
        }
    },
    "effects":{
        *init(action,{select,put,call,fork}){

            yield call(fetchCarServer,select,put);

        },
        // 增加或修改过滤器
        *addOrChangeFilter({k,v},{select,put,call,fork}){
            // 得到当前的nowfilters
            var {nowfilters} = yield select((state)=>state.carlist);
            // 判断是否已经有k这项
            // 默认没有
            var isExit = false;
            for (var i = 0; i < nowfilters.length; i++) {
                if( nowfilters[i].k == k){
                    isExit = true;
                }
            };
            //如果这项已经存在
            if(isExit){
                yield put({"type":"changeFilter",k,v})
            }else{
                 //如果这项不存在
                 yield put({"type":"addFilter",k,v})
            }
            // 页码归1
            yield put({"type":"changePagination","page":1})
            // 添加或修改过滤条件，都需要重新的请求后台的数据
            yield call(fetchCarServer,select,put);
        },
        *removeFilter({k},{select,put,call,fork}){
            // 删除brand （品牌） 的时候，车系一并删除
            if(k == "brand"){
                yield put({"type":"removeFilterSync",k:"series"})
            }
             yield put({"type":"removeFilterSync",k})
             // 页码归1
             yield put({"type":"changePagination","page":1})
             // 删除过滤条件，也需要重新的请求后台的数据
             yield call(fetchCarServer,select,put)
        },
        *changePage({page,pagesize},{put,select,call}){
            // 先得到当前的pagesize
            var {pagination}  =  yield select((state)=>state.carlist);

              yield put({"type":"changePagination",page,pagesize})
              // 拉取新的分页
              yield call(fetchCarServer,select,put)
        },
        *changeSort({sortby,sortdirection},{put,select,call}){
            // 先得到当前的pagesize
            var {sorter}  =  yield select((state)=>state.carlist);
            // 判断用户的排序是否和之前一样
                if(sorter.sortby != sortby || sorter.sortdirection != sortdirection){
                // 只要排序，一定要回到第一页
                     yield put({"type":"changePagination","page":1})
                    // 改变排序
                    yield put({"type":"changeSorter",sortby,sortdirection})
                    // 拉取新的分页
                    yield call(fetchCarServer,select,put)
                }

        }
    }
}



