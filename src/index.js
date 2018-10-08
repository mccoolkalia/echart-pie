import './index.css';
import echarts from './echarts.min.js';

/**
 * Global controller object is described on Zoomdata knowledge base
 * @see https://www.zoomdata.com/developers/docs/custom-chart-api/controller/
 */

/* global controller */

/**
 * @see http://www.zoomdata.com/developers/docs/custom-chart-api/creating-chart-container/
 */
const chartContainer = document.createElement('div');
chartContainer.classList.add('chart-container');
controller.element.appendChild(chartContainer);
const groupAccessor = controller.dataAccessors['Group By'];
const metricAccessor = controller.dataAccessors['Metric'];




/**
 * @see http://www.zoomdata.com/developers/docs/custom-chart-api/updating-queries-axis-labels/
 */
controller.createAxisLabel({
    picks: 'Group By',
    orientation: 'horizontal',
    position: 'bottom',
    popoverTitle: 'Group'
});

controller.createAxisLabel({
    picks: 'Metric',
    orientation: 'horizontal',
    position: 'bottom'
});


function getChartData(data) {

var myChart = echarts.init(chartContainer);
var groupAccessorName = controller.dataAccessors['Group By'].getLabel();
var dataArray = data.map(function(d) {
  return {
    name: groupAccessor.raw(d),
    value: metricAccessor.raw(d),
  };
});
/*
data.forEach(datum => {
var valuename={value: metricAccessor.raw(datum),name: groupAccessor.raw(datum)};
dataArray.push(valuename);
legendsArray.push(groupAccessor.raw(datum));
});
*/    
var option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        //data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
        //data: legendsArray
    },
    series: [
        {
            name:groupAccessorName,
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            
            /*
            data:[
                //{value:335, name:'Male'},
                //{value:310, name:'Female'}
                //,
                //{value:234, name:'3'},
                //{value:135, name:'4'},
                //{value:1548, name:'5'}
            ]
            */
            data: dataArray
            
        }
    ]
};

myChart.setOption(option);

}


/**
 * @see http://www.zoomdata.com/developers/docs/custom-chart-api/receiving-chart-data/
 */

controller.update = data => {

getChartData(data);

};