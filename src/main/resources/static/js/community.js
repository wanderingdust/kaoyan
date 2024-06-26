/**
 * 提交回复
 */
function post() {
    var questionId = $("#question_id").val();
    var content = $("#comment_content").val();
    comment2target(questionId, 1, content);
}

function comment2target(targetId, type, content) {
    if (!content){
        alert("不能回复空内容");
        return;
    }

    $.ajax({
        type: "POST",
        url: "/comment",
        contentType:'application/json',
        data: JSON.stringify({//将javaScript对象转化为字符串
            "parentId":targetId,
            "content":content,
            "type":type
        }),
        success: function (response) {
            if (response.code == 200){
                window.location.reload();
            }else {
                if (response.code == 504) {
                    var isAccepted = confirm(response.message+"是否返回首页登录");
                    if (isAccepted){
                        window.close();
                        window.open("http://localhost:8080");
                        //window.localStorage.setItem("closable", true);
                    }
                }else{
                    alert(response.message);
                }
            }
        },
        dataType:"json"
    });
}

function comment(e) {
    var commentId = e.getAttribute("data-id");
    var content = $("#input-" + commentId).val();
    comment2target(commentId, 2, content)
}

/**
 * 展开二级评论
 */
function collapseComments(e) {
    var id = e.getAttribute("data-id");
    var comments = $("#comment-"+id);

    //获取一下二级评论展开状态
    var collapse = e.getAttribute("data-collapse");
    if (collapse){
        //折叠二级评论
        comments.removeClass("in");
        e.removeAttribute("data-collapse");
        e.classList.remove("active")
    }else{
        var subCommentContainer = $("#comment-"+id);
        if (subCommentContainer.children().length != 1){
            //展开二级评论
            comments.addClass("in");
            //标记二级评论展开状态
            e.setAttribute("data-collapse", "in");
            e.classList.add("active");
        } else {
            $.getJSON("/comment/"+id, function (data) {
                $.each(data.data, function (index, comment) {
                    var mediaLeftElement = $("<div/>",{
                        "class":"media-left"
                    }).append($("<img/>",{
                        "class":"media-object img-rounded",
                        "src":comment.user.headSculpture
                    }));

                    var mediaBodyElement = $("<div/>",{
                        "class":"media-body"
                    }).append($("<h5/>",{
                        "class": "media-heading",
                        "html":comment.user.nickName
                    })).append($("<div/>",{
                        "html":comment.content
                    })).append($("<div/>",{
                        "class":"menu"
                    }).append($("<span/>",{
                        "class":"pull-right",
                        "html":moment(comment.gmtCreate).format('YYYY-MM-DD')
                    })));
                    var mediaElement = $("<div/>",{
                        "class":"media"
                    }).append(mediaLeftElement).append(mediaBodyElement);

                    var commentElement = $("<div/>", {
                        "class": "col-lg-12 col-md-12 col-sm-12 co-xs-12 comments"
                    }).append(mediaElement);

                    subCommentContainer.prepend(commentElement);
                });
                //展开二级评论
                comments.addClass("in");
                //标记二级评论展开状态
                e.setAttribute("data-collapse", "in");
                e.classList.add("active");
            });
        }
    }
}

function showSelectTag() {
    $("#select-tag").show();
}

function selectTag(e) {
    var value = e.getAttribute("data-tag");
    var previous = $("#tag").val();
    if(previous.indexOf(value) === -1){
        if (previous){
            $("#tag").val(previous + ',' + value);
        } else {
            $("#tag").val(value);
        }
    }
}
function thumbComments(e) {
    var thumbId = e.getAttribute("id");
    var url = e.getAttribute("data-id");
    var tags =$("#"+thumbId).children("#thumbChildElement");

    $.getJSON("/thumb/" + url ,function(data) {
        //span标签赋值用html,表单一般用val
        tags.html(data);
    });
}

//验证用户名非空 这段是处理登录用户名
function ValiDate_UserName(field, alerttxt) {
    var $UserName= $.trim($("#UserName").val());
    with (field) {
        if ($UserName== "" || $UserName== null) {
            alert(alerttxt);
            return false
        } else {
            return true
        }
    }
}
//验证密码非空
function Validate_Pwd(field, alerttxt) {
    var $PassWord = $.trim($("#PassWord").val());
    with (field) {
        if ($PassWord== "" || $PassWord== null) {
            alert(alerttxt);
            return false
        } else {
            return true
        }
    }
}
//验证账号非空
function Validate_phone(field, alerttxt) {
    var $phone = $.trim($("#phone").val());
    with (field) {
        if ($phone== "" || $phone== null) {
            alert(alerttxt);
            return false
        } else {
            return true
        }
    }
}
//暂时起名叫 总分配处理器
function valiDate_Form1() {
    debugger;
    var $userName= $("#nickname");	//取前台表单的用户名
    var $passWord = $("#password");		//取前台表单的密码
    if (ValiDate_UserName($.trim($userName.val()), "用户名必填") == false) {
        $UserName.focus();
        return false
    } else if ((Validate_Pwd($.trim($passWord.val()), "密码必填") == false)) {
        $PassWord.focus();
        return false
    } else {
        return true;
    }
}
function valiDate_Form2() {
    debugger;
    var $userName= $("#nickname");	//取前台表单的用户名
    var $passWord = $("#password");		//取前台表单的密码
    var $phone = $("#phone");		//取前台表单的密码
    if (ValiDate_UserName($.trim($userName.val()), "用户名必填") == false) {
        $UserName.focus();
        return false
    } else if ((Validate_Pwd($.trim($passWord.val()), "密码必填") == false)) {
        $PassWord.focus();
        return false
    } else if (Validate_phone($.trim($phone.val()), "账号必填") == false){
        $phone.focus();
        return false
    } else {
        return true;
    }
}

