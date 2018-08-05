/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-08-05 19:19:42
 * @version $Id$
 */
// li分类显示隐藏
function mouseChange(){
    $(".list").mouseenter(function() {
        $(this).children().eq(0).css("color","#e88");
        $(this).children().eq(1).slideDown('slow');
    });
    $(".list").mouseleave(function() {
        $(this).children().eq(0).css("color","#fff");
        $(this).children().eq(1).slideUp('slow');
    });
}
mouseChange();

//获取分类
(function (){
    let timestamp = new Date().getTime();
    $.ajax({
        type : "get",
        url: `https://route.showapi.com/8-11?name=&showapi_appid=71747&showapi_sign=a3bddc89402541369be3bd222691375f&showapi_timestamp=${timestamp}`,
        dataType : "json",
        success : function(data){
            console.log(data)
            // typelist：每个分类各个分类的名称，一级标题
            let typelist =  data.showapi_res_body.typeList;
            aadLi(typelist);
        },
        error : function() {
            alert("获取数据失败！");
        }
    })
})();


// 添加li标签
function aadLi(typelist){
    for (let i = 0; i < typelist.length; i++) {
        //创造一个li节，存一级标题和扩展内容
        let li = document.createElement("li");
        li.className = "list";
        // 一级标题
        let h1 = document.createElement("h1");
        h1.innerHTML = typelist[i].title;
        // 存放二级标题div
        let div = document.createElement("div");
        div.className = "child";
        //向每个li分类里面添加h1和div节点
        li.appendChild(h1);
        li.appendChild(div);
        // childlist：每个一级标题的分类
        let childlist = typelist[i].child_list;
        // 添加每个child里面的p标签，二级标题
        addChildP(childlist,div);
        // 在nav的ul里面添加每一个li类
        $(".sort")[0].appendChild(li);
    }
    mouseChange();
}

// 添加p标签
function addChildP(childlist, pdiv){
    for (let i = 0; i < childlist.length; i++) {
        // 在每个分类下的div内添加p标签
        let oP = document.createElement("p");
        // 二级标题：childlist[i].title
        oP.innerHTML = childlist[i].title;
        oP.onclick = function (){
            console.log(childlist[i])
            getMessage(childlist[i]);
        };
        pdiv.appendChild(oP);
    }
}
// getMessage(0,4)
// 获取每个分类的具体数据
function getMessage(childlist,count){
    // childlist.class_id ： 类别
    // childlist.course_num ：页数
    // childlist.word_num ：词汇数
    let timestamp = new Date().getTime();
    count ? count : count = 1;
    let url = `https://route.showapi.com/8-10?showapi_appid=71747&showapi_sign=a3bddc89402541369be3bd222691375f&showapi_timestamp=${timestamp}&class_id=${childlist.class_id}&course=${count}`;
    $.ajax({
        type : "get",
        url: url,
        dataType : "json",
        success : function(data){
            // data.list[i].symbol 音标
            // data.list[i].name 单词
            // data.list[i].desc 意思
            // data.list[i].sound 音频http
            console.log(data);
            let wordslist = data.showapi_res_body.list;
            console.log(wordslist);
            for (let i = 0, len = wordslist.length; i < len; i++) {
                addWordsDiv(wordslist[i]);
            }
        },
        error : function() {
            alert("获取数据失败！");
        }
    });
}

function addWordsDiv(list){
    console.count();
    // 存放words信息的div
    let wordsDiv = document.createElement("div");
    wordsDiv.className = "words fl";
    // 单词、音标、意思
    let wordP = document.createElement("p"),
        symbolP = document.createElement("p"),
        meaning = document.createElement("p");
    wordP.innerHTML = list.name;
    symbolP.innerHTML = list.symbol;
    meaning.innerHTML = list.desc;
    // 添加
    wordsDiv.appendChild(wordP);
    wordsDiv.appendChild(symbolP);
    wordsDiv.appendChild(meaning);
    // 将每个单词wordsDiv添加到message里面
    $(".message")[0].appendChild(wordsDiv);
}
