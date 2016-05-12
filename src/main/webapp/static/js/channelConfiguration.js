/**
 * 商品基础信息查询
 */
var oTable;
$(function(){
	//初始化
	initDataTable();
	
});
function delChannelConfiguration(id){
	layer.confirm("确认删除", {
		icon: 5,
	    btn: ['确定','我再想想'] //按钮
	}, function(){
		$.ajax({
			type : "POST",
			url : "delChannelConfiguration.ajax",
			dataType : "json",
			data :{id:id},
			success:function(data){
				layer.alert(data.msg, {
					icon:data.status,
			        closeBtn: 0,
			        shift: 3 //动画类型
			    }, function(index){    
			    	oTable.ajax.reload();
				    layer.close(index);
				});
			}
		});
	    
	});
}
function initDataTable() {
	
	oTable = $('.examples').DataTable({
		"dom": '<"top">rt<"bottom"ip><"clear">',
		"ajax": {
			"type": "POST",
			"url": "query.ajax",
			"data": function(d) {
				
			}
		},
		//"processing": true,
        "serverSide": true,
		"ordering": false,
		"iDisplayLength" : 10,
		"oLanguage": {
			"sUrl": "../static/js/datatable.cn.txt"
		},
		"aoColumns": [
		    {"mDataProp":null},
			{"mDataProp":"channeltype"},
			{"mDataProp":"channelname"},
			{"mDataProp":"channelcid"},
			{"mDataProp":"dbname"},
			{"mDataProp":"address"},
			{"mDataProp":"username"},
			{"mDataProp":"password"},
			{"mDataProp":"whiteurl"},
			{"mDataProp":"createtime"},
			{"mDataProp":"creator"},
		],
		"columnDefs": [
		    {
		    	render:function( data, type, row ){
		    		if(data=="ctrip"){
		    			return "携程";
		    		}else if(data=="taobao"){
		    			return "淘宝";
		    		}else if(data=="qunar"){
		    			return "去哪";
		    		}else if(data=="tongye"){
		    			return "同业";
		    		}
		    		return data;
		    	},
		    	 "targets": 1
		    },
            {
                "render": function ( data, type, row ) {
                	return '<a class="btn btn-danger btn-xs" href="javascript:void(0);" onclick="javascript:delChannelConfiguration('+row.id+')" title="查看"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>&nbsp;&nbsp;' ;
             	  
                },
                "targets": 11
            }
       ]
     
	});
	//前台添加序号
	oTable.on('draw.dt',function() {
		oTable.column(0).nodes().each(function(cell, i) {
	        cell.innerHTML = i + 1;
	    });
	}).draw();
	
}