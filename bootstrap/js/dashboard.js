$(document).ready(function() {
	$("#myCheckbox").bootstrapSwitch();
        $("input[type=checkbox]").bootstrapSwitch();
        $("[name='changeState']").on("switchChange.bootstrapSwitch",function(event,state){
                $(this).bootstrapSwitch('toggleDisabled');
                var orderid = $(this).data("orderid");
                $.ajax({
                        url : "changeDishStateAction.action",
                        data : {
                                "orderId": orderid
                        },
                        type : "post",
                        error : function() {

                        },
                        success: function(data){
                                console.log("changed");
                        }
                });
        });

        $("[name='checkout']").on("switchChange.bootstrapSwitch",function(event,state){
                $(this).bootstrapSwitch('toggleDisabled');
                var billId = $(this).data("billid");
                $.ajax({
                        url : "checkoutAction.action",
                        data : {
                                "billId": billId
                        },
                        type : "post",
                        error : function() {

                        },
                        success: function(data){
                                console.log("checkout");
                        }
                });
        });

        setInterval(function() {
                freshState();
        }, 1000);       
});

function freshState(){
        var orderList = new Array();
        $("[name='changeState']").each(function() {
                console.log($(this).data("orderid"));
                orderList.push($(this).data("orderid"));
        });
        console.log(orderList+" list");
        $.ajax({
                url : "freshCancelledAction.action",
                data : {
                        "orderList" : orderList
                },
                type : "post",
                dataType : "text",
                traditional : true,
                error : function() {

                },
                success : function(data) {
                        var orderid = data.split(" ");
                        $.each(orderid, function(index, value) {
                                if(!$("#switch" + value).attr("disabled")){
                                        $("#switch" + value).bootstrapSwitch('toggleDisabled');
                                        var billid = $("#total"+value).data("billid");
                                        var billtotal = $("#billprice" + billid).text();
                                        console.log("bill price"+billtotal);
                                        var cancel = $("#total"+value).val();
                                        $("#billprice" + billid).text(billtotal-cancel);
                                        $("#state" + value).attr("class","label label-danger");
                                        $("#state" + value).html("已取消");
                                }
                                
                               
                                
                        });
                }
        });
}