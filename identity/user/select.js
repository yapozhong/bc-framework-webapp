bc.selectUser = {
	init : function() {
		var $page = $(this);
		//绑定双击事件
		$page.find("select").dblclick(function(){
			bc.selectUser.clickOk.call($page[0]);
		});
	},
	clickOk : function() {
		var $page = $(this);
		var select = $page.find("select")[0];
		if(select.selectedIndex == -1){
			alert("必须先选择用户信息！");
			return false;
		}
		var item;
		if(select.multiple){//多选
			item=[];
			// 循环选定的每一个项目，将该项添加到列表中
			for (var i = 0; i < select.length; i++){
				if (select.options[i].selected){
					var txt = select.options[i].text.split(" <--");
					item.push({id: select.options[i].value,name: txt[0],pname: txt[1]});
				}
			}
		}else{//单选
			var txt = select.options[select.selectedIndex].text.split(" <--");
			item={id: select.value,name: txt[0],pname: txt[1]};
		}
		$page.data("data-status",item);
		$page.dialog("close");
	}
}