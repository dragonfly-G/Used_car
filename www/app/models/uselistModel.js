import fp from "lodash/fp";
import { fetchUserServer } from "./utils/userlistUtil.js";
export default {
    "namespace":"userlist",
    "state":{
        "keyword":"",
        "users":[],
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
        changeUsers(state,{users}){
            return fp.set("users",users,state);
        },
        // 改变Pagination
        changePagination(state,{total=state.pagination.total,page=state.pagination.page,pagesize=state.pagination.pagesize}){
            return fp.set("pagination",{total,page,pagesize},state)
        },
        // 改变sorter
        changeSorter(state,{sortby=state.sorter.sortby,sortdirection=state.sorter.sortdirection}){
            return fp.set("sorter",{sortby,sortdirection},state)
        },
        changeKeywordSync(state,{keyword}){
            return fp.set("keyword",keyword,state);
        }
    },
    "effects":{
        *init(action,{select,put,call,fork}){

            yield call(fetchUserServer,select,put);

        },
        *changePage({page,pagesize},{put,select,call}){
            // 先得到当前的pagesize
            var {pagination}  =  yield select((state)=>state.userlist);

              yield put({"type":"changePagination",page,pagesize})
              // 拉取新的分页
              yield call(fetchUserServer,select,put)
        },
        *changeSort({sortby,sortdirection},{put,select,call}){
            // 先得到当前的pagesize
            var {sorter}  =  yield select((state)=>state.userlist);
            // 判断用户的排序是否和之前一样
                if(sorter.sortby != sortby || sorter.sortdirection != sortdirection){
                // 只要排序，一定要回到第一页
                     yield put({"type":"changePagination","page":1})
                    // 改变排序
                    yield put({"type":"changeSorter",sortby,sortdirection})
                    // 拉取新的分页
                    yield call(fetchUserServer,select,put)
                }
        },
        // 改变关键字
        *changeKeyword({keyword},{put,select,call}){
            // 只要一查询，一定要回到第一页
             yield put({"type":"changePagination","page":1})
             // 改变关键字
             yield put({"type":"changeKeywordSync",keyword})

             yield call(fetchUserServer,select,put)
        }
    }
}



