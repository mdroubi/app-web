var  Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
  template: '#genericsView',
  container: null,
  animation: null,
  initialize: function () {
    this.listenTo(this.model, 'change:id', this.change);
    this.$el.css('height', '100%');
    this.$el.css('width', '100%');
  },
  change: function () {
    $('#' + this.container).removeClass('animated ' + this.animation);
    this.animation = 'tada';
    this.render();
  },
  renderView: function (container) {
    this.container = container;
    this.animation = 'bounceIn';
    this.render();
  },
  onRender: function () {
    if (this.container) {
      $('#' + this.container).removeClass('animated fadeIn');
      $('#' + this.container).html(this.el);
      $('#' + this.container).addClass('animated ' + this.animation);
      setTimeout(function () {
        $('#' + this.container).removeClass('animated ' + this.animation);
      }.bind(this), 1000);
    }
  },
  close: function () {
    this.remove();
  }
});