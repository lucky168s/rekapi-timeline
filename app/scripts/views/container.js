define([

  'jquery'
  ,'underscore'
  ,'backbone'
  ,'mustache'

  ,'views/animation-tracks'
  ,'views/control-bar'

  ,'text!../templates/container.mustache'

], function (

  $
  ,_
  ,Backbone
  ,Mustache

  ,AnimationTracksView
  ,ControlBarView

  ,containerTemplate

) {
  'use strict';

  var ContainerView = Backbone.View.extend({
    /**
     * @param {Object}
     *   @param {RekapiTimeline} rekapiTimeline
     *   @param {HTMLElement} el
     */
    initialize: function (opts) {
      this.rekapiTimeline = opts.rekapiTimeline;

      this.initialRender();
      this.animationTracksView = new AnimationTracksView({
        el: this.$el.find('.rekapi-timeline-animation-tracks-view')[0]
        ,rekapiTimeline: this.rekapiTimeline
      });

      this.controlBarView = new ControlBarView({
        el: this.$el.find('.rekapi-timeline-control-bar-view')[0]
        ,rekapiTimeline: this.rekapiTimeline
      });
    }

    ,initialRender: function () {
      this.$el.html(Mustache.render(containerTemplate));
    }

    ,render: function () {
    }
  });

  return ContainerView;
});
