
    (function ($, undefined) {
        "use strict";

        var pluginName = 'scojs_tooltip';

        function Tooltip($trigger, options) {
            this.options = $.extend({},
                $.fn[pluginName].defaults, options);
            this.$trigger = this.$target = $trigger;
            this.leaveTimeout = null;

            this.$scojs_tooltip = $('<div class="scojs_tooltip"><span></span><div class="pointer"></div></div>').appendTo(this.options.appendTo).hide();
            if (this.options.contentElem !== undefined && this.options.contentElem !== null) {
                this.options.content = $(this.options.contentElem).html();
            } else if (this.options.contentAttr !== undefined && this.options.contentAttr !== null) {
                this.options.content = this.$trigger.attr(this.options.contentAttr);
            }
            if (this.$trigger && this.$trigger.attr('title')) {
                this.$trigger.data('originalTitle', this.$trigger.attr('title'));
            }
            this.$scojs_tooltip.find('span').html(this.options.content);
            if (this.options.cssclass != '') {
                this.$scojs_tooltip.addClass(this.options.cssclass);
            }
            if (this.options.target !== undefined) {
                this.$target = $(this.options.target);
            }
            if (this.options.hoverable) {
                var self = this;
                this.$scojs_tooltip.on('mouseenter.' + pluginName, $.proxy(this.do_mouseenter, self))
                    .on('mouseleave.' + pluginName, $.proxy(this.do_mouseleave, self))
                    .on('close.' + pluginName, $.proxy(this.hide, self));
            }
        }

        $.extend(Tooltip.prototype, {
            show: function (allowMirror) {
                    if (allowMirror === undefined) {
                        allowMirror = false;
                    }
                    this.$scojs_tooltip.removeClass('pos_w pos_e pos_n pos_s pos_nw pos_ne pos_se pos_sw pos_center').addClass('pos_' + this.options.position);
                    var targetBox = this.$target.offset(),
                        scojs_tooltipBox = {
                            left: 0,
                            top: 0,
                            width: Math.floor(this.$scojs_tooltip.outerWidth()),
                            height: Math.floor(this.$scojs_tooltip.outerHeight())
                        },
                        pointerBox = {
                            left: 0,
                            top: 0,
                            width: Math.floor(this.$scojs_tooltip.find('.pointer').outerWidth()),
                            height: Math.floor(this.$scojs_tooltip.find('.pointer').outerHeight())
                        },
                        docBox = {
                            left: $(document).scrollLeft(),
                            top: $(document).scrollTop(),
                            width: $(window).width(),
                            height: $(window).height()
                        };
                    targetBox.left = Math.floor(targetBox.left);
                    targetBox.top = Math.floor(targetBox.top);
                    targetBox.width = Math.floor(this.$target.outerWidth());
                    targetBox.height = Math.floor(this.$target.outerHeight());

                    if (this.options.position === 'w') {
                        scojs_tooltipBox.left = targetBox.left - scojs_tooltipBox.width - pointerBox.width;
                        scojs_tooltipBox.top = targetBox.top + Math.floor((targetBox.height - scojs_tooltipBox.height) / 2);
                        pointerBox.left = scojs_tooltipBox.width;
                        pointerBox.top = Math.floor(targetBox.height / 2);
                    } else if (this.options.position === 'n') {
                        scojs_tooltipBox.left = targetBox.left - Math.floor((scojs_tooltipBox.width - targetBox.width) / 2) /*- $("#danmu71452").offset().left*/ ;
                        scojs_tooltipBox.top = targetBox.top - scojs_tooltipBox.height - pointerBox.height /*- $("#danmu71452").offset().top*/ ;
                        pointerBox.left = Math.floor(scojs_tooltipBox.width / 2);
                        pointerBox.top = scojs_tooltipBox.height;
                    }

                    this.$scojs_tooltip.css({
                        left: scojs_tooltipBox.left,
                        top: scojs_tooltipBox.top
                    })

                    this.$trigger.removeAttr('title');
                    this.$scojs_tooltip.show();
                    return this;
                }

                ,
            hide: function () {
                    if (this.$trigger.data('originalTitle')) {
                        this.$trigger.attr('title', this.$trigger.data('originalTitle'));
                    }
                    if (typeof this.options.on_close == 'function') {
                        this.options.on_close.call(this);
                    }
                    this.$scojs_tooltip.hide();
                }

                ,
            do_mouseenter: function () {
                    if (this.leaveTimeout !== null) {
                        clearTimeout(this.leaveTimeout);
                        this.leaveTimeout = null;
                    }
                    this.show();
                }

                ,
            do_mouseleave: function () {
                var self = this;
                if (this.leaveTimeout !== null) {
                    clearTimeout(this.leaveTimeout);
                    this.leaveTimeout = null;
                }
                if (this.options.autoclose) {
                    this.leaveTimeout = setTimeout(function () {
                            clearTimeout(self.leaveTimeout);
                            self.leaveTimeout = null;
                            self.hide();
                        },
                        this.options.delay);
                }
            }
        });

        $.fn[pluginName] = function (options) {
            var method = null,
                first_run = false;
            if (typeof options == 'string') {
                method = options;
            }
            return this.each(function () {
                var obj;
                if (!(obj = $.data(this, pluginName))) {
                    var $this = $(this),
                        data = $this.data(),
                        opts;
                    first_run = true;
                    if (typeof options === 'object') {
                        opts = $.extend({},
                            options, data);
                    } else {
                        opts = data;
                    }
                    obj = new Tooltip($this, opts);
                    $.data(this, pluginName, obj);
                }
                if (method) {
                    obj[method]();
                } else if (first_run) {
                    $(this).on('mouseenter.' + pluginName,
                        function () {
                            obj.do_mouseenter();
                        }).on('mouseleave.' + pluginName,
                        function () {
                            obj.do_mouseleave();
                        });
                } else {
                    obj.show();
                }
            });
        };

        $[pluginName] = function (elem, options) {
            if (typeof elem === 'string') {
                elem = $(elem);
            }
            return new Tooltip(elem, options);
        };

        $.fn[pluginName].defaults = {
            contentElem: null,
            contentAttr: null,
            content: '',
            hoverable: true // should mouse over scojs_tooltip hold the scojs_tooltip or not?
                ,
            delay: 200,
            cssclass: '',
            position: 'n' // n,s,e,w,ne,nw,se,sw,center
                ,
            autoclose: true,
            appendTo: 'body' // where should the scojs_tooltips be appended to (default to document.body). Added for unit tests, not really needed in real life.
        };

        $(document).on('mouseenter.' + pluginName, '[data-trigger="scojs_tooltip"]',
            function () {
                $(this)[pluginName]('do_mouseenter');
            }).on('mouseleave.' + pluginName, '[data-trigger="scojs_tooltip"]',
            function () {
                $(this)[pluginName]('do_mouseleave');
            });
        $(document).off('click.' + pluginName, '[data-dismiss="scojs_tooltip"]').on('click.' + pluginName, '[data-dismiss="scojs_tooltip"]',
            function (e) {
                $(this).closest('.scojs_tooltip').trigger('close');
            });
    })(jQuery);
