
  /* Module dependencies */
  require('aframe-meshline-component');
  require('aframe-text-component');
  var d3 = require('d3');

  /**
   * Constant
   */

var COLOR_PALETTE = ['#a50026', '#fdae61', '#d73027', '#abd9e9', '#f46d43', '#74add1', '#4575b4', '#313695', '#999', '#666', '#ccc'];
var margin = .5;


  /* global AFRAME */

  if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
  }

  /**
   * Chart component for A-Frame.
   */
  AFRAME.registerComponent('chartbuilder', {
    schema: {
      src: { default: '' }
    },

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () { },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function () {
      var src = this.data.src;
      d3.json(src, this.buildChart.bind(this));
    },

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function () { },

    /**
     * Called on each scene tick.
     */
    // tick: function (t) { },

    /**
     * Called when entity pauses.
     * Use to stop or remove any dynamic or background behavior such as events.
     */
    pause: function () { },

    /**
     * Called when entity resumes.
     * Use to continue or add any dynamic or background behavior such as events.
     */
    play: function () { },

    /**
     * Builds the chart using the chartbuilder json
     */
    buildChart: function (data) {
      this.chartData = data.chartProps;
      var container = this.container = d3.select(this.el);
      var width = this.width = 10;
      var height = this.height = 10;
      var yScale = this.yScale = d3.scaleLinear()
        .domain(this.chartData.scale.primaryScale.domain)
        .range([0, this.height]);

      var xScale = this.xScale = d3.scaleLinear()
        .domain([0, this.chartData.data[0].values.length])
        .range([0, this.width]);

      // Y axis
      container.append('a-entity')
      .attr('meshline', 'lineWidth: 2; path: 0 0 0, 0 ' + (this.height + margin) + ' 0;'
        + ' color: #ccc;')
        .selectAll('a-entity').data(this.chartData.scale.primaryScale.tickValues)
        .enter().append('a-entity')
          .attr('material', 'color: #333')
          .attr('text', function(d) { return 'size: 0.2; text: ' + d; })
          .attr('position', function(d, i) { return '-.6 ' + yScale(d) + ' 0' });

      // X axis
      container.append('a-entity')
      .attr('meshline', 'lineWidth: 2; path: 0 0 0, ' + (this.width + margin) + ' 0 0;'
        + ' color: #ccc;')

      var self = this;
      this.chartData.chartSettings.forEach(function(d, i) {
        switch (d.type) {
        case 'line':
          self.buildLine(i);
          break;
        default:
          self.buildBar(i);
        }
      });

    },

    buildLine: function (i) {
      var data = this.chartData.data;
      var settings = this.chartData.chartSettings[i];
      this.values = data[i].values.map(function(d) { return d.value; });
      var xScale = this.xScale, yScale = this.yScale;
      var container = this.container;

      var line = container.append('a-entity')
      .attr('meshline', 'path: ' + this.values.map(function(d, i) {
        return [xScale(i) + margin, yScale(d) + margin, 0].join(' ');
      }).join(', ') + '; lineWidth: 4; color: ' + COLOR_PALETTE[settings.colorIndex])
    },

    buildBar: function (i) {
      var data = this.chartData.data;
      var container = this.container;
      var xScale = this.xScale, yScale = this.yScale;
      this.values = data[i].values.map(function(d) { return d.value; });

      var bars = container.selectAll('a-box.bar').data(this.values);
      bars.enter().append('a-box')
      .classed('bar', true)
      .attr('position', function (d, i) {
        return [xScale(i) + margin, (yScale(d) / 2) + margin, 0].join(' ');
      })
      .attr('depth', .2)
      .attr('width', this.width / this.values.length)
      .attr('opacity', .5)
      .attr('height', function (d) { return yScale(d); })
      .attr('color', COLOR_PALETTE[i]);
    }

  });
