import {fetchCarInfo , fetchCarLikes ,fetchCarImages} from "./utils/picshowUtil.js"
import fp from "lodash/fp";
export default {
    "namespace":"picshow",
    "state":{
        "nowid":0,
        "nowidx":2,
        "nowalbum":"inner",
        "carimages":{},
        "carinfo":{},
        "carlikes":[]
    },
    "reducers":{
        changeNowId(state,action){
            return fp.set("nowid",action.nowid,state)
        },
        changeNowIdx(state,action){
            return fp.set("nowidx",action.nowidx,state)
        },
        changeNowAlbumSync(state,action){
            return fp.set("nowalbum",action.nowalbum,state)
        },
        changeCarinfo(state,action){
            return fp.set("carinfo",action.carinfo,state)
        },
        changeCarLikes(state,action){
            return fp.set("carlikes",action.carlikes,state)
        },
        changeCarImages(state,action){
            return fp.set("carimages",action.carimages,state)
        }
    },
    "effects":{
        // 初始化
        *init({nowid},{put,call,fork}){
            // 改变nowid为action 的载荷
             yield put({"type":"changeNowId",nowid});
             // 改变nowalbum 为view
            yield put({"type":"changeNowAlbum","nowalbum":"view"});
            // 发出请求 ，请求汽车的信息
            const carinfo = yield call(fetchCarInfo,nowid)
            // 改变carinfo
            yield put({"type":"changeCarinfo",carinfo});
            // 发出找相似的车
            const carlikes = yield call(fetchCarLikes,nowid)
            // 改变carlike
            yield put({"type":"changeCarLikes",carlikes});
            // 发出请求，找汽车的图集
            const carimages = yield call(fetchCarImages,nowid)
            // 改变carimages
            yield put({"type":"changeCarImages",carimages});
        },
        *changeNowAlbum(action,{put,call}){
            yield put({"type":"changeNowIdx","nowidx":0});
            yield put({"type":"changeNowAlbumSync","nowalbum":action.nowalbum});
        },
        *clearImages(action,{put,call}){
            //  改变carimages
            yield put({"type":"changeCarImages",carimages:{}});
        },
        *goPrev(action,{put,call,select}){
            // 得到nowIdx 在effect中得到state，只能用select
            const {nowidx,nowalbum,carimages} = yield select((state)=>state.picshow);

            if(nowidx > 0){
                yield put({"type":"changeNowIdx","nowidx":nowidx-1})
            }else{
               if( nowalbum != "view"){
                     //图集的展示顺序
                     const arr = ["view","inner","engine","more"];
                     // 得到当前的相册在图集展示展示顺序的序列号
                     const nowarridx = arr.indexOf(nowalbum);
                    // 改变相册 是上面的序列号减1，重新的从数组中取值
                    yield put({"type":"changeNowAlbumSync","nowalbum":arr[nowarridx-1]});
                    // 到上一个图集的最后一张去
                    yield put({"type":"changeNowIdx","nowidx":carimages[arr[nowarridx-1]].length-1});
               }else{
                // 如果现在是more图集，
                yield put({"type":"changeNowAlbumSync","nowalbum":"more"});
                // 到上一个图集的最后一张去
                yield put({"type":"changeNowIdx","nowidx":carimages["more"].length-1});
               }
            }
        },
        *goNext(action,{put,call,select}){
            // 得到nowIdx 在effect中得到state，只能用select
            const {nowidx,nowalbum,carimages} = yield select((state)=>state.picshow);

            if(nowidx < carimages[nowalbum].length - 1){
                yield put({"type":"changeNowIdx","nowidx":nowidx+1})
            }else{
               if( nowalbum != "more"){
                     //图集的展示顺序
                     const arr = ["view","inner","engine","more"];
                     // 得到当前的相册在图集展示展示顺序的序列号
                     const nowarridx = arr.indexOf(nowalbum);
                    // 改变相册 是上面的序列号减1，重新的从数组中取值
                    yield put({"type":"changeNowAlbumSync","nowalbum":arr[nowarridx+1]});
                    // 到上一个图集的第0张
                    yield put({"type":"changeNowIdx","nowidx":0});
               }else{
                // 如果现在是more图集，
                yield put({"type":"changeNowAlbumSync","nowalbum":"view"});
                // 到上一个图集的最后一张去
                yield put({"type":"changeNowIdx","nowidx":0});
               }
            }
        }

    }
}