define([

  'jquery'
  ,'underscore'
  ,'backbone'

  ,'rekapi.timeline.constants'

  ,'views/keyframe-property'

], function (

  $
  ,_
  ,Backbone

  ,rekapiTimelineConstants

  ,KeyframePropertyView

) {
  'use strict';

  var KeyframePropertyTrackView = Backbone.View.extend({
    /**
     * @param {Object}
     *   @param {RekapiTimeline} rekapiTimeline
     *   @param {Rekapi.Actor} actor
     *   @param {string} trackName
     */
    initialize: function (opts) {
      this.rekapiTimeline = opts.rekapiTimeline;
      this.actor = opts.actor;
      this.trackName = opts.trackName;
      this._keyframePropertyViews = [];
      this.$el.addClass('keyframe-property-track-view');
      this.createKeyframePropertyViews();
      this.render();
      this.listenTo(this.rekapiTimeline, 'update',
          _.bind(this.onRekapiTimelineUpdate, this));
    }

    ,render: function () {
      this.$el.children().remove();
      this._keyframePropertyViews.forEach(function (keyframePropertyView) {
        this.$el.append(keyframePropertyView.$el);
      }, this);
    }

    ,onRekapiTimelineUpdate: function () {
      var animationLength =
          this.rekapiTimeline.rekapi.getAnimationLength();
      var animationSeconds = (animationLength / 1000);
      this.$el.css('width',
          rekapiTimelineConstants.PIXELS_PER_SECOND * animationSeconds);
    }

    ,createKeyframePropertyViews: function () {
      this.actor.getPropertiesInTrack(this.trackName).forEach(
          function (keyframeProperty) {
        this._keyframePropertyViews.push(new KeyframePropertyView({
          rekapiTimeline: this.rekapiTimeline
          ,keyframePropertyTrackView: this
          ,keyframeProperty: keyframeProperty
        }));
      }, this);
    }

    /**
     * Gets the minimum $.fn.offset()-friendly coordinates for which containing
     * elements should stay within.
     * @return {{left: number, top: number}}
     */
    ,getMinimumBounds: function () {
      var $el = this.$el;
      var elOffset = $el.offset();

      var minimumLeft = elOffset.left
          - parseInt($el.css('border-left-width'), 10)
          - parseInt($el.css('padding-left'), 10);
      var minimumTop = elOffset.top
          - parseInt($el.css('border-top-width'), 10)
          - parseInt($el.css('padding-top'), 10);

      return {
        left: minimumLeft
        ,top: minimumTop
      };
    }
  });

  return KeyframePropertyTrackView;
});
