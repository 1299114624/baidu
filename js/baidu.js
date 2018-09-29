var baiduInput = (function(){
    return {
        init(ele){
            this.$ele = document.querySelector(ele);
            this.$searchInp = this.$ele.querySelector('input');
            this.$resultList = this.$ele.querySelector('.search-list');
            this.event();
        },
        event(){
            var _this= this;
            this.$searchInp.oninput=function(){
                _this.judgeInput();
                var val = _this.$searchInp.value;
                _this.getData(val);
            }
            this.$resultList.onclick=function(e){
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.nodeName == "LI"){
                    _this.$searchInp.value = target.innerHTML;
                    _this.listBoxShow();
                } 
            }
        },
        listBoxShow(val){
            val = val || "none";
            this.$resultList.style.display = val;
        },
        judgeInput(){
            var val =this.$searchInp.value;
            if(val==''){
                this.listBoxShow();
            }else{
                this.listBoxShow('block');
            }
        },
        getData(val){
            val = val || this.$searchInp.value;
            var params = {
                wd:val,
                cb:"baiduInput.insertData"
            }
            jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', params);
        },
        insertData(data){
            document.body.removeChild(document.body.lastElementChild);
            data = data.s;
            data = data.map(function(x){
                return `<li>${x}</li>`
            });
            this.$resultList.innerHTML = data.join("");
        }
    }
}())