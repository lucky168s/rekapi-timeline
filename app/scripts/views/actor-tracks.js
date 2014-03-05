define([

  'jquery'
  ,'underscore'
  ,'backbone'

  ,'rekapi.timeline.constants'

  ,'views/keyframe-property-track'

], function (

  $
  ,_
  ,Backbone

  ,rekapiTimelineConstants

  ,KeyframePropertyTrackView

) {
  'use strict';

  var ActorTracksView = Backbone.View.extend({
    /**
     * @param {Object}
     *   @param {RekapiTimeline} rekapiTimeline
     *   @param {Rekapi.Actor} actor
     */
    initialize: function (opts) {
      this.rekapiTimeline = opts.rekapiTimeline;
      this.actor = opts.actor;
      this._keyframePropertyTrackViews = [];
      this.$el.addClass('actor-tracks-view');
      this.createKeyframePropertyTrackViews();
      this.initialRender();
      this.listenTo(this.rekapiTimeline, 'update',
          _.bind(this.onRekapiTimelineUpdate, this));
    }

    ,initialRender: function () {
      this._keyframePropertyTrackViews.forEach(
          function (keyframePropertyTrackView) {
        this.$el.append(keyframePropertyTrackView.$el);
      }, this);
    }

    ,render: function () {
      this.renderKeyframePropertyTracks();
    }

    ,renderKeyframePropertyTracks: function () {
      this._keyframePropertyTrackViews.forEach(
          function (keyframePropertyTrackView) {
        keyframePropertyTrackView.render();
      });
    }

    ,createKeyframePropertyTrackViews: function () {
      this.actor.getTrackNames().forEach(function (trackName) {
        this._keyframePropertyTrackViews.push(new KeyframePropertyTrackView({
          rekapiTimeline: this.rekapiTimeline
          ,actor: this.actor
          ,trackName: trackName
        }));
      }, this);
    }

    ,onRekapiTimelineUpdate: function () {
      this.$el.css('width', this.getPixelWidthForTracks());
    }

    /**
     * Determines how wide this View's element should be, in pixels.
     * @return {number}
     */
    ,getPixelWidthForTracks: function () {
      var animationLength =
          this.rekapiTimeline.rekapi.getAnimationLength();
      var animationSeconds = (animationLength / 1000);

      // The width of the tracks container should always be the pixel width of
      // the animation plus the width of the animation tracks view element to
      // allow for lengthening of the animation tracks.
      return (rekapiTimelineConstants.PIXELS_PER_SECOND * animationSeconds)
          + this.rekapiTimeline.containerView.animationTracksView.$el.width();
    }
  });

  return ActorTracksView;
});
