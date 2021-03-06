(function (e, c, a, g) {
    var d = "slider";
    var f = { delay: 1000, interval: 10000, random: false, resize: false };
    function b(i, h) {
        this.element = i;
        this.settings = e.extend({}, f, h);
        this.vari = { timer: g, slide: 1, slides: 0, sequence: [] };
        this._defaults = f;
        this._name = d;
        this.init();
    }
    b.prototype = {
        init: function () {
            var i = this;
            var k = e(this.element);
            var j = k.children(".position");
            var h = k.children(".prev, .next");
            k.removeClass("no-js");
            k.children(".slides")
                .find("img")
                .each(function (m, n) {
                    i.vari.slides++;
                    if (i.vari.slides == i.vari.slide) {
                        e(n).addClass("active").css("opacity", "1");
                        j.append('<div class="points active"></div>');
                    } else {
                        e(n).css("opacity", "0");
                        j.append('<div class="points"></div>');
                    }
                    var l = e(n).attr("data-href");
                    if (l !== g) {
                        e(n).on("click", function () {
                            location.href = l;
                        });
                    }
                });
            h.animate({ opacity: 0.5 }, "slow");
            j.find(".points").each(function (l) {
                e(this).on("click", function () {
                    i.show(l + 1);
                });
            });
            k.hover(
                function () {
                    clearInterval(i.vari.timer);
                    h.animate({ opacity: 1 }, "slow");
                },
                function () {
                    i.auto();
                    h.animate({ opacity: 0.5 }, "slow");
                }
            );
            k.find(".prev > *").on("click", function () {
                i.prev();
            });
            k.find(".next > *").on("click", function () {
                i.next();
            });
            this.auto();
        },
        auto: function () {
            if (this.settings.interval === 0 || this.vari.slides <= 1) {
                return;
            }
            var h = this;
            this.vari.timer = setInterval(function () {
                if (h.settings.random === true) {
                    h.random();
                } else {
                    h.next();
                }
            }, this.settings.interval);
        },
        random: function () {
            var k = this.vari.sequence.shift();
            if (this.vari.sequence.length === 0) {
                var h = [];
                for (var j = 1; j <= this.vari.slides; j++) {
                    h.push(j);
                }
                if (k !== null && k !== g) {
                    this.vari.sequence.push(h.splice(k - 1, 1).shift());
                } else {
                    h.shift();
                }
                do {
                    this.vari.sequence.push(h.splice(Math.floor(Math.random() * h.length), 1).shift());
                } while (h.length > 0);
                k = this.vari.sequence.shift();
            }
            this.show(k);
        },
        next: function () {
            if (this.vari.slide < this.vari.slides) {
                this.show(this.vari.slide + 1);
            } else {
                this.show(1);
            }
        },
        prev: function () {
            if (this.vari.slide > 1) {
                this.show(this.vari.slide - 1);
            } else {
                this.show(this.vari.slides);
            }
        },
        show: function (h) {
            var i = e(this.element);
            i.find(".slides img:nth-child(" + this.vari.slide + ")")
                .stop()
                .removeClass("active")
                .animate({ opacity: 0 }, this.settings.delay);
            i.find(".position .points:nth-child(" + this.vari.slide + ")").removeClass("active");
            i.find(".text span:nth-child(" + this.vari.slide + ")").removeClass("active");
            this.vari.slide = h;
            i.find(".slides img:nth-child(" + this.vari.slide + ")")
                .stop()
                .addClass("active")
                .animate({ opacity: 1 }, this.settings.delay);
            i.find(".position .points:nth-child(" + this.vari.slide + ")").addClass("active");
            i.find(".text span:nth-child(" + this.vari.slide + ")").addClass("active");
            if (this.settings.resize === true) {
                this.resize();
            }
            return this;
        },
        resize: function (l, h) {
            if (l === true) {
                return;
            }
            var p = e(this.element);
            var n = p.find(".slides .active");
            var i = p.find(".prev > img");
            var m = p.find(".next > img");
            var o = (p.width() * n[0].naturalHeight) / n[0].naturalWidth;
            if (h === true) {
                p.animate({ height: o }, this.settings.delay);
            } else {
                p.height(o);
            }
            if (i.length > 0) {
                var j = parseInt(i[0].naturalHeight);
                i.css({ "max-height": j, "min-height": j / 2, height: o / 10 });
            }
            if (m.length > 0) {
                var k = parseInt(m[0].naturalHeight);
                m.css({ "max-height": k, "min-height": k / 2, height: o / 10 });
            }
        },
    };
    e.fn[d] = function (h) {
        this.each(function () {
            if (!e.data(this, "plugin_" + d)) {
                e.data(this, "plugin_" + d, new b(this, h));
            }
        });
        return this;
    };
})(jQuery, window, document);
window.onload = function () {
    jQuery(".slider").each(function () {
        jQuery(this).data("plugin_slider").resize();
    });
};
window.onresize = function () {
    jQuery(".slider").each(function () {
        jQuery(this).data("plugin_slider").resize();
    });
};
