/**
 * Created by stephen on 2017/4/20.
 */
angular.module('xPlan')
    .directive('ngHover',function () {
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
    .controller('contentCtrl',function ($scope) {
        /*规划页面初始化开始*/
        $scope.dayNumber=1;
        $scope.showDrapdownIcon=false;
        var date=new Date();
        $scope.firstTravelDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        $scope.status = {
            isopen: false
        };
        /*规划页面初始化结束*/

        /*获取天数及景点数据开始*/
        $scope.locationName='成都';
        var locationName=$scope.locationName;
        var imgUrl=routeForm.locationImage.src;
        $scope.spaceBetweenTwoSights='20公里';
        var distance=$scope.spaceBetweenTwoSights;
        $scope.drivingTimeBetweenTwoSights='30分钟';
        var drivingTime=$scope.drivingTimeBetweenTwoSights;
        var dayNum=$scope.dayNumber;
        var firstDay=$scope.firstTravelDate;
        var travelData=[dayNum,firstDay,locationName,imgUrl,distance,drivingTime];
        /*获取天数及景点数据结束*/

        $scope.addNewDay=function () {
        };
    });