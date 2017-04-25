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
    .directive('addNewDay',function ($compile) {
        return{
            restrict:'A',
            link:function (scope,el,attr) {
                var clickNumber=0;//定义初始点击次数，为0
                var routeData=localStorage.getItem('routeData');//获取第一天的值
                routeData=JSON.parse(routeData);
                el[0].addEventListener('click',function () {
                    clickNumber=clickNumber+1;//表示点击次数
                    var dayNumber=Number(routeData[0][0])+clickNumber;//第一天的值加1，成为第二天
                    routeData[0].push(dayNumber);//把第二天的值存入数组
                    /*日期增加一天开始*/
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
                        var val = d.getFullYear()+"-"+month+"-"+day;
                        return val;
                    }
                    var date=new Date();
                    var firstDay=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
                    firstDay=addDate(firstDay,clickNumber);
                    /*日期增加一天结束*/
                    routeData[1].push(firstDay);//存储新的日期
                    localStorage.routeData=JSON.stringify(routeData); //存储新增一天的所有数据
                    document.getElementById('day-num').innerText=dayNumber;
                    document.getElementById('first-day').innerText=firstDay;
                    var dropDownIcon=document.getElementById('drop-down');
                    dropDownIcon.removeAttribute('class');
                    var sight=document.getElementsByClassName('sight-container');
                    var length=sight.length;
                    for(var i=0;i<length;i++){
                        sight[i].remove();
                    }
                })
            }
        }
    })
    .directive('backToPreDay',function () {
        return{
            restrict:'A',
            link:function (scope,el,attr) {
                el[0].addEventListener('click',function () {
                    var routeData=localStorage.getItem('routeData');//获取路书数据
                    routeData=JSON.parse(routeData);
                    var dayNumEle=document.getElementById('day-num');
                    var dayNumText=dayNumEle.innerText;
                    var dayNum=Number(dayNumText);
                    if(dayNum===1) return false;
                    else {
                        var index=routeData[0].indexOf(dayNum);
                        dayNumEle.innerText=routeData[0][index-1];
                        document.getElementById('first-day').innerText=routeData[1][index-1];
                        var sightEle='<div class="sight-container" show-icon>' +
                            '<div class="sight-img"><img src="" alt="" name="locationImage" ng-model="locationImage"></div>' +
                            '<div class="sight-title"><a href="" ng-bind="locationName"></a>' +
                            '<p id="edit-icons" class="hide">' +
                            '<a href=""><i class="fa fa-edit"></i></a>&nbsp' +
                            '<a href=""><i class="fa fa-trash-o"></i></a>' +
                            '</p>' +
                            '</div>' +
                            '</div>'
                    }
                })
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
        $scope.locationName=sessionStorage.getItem('cityMessage');
        /*规划页面初始化结束*/

        /*获取天数及景点数据并存储--开始*/
        var locationName=$scope.locationName;
        var imgUrl=routeForm.locationImage.src;
        $scope.spaceBetweenTwoSights='';
        var distance=$scope.spaceBetweenTwoSights;
        $scope.drivingTimeBetweenTwoSights='';
        var drivingTime=$scope.drivingTimeBetweenTwoSights;
        var dayNum=$scope.dayNumber;
        var firstDay=$scope.firstTravelDate;
        var dayNumArray=[dayNum];
        var firstDayArray=[firstDay];
        var locationNameArray=[locationName];
        var imgUrlArray=[imgUrl];
        var distanceArray=[distance];
        var drivingTimeArray=[drivingTime];
        localStorage.routeData=JSON.stringify([dayNumArray,firstDayArray,locationNameArray,imgUrlArray,distanceArray,drivingTimeArray]);
        /*获取天数及景点数据并存储--结束*/
    });