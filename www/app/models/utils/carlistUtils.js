function *fetchServer(select,put){
    var {nowfilters} = yield select((state)=>state.carlist);
    var {pagination} = yield select((state)=>state.carlist);
    var {sorter} = yield select((state)=>state.carlist);

    //发送fetch 请求
    var {results,total} = yield fetch("/api/carsearch",{
        "headers":{"Content-Type":"application/json"},
        "method":"POST",
        "body":JSON.stringify({nowfilters,pagination,sorter})
    }).then(data=>data.json());

    // 改变车辆的结果
    yield put({"type":"changeCars","cars":results});
    // 改变Pagination
    yield put({"type":"changePagination",total});

}

export const fetchCarServer = fetchServer;