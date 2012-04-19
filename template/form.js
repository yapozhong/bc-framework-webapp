bc.templateForm = {
	init : function(option,readonly) {
		var $form = $(this);
		//根据模板类型显示模板文件或模板内容
		var tplType=$form.find(":radio[name='e.type']:checked").val();
		var $tplContent=$form.find("#idTplContent");
		var $tplFile=$form.find(".tplFile");
		if(tplType=='5'){
			$tplFile.hide();
		}else{
			$tplContent.hide();
		}
		
		if(readonly) return;
		
		//绑定模板类型选择事件
		$form.find(":radio[name='e.type']").change(function(){
			bc.file.clearFileSelect($form.find("#uploadFile"));
			var type=$(this).val();
			if(type!='5'){
				$tplFile.show();
				$tplContent.hide();
				$form.find(":input[name='e.subject']").val('');
				$form.find(":input[name='e.content']").val('');
			}else{
				$tplFile.hide();
				$tplContent.show();
				$form.find(":input[name='e.path']").val('');
				$form.find(":input[name='e.subject']").val('');
			}
		});
		
		//绑定清除按钮事件
		$form.find("#cleanFileId").click(function(){
			$form.find(":input[name='e.path']").val('');
			$form.find(":input[name='e.subject']").val('');
		});
	},
	/** 文件上传完毕后 */
	afterUploadfile : function(json){
		logger.info($.toJSON(json));
		if(json.success){
			var $page = this.closest(".bc-page");
			$page.find(':input[name="e.subject"]').val(json.source);
			$page.find(':input[name="e.path"]').val(json.to);
		}else{
			bc.msg.alert(json.msg);
		}
	},
	/**
	 * 保存
	 */
	save : function(){
		var $form = $(this);
		//验证表单
		if(!bc.validator.validate($form)) return;
		
		var type=$form.find(":radio[name='e.type']:checked").val();
		var subject=$form.find(":input[name='e.subject']").val();
		var path=$form.find(":input[name='e.path']").val();
		var code=$form.find(":input[name='e.code']").val();
		var id=$form.find(":input[name='e.id']").val();
		var url=bc.root+"/bc/template/isUniqueCode";
		
		//自定义文本
		if(type==5){
			bc.page.save.call($form);
			return;
		}
	
		//模板路径和模板文本
		if(path==''){
			bc.msg.alert('没有上传文件，请点击文本框右侧的上传按钮！');
			return;
		}
		
		//验证后缀名
		$.trim(path);
	
		var arrp=path.split(".");

		if(arrp.length!=2){
			bc.msg.alert('上传的文件后缀名错误！');
			return;
		}

		//后缀名
		var suffix=arrp[1];
		
		//转为小写
		suffix=suffix.toLocaleLowerCase();
		
		if(type==1&&bc.templateForm.isExcelSuffix(suffix)){
			bc.templateForm.saveInfo($form,url,code,id);
		}else if(type==2&&bc.templateForm.isWordSuffix(suffix)){
			bc.templateForm.saveInfo($form,url,code,id);
		}else if(type==3&&bc.templateForm.isTextSuffix(suffix)){
			bc.templateForm.saveInfo($form,url,code,id);
		}else if(type==4){
			bc.templateForm.saveInfo($form,url,code,id);
		} 
	},
	isExcelSuffix:function(suffix){
		if(suffix=='xls'||suffix=='xlsx'||suffix=='xml')
			return true;
		
		bc.msg.alert('后缀名错误，保存后缀名应为xls、xlsx、xml文件');
		return false;
	},
	isWordSuffix:function(suffix){
		if(suffix=='doc'||suffix=='docx'||suffix=='xml')
			return true;
		
		bc.msg.alert('后缀名错误，保存后缀名应为doc、docx、xml文件');
		return false;
	},
	isTextSuffix:function(suffix){
		if(suffix=='txt')
			return true;
		
		bc.msg.alert('后缀名错误，保存后缀名应为txt文件');
		return false;
	},
	saveInfo:function($form,url,code,id){
		$.ajax({
			url:url,
			data:{tid:id,code:code},
			dataType:"json",
			success:function(json){
				var result=json.result;
				if(result=='save'){
					bc.page.save.call($form);
				}else{
					//系统中已有此编码
					bc.msg.alert(result);
				}
			}
		});
	}
};