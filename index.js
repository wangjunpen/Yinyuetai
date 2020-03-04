//取消浏览器默认行为
// document.addEventListener("touchstart",function (event) {
//     event.preventDefault()
// });
//rem适配
(function () {
    let w=document.documentElement.clientWidth;
    let fz=w*16/255;
    document.getElementsByTagName('html')[0].style.fontSize=fz+'px ';
})();


//获取焦点及失去焦点
ChangeInput();
function ChangeInput(){
    let inputNode = document.querySelector("#search [type='text']");
     inputNode.addEventListener("touchstart",function  () {
        inputNode.focus();
        event.stopPropagation()
    },{passive:false});
    document.addEventListener("touchstart",function () {
        inputNode.blur();
    },{passive:false});
}

//菜单切换
ChangeMenu();
function ChangeMenu() {
    let menuBtn=document.getElementById("menuBtn");
    let mask=document.getElementById("mask");
    menuBtn.addEventListener("touchstart",function () {
        if (menuBtn.className=="menuBtn_close"){
            menuBtn.className="menuBtn_open";
            mask.style.display='block';
        }else if(menuBtn.className=="menuBtn_open"){
            menuBtn.className="menuBtn_close";
            mask.style.display="none";
        }
        //阻止冒泡
        event.stopPropagation()
    },{passive:false});
    document.addEventListener("touchstart",function () {
        if (menuBtn.className=="menuBtn_open"){
            menuBtn.className="menuBtn_close";
             mask.style.display='none';
        }

    },{passive:false});
    mask.addEventListener("touchstart",function () {
        event.stopPropagation();
    },{passive:false});
}

(function (w) {
    w.aa=function (node,name,value) {
        if (!node.transform){
            node.transform={};
        }
        if (arguments.length>2){
            //把名值对添加到对象
            node.transform[name]=value;
            let result="";
            for(let item in node.transform){
                switch (item) {

                    case 'sKew':
                    case 'sKewX':
                    case 'sKewY':
                    case 'sKewZ':
                        result=item+'('+node.transform[item]+'deg)';
                        break;

                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                    case 'scaleZ':
                        result=item+'('+node.transform[item]+'deg)';
                        break;

                    case 'translate':
                    case 'translateX':
                    case 'translateY':
                    case 'translateZ':
                        result=item+'('+node.transform[item]+'px)';
                        break;

                }
            }
            node.style.transform=result;

        }else{
            if (typeof node.transform[name]=='undefined'){
                if (name==='scale'||name==="scaleX"||name==="scaleY"||name==="scaleZ" ){
                    value=1
                }else {
                    value=0
                }
            }else{
                value=node.transform[name];
            }
            return value;
        }

    }
})(window);

//导航拖拽
dong();
function dong(){
    let navs=document.getElementById("navs");
    let navsList=document.getElementById("navsList");
     aa(navsList,"translateZ",0.01);
    let startX=0;
    let  eleX=0;
    let bedtime=0;//开始时间
    let believable=0;//开始的时间值
    let endive=0;//结束时间
    let endue=0;//结束的值
    let daytime=0;//移动的时间
    let devalue=0;//移动的值
    navs.addEventListener("touchstart",function (event) {
        let touch=event.changedTouches[0];
        devalue=0;
        startX=touch.clientX;
        eleX=aa(navsList,'translateX');
        bedtime=new Date().getTime();
        believable=eleX;
    },{passive:false});

    navs.addEventListener("touchmove",function (event) {
        let touch=event.changedTouches[0];
        let nowX=touch.clientX;
        let disX=nowX-startX;
        let translateX=eleX+disX;
  let minX=document.documentElement.clientWidth-navsList.offsetWidth;
        if (translateX>=0){
          let scale=1-translateX/document.documentElement.clientWidth;
          // console.log(scale);
          translateX=translateX*scale;

        } else if(translateX<=document.documentElement.clientWidth-navsList.offsetWidth){
          let over=minX-translateX;
            let scale=1-over/document.documentElement.clientWidth;
                  translateX=minX-over*scale;
                  // console.log(translateX);
        }
        aa(navsList,"translateX",translateX);
        endive=new Date().getTime();
        endue=translateX;
        daytime=endive-bedtime;
        devalue=endue-believable

    },{passive:false});
    navsList.addEventListener("touchend",function (event) {
        let touch=event.changedTouches[0];
        let speed=devalue/daytime;
        let target=aa(navsList,"translateX")+speed*100;
        let minX=document.documentElement.clientWidth-navsList.offsetWidth;
        let bezier="";
        if (target>0){
            target=0;
            bezier='cubic-bezier(0.42,0,1,1)';
        } else if(target<minX){
            target=minX;
            bezier='cubic-bezier(0.42,0,1,1)';
        }
        navsList.style.transition="1.5s"+bezier;

        aa(navsList,'translateX',target)
    },{passive:false})
}

