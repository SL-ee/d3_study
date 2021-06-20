const DUMMY_DATA = [
    {id: 'd1', value: 10, region: 'Seoul'},
    {id: 'd2', value: 5, region: 'Jeju'},
    {id: 'd3', value: 7, region: 'Gwangju'},
    {id: 'd4', value: 14, region: 'Gyunggi'}
]

// px 단위로 데이터가 들어가면 너무 작기 때문에 스케일을 키워주는 함수
// scaleBand()는 x축이 일정한 폭을 갖게 함.
const xScale = d3.scaleBand().domain(DUMMY_DATA.map(dat => dat.region)).rangeRound([0, 250]).padding(0.1);
// y는 들어오는 값에 따라 나가는 값이 다르게
const yScale = d3.scaleLinear().domain([0, 15]).range([0, 200]);

// svg에 contanier라는 class를 넣어줌
 const container = d3.select('svg').classed('container', true);
 const bars = container
    .selectAll('.bar') //.은 class, #은 id 없으면, 엘리먼트 자체 ex. body
    .data(DUMMY_DATA)
    .enter() // (현재 bar라는 클래스를 가진 엘리먼트가 없으므로) 엘리먼트 만들어주는 함수
    .append('rect') // append()는 그래서 만드는데 뭘 만드는지 알려주는 함수(둘이 짝꿍) -> rect가 만들어진 것
    .classed('bar', true) // 위에서 만든 엘리먼트에 class 추가
    .attr('width', xScale.bandwidth())
    .attr('height', data => yScale(data.value))
    .attr('x', data => xScale(data.region))
    // 컴퓨터에서 y는 값이 클수록 아래임.
    .attr('y', data => 200 - yScale(data.value));
