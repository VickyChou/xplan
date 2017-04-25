/**
 * Created by stephen on 2017/4/20.
 */
angular.module('xPlan')
    .directive('showIcon',function () {
        return {
            restrict:'A',
            link:function (scope,el,attr) {
                el[0].addEventListener('mouseover',function () {
                    var icon=document.getElementById('edit-icons');
                    icon.removeAttribute('class');
                    icon.setAttribute('class','show')
                });
                el[0].addEventListener('mouseout',function () {
                    var icon=document.getElementById('edit-icons');
                    icon.removeAttribute('class');
                    icon.setAttribute('class','hide')
                });
            }
        }
    })
    .controller('contentCtrl',function ($scope,$uibModal) {
        /*规划页面初始化开始*/

        /*获取当天日期，设置为第一天*/
        $scope.dayNumber=1;
        var date=new Date();
        $scope.firstTravelDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        $scope.showDrapdownIcon=false;
        $scope.status = {
            isopen: false
        };
        $scope.showsights=true;

        /*获取景点数据并存储*/
        var locationNames=sessionStorage.getItem('cityMessage');//获取地图定位的城市名称及图片
        var currentDayLocations=[locationNames];
        var imgUrls=['/xplan/images/city_image.svg'];
        var currentLocationNameImgUrl=[imgUrls];
        var locations=[currentLocationNameImgUrl,currentDayLocations];
        $scope.imgUrls=imgUrls;
        $scope.locationNames=currentDayLocations;

        /*绑定景点之间的间距*/
        $scope.spaceBetweenTwoSights='';
        var distance=[$scope.spaceBetweenTwoSights];
        $scope.drivingTimeBetweenTwoSights='';
        var drivingTime=[$scope.drivingTimeBetweenTwoSights];
        var distanceArray=[distance];
        var drivingTimeArray=[drivingTime];

        /*存储新增的天数和日期*/
        var dayNum=$scope.dayNumber;
        var firstDay=$scope.firstTravelDate;
        var dayNumArray=[dayNum];
        var firstDayArray=[firstDay];

        /*存储路书中所有数据*/
        var routeData=[dayNumArray,firstDayArray,locations,distanceArray,drivingTimeArray];
        /*localStorage.routeData=JSON.stringify(routeData);*/

        /*规划页面初始化结束*/

        /*新增一天行程*/
        $scope.addNewDay=function () {
            firstDay=addDate(firstDay,1);
            $scope.firstTravelDate=firstDay;
            dayNum=dayNum+1;
            $scope.dayNumber=dayNum;
            $scope.showDrapdownIcon=true;
            var index=dayNumArray.indexOf(dayNum);
            $scope.imgUrls=[currentLocationNameImgUrl[index]];
            $scope.locationNames=[currentDayLocations[index]];
            $scope.showsights=false;
            dayNumArray.push(dayNum);
            $scope.dayNumArray=dayNumArray;
            firstDayArray.push(firstDay);
        };

        /*返回上一天行程*/
        $scope.backToPreDay=function () {
            var currentDayNum=$scope.dayNumber;
            if(currentDayNum===1) return false;
            var currentDate=$scope.firstTravelDate;
            var preDayDate=addDate(currentDate,-1);
            $scope.firstTravelDate=preDayDate;
            $scope.dayNumber=currentDayNum-1;
            if((currentDayNum-1)===1){
                var index=dayNumArray.indexOf(currentDayNum-1);
                $scope.imgUrls=imgUrls;
                $scope.locationNames=currentDayLocations;
                $scope.showsights=true;
            }
        };

        /*到下一天*/
        $scope.toNextDay=function () {
            var currentDayNum=$scope.dayNumber;
            var maxDay=dayNumArray.length;
            if(maxDay===1) return false;
            else if(currentDayNum===maxDay) return false;
            var currentDate=$scope.firstTravelDate;
            var preDayDate=addDate(currentDate,1);
            $scope.firstTravelDate=preDayDate;
            $scope.dayNumber=currentDayNum+1;
            $scope.showsights=false;
        };

        /*删除当前这一天跳出提示框*/
        $scope.deleteCurrentDay=function () {
            var currentDayNum=$scope.dayNumber;
            if(currentDayNum===1) return false;
            else {
                $uibModal.open({
                    animation: true,
                    keyboard: true,
                    templateUrl: 'deleteDayModel.html',
                    controller: 'deleteCurrentDayCtrl',
                    scope: $scope
                })
            }
        };
    })
    .controller('deleteCurrentDayCtrl',function ($scope,$uibModalInstance) {
        /*取消删除当前天*/
        $scope.cancel=function () {
            $uibModalInstance.dismiss('cancel');
        };

        /*确认删除当前天*/
        $scope.ok=function () {
        }
    });

//日期增加、减少一天
function addDate(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day = d.getDate();
    if(month<10){
        month = "0"+month;
    }
    if(day<10){
        day = "0"+day;
    }
    return d.getFullYear()+"-"+month+"-"+day;
}