//点击变色
changColor();
function changColor() {

    //添加事件
   let lines=document.querySelectorAll('#navsList li');
    for (let i=0;i<lines.length;i++){
        //误触判断
        lines[i].addEventListener('touchmove',function () {
            if (!this.isMove){
                this.isMove=true;
            }
        },{passive:false});
        lines[i].addEventListener("touchend",function () {
            if (!this.isMove) {
                for (let j=0;j<lines.length;j++){
                    lines[j].className="";
                }
               this.className='active';
        }
            },{passive:false});
        this.isMove=false;



    }
}

//轮播图
LunBo();
function LunBo() {
    document.addEventListener("touchstart",function (event ){
        event.preventDefault()
    },{passive:false});
    window.onload=function() {
        let navsNode=document.querySelectorAll("#navs_navs span");
        let wrap = document.getElementById("navs_wrap");
        let list = document.getElementById("navs_list");
        aa(list,"translateZ",0.01);
        list.innerHTML+=list.innerHTML;
        let liNodes = document.querySelectorAll("#navs_list li");
        let styles = document.createElement("style");
        //ul的宽度
        let context = '#navs_list{width:' + liNodes.length + '00%}';
        //li的宽度
        context += '#navs_list li{width:' + (1 / liNodes.length * 100) + '%}';
        //包裹器的高度
        context += '#navs_wrap{height:' + liNodes[0].offsetHeight + 'px}';
        styles.innerHTML = context;
        document.head.appendChild(styles);
        let elementX = 0;
        let startX = 0;
        let disX=0;
        let timer=0;
        let now=0;
        // let translateX=0;
        wrap.addEventListener("touchstart", function (event) {

           clearInterval(timer);
           list.style.transition="none";
            let left=aa(list,'translateX');
            // let now=0;
            if (disX<0){
                now=Math.ceil(-left/document.documentElement.clientWidth)
            }else{
                now=Math.round(-left/document.documentElement.clientWidth)
            }
            if (now===0 ){
                now=liNodes.length;
            } else if(now===liNodes.length-1){
                now=navsNode.length-1;
            }

            aa(list,"translateX",-now*document.documentElement.clientWidth);
            let touch = event.changedTouches[0];
            // elementX = translateX;
            startX = touch.clientX;
            elementX=aa(list,'translateX');
        },{passive:false});
        wrap.addEventListener("touchmove", function (event) {

            let touch = event.changedTouches[0];
            let nowX = touch.clientX;
             disX = nowX - startX;
            // translateX=elementX+disX;
            //  list.style.transform = 'translateX  ('+translateX +' px)';
            aa(list,"translateX",elementX+disX);
        },{passive:false});
        wrap.addEventListener("touchend", function (event)  {

            // let  left=translateX;
            event.preventDefault();
            let left=aa(list,'translateX');
            // let now = 0;
            // let left = list.offsetLeft;
                if (disX<0){
                now=Math.ceil(-left/document.documentElement.clientWidth)
            }else{
                now=Math.round(-left/document.documentElement.clientWidth)
            }

            if (now<0){
                now=0
            }else if(now>liNodes.length-1){
                now = liNodes.length - 1
            }
            list.style.transition="2s";
            //    translateX=-now*document.documentElement.clientWidth;
            // list.style.transform ='translateX('+translateX+ 'px)' ;
            aa(list,"translateX",-now*document.documentElement.clientWidth);
            for (let i=0; i<navsNode.length;i++){
                navsNode[i].className="";
            }
            auto();
            navsNode[now%navsNode.length].className='active';



        },{passive:false});
        //自动轮播图

        auto();
        function auto() {

            // let flag=0;
         clearInterval(timer);
            timer=  setInterval(function () {
                list.style.transition="none";
                if (now===liNodes.length-1){
                    now=navsNode.length-1;
                }
                aa(list,"translateX",-now*document.documentElement.clientWidth);
                setTimeout(function () {
                    now++;
                    list.style.transition="2s";
                    aa(list,"translateX",-now*document.documentElement.clientWidth);
                    for (let i=0;i<navsNode.length;i++){
                        navsNode[i].className="";
                    }

                    navsNode[now%navsNode.length].className="active";
                },20)
            },2000)
        }
    }
}

// loading滑动条
tab();
function tab() {
    let tab_wrap=document.querySelectorAll(".tab_wrap");
    let tab=document.querySelectorAll(".tab");
    let translateX=tab[0].offsetWidth;
    for (let i=0; i<tab_wrap.length;i++){
      move(tab_wrap[i]);
    }
     function move(tab_wrap) {
         aa(tab_wrap,"translateX",-translateX);
         let elementX=0;
         let startX=0;
         let startY=0;
         let island=false;

         let loadings=tab_wrap.querySelectorAll(".tab_loading");
         // console.log(loadings.length);
         let now=0;let isX=true;
         let isFirst=true;
         let move=document.querySelector(".tab_nav span");
         aa(move,"translateZ",0.01);
         let anodes=document.querySelectorAll(".tab_nav a");
         tab_wrap.addEventListener("touchstart",function (event)

         { clearTimeout(tab_wrap);
                 if (island){
                     return;
                 }
                 tab_wrap.style.transition="none";
                 let touch=event.changedTouches[0];
                 elementX=aa(this,"translateX");
                 startX=touch.clientX;
             startY=touch.clientY;
              isX=true;
              isFirst=true;

             },{passive:false});

         tab_wrap.addEventListener("touchmove",function (event) {

             if (!isX) {
                 return;
             }
             if (island){
                 return;
             }
             let touch=event.changedTouches[0];
             let nowX=touch.clientX;
             let disX=nowX-startX;
             let nowY=touch.clientY;
             let disY=nowY-startY;
             if (isFirst){
                 if (Math.abs(disY)>Math.abs(disX)){
                     isX=false;
                 }
                 isFirst=false;
             }

             aa(this,"translateX",elementX+disX);
             if (Math.abs(disX)>translateX/2){
                 // let target=0;
                 // if (disX<0){
                 //     target=-2*translateX;
                 // } else {
                 //     target=0;
                 // }
                 let target=disX>0?0:-2*translateX;
                 tab_wrap.style.transition="2s";
                 aa(tab_wrap,'translateX',target);
                 island=true;
                 if (disX<0){
                     now=now+1;
                 } else{
                     now=now-1;
                 }
                 if (now>5){
                     now=0;
                 }else if(now<0){
                     now=5;
                 }
                 // console.log(now);
                 move.style.transition="2s";
                 aa(move,"translateX",anodes[now].offsetLeft);
                 tab_wrap.addEventListener("transitionEnd",transitionEnd);
                 tab_wrap.addEventListener("webkitTransitionEnd",transitionEnd);
                 function transitionEnd() {
                     tab_wrap.addEventListener("transitionEnd",transitionEnd);
                     tab_wrap.removeEventListener("transitionEnd",transitionEnd);
                     for (let i=0; i<loadings.length;i++){

                         loadings[i].style.opacity='1';
                     }
                     setTimeout(function () {

                         tab_wrap.style.transition="none";
                         aa(tab_wrap,"translateX",-translateX);
                             island=false;
                         for (let i=0; i<loadings.length;i++){

                             loadings[i].style.opacity='0';
                         }
                     },3000)
                 }
             }
         },{passive:false});
         tab_wrap.addEventListener("touchend",function (event) {
             clearTimeout(tab_wrap);
             if (island){
                 return;
             }
             let touch=event.changedTouches[0];
             let nowX=touch.clientX;
             let disX=nowX-startX;
            if (Math.abs(disX)<translateX/2){
                tab_wrap.style.transition="2s";
                aa(tab_wrap,'translateX',-translateX)
            }
         },{passive:false})
     }
}

//滚动条
scroll(wrap(),callback)

function wrap() {
    let content=document.getElementById("content");
    let scroll=document.getElementById("scroll");
    let scale=document.documentElement.clientHeight/content.clientHeight;
    scroll.style.height=document.documentElement.clientHeight*scale+'px';
  callback={
        start:function () {
            scroll.style.opacity="1";
        },
        shift:function () {
            //内容移动的距离
            let dis=aa(content,"translateY");
            //滚动条移动的距离 dis*scale
            aa(scroll,'translateY',-dis*scale);
            scroll.style.opacity="1";
        },
        end:function () {
            scroll.style.opacity="0";
        }

    };

}

scroll(callback);
function scroll(callback) {
        let navs=document.getElementById("wrap");
        let navsList=document.getElementById("content");
        aa(navsList,"translateY",0.01);
        let startY=0;
        let  eleY=0;
        let bedtime=0;//开始时间
        let believable=0;//开始的时间值
        let endive=0;//结束时间
        let endue=0;//结束的值
        let daytime=0;//移动的时间
        let devalue=0;//移动的值
        navs.addEventListener("touchstart",function (event) {
            if (callback&&callback['start']){

                callback['start']();
            }
            let touch=event.changedTouches[0];
            devalue=0;
            startY=touch.clientY;
            eleY=aa(navsList,'translateY');
            bedtime=new Date().getTime();
            believable=eleY;

        },{passive:false});

        navs.addEventListener("touchmove",function (event) {
            if (callback&&callback['shift']){

                callback['shift']();
            }
            let touch=event.changedTouches[0];
            let nowY=touch.clientY;
            let disY=nowY-startY;
            let translateY=eleY+disY;
            let minY=document.documentElement.clientHeight-navsList.offsetHeight;
            if (translateY>=0){
                let scale=1-translateY/document.documentElement.clientHeight;
                // console.log(scale);
                translateY=translateY*scale;

            } else if(translateY<=document.documentElement.clientHeight-navsList.offsetHeight){
                let over=minY-translateY;
                let scale=1-over/document.documentElement.clientHeight;
                translateY=minY-over*scale;
                // console.log(translateY);
            }
            aa(navsList,"translateY",translateY);
            endive=new Date().getTime();
            endue=translateY;
            daytime=endive-bedtime;
            devalue=endue-believable;

        },{passive:false});
        navsList.addEventListener("touchend",function (event) {
            if (callback&&callback['end']){

                callback['end']();
            }
            let touch=event.changedTouches[0];
            let speed=devalue/daytime;
            let target=aa(navsList,"translateY")+speed*100;
            let minY=document.documentElement.clientHeight-navsList.offsetHeight;
            let bezier="";
            if (target>0){
                target=0;
                bezier='cubic-bezier(0.42,0,1,1)';
            } else if(target<minY){
                target=minY;
                bezier='cubic-bezier(0.42,0,1,1)';
            }
            navsList.style.transition="1.5s"+bezier;

            aa(navsList,'translateY',target);

        },{passive:false})

}