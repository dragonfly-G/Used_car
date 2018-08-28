import React from 'react';
import { connect } from "dva";
import { Row ,Col ,Button} from "antd";
class Step1 extends React.Component {


    constructor(props) {
        super(props);
        // 数量
        this.viewamount = 0;

    }
    // 组件上树之后
    componentDidMount() {
        var self = this;
        // 映射上传的对象的
        this.maps = {
            view:{},
            inner:{},
            engine:{},
            more:{}
        }
        var $dropzone = $(".dropzone");
        // HTML5拖放的API
        $dropzone.bind("dragover",function(event){
            // 阻止浏览器的默认事件
            event.preventDefault();
            $(this).addClass('over')
        });
        $dropzone.bind("dragleave",function(event){
            // 阻止浏览器的默认事件
            event.preventDefault();
            $(this).removeClass('over')
        });
        $dropzone.bind("drop",function(event){
            // 阻止浏览器的默认事件
            event.preventDefault();
            $(this).removeClass('over');
            var files = event.originalEvent.dataTransfer.files;
            createFileArrAndUploader(files,$(this).data("album"));
        });
        function createFileArrAndUploader(files,album){

            // 给当前的FormDate对象添加一个键值对
            for (var i = 0; i < files.length; i++) {
                let No = self.viewamount++;
                // html5新的对象，表单数据
                let formData = new FormData();
                // 追加项
                formData.append("viewpics",files[i]);
                // 再调用一个函数，次函数是通过XML2.0 来发送formData对象到后台的。
                uploadeFile(formData,album,No)

                // html5新的对象，看可以读取文件
                let reader = new FileReader();
                // 读取图片的编码base64，让图片回显到页面上
                reader.readAsDataURL(files[i]);
                reader.onload = function(event){
                    var str = "previmgbox " + album;
                    $(".dropzone[data-album="+album+"]").append(
                            $('<div data-no='+No+' class="previmgbox" style="background-image:url('+event.target.result+')"><em></em></div>')
                        )
                    $(".previmgbox").addClass(album);
                }

                // 可以排序
                $(".dropzone").sortable();
            };
        }

        // 真正去发送文件的函数
        function uploadeFile(formData,album,No){
            // 使用原生的JS方法
            var xhr = new XMLHttpRequest();
            // 上传的进度
            xhr.upload.onprogress = function(event){
                // 获取当前图片上传的百分比
                var percent = 100 * event.loaded / event.total;
                // 文字标签
                var $em = $(".previmgbox." + album + "[data-no="+No+"]").find("em");

                $em.html("图片正在上传"+ parseInt(percent) + "%");
            }
            // load事件：传输成功完成
            xhr.onload = function(){
                var $em = $(".previmgbox." + album + "[data-no="+No+"]").find("em").hide();

                self.maps[album][No] = JSON.parse(xhr.responseText).base;
            }
            // 配置请求的类型，地址，是否是异步
            xhr.open("POST","http://127.0.0.1:3000/uploadcarimages",true);
            // 发送
            xhr.send(formData)

        };
        // 模拟事件vierfile的改变事件
        $(this.refs.viewfilebtn).click(function(){
            $(self.refs.viewfile).trigger('click');
        });
        $(this.refs.innerfilebtn).click(function(){
            $(self.refs.innerfile).trigger('click');
        });
        $(this.refs.enginefilebtn).click(function(){
            $(self.refs.enginefile).trigger('click');
        });
        $(this.refs.morefilebtn).click(function(){
            $(self.refs.morefile).trigger('click');
        });
        //监听真正的file按钮
        this.refs.viewfile.onchange = function(event){
            createFileArrAndUploader(this.files,"view")
        }
        this.refs.innerfile.onchange = function(event){
            createFileArrAndUploader(this.files,"inner")
        }
        this.refs.enginefile.onchange = function(event){
            createFileArrAndUploader(this.files,"engine")
        }
        this.refs.morefile.onchange = function(event){
            createFileArrAndUploader(this.files,"more")
        }
    }
    render() {

        return (
            <div>
                <Row>
                    <Col span={10}>
                        <h3>请上传【外观】图片，点击上传按钮或者拖拽到方框内</h3>
                    </Col>
                    <Col span={6}>
                        <input ref="viewfile" type="file" hidden multiple="multiple" />
                        <span ref="viewfilebtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dropzone" data-album="view"></div>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <h3>请上传【内饰】图片，点击上传按钮或者拖拽到方框内</h3>
                    </Col>
                    <Col span={6}>
                        <input ref="innerfile" type="file" hidden  multiple="multiple"/>
                        <span ref="innerfilebtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dropzone" data-album="inner"></div>
                    </Col>
                </Row>


                <Row>
                    <Col span={12}>
                        <h3>请上传【结构和发动机】图片，点击上传按钮或者拖拽到方框内</h3>
                    </Col>
                    <Col span={6}>
                        <input ref="enginefile" type="file" hidden  multiple="multiple"/>
                        <span ref="enginefilebtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dropzone" data-album="engine"></div>
                    </Col>
                </Row>

                <Row>
                    <Col span={10}>
                        <h3>请上传【更多细节】图片，点击上传按钮或者拖拽到方框内</h3>
                    </Col>
                    <Col span={6}>
                        <input ref="morefile" type="file" hidden  multiple="multiple"/>
                        <span ref="morefilebtn" className="addBtn">+</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="dropzone" data-album="more"></div>
                    </Col>
                </Row>
                <Button type="primary" onClick={()=>{
                    var picarrObj = {
                        view:[],
                        inner:[],
                        engine:[],
                        more:[]
                    }
                    var self = this;
                    $(".dropzone[data-album=view]").find(".previmgbox").each(function(){
                        picarrObj["view"].push(self.maps["view"][$(this).data("no")]);
                    })
                    $(".dropzone[data-album=inner]").find(".previmgbox").each(function(){
                        picarrObj["inner"].push(self.maps["inner"][$(this).data("no")]);
                    })
                    $(".dropzone[data-album=engine]").find(".previmgbox").each(function(){
                        picarrObj["engine"].push(self.maps["engine"][$(this).data("no")]);
                    })
                    $(".dropzone[data-album=more]").find(".previmgbox").each(function(){
                        picarrObj["more"].push(self.maps["more"][$(this).data("no")]);
                    })
                    this.props.dispatch({"type":"addCar/changeForm1","form1":picarrObj});
                    this.props.dispatch({"type":"addCar/changeStep","step":2});

                }}>下一步</Button>
            </div>
        );
    }
}
export default connect(
    ({addCar})=>({form0:addCar.form0})
)(Step1)