var defaultKeyCode = "puan";

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getActiveContent(keycode){
    var activeContent;
    for (var i = 0; i < contentData.contentList.length; i++) {
        activeContent = contentData.contentList[i];
        if(activeContent.keycode == keycode)
            break;
    }
    return activeContent;
}

function handleClick(keycode) {
    if(keycode == undefined)
        keycode = 'puan';

    window.location.replace("index.html#" + keycode);
    window.location.hash = keycode;
    handleLoad();
}

function handleLoad() {
    
    var keycode = "";

        keycode = window.location.hash;
        keycode = keycode.replace('#','');

    var spanElements = document.getElementsByClassName("badge");
    for (var i = 0; i < spanElements.length; i++) {
        spanElements[i].classList.remove("active");
    }
        
    var activeButtonElement = document.getElementById(keycode);
    var activeSpanElement = activeButtonElement.getElementsByTagName("span")[0];
    activeSpanElement.classList.add("active");

    var activeContent = getActiveContent(keycode);

    document.getElementById("header").innerText = activeContent.header;

    var contentHtml = '';
    activeContent.detail.forEach((element, i) => {
        contentHtml += "<a href='detail.html?keycode=" + keycode + "&amp;answerindex=" + i + "' class='question-a'><div class='question'><div class='question-text'>" + element.question + "</div><div class='question-arrow'><svg width='7' height='10' viewBox='0 0 7 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path opacity='0.7' fill-rule='evenodd' clip-rule='evenodd' d='M1.16667 0L0 1.16667L3.83333 5L0 8.83333L1.16667 10L6.16667 5L1.16667 0Z' fill='#24272C'></path></svg></div></div></a>"
    });

    document.getElementById("detail").innerHTML = contentHtml;
}

function handleDetail() {
    var keycode = getParameterByName("keycode");
    var answerindex = getParameterByName("answerindex");
    var activeContent = getActiveContent(keycode);

    var contentHtml = '';
    
    if(activeContent.content.length> 0){
        contentHtml += activeContent.content;
    }

    contentHtml += "<div class='content2'><div class='questions2'><h3 class='question-header2'>" + activeContent.detail[answerindex].question + "</h3><p class='question-text2'>" + activeContent.detail[answerindex].answer + "</p></div></div></div>";
    document.getElementById("content").innerHTML = contentHtml;
}
