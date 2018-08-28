function *fetchServer(select,put){
    var {keyword} = yield select((state)=>state.userlist);
    var {pagination:{page,pagesize}} = yield select((state)=>state.userlist);
    var {sorter:{sortby,sortdirection}} = yield select((state)=>state.userlist);

    //发送fetch 请求
    var {results,total} = yield fetch(`/api/users?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}&keyword=${keyword}`).then(data=>data.json());

    // 改变用户的结果
    yield put({"type":"changeUsers","users":results});
    // 改变Pagination
    yield put({"type":"changePagination",total});

}

export const fetchUserServer = fetchServer;