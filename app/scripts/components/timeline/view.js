define([

  'lateralus'

  ,'text!./template.mustache'

  ,'rekapi-timeline/constant'

], function (

  Lateralus

  ,template

  ,constant

) {
  'use strict';

  var Base = Lateralus.Component.View;
  var baseProto = Base.prototype;

  var TimelineComponentView = Base.extend({
    template: template

    ,events: {
      'click .add': function () {
        this.addNewKeyframePropertyFromInput();
      }

      /**
       * @param {jQuery.Event} evt
       */
      ,'keyup .new-track-name': function (evt) {
        if (evt.which === 13) { // enter key
          this.addNewKeyframePropertyFromInput();
        }
      }
    }

    ,lateralusEvents: {
      'change:timelineDuration': function () {
        this.updateWrapperWidth();
      }
    }

    ,provide: {
      timelineWrapperHeight: function () {
        return this.$timelineWrapper.height() -
          this.$newTrackNameInputWrapper.outerHeight();
      }
    }

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);
      this.updateWrapperWidth();
    }

    /**
     * Determines how wide this View's element should be, in pixels.
     * @return {number}
     */
    ,getPixelWidthForTracks: function () {
      var animationLength = this.lateralus.model.get('timelineDuration');
      var animationSeconds = (animationLength / 1000);

      // The width of the tracks container should always be the pixel width of
      // the animation plus the width of the timeline element to allow for
      // lengthening of the animation tracks by the user.
      return (constant.PIXELS_PER_SECOND * animationSeconds) +
        this.$el.width();
    }

    ,updateWrapperWidth: function () {
      this.$timelineWrapper.css('width', this.getPixelWidthForTracks());
    }

    ,addNewKeyframePropertyFromInput: function () {
      var newTrackName = this.$newTrackName.val();
      var currentActorModel = this.collectOne('currentActorModel');
      var keyframeObject = {};
      keyframeObject[newTrackName] = constant.DEFAULT_KEYFRAME_PROPERTY_VALUE;
      currentActorModel.keyframe(
        constant.DEFAULT_KEYFRAME_PROPERTY_MILLISECOND, keyframeObject);
    }
  });

  return TimelineComponentView;
});
