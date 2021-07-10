var heroList = {
    
    getList: function () {
        var self = this
        console.log(self)
        $.ajax({
            type: "get",
            url: "http://localhost:8888/getList",
            data: {},
            dataType: "json",
            success: function (response) {
                self.renderList(response.data)
            },
            error:function(err){
                alert(err)
            }
        });
    },
    renderList: function (data) {
        str = ''
        data.forEach(element => {
            str +=
                `<li class="item">
                    <a href="./detail.html?_id=${element._id||''}">
                        <span>名称:${element.name||''}</span>&nbsp;<span>职业:${element.class||''}</span>
                    </a>
                    <input style="display: none;" class="check" type="checkbox" value="${element._id}"/>
                </li>`
            

        });
        $('#heroList').html(str)
    },
    checkAll(){
        $('.item input').prop("checked",true)
        
    },
    cancelAll(){
        $('.item input').prop("checked",false)
        
    }
    ,
    check(){
        
        
        if($('#all').prop('checked')) heroList.checkAll()
        else {
            
            heroList.cancelAll()
        }

    },
    delMany(){
        var items= document.querySelectorAll('.item input')
        console.log(items)
        var data=[]
        items.forEach(element => {
            if(element.checked) data.push({_id:element.value})
        });
        $.ajax({
            type: "post",
            url: "http://localhost:8888/del",
            data: {list:data},
            dataType: "json",
            success: function (response) {
                alert(response.msg)
                heroList.getList()
            },
            error: function(err){
                console.log(err)
            }
        });
    },
    show(){
        $('#check-all').toggle()
        $('#add').toggle()
        $('#delMany').toggle()
        $('.check').toggle()
    }
}
heroList.getList()
$('#all').click(heroList.check)
