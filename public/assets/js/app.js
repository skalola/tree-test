// VALIDATE
function validateInput(text){
    var $val = $(text).val();
    if($val.match(/[^a-zA-Z0-9]/)){
        var length = $val.length - 1;
        $val = $val.substring(length,0)
        $(text).val($val);
    }
}
// GET ALL BRANCHES (SOCKET)
const socket = io();
socket.on('getBranches',function(result){
    $("[data-toggle=popover]").popover('hide');
    $branches = $('#branches');
    $branches.empty();
    var $branchParent = $(`<li class="mt-2">`);
    for(var i = 0; i < result.length; i++){
        var $branch = `<button id="button${result[i].branch_id}" data-id="${result[i].branch_id}" data-children="${result[i].children}" data-range-start="${result[i].branch_range_start}" data-range-end="${result[i].branch_range_end}" type="button" class="btn btn-parent parentBG d-block mb-2" data-title='<div id="${result[i].branch_id}" class="container"><div class="row mt-2"><h6>Branch Details</h6></div><div class="row"><input id="editBranchName" onkeyup="validateInput(this)" required readonly value="${result[i].branch_name}" class="form-control"/></div><div class="row"><div class="col-sm-4"><button id="editBranchIcon" class="btn greyBG my-1 mr-1" onclick="editItem(this)"><i class="far fa-edit iconDark"></i></button><button id="cancelBranchIcon" class="btn greyBG my-1 mr-1" style="display:none;"><i class="fas fa-ban iconDark"></i></button></div><div class="col-sm-4"><button id="branchLogo" disabled class="btn greyBG my-1 mr-1"><i class="fab fa-pagelines iconDark"></i></button><button id="submitBranchIcon" onclick="editBranch()" class="btn greyBG my-1 mr-1" style="display:none;"><i class="fas fa-check-circle iconDark"></i></button></div><div class="col-sm-4"><button onclick="deleteBranch(this)" class="btn greyBG node-delete my-1 mr-1"><i class="fas fa-trash-alt iconDark"></i></button></div></div></div>' data-container="body" data-toggle="popover" data-placement="right" data-html="true" data-content='<div class="container mb-2"><div class="row"><input id="numChildren" required value="${result[i].children}" data-toggle="tooltip" title="Enter a number between 1 and 15." class="form-control input-md mb-3" type="number" min="0" max="15" placeholder="Number of Leaves"><div class="input-group mb-3"><div class="input-group-prepend"><span class="input-group-text parentBG">Range</span></div><input required id="branchRangeStart" type="number" class="form-control" data-toggle="tooltip" title="Enter a lower bound less than the upper bound." placeholder="Min" value="${result[i].branch_range_start}"><input required id="branchRangeEnd" type="number" class="form-control" data-toggle="tooltip" title="Enter an upper bound greater than the lower bound."  placeholder="Max" value="${result[i].branch_range_end}"></div><button id="nodeSubmit" onClick="submitBranchEdit(this)" class="btn btn-block submitBG"><strong>Submit</strong></button></div></div>'><strong>${result[i].branch_name}</strong></button>`
        $($branchParent).append($branch);
        if(parseInt(result[i].children) !== null && parseInt(result[i].children) > 0){
            var $factoryParent = $(`<ul>`);
            var child = result[i].childrenData
            for(x = 0; x < child.length; x++){
                var $factory = `<li><button type="button" class="btn childBG d-block mb-2 text-center">${child[x].leaf_number} <i class="fas fa-leaf"></i></button></li>`
                $($factoryParent).append($factory);
            }
            $($branchParent).append($factoryParent);
        }
    }
    $branches.append($branchParent);
    $("[data-toggle=popover]").popover();
    $("[data-toggle=popover]").on('click',function(e){
        $("[data-toggle=popover]").not(this).popover('hide');
    });
    $('[data-toggle="tooltip"]').tooltip();
});
// GET BRANCHES (ON PAGE LOAD)
socket.emit('getBranches');
// RESET BORDER COLOR
function resetErrorBorder(border){
    $(border).css("borderColor","rgb(206, 212, 218)");
};
// CREATE BRANCH - POST VALIDATION
$("#branchSubmit").click(function(event){
    event.preventDefault();
    var $inputNode = $("#inputNode");
    var $newBranchName = $inputNode.val().trim();
    var $missingBranchName = $("#missingBranchName");
    if($newBranchName === ""){
        $missingBranchName.show();
    }
    else if($newBranchName.match(/[^a-zA-Z0-9]/)){
        validateInput($inputNode);
    }
    else{
        var $duplicateBranchName = $("#duplicateBranchName");
        var $branches = $("#branches").children();
        var isDuplicate = false;
        $missingBranchName.hide();
        for(var i = 0; i < $branches.length; i++){
            var $branchName = $($branches[i]).text().trim();
            if($newBranchName.toLowerCase() === $branchName.toLowerCase()){
                isDuplicate = true;
            }
        }
        if(isDuplicate === true){
            $duplicateBranchName.show();
        }
        else{
            $duplicateBranchName.hide();
            socket.emit('createBranch',$newBranchName);
            $inputNode.val("");
        }
    }
});
// SELECT EDIT BRANCH BUTTON
function editItem(button){
    event.preventDefault();
    var $inputField = document.getElementById("editBranchName");
    var originalValue = $($inputField).val().trim()
    $($inputField).prop({readOnly: false});
    $($inputField).focus();
    $inputField.selectionStart = $($inputField).val().length;
    $("#branchLogo,#editBranchIcon").hide();
    $("#submitBranchIcon,#cancelBranchIcon").show();
    $("#nodeSubmit,#numChildren,#branchRangeStart,#branchRangeEnd").prop("disabled",true);
    $("#cancelBranchIcon").on("click",function(){
        event.preventDefault();
        resetErrorBorder($("#editBranchName"));
        $($inputField).val(originalValue);
        $($inputField).prop({readOnly: true});
        $("#submitBranchIcon,#cancelBranchIcon").hide();
        $("#branchLogo,#editBranchIcon").show();
        $("#nodeSubmit,#numChildren,#branchRangeStart,#branchRangeEnd").prop("disabled",false);
    });
};
// EDIT BRANCH (NAME) - PUT VALIDATION
function editBranch(){
    event.preventDefault();
    var $inputNode = $("#editBranchName");
    var $editBranchName = $inputNode.val().trim();
    var $branches = $("#branches").children().children();
    var isDuplicate = false;
    for(var i = 0; i < $branches.length; i++){
        var $branchName = $($branches[i]).text().trim();
        if($editBranchName.toLowerCase() === $branchName.toLowerCase()){
            isDuplicate = true;
        }
    }
    if(isDuplicate === true){
        $($inputNode).css("borderColor","red");
    }
    else if($editBranchName.match(/[^a-zA-Z0-9]/)){
        validateInput($inputNode);
    }
    else{
        resetErrorBorder($inputNode);
        var id = $($inputNode).parent().parent().attr("id");
        socket.emit('updateBranch',$editBranchName,id);
    }
};
// EDIT BRANCH (CHILDREN) - PUT VALIDATION
function submitBranchEdit(button){
    var $numChildren = $("#numChildren");
    var $numChildrenVal = $numChildren.val().trim();
    if($numChildrenVal !== "" && $numChildrenVal !== NaN && $numChildrenVal <= 15 && $numChildrenVal >= 1){
        resetErrorBorder(numChildren);
        var $branchRangeStart = $("#branchRangeStart");
        var $branchRangeEnd = $("#branchRangeEnd");
        var $rangeStartVal = $branchRangeStart.val().trim();
        var $rangeEndVal = $branchRangeEnd.val().trim();
        if(parseInt($rangeStartVal) <= parseInt($rangeEndVal)){
            resetErrorBorder(numChildren);
            var $branchId = $(button).parent().parent().parent().parent().children()[1];
            $branchId = $($branchId).children().attr("id");
            socket.emit('createLeaves',$branchId,$rangeStartVal,$rangeEndVal,$numChildrenVal);
        }
        else{
            resetErrorBorder($branchRangeStart);
            resetErrorBorder($branchRangeEnd);
            $($branchRangeStart,$branchRangeEnd).css("z-index",1);
            if($rangeStartVal === "" || $rangeEndVal === ""){
                if($rangeStartVal === ""){
                    $branchRangeStart.css({"border-color":"red","z-index":2});
                }
                if($rangeEndVal === ""){
                    $branchRangeEnd.css({"border-color":"red","z-index":2});
                }
            }
            else if(parseInt($rangeStartVal) > parseInt($rangeEndVal)){
                $branchRangeStart.css({"border-color":"red","z-index":2});
            }
        }
    }
    else{
        $numChildren.css("borderColor","red");
    }
};
// DELETE BRANCH - DELETE
function deleteBranch(button){
    event.preventDefault();
    var id = $(button).parent().parent().parent().attr("id");
    socket.emit('deleteBranch',id);
};