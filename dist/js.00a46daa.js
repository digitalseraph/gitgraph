// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@gitgraph/js/lib/gitgraph.umd.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.GitgraphJS = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var orientation = createCommonjsModule(function (module, exports) {
	// Extracted from `gitgraph.ts` because it caused `utils` tests to fail
	// because of circular dependency between `utils` and `template`.
	// It's not clear why (the circular dependency still exist) but `Orientation`
	// was the only one causing issue. Maybe because it's an enum?
	Object.defineProperty(exports, "__esModule", { value: true });
	var Orientation;
	(function (Orientation) {
	    Orientation["VerticalReverse"] = "vertical-reverse";
	    Orientation["Horizontal"] = "horizontal";
	    Orientation["HorizontalReverse"] = "horizontal-reverse";
	})(Orientation = exports.Orientation || (exports.Orientation = {}));

	});

	unwrapExports(orientation);
	var orientation_1 = orientation.Orientation;

	var utils = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Provide a default value to a boolean.
	 * @param value
	 * @param defaultValue
	 */
	function booleanOptionOr(value, defaultValue) {
	    return typeof value === "boolean" ? value : defaultValue;
	}
	exports.booleanOptionOr = booleanOptionOr;
	/**
	 * Provide a default value to a number.
	 * @param value
	 * @param defaultValue
	 */
	function numberOptionOr(value, defaultValue) {
	    return typeof value === "number" ? value : defaultValue;
	}
	exports.numberOptionOr = numberOptionOr;
	/**
	 * Creates an object composed of the picked object properties.
	 * @param obj The source object
	 * @param paths The property paths to pick
	 */
	function pick(obj, paths) {
	    return Object.assign({}, paths.reduce((mem, key) => (Object.assign({}, mem, { [key]: obj[key] })), {}));
	}
	exports.pick = pick;
	/**
	 * Print a light version of commits into the console.
	 * @param commits List of commits
	 * @param paths The property paths to pick
	 */
	function debug(commits, paths) {
	    // tslint:disable-next-line:no-console
	    console.log(JSON.stringify(commits.map((commit) => pick(commit, paths)), null, 2));
	}
	exports.debug = debug;
	/**
	 * Return true if is undefined.
	 *
	 * @param obj
	 */
	function isUndefined(obj) {
	    return obj === undefined;
	}
	exports.isUndefined = isUndefined;
	/**
	 * Return a version of the object without any undefined keys.
	 *
	 * @param obj
	 */
	function withoutUndefinedKeys(obj = {}) {
	    return Object.keys(obj).reduce((mem, key) => isUndefined(obj[key]) ? mem : Object.assign({}, mem, { [key]: obj[key] }), {});
	}
	exports.withoutUndefinedKeys = withoutUndefinedKeys;
	/**
	 * Return a string ready to use in `svg.path.d` to draw an arrow from params.
	 *
	 * @param graph Graph context
	 * @param parent Parent commit of the target commit
	 * @param commit Target commit
	 */
	function arrowSvgPath(graph, parent, commit) {
	    const commitRadius = commit.style.dot.size;
	    const size = graph.template.arrow.size;
	    const h = commitRadius + graph.template.arrow.offset;
	    // Delta between left & right (radian)
	    const delta = Math.PI / 7;
	    // Alpha angle between parent & commit (radian)
	    const alpha = getAlpha(graph, parent, commit);
	    // Top
	    const x1 = h * Math.cos(alpha);
	    const y1 = h * Math.sin(alpha);
	    // Bottom right
	    const x2 = (h + size) * Math.cos(alpha - delta);
	    const y2 = (h + size) * Math.sin(alpha - delta);
	    // Bottom center
	    const x3 = (h + size / 2) * Math.cos(alpha);
	    const y3 = (h + size / 2) * Math.sin(alpha);
	    // Bottom left
	    const x4 = (h + size) * Math.cos(alpha + delta);
	    const y4 = (h + size) * Math.sin(alpha + delta);
	    return `M${x1},${y1} L${x2},${y2} Q${x3},${y3} ${x4},${y4} L${x4},${y4}`;
	}
	exports.arrowSvgPath = arrowSvgPath;
	function getAlpha(graph, parent, commit) {
	    const deltaX = parent.x - commit.x;
	    const deltaY = parent.y - commit.y;
	    const commitSpacing = graph.template.commit.spacing;
	    let alphaY;
	    let alphaX;
	    // Angle usually start from previous commit Y position:
	    //
	    // o
	    // ↑ ↖ ︎
	    // o  |  <-- path is straight until last commit Y position
	    // ↑  o
	    // | ↗︎
	    // o
	    //
	    // So we can to default to commit spacing.
	    // For horizontal orientation => same with commit X position.
	    switch (graph.orientation) {
	        case orientation.Orientation.Horizontal:
	            alphaY = deltaY;
	            alphaX = -commitSpacing;
	            break;
	        case orientation.Orientation.HorizontalReverse:
	            alphaY = deltaY;
	            alphaX = commitSpacing;
	            break;
	        case orientation.Orientation.VerticalReverse:
	            alphaY = -commitSpacing;
	            alphaX = deltaX;
	            break;
	        default:
	            alphaY = commitSpacing;
	            alphaX = deltaX;
	            break;
	    }
	    // If commit is distant from its parent, there should be no angle.
	    //
	    //    o ︎
	    //    ↑  <-- arrow is like previous commit was on same X position
	    // o  |
	    // | /
	    // o
	    //
	    // For horizontal orientation => same with commit Y position.
	    if (graph.isVertical) {
	        if (Math.abs(deltaY) > commitSpacing)
	            alphaX = 0;
	    }
	    else {
	        if (Math.abs(deltaX) > commitSpacing)
	            alphaY = 0;
	    }
	    if (graph.reverseArrow) {
	        alphaY *= -1;
	        alphaX *= -1;
	    }
	    return Math.atan2(alphaY, alphaX);
	}

	});

	unwrapExports(utils);
	var utils_1 = utils.booleanOptionOr;
	var utils_2 = utils.numberOptionOr;
	var utils_3 = utils.pick;
	var utils_4 = utils.debug;
	var utils_5 = utils.isUndefined;
	var utils_6 = utils.withoutUndefinedKeys;
	var utils_7 = utils.arrowSvgPath;

	var template = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Branch merge style enum
	 */
	var MergeStyle;
	(function (MergeStyle) {
	    MergeStyle["Bezier"] = "bezier";
	    MergeStyle["Straight"] = "straight";
	})(MergeStyle || (MergeStyle = {}));
	exports.MergeStyle = MergeStyle;
	exports.DEFAULT_FONT = "normal 12pt Calibri";
	/**
	 * Gitgraph template
	 *
	 * Set of design rules for the rendering.
	 */
	class Template {
	    constructor(options) {
	        // Options
	        options.branch = options.branch || {};
	        options.branch.label = options.branch.label || {};
	        options.arrow = options.arrow || {};
	        options.commit = options.commit || {};
	        options.commit.dot = options.commit.dot || {};
	        options.commit.message = options.commit.message || {};
	        // One color per column
	        this.colors = options.colors || ["#000000"];
	        // Branch style
	        this.branch = {
	            color: options.branch.color,
	            lineWidth: options.branch.lineWidth || 2,
	            mergeStyle: options.branch.mergeStyle || MergeStyle.Bezier,
	            spacing: utils.numberOptionOr(options.branch.spacing, 20),
	            label: {
	                display: utils.booleanOptionOr(options.branch.label.display, true),
	                color: options.branch.label.color || options.commit.color,
	                strokeColor: options.branch.label.strokeColor || options.commit.color,
	                bgColor: options.branch.label.bgColor || "white",
	                font: options.branch.label.font ||
	                    options.commit.message.font ||
	                    exports.DEFAULT_FONT,
	                borderRadius: utils.numberOptionOr(options.branch.label.borderRadius, 10),
	            },
	        };
	        // Arrow style
	        this.arrow = {
	            size: options.arrow.size || null,
	            color: options.arrow.color || null,
	            offset: options.arrow.offset || 2,
	        };
	        // Commit style
	        this.commit = {
	            color: options.commit.color,
	            spacing: utils.numberOptionOr(options.commit.spacing, 25),
	            hasTooltipInCompactMode: utils.booleanOptionOr(options.commit.hasTooltipInCompactMode, true),
	            dot: {
	                color: options.commit.dot.color || options.commit.color,
	                size: options.commit.dot.size || 3,
	                strokeWidth: utils.numberOptionOr(options.commit.dot.strokeWidth, 0),
	                strokeColor: options.commit.dot.strokeColor,
	                font: options.commit.dot.font ||
	                    options.commit.message.font ||
	                    "normal 10pt Calibri",
	            },
	            message: {
	                display: utils.booleanOptionOr(options.commit.message.display, true),
	                displayAuthor: utils.booleanOptionOr(options.commit.message.displayAuthor, true),
	                displayHash: utils.booleanOptionOr(options.commit.message.displayHash, true),
	                color: options.commit.message.color || options.commit.color,
	                font: options.commit.message.font || exports.DEFAULT_FONT,
	            },
	        };
	        // Tag style
	        // This one is computed in the Tag instance. It needs Commit style
	        // that is partially computed at runtime (for colors).
	        this.tag = options.tag || {};
	    }
	}
	exports.Template = Template;
	/**
	 * Black arrow template
	 */
	const blackArrowTemplate = new Template({
	    colors: ["#6963FF", "#47E8D4", "#6BDB52", "#E84BA5", "#FFA657"],
	    branch: {
	        color: "#000000",
	        lineWidth: 4,
	        spacing: 50,
	        mergeStyle: MergeStyle.Straight,
	    },
	    commit: {
	        spacing: 60,
	        dot: {
	            size: 16,
	            strokeColor: "#000000",
	            strokeWidth: 4,
	        },
	        message: {
	            color: "black",
	        },
	    },
	    arrow: {
	        size: 16,
	        offset: -1.5,
	    },
	});
	exports.blackArrowTemplate = blackArrowTemplate;
	/**
	 * Metro template
	 */
	const metroTemplate = new Template({
	    colors: ["#979797", "#008fb5", "#f1c109"],
	    branch: {
	        lineWidth: 10,
	        spacing: 50,
	    },
	    commit: {
	        spacing: 80,
	        dot: {
	            size: 14,
	        },
	        message: {
	            font: "normal 14pt Arial",
	        },
	    },
	});
	exports.metroTemplate = metroTemplate;
	var TemplateName;
	(function (TemplateName) {
	    TemplateName["Metro"] = "metro";
	    TemplateName["BlackArrow"] = "blackarrow";
	})(TemplateName || (TemplateName = {}));
	exports.TemplateName = TemplateName;
	/**
	 * Extend an existing template with new options.
	 *
	 * @param selectedTemplate Template to extend
	 * @param options Template options
	 */
	function templateExtend(selectedTemplate, options) {
	    const template = getTemplate(selectedTemplate);
	    if (!options.branch)
	        options.branch = {};
	    if (!options.commit)
	        options.commit = {};
	    // This is tedious, but it seems acceptable so we don't need lodash
	    // as we want to keep bundlesize small.
	    return {
	        colors: options.colors || template.colors,
	        arrow: Object.assign({}, template.arrow, options.arrow),
	        branch: Object.assign({}, template.branch, options.branch, { label: Object.assign({}, template.branch.label, options.branch.label) }),
	        commit: Object.assign({}, template.commit, options.commit, { dot: Object.assign({}, template.commit.dot, options.commit.dot), message: Object.assign({}, template.commit.message, options.commit.message) }),
	        tag: Object.assign({}, template.tag, options.tag),
	    };
	}
	exports.templateExtend = templateExtend;
	/**
	 * Resolve the template to use regarding given `template` value.
	 *
	 * @param template Selected template name, or instance.
	 */
	function getTemplate(template) {
	    if (!template)
	        return metroTemplate;
	    if (typeof template === "string") {
	        return {
	            [TemplateName.BlackArrow]: blackArrowTemplate,
	            [TemplateName.Metro]: metroTemplate,
	        }[template];
	    }
	    return template;
	}
	exports.getTemplate = getTemplate;

	});

	unwrapExports(template);
	var template_1 = template.MergeStyle;
	var template_2 = template.DEFAULT_FONT;
	var template_3 = template.Template;
	var template_4 = template.blackArrowTemplate;
	var template_5 = template.metroTemplate;
	var template_6 = template.TemplateName;
	var template_7 = template.templateExtend;
	var template_8 = template.getTemplate;

	var tag = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	class Tag {
	    constructor(name, style, render, commitStyle) {
	        this.name = name;
	        this.tagStyle = style;
	        this.commitStyle = commitStyle;
	        this.render = render;
	    }
	    /**
	     * Style
	     */
	    get style() {
	        return {
	            strokeColor: this.tagStyle.strokeColor || this.commitStyle.color,
	            bgColor: this.tagStyle.bgColor || this.commitStyle.color,
	            color: this.tagStyle.color || "white",
	            font: this.tagStyle.font || this.commitStyle.message.font || template.DEFAULT_FONT,
	            borderRadius: utils.numberOptionOr(this.tagStyle.borderRadius, 10),
	            pointerWidth: utils.numberOptionOr(this.tagStyle.pointerWidth, 12),
	        };
	    }
	}
	exports.Tag = Tag;

	});

	unwrapExports(tag);
	var tag_1 = tag.Tag;

	var commit = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Generate a random hash.
	 *
	 * @return hex string with 40 chars
	 */
	const getRandomHash = () => (Math.random()
	    .toString(16)
	    .substring(3) +
	    Math.random()
	        .toString(16)
	        .substring(3) +
	    Math.random()
	        .toString(16)
	        .substring(3) +
	    Math.random()
	        .toString(16)
	        .substring(3)).substring(0, 40);
	class Commit {
	    constructor(options) {
	        /**
	         * Ref names
	         */
	        this.refs = [];
	        /**
	         * Commit x position
	         */
	        this.x = 0;
	        /**
	         * Commit y position
	         */
	        this.y = 0;
	        // Set author & committer
	        let name, email;
	        try {
	            [, name, email] = options.author.match(/(.*) <(.*)>/);
	        }
	        catch (e) {
	            [name, email] = [options.author, ""];
	        }
	        this.author = { name, email, timestamp: Date.now() };
	        this.committer = { name, email, timestamp: Date.now() };
	        // Set commit message
	        this.subject = options.subject;
	        this.body = options.body || "";
	        // Set commit hash
	        this.hash = options.hash || getRandomHash();
	        this.hashAbbrev = this.hash.substring(0, 7);
	        // Set parent hash
	        this.parents = options.parents ? options.parents : [];
	        this.parentsAbbrev = this.parents.map((commit) => commit.substring(0, 7));
	        // Set style
	        this.style = Object.assign({}, options.style, { message: Object.assign({}, options.style.message), dot: Object.assign({}, options.style.dot) });
	        this.dotText = options.dotText;
	        // Set callbacks
	        this.onClick = () => (options.onClick ? options.onClick(this) : undefined);
	        this.onMessageClick = () => options.onMessageClick ? options.onMessageClick(this) : undefined;
	        this.onMouseOver = () => options.onMouseOver ? options.onMouseOver(this) : undefined;
	        this.onMouseOut = () => options.onMouseOut ? options.onMouseOut(this) : undefined;
	        // Set custom renders
	        this.renderDot = options.renderDot;
	        this.renderMessage = options.renderMessage;
	        this.renderTooltip = options.renderTooltip;
	    }
	    /**
	     * Message
	     */
	    get message() {
	        let message = "";
	        if (this.style.message.displayHash) {
	            message += `${this.hashAbbrev} `;
	        }
	        message += this.subject;
	        if (this.style.message.displayAuthor) {
	            message += ` - ${this.author.name} <${this.author.email}>`;
	        }
	        return message;
	    }
	    /**
	     * Branch that should be rendered
	     */
	    get branchToDisplay() {
	        return this.branches ? this.branches[0] : "";
	    }
	    setRefs(refs) {
	        this.refs = refs.getNames(this.hash);
	        return this;
	    }
	    setTags(tags, getTagStyle, getTagRender) {
	        this.tags = tags
	            .getNames(this.hash)
	            .map((name) => new tag.Tag(name, getTagStyle(name), getTagRender(name), this.style));
	        return this;
	    }
	    setBranches(branches) {
	        this.branches = branches;
	        return this;
	    }
	    setPosition({ x, y }) {
	        this.x = x;
	        this.y = y;
	        return this;
	    }
	    withDefaultColor(color) {
	        const newStyle = Object.assign({}, this.style, { dot: Object.assign({}, this.style.dot), message: Object.assign({}, this.style.message) });
	        if (!newStyle.color)
	            newStyle.color = color;
	        if (!newStyle.dot.color)
	            newStyle.dot.color = color;
	        if (!newStyle.message.color)
	            newStyle.message.color = color;
	        const commit = this.cloneCommit();
	        commit.style = newStyle;
	        return commit;
	    }
	    /**
	     * Ideally, we want Commit to be a [Value Object](https://martinfowler.com/bliki/ValueObject.html).
	     * We started with a mutable class. So we'll refactor that little by little.
	     * This private function is a helper to create a new Commit from existing one.
	     */
	    cloneCommit() {
	        const commit = new Commit({
	            author: `${this.author.name} <${this.author.email}>`,
	            subject: this.subject,
	            style: this.style,
	            body: this.body,
	            hash: this.hash,
	            parents: this.parents,
	            dotText: this.dotText,
	            onClick: this.onClick,
	            onMessageClick: this.onMessageClick,
	            onMouseOver: this.onMouseOver,
	            onMouseOut: this.onMouseOut,
	            renderDot: this.renderDot,
	            renderMessage: this.renderMessage,
	            renderTooltip: this.renderTooltip,
	        });
	        commit.refs = this.refs;
	        commit.branches = this.branches;
	        commit.tags = this.tags;
	        commit.x = this.x;
	        commit.y = this.y;
	        return commit;
	    }
	}
	exports.Commit = Commit;

	});

	unwrapExports(commit);
	var commit_1 = commit.Commit;

	var branchUserApi = createCommonjsModule(function (module, exports) {
	var __rest = (commonjsGlobal && commonjsGlobal.__rest) || function (s, e) {
	    var t = {};
	    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        t[p] = s[p];
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
	            t[p[i]] = s[p[i]];
	    return t;
	};
	Object.defineProperty(exports, "__esModule", { value: true });


	class BranchUserApi {
	    // tslint:enable:variable-name
	    constructor(branch, graph, onGraphUpdate) {
	        this._branch = branch;
	        this.name = branch.name;
	        this._graph = graph;
	        this._onGraphUpdate = onGraphUpdate;
	    }
	    branch(args) {
	        const options = typeof args === "string" ? { name: args } : args;
	        options.from = this;
	        return this._graph.createBranch(options).getUserApi();
	    }
	    commit(options) {
	        // Deal with shorter syntax
	        if (typeof options === "string")
	            options = { subject: options };
	        if (!options)
	            options = {};
	        this._commitWithParents(options, []);
	        this._onGraphUpdate();
	        return this;
	    }
	    merge(...args) {
	        let options = args[0];
	        if (!isBranchMergeOptions(options)) {
	            options = {
	                branch: args[0],
	                fastForward: false,
	                commitOptions: { subject: args[1] },
	            };
	        }
	        const { branch, fastForward, commitOptions, } = options;
	        const branchName = typeof branch === "string" ? branch : branch.name;
	        const branchLastCommitHash = this._graph.refs.getCommit(branchName);
	        if (!branchLastCommitHash) {
	            throw new Error(`The branch called "${branchName}" is unknown`);
	        }
	        let canFastForward = false;
	        const lastCommitHash = this._graph.refs.getCommit(this._branch.name);
	        if (lastCommitHash) {
	            canFastForward = this._areCommitsConnected(lastCommitHash, branchLastCommitHash);
	        }
	        else {
	            canFastForward = false;
	        }
	        if (fastForward && canFastForward) {
	            this._fastForwardTo(branchLastCommitHash);
	        }
	        else {
	            this._commitWithParents(Object.assign({}, commitOptions, { subject: (commitOptions && commitOptions.subject) ||
	                    `Merge branch ${branchName}` }), [branchLastCommitHash]);
	        }
	        this._onGraphUpdate();
	        return this;
	    }
	    tag(options) {
	        if (typeof options === "string") {
	            this._graph.getUserApi().tag({ name: options, ref: this._branch.name });
	        }
	        else {
	            this._graph.getUserApi().tag(Object.assign({}, options, { ref: this._branch.name }));
	        }
	        return this;
	    }
	    /**
	     * Checkout onto this branch.
	     */
	    checkout() {
	        this._graph.currentBranch = this._branch;
	        return this;
	    }
	    // tslint:disable:variable-name - Prefix `_` = explicitly private for JS users
	    _commitWithParents(options, parents) {
	        const parentOnSameBranch = this._graph.refs.getCommit(this._branch.name);
	        if (parentOnSameBranch) {
	            parents.unshift(parentOnSameBranch);
	        }
	        else if (this._branch.parentCommitHash) {
	            parents.unshift(this._branch.parentCommitHash);
	        }
	        const { tag } = options, commitOptions = __rest(options, ["tag"]);
	        const commit$1 = new commit.Commit(Object.assign({ hash: this._graph.generateCommitHash(), author: this._branch.commitDefaultOptions.author || this._graph.author, subject: this._branch.commitDefaultOptions.subject ||
	                this._graph.commitMessage }, commitOptions, { parents, style: this._getCommitStyle(options.style) }));
	        if (parentOnSameBranch) {
	            // Take all the refs from the parent
	            const parentRefs = this._graph.refs.getNames(parentOnSameBranch);
	            parentRefs.forEach((ref) => this._graph.refs.set(ref, commit$1.hash));
	        }
	        else {
	            // Set the branch ref
	            this._graph.refs.set(this._branch.name, commit$1.hash);
	        }
	        // Add the new commit
	        this._graph.commits.push(commit$1);
	        // Move HEAD on the last commit
	        this.checkout();
	        this._graph.refs.set("HEAD", commit$1.hash);
	        // Add a tag to the commit if `option.tag` is provide
	        if (tag)
	            this.tag(tag);
	    }
	    _areCommitsConnected(parentCommitHash, childCommitHash) {
	        const childCommit = this._graph.commits.find(({ hash }) => childCommitHash === hash);
	        if (!childCommit)
	            return false;
	        const isFirstCommitOfGraph = childCommit.parents.length === 0;
	        if (isFirstCommitOfGraph)
	            return false;
	        if (childCommit.parents.includes(parentCommitHash)) {
	            return true;
	        }
	        // `childCommitHash` is not a direct child of `parentCommitHash`.
	        // But maybe one of `childCommitHash` parent is.
	        return childCommit.parents.some((directParentHash) => this._areCommitsConnected(parentCommitHash, directParentHash));
	    }
	    _fastForwardTo(commitHash) {
	        this._graph.refs.set(this._branch.name, commitHash);
	    }
	    _getCommitStyle(style = {}) {
	        return Object.assign({}, utils.withoutUndefinedKeys(this._graph.template.commit), utils.withoutUndefinedKeys(this._branch.commitDefaultOptions.style), style, { message: Object.assign({}, utils.withoutUndefinedKeys(this._graph.template.commit.message), utils.withoutUndefinedKeys(this._branch.commitDefaultOptions.style.message), style.message, utils.withoutUndefinedKeys({
	                display: this._graph.shouldDisplayCommitMessage && undefined,
	            })), dot: Object.assign({}, utils.withoutUndefinedKeys(this._graph.template.commit.dot), utils.withoutUndefinedKeys(this._branch.commitDefaultOptions.style.dot), style.dot) });
	    }
	}
	exports.BranchUserApi = BranchUserApi;
	function isBranchMergeOptions(options) {
	    return typeof options === "object" && !(options instanceof BranchUserApi);
	}

	});

	unwrapExports(branchUserApi);
	var branchUserApi_1 = branchUserApi.BranchUserApi;

	var branch = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	const DELETED_BRANCH_NAME = "";
	exports.DELETED_BRANCH_NAME = DELETED_BRANCH_NAME;
	class Branch {
	    constructor(options) {
	        this.gitgraph = options.gitgraph;
	        this.name = options.name;
	        this.style = options.style;
	        this.parentCommitHash = options.parentCommitHash;
	        this.commitDefaultOptions = options.commitDefaultOptions || { style: {} };
	        this.onGraphUpdate = options.onGraphUpdate;
	        this.renderLabel = options.renderLabel;
	    }
	    /**
	     * Return the API to manipulate Gitgraph branch as a user.
	     */
	    getUserApi() {
	        return new branchUserApi.BranchUserApi(this, this.gitgraph, this.onGraphUpdate);
	    }
	    /**
	     * Return true if branch was deleted.
	     */
	    isDeleted() {
	        return this.name === DELETED_BRANCH_NAME;
	    }
	}
	exports.Branch = Branch;
	function createDeletedBranch(gitgraph, style, onGraphUpdate) {
	    return new Branch({
	        name: DELETED_BRANCH_NAME,
	        gitgraph,
	        style,
	        onGraphUpdate,
	    });
	}
	exports.createDeletedBranch = createDeletedBranch;

	});

	unwrapExports(branch);
	var branch_1 = branch.DELETED_BRANCH_NAME;
	var branch_2 = branch.Branch;
	var branch_3 = branch.createDeletedBranch;

	var mode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var Mode;
	(function (Mode) {
	    Mode["Compact"] = "compact";
	})(Mode || (Mode = {}));
	exports.Mode = Mode;

	});

	unwrapExports(mode);
	var mode_1 = mode.Mode;

	var regular = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	class RegularGraphRows {
	    constructor(commits) {
	        this.rows = new Map();
	        this.maxRowCache = undefined;
	        this.computeRowsFromCommits(commits);
	    }
	    getRowOf(commitHash) {
	        return this.rows.get(commitHash) || 0;
	    }
	    getMaxRow() {
	        if (this.maxRowCache === undefined) {
	            this.maxRowCache = uniq(Array.from(this.rows.values())).length - 1;
	        }
	        return this.maxRowCache;
	    }
	    computeRowsFromCommits(commits) {
	        commits.forEach((commit, i) => {
	            this.rows.set(commit.hash, i);
	        });
	        this.maxRowCache = undefined;
	    }
	}
	exports.RegularGraphRows = RegularGraphRows;
	/**
	 * Creates a duplicate-free version of an array.
	 *
	 * Don't use lodash's `uniq` as it increased bundlesize a lot for such a
	 * simple function.
	 * => The way we bundle for browser seems not to work with `lodash-es`.
	 * => I didn't to get tree-shaking to work with `lodash` (the CommonJS version).
	 *
	 * @param array Array of values
	 */
	function uniq(array) {
	    const set = new Set();
	    array.forEach((value) => set.add(value));
	    return Array.from(set);
	}

	});

	unwrapExports(regular);
	var regular_1 = regular.RegularGraphRows;

	var compact = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	class CompactGraphRows extends regular.RegularGraphRows {
	    computeRowsFromCommits(commits) {
	        commits.forEach((commit, i) => {
	            let newRow = i;
	            const isFirstCommit = i === 0;
	            if (!isFirstCommit) {
	                const parentRow = this.getRowOf(commit.parents[0]);
	                const historyParent = commits[i - 1];
	                newRow = Math.max(parentRow + 1, this.getRowOf(historyParent.hash));
	                const isMergeCommit = commit.parents.length > 1;
	                if (isMergeCommit) {
	                    // Push commit to next row to avoid collision when the branch in which
	                    // the merge happens has more commits than the merged branch.
	                    const mergeTargetParentRow = this.getRowOf(commit.parents[1]);
	                    if (parentRow < mergeTargetParentRow)
	                        newRow++;
	                }
	            }
	            this.rows.set(commit.hash, newRow);
	        });
	    }
	}
	exports.CompactGraphRows = CompactGraphRows;

	});

	unwrapExports(compact);
	var compact_1 = compact.CompactGraphRows;

	var graphRows = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.GraphRows = regular.RegularGraphRows;
	function createGraphRows(mode$1, commits) {
	    return mode$1 === mode.Mode.Compact
	        ? new compact.CompactGraphRows(commits)
	        : new regular.RegularGraphRows(commits);
	}
	exports.createGraphRows = createGraphRows;

	});

	unwrapExports(graphRows);
	var graphRows_1 = graphRows.GraphRows;
	var graphRows_2 = graphRows.createGraphRows;

	var branchesOrder = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	class BranchesOrder {
	    constructor(commits, colors, compareFunction) {
	        this.branches = new Set();
	        this.colors = colors;
	        commits.forEach((commit) => this.branches.add(commit.branchToDisplay));
	        if (compareFunction) {
	            this.branches = new Set(Array.from(this.branches).sort(compareFunction));
	        }
	    }
	    /**
	     * Return the order of the given branch name.
	     *
	     * @param branchName Name of the branch
	     */
	    get(branchName) {
	        return Array.from(this.branches).findIndex((branch) => branch === branchName);
	    }
	    /**
	     * Return the color of the given branch.
	     *
	     * @param branchName Name of the branch
	     */
	    getColorOf(branchName) {
	        return this.colors[this.get(branchName) % this.colors.length];
	    }
	}
	exports.BranchesOrder = BranchesOrder;

	});

	unwrapExports(branchesOrder);
	var branchesOrder_1 = branchesOrder.BranchesOrder;

	var refs = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	class Refs {
	    constructor() {
	        this.commitPerName = new Map();
	        this.namesPerCommit = new Map();
	    }
	    /**
	     * Set a new reference to a commit hash.
	     *
	     * @param name Name of the ref (ex: "master", "v1.0")
	     * @param commitHash Commit hash
	     */
	    set(name, commitHash) {
	        const prevCommitHash = this.commitPerName.get(name);
	        if (prevCommitHash) {
	            this.removeNameFrom(prevCommitHash, name);
	        }
	        this.addNameTo(commitHash, name);
	        this.addCommitTo(name, commitHash);
	        return this;
	    }
	    /**
	     * Get the commit hash associated with the given reference name.
	     *
	     * @param name Name of the ref
	     */
	    getCommit(name) {
	        return this.commitPerName.get(name);
	    }
	    /**
	     * Get the list of reference names associated with given commit hash.
	     *
	     * @param commitHash Commit hash
	     */
	    getNames(commitHash) {
	        return this.namesPerCommit.get(commitHash) || [];
	    }
	    /**
	     * Get all reference names known.
	     */
	    getAllNames() {
	        return Array.from(this.commitPerName.keys());
	    }
	    /**
	     * Returns true if given commit hash is referenced.
	     *
	     * @param commitHash Commit hash
	     */
	    hasCommit(commitHash) {
	        return this.namesPerCommit.has(commitHash);
	    }
	    /**
	     * Returns true if given reference name exists.
	     *
	     * @param name Name of the ref
	     */
	    hasName(name) {
	        return this.commitPerName.has(name);
	    }
	    removeNameFrom(commitHash, nameToRemove) {
	        const names = this.namesPerCommit.get(commitHash) || [];
	        this.namesPerCommit.set(commitHash, names.filter((name) => name !== nameToRemove));
	    }
	    addNameTo(commitHash, nameToAdd) {
	        const prevNames = this.namesPerCommit.get(commitHash) || [];
	        this.namesPerCommit.set(commitHash, [...prevNames, nameToAdd]);
	    }
	    addCommitTo(name, commitHashToAdd) {
	        this.commitPerName.set(name, commitHashToAdd);
	    }
	}
	exports.Refs = Refs;

	});

	unwrapExports(refs);
	var refs_1 = refs.Refs;

	var branchesPaths = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	/**
	 * Calculate branches paths of the graph.
	 *
	 * It follows the Command pattern:
	 * => a class with a single `execute()` public method.
	 *
	 * Main benefit is we can split computation in smaller steps without
	 * passing around parameters (we can rely on private data).
	 */
	class BranchesPathsCalculator {
	    constructor(commits, branches, commitSpacing, isGraphVertical, isGraphReverse, createDeletedBranch) {
	        this.branchesPaths = new Map();
	        this.commits = commits;
	        this.branches = branches;
	        this.commitSpacing = commitSpacing;
	        this.isGraphVertical = isGraphVertical;
	        this.isGraphReverse = isGraphReverse;
	        this.createDeletedBranch = createDeletedBranch;
	    }
	    /**
	     * Compute branches paths for graph.
	     */
	    execute() {
	        this.fromCommits();
	        this.withMergeCommits();
	        return this.smoothBranchesPaths();
	    }
	    /**
	     * Initialize branches paths from calculator's commits.
	     */
	    fromCommits() {
	        this.commits.forEach((commit) => {
	            let branch = this.branches.get(commit.branchToDisplay);
	            if (!branch) {
	                // NB: may not work properly if there are many deleted branches.
	                branch = this.getDeletedBranchInPath() || this.createDeletedBranch();
	            }
	            const path = [];
	            const existingBranchPath = this.branchesPaths.get(branch);
	            const firstParentCommit = this.commits.find(({ hash }) => hash === commit.parents[0]);
	            if (existingBranchPath) {
	                path.push(...existingBranchPath);
	            }
	            else if (firstParentCommit) {
	                // Make branch path starts from parent branch (parent commit).
	                path.push({ x: firstParentCommit.x, y: firstParentCommit.y });
	            }
	            path.push({ x: commit.x, y: commit.y });
	            this.branchesPaths.set(branch, path);
	        });
	    }
	    /**
	     * Insert merge commits points into `branchesPaths`.
	     *
	     * @example
	     *     // Before
	     *     [
	     *       { x: 0, y: 640 },
	     *       { x: 50, y: 560 }
	     *     ]
	     *
	     *     // After
	     *     [
	     *       { x: 0, y: 640 },
	     *       { x: 50, y: 560 },
	     *       { x: 50, y: 560, mergeCommit: true }
	     *     ]
	     */
	    withMergeCommits() {
	        const mergeCommits = this.commits.filter(({ parents }) => parents.length > 1);
	        mergeCommits.forEach((mergeCommit) => {
	            const parentOnOriginBranch = this.commits.find(({ hash }) => {
	                return hash === mergeCommit.parents[1];
	            });
	            if (!parentOnOriginBranch)
	                return;
	            const originBranchName = parentOnOriginBranch.branches
	                ? parentOnOriginBranch.branches[0]
	                : "";
	            let branch = this.branches.get(originBranchName);
	            if (!branch) {
	                branch = this.getDeletedBranchInPath();
	                if (!branch) {
	                    // Still no branch? That's strange, we shouldn't set anything.
	                    return;
	                }
	            }
	            const lastPoints = [...(this.branchesPaths.get(branch) || [])];
	            this.branchesPaths.set(branch, [
	                ...lastPoints,
	                { x: mergeCommit.x, y: mergeCommit.y, mergeCommit: true },
	            ]);
	        });
	    }
	    /**
	     * Retrieve deleted branch from calculator's branches paths.
	     */
	    getDeletedBranchInPath() {
	        return Array.from(this.branchesPaths.keys()).find((branch) => branch.isDeleted());
	    }
	    /**
	     * Smooth all paths by putting points on each row.
	     */
	    smoothBranchesPaths() {
	        const branchesPaths = new Map();
	        this.branchesPaths.forEach((points, branch) => {
	            if (points.length <= 1) {
	                branchesPaths.set(branch, [points]);
	                return;
	            }
	            // Cut path on each merge commits
	            // Coordinate[] -> Coordinate[][]
	            if (this.isGraphVertical) {
	                points = points.sort((a, b) => (a.y > b.y ? -1 : 1));
	            }
	            else {
	                points = points.sort((a, b) => (a.x > b.x ? 1 : -1));
	            }
	            if (this.isGraphReverse) {
	                points = points.reverse();
	            }
	            const paths = points.reduce((mem, point, i) => {
	                if (point.mergeCommit) {
	                    mem[mem.length - 1].push(utils.pick(point, ["x", "y"]));
	                    if (points[i - 1])
	                        mem.push([points[i - 1]]);
	                }
	                else {
	                    mem[mem.length - 1].push(point);
	                }
	                return mem;
	            }, [[]]);
	            if (this.isGraphReverse) {
	                paths.forEach((path) => path.reverse());
	            }
	            // Add intermediate points on each sub paths
	            if (this.isGraphVertical) {
	                paths.forEach((subPath) => {
	                    if (subPath.length <= 1)
	                        return;
	                    const firstPoint = subPath[0];
	                    const lastPoint = subPath[subPath.length - 1];
	                    const column = subPath[1].x;
	                    const branchSize = Math.round(Math.abs(firstPoint.y - lastPoint.y) / this.commitSpacing) - 1;
	                    const branchPoints = branchSize > 0
	                        ? new Array(branchSize).fill(0).map((_, i) => ({
	                            x: column,
	                            y: subPath[0].y - this.commitSpacing * (i + 1),
	                        }))
	                        : [];
	                    const lastSubPaths = branchesPaths.get(branch) || [];
	                    branchesPaths.set(branch, [
	                        ...lastSubPaths,
	                        [firstPoint, ...branchPoints, lastPoint],
	                    ]);
	                });
	            }
	            else {
	                paths.forEach((subPath) => {
	                    if (subPath.length <= 1)
	                        return;
	                    const firstPoint = subPath[0];
	                    const lastPoint = subPath[subPath.length - 1];
	                    const column = subPath[1].y;
	                    const branchSize = Math.round(Math.abs(firstPoint.x - lastPoint.x) / this.commitSpacing) - 1;
	                    const branchPoints = branchSize > 0
	                        ? new Array(branchSize).fill(0).map((_, i) => ({
	                            y: column,
	                            x: subPath[0].x + this.commitSpacing * (i + 1),
	                        }))
	                        : [];
	                    const lastSubPaths = branchesPaths.get(branch) || [];
	                    branchesPaths.set(branch, [
	                        ...lastSubPaths,
	                        [firstPoint, ...branchPoints, lastPoint],
	                    ]);
	                });
	            }
	        });
	        return branchesPaths;
	    }
	}
	exports.BranchesPathsCalculator = BranchesPathsCalculator;
	/**
	 * Return a string ready to use in `svg.path.d` from coordinates
	 *
	 * @param coordinates Collection of coordinates
	 */
	function toSvgPath(coordinates, isBezier, isVertical) {
	    return coordinates
	        .map((path) => "M" +
	        path
	            .map(({ x, y }, i, points) => {
	            if (isBezier &&
	                points.length > 1 &&
	                (i === 1 || i === points.length - 1)) {
	                const previous = points[i - 1];
	                if (isVertical) {
	                    const middleY = (previous.y + y) / 2;
	                    return `C ${previous.x} ${middleY} ${x} ${middleY} ${x} ${y}`;
	                }
	                else {
	                    const middleX = (previous.x + x) / 2;
	                    return `C ${middleX} ${previous.y} ${middleX} ${y} ${x} ${y}`;
	                }
	            }
	            return `L ${x} ${y}`;
	        })
	            .join(" ")
	            .slice(1))
	        .join(" ");
	}
	exports.toSvgPath = toSvgPath;

	});

	unwrapExports(branchesPaths);
	var branchesPaths_1 = branchesPaths.BranchesPathsCalculator;
	var branchesPaths_2 = branchesPaths.toSvgPath;

	var gitgraphUserApi = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	class GitgraphUserApi {
	    // tslint:enable:variable-name
	    constructor(graph, onGraphUpdate) {
	        this._graph = graph;
	        this._onGraphUpdate = onGraphUpdate;
	    }
	    /**
	     * Clear everything (as `rm -rf .git && git init`).
	     */
	    clear() {
	        this._graph.refs = new refs.Refs();
	        this._graph.tags = new refs.Refs();
	        this._graph.commits = [];
	        this._graph.branches = new Map();
	        this._graph.currentBranch = this._graph.createBranch("master");
	        this._onGraphUpdate();
	        return this;
	    }
	    commit(options) {
	        this._graph.currentBranch.getUserApi().commit(options);
	        return this;
	    }
	    branch(args) {
	        return this._graph.createBranch(args).getUserApi();
	    }
	    tag(...args) {
	        // Deal with shorter syntax
	        let name;
	        let ref;
	        let style;
	        let render;
	        if (typeof args[0] === "string") {
	            name = args[0];
	            ref = args[1];
	        }
	        else {
	            name = args[0].name;
	            ref = args[0].ref;
	            style = args[0].style;
	            render = args[0].render;
	        }
	        if (!ref) {
	            const head = this._graph.refs.getCommit("HEAD");
	            if (!head)
	                return this;
	            ref = head;
	        }
	        let commitHash;
	        if (this._graph.refs.hasCommit(ref)) {
	            // `ref` is a `Commit["hash"]`
	            commitHash = ref;
	        }
	        if (this._graph.refs.hasName(ref)) {
	            // `ref` is a `Branch["name"]`
	            commitHash = this._graph.refs.getCommit(ref);
	        }
	        if (!commitHash) {
	            throw new Error(`The ref "${ref}" does not exist`);
	        }
	        this._graph.tags.set(name, commitHash);
	        this._graph.tagStyles[name] = style;
	        this._graph.tagRenders[name] = render;
	        this._onGraphUpdate();
	        return this;
	    }
	    /**
	     * Import a JSON.
	     *
	     * Data can't be typed since it comes from a JSON.
	     * We validate input format and throw early if something is invalid.
	     *
	     * @experimental
	     * @param data JSON from `git2json` output
	     */
	    import(data) {
	        const invalidData = new Error("Only `git2json` format is supported for imported data.");
	        // We manually validate input data instead of using a lib like yup.
	        // => this is to keep bundlesize small.
	        if (!Array.isArray(data)) {
	            throw invalidData;
	        }
	        const areDataValid = data.every((options) => {
	            return (typeof options === "object" &&
	                typeof options.author === "object" &&
	                Array.isArray(options.refs));
	        });
	        if (!areDataValid) {
	            throw invalidData;
	        }
	        const commitOptionsList = data
	            .map((options) => (Object.assign({}, options, { style: Object.assign({}, this._graph.template.commit, { message: Object.assign({}, this._graph.template.commit.message, { display: this._graph.shouldDisplayCommitMessage }) }), author: `${options.author.name} <${options.author.email}>` })))
	            // Git2json outputs is reverse-chronological.
	            // We need to commit it chronological order.
	            .reverse();
	        // Use validated `value`.
	        this.clear();
	        this._graph.commits = commitOptionsList.map((options) => new commit.Commit(options));
	        // Create tags & refs.
	        commitOptionsList.forEach(({ refs, hash }) => {
	            if (!refs)
	                return;
	            if (!hash)
	                return;
	            const TAG_PREFIX = "tag: ";
	            const tags = refs
	                .map((ref) => ref.split(TAG_PREFIX))
	                .map(([_, tag]) => tag)
	                .filter((tag) => typeof tag === "string");
	            tags.forEach((tag) => this._graph.tags.set(tag, hash));
	            refs
	                .filter((ref) => !ref.startsWith(TAG_PREFIX))
	                .forEach((ref) => this._graph.refs.set(ref, hash));
	        });
	        // Create branches.
	        const branches = this._getBranches();
	        this._graph.commits
	            .map((commit) => this._withBranches(branches, commit))
	            .reduce((mem, commit) => {
	            if (!commit.branches)
	                return mem;
	            commit.branches.forEach((branch) => mem.add(branch));
	            return mem;
	        }, new Set())
	            .forEach((branch) => this.branch(branch));
	        this._onGraphUpdate();
	        return this;
	    }
	    // tslint:disable:variable-name - Prefix `_` = explicitly private for JS users
	    // TODO: get rid of these duplicated private methods.
	    //
	    // These belong to Gitgraph. It is duplicated because of `import()`.
	    // `import()` should use regular user API instead.
	    _withBranches(branches, commit) {
	        let commitBranches = Array.from((branches.get(commit.hash) || new Set()).values());
	        if (commitBranches.length === 0) {
	            // No branch => branch has been deleted.
	            commitBranches = [branch.DELETED_BRANCH_NAME];
	        }
	        return commit.setBranches(commitBranches);
	    }
	    _getBranches() {
	        const result = new Map();
	        const queue = [];
	        const branches = this._graph.refs
	            .getAllNames()
	            .filter((name) => name !== "HEAD");
	        branches.forEach((branch) => {
	            const commitHash = this._graph.refs.getCommit(branch);
	            if (commitHash) {
	                queue.push(commitHash);
	            }
	            while (queue.length > 0) {
	                const currentHash = queue.pop();
	                const current = this._graph.commits.find(({ hash }) => hash === currentHash);
	                const prevBranches = result.get(currentHash) || new Set();
	                prevBranches.add(branch);
	                result.set(currentHash, prevBranches);
	                if (current.parents.length > 0) {
	                    queue.push(current.parents[0]);
	                }
	            }
	        });
	        return result;
	    }
	}
	exports.GitgraphUserApi = GitgraphUserApi;

	});

	unwrapExports(gitgraphUserApi);
	var gitgraphUserApi_1 = gitgraphUserApi.GitgraphUserApi;

	var gitgraph = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });










	class GitgraphCore {
	    constructor(options = {}) {
	        this.refs = new refs.Refs();
	        this.tags = new refs.Refs();
	        this.tagStyles = {};
	        this.tagRenders = {};
	        this.commits = [];
	        this.branches = new Map();
	        this.listeners = [];
	        this.nextTimeoutId = null;
	        this.template = template.getTemplate(options.template);
	        // Set a default `master` branch
	        this.currentBranch = this.createBranch("master");
	        // Set all options with default values
	        this.orientation = options.orientation;
	        this.reverseArrow = utils.booleanOptionOr(options.reverseArrow, false);
	        this.initCommitOffsetX = utils.numberOptionOr(options.initCommitOffsetX, 0);
	        this.initCommitOffsetY = utils.numberOptionOr(options.initCommitOffsetY, 0);
	        this.mode = options.mode;
	        this.author = options.author || "Sergio Flores <saxo-guy@epic.com>";
	        this.commitMessage =
	            options.commitMessage || "He doesn't like George Michael! Boooo!";
	        this.generateCommitHash =
	            typeof options.generateCommitHash === "function"
	                ? options.generateCommitHash
	                : () => undefined;
	        this.branchesOrderFunction =
	            typeof options.compareBranchesOrder === "function"
	                ? options.compareBranchesOrder
	                : undefined;
	        this.branchLabelOnEveryCommit = utils.booleanOptionOr(options.branchLabelOnEveryCommit, false);
	    }
	    get isHorizontal() {
	        return (this.orientation === orientation.Orientation.Horizontal ||
	            this.orientation === orientation.Orientation.HorizontalReverse);
	    }
	    get isVertical() {
	        return !this.isHorizontal;
	    }
	    get isReverse() {
	        return (this.orientation === orientation.Orientation.HorizontalReverse ||
	            this.orientation === orientation.Orientation.VerticalReverse);
	    }
	    get shouldDisplayCommitMessage() {
	        return !this.isHorizontal && this.mode !== mode.Mode.Compact;
	    }
	    /**
	     * Return the API to manipulate Gitgraph as a user.
	     * Rendering library should give that API to their consumer.
	     */
	    getUserApi() {
	        return new gitgraphUserApi.GitgraphUserApi(this, () => this.next());
	    }
	    /**
	     * Add a change listener.
	     * It will be called any time the graph have changed (commit, merge…).
	     *
	     * @param listener A callback to be invoked on every change.
	     * @returns A function to remove this change listener.
	     */
	    subscribe(listener) {
	        this.listeners.push(listener);
	        let isSubscribed = true;
	        return () => {
	            if (!isSubscribed)
	                return;
	            isSubscribed = false;
	            const index = this.listeners.indexOf(listener);
	            this.listeners.splice(index, 1);
	        };
	    }
	    /**
	     * Return all data required for rendering.
	     * Rendering libraries will use this to implement their rendering strategy.
	     */
	    getRenderedData() {
	        const commits = this.computeRenderedCommits();
	        const branchesPaths = this.computeRenderedBranchesPaths(commits);
	        const commitMessagesX = this.computeCommitMessagesX(branchesPaths);
	        this.computeBranchesColor(commits, branchesPaths);
	        return { commits, branchesPaths, commitMessagesX };
	    }
	    createBranch(args) {
	        const defaultParentBranchName = "HEAD";
	        let options = {
	            gitgraph: this,
	            name: "",
	            parentCommitHash: this.refs.getCommit(defaultParentBranchName),
	            style: this.template.branch,
	            onGraphUpdate: () => this.next(),
	        };
	        if (typeof args === "string") {
	            options.name = args;
	            options.parentCommitHash = this.refs.getCommit(defaultParentBranchName);
	        }
	        else {
	            const parentBranchName = args.from
	                ? args.from.name
	                : defaultParentBranchName;
	            const parentCommitHash = this.refs.getCommit(parentBranchName) ||
	                (this.refs.hasCommit(args.from) ? args.from : undefined);
	            args.style = args.style || {};
	            options = Object.assign({}, options, args, { parentCommitHash, style: Object.assign({}, options.style, args.style, { label: Object.assign({}, options.style.label, args.style.label) }) });
	        }
	        const branch$1 = new branch.Branch(options);
	        this.branches.set(branch$1.name, branch$1);
	        return branch$1;
	    }
	    /**
	     * Return commits with data for rendering.
	     */
	    computeRenderedCommits() {
	        const branches = this.getBranches();
	        const commitsWithBranches = this.commits.map((commit) => this.withBranches(branches, commit));
	        const rows = graphRows.createGraphRows(this.mode, this.commits);
	        const branchesOrder$1 = new branchesOrder.BranchesOrder(commitsWithBranches, this.template.colors, this.branchesOrderFunction);
	        return (commitsWithBranches
	            .map((commit) => commit.setRefs(this.refs))
	            .map((commit) => this.withPosition(rows, branchesOrder$1, commit))
	            // Fallback commit computed color on branch color.
	            .map((commit) => commit.withDefaultColor(this.getBranchDefaultColor(branchesOrder$1, commit.branchToDisplay)))
	            // Tags need commit style to be computed (with default color).
	            .map((commit) => commit.setTags(this.tags, (name) => Object.assign({}, this.tagStyles[name], this.template.tag), (name) => this.tagRenders[name])));
	    }
	    /**
	     * Return branches paths with all data required for rendering.
	     *
	     * @param commits List of commits with rendering data computed
	     */
	    computeRenderedBranchesPaths(commits) {
	        return new branchesPaths.BranchesPathsCalculator(commits, this.branches, this.template.commit.spacing, this.isVertical, this.isReverse, () => branch.createDeletedBranch(this, this.template.branch, () => this.next())).execute();
	    }
	    /**
	     * Set branches colors based on branches paths.
	     *
	     * @param commits List of graph commits
	     * @param branchesPaths Branches paths to be rendered
	     */
	    computeBranchesColor(commits, branchesPaths) {
	        const branchesOrder$1 = new branchesOrder.BranchesOrder(commits, this.template.colors, this.branchesOrderFunction);
	        Array.from(branchesPaths).forEach(([branch]) => {
	            branch.computedColor =
	                branch.style.color ||
	                    this.getBranchDefaultColor(branchesOrder$1, branch.name);
	        });
	    }
	    /**
	     * Return commit messages X position for rendering.
	     *
	     * @param branchesPaths Branches paths to be rendered
	     */
	    computeCommitMessagesX(branchesPaths) {
	        const numberOfColumns = Array.from(branchesPaths).length;
	        return numberOfColumns * this.template.branch.spacing;
	    }
	    /**
	     * Add `branches` property to commit.
	     *
	     * @param branches All branches mapped by commit hash
	     * @param commit Commit
	     */
	    withBranches(branches, commit) {
	        let commitBranches = Array.from((branches.get(commit.hash) || new Set()).values());
	        if (commitBranches.length === 0) {
	            // No branch => branch has been deleted.
	            commitBranches = [branch.DELETED_BRANCH_NAME];
	        }
	        return commit.setBranches(commitBranches);
	    }
	    /**
	     * Get all branches from current commits.
	     */
	    getBranches() {
	        const result = new Map();
	        const queue = [];
	        const branches = this.refs.getAllNames().filter((name) => name !== "HEAD");
	        branches.forEach((branch) => {
	            const commitHash = this.refs.getCommit(branch);
	            if (commitHash) {
	                queue.push(commitHash);
	            }
	            while (queue.length > 0) {
	                const currentHash = queue.pop();
	                const current = this.commits.find(({ hash }) => hash === currentHash);
	                const prevBranches = result.get(currentHash) || new Set();
	                prevBranches.add(branch);
	                result.set(currentHash, prevBranches);
	                if (current.parents.length > 0) {
	                    queue.push(current.parents[0]);
	                }
	            }
	        });
	        return result;
	    }
	    /**
	     * Add position to given commit.
	     *
	     * @param rows Graph rows
	     * @param branchesOrder Computed order of branches
	     * @param commit Commit to position
	     */
	    withPosition(rows, branchesOrder, commit) {
	        const row = rows.getRowOf(commit.hash);
	        const maxRow = rows.getMaxRow();
	        const order = branchesOrder.get(commit.branchToDisplay);
	        switch (this.orientation) {
	            default:
	                return commit.setPosition({
	                    x: this.initCommitOffsetX + this.template.branch.spacing * order,
	                    y: this.initCommitOffsetY +
	                        this.template.commit.spacing * (maxRow - row),
	                });
	            case orientation.Orientation.VerticalReverse:
	                return commit.setPosition({
	                    x: this.initCommitOffsetX + this.template.branch.spacing * order,
	                    y: this.initCommitOffsetY + this.template.commit.spacing * row,
	                });
	            case orientation.Orientation.Horizontal:
	                return commit.setPosition({
	                    x: this.initCommitOffsetX + this.template.commit.spacing * row,
	                    y: this.initCommitOffsetY + this.template.branch.spacing * order,
	                });
	            case orientation.Orientation.HorizontalReverse:
	                return commit.setPosition({
	                    x: this.initCommitOffsetX +
	                        this.template.commit.spacing * (maxRow - row),
	                    y: this.initCommitOffsetY + this.template.branch.spacing * order,
	                });
	        }
	    }
	    /**
	     * Return the default color for given branch.
	     *
	     * @param branchesOrder Computed order of branches
	     * @param branchName Name of the branch
	     */
	    getBranchDefaultColor(branchesOrder, branchName) {
	        return branchesOrder.getColorOf(branchName);
	    }
	    /**
	     * Tell each listener something new happened.
	     * E.g. a rendering library will know it needs to re-render the graph.
	     */
	    next() {
	        if (this.nextTimeoutId) {
	            window.clearTimeout(this.nextTimeoutId);
	        }
	        // Use setTimeout() with `0` to debounce call to next tick.
	        this.nextTimeoutId = window.setTimeout(() => {
	            this.listeners.forEach((listener) => listener(this.getRenderedData()));
	        }, 0);
	    }
	}
	exports.GitgraphCore = GitgraphCore;

	});

	unwrapExports(gitgraph);
	var gitgraph_1 = gitgraph.GitgraphCore;

	var lib = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.GitgraphCore = gitgraph.GitgraphCore;

	exports.Mode = mode.Mode;

	exports.GitgraphUserApi = gitgraphUserApi.GitgraphUserApi;

	exports.BranchUserApi = branchUserApi.BranchUserApi;

	exports.Branch = branch.Branch;

	exports.Commit = commit.Commit;

	exports.Tag = tag.Tag;

	exports.Refs = refs.Refs;

	exports.MergeStyle = template.MergeStyle;
	exports.TemplateName = template.TemplateName;
	exports.templateExtend = template.templateExtend;

	exports.Orientation = orientation.Orientation;

	exports.toSvgPath = branchesPaths.toSvgPath;

	exports.arrowSvgPath = utils.arrowSvgPath;

	});

	unwrapExports(lib);
	var lib_1 = lib.GitgraphCore;
	var lib_2 = lib.Mode;
	var lib_3 = lib.GitgraphUserApi;
	var lib_4 = lib.BranchUserApi;
	var lib_5 = lib.Branch;
	var lib_6 = lib.Commit;
	var lib_7 = lib.Tag;
	var lib_8 = lib.Refs;
	var lib_9 = lib.MergeStyle;
	var lib_10 = lib.TemplateName;
	var lib_11 = lib.templateExtend;
	var lib_12 = lib.Orientation;
	var lib_13 = lib.toSvgPath;
	var lib_14 = lib.arrowSvgPath;

	var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	function createSvg(options) {
	    var svg = document.createElementNS(SVG_NAMESPACE, "svg");
	    if (!options)
	        return svg;
	    if (options.children) {
	        options.children.forEach(function (child) { return svg.appendChild(child); });
	    }
	    if (options.viewBox) {
	        svg.setAttribute("viewBox", options.viewBox);
	    }
	    if (options.height) {
	        svg.setAttribute("height", options.height.toString());
	    }
	    if (options.width) {
	        svg.setAttribute("width", options.width.toString());
	    }
	    return svg;
	}
	function createG(options) {
	    var g = document.createElementNS(SVG_NAMESPACE, "g");
	    options.children.forEach(function (child) { return child && g.appendChild(child); });
	    if (options.translate) {
	        g.setAttribute("transform", "translate(" + options.translate.x + ", " + options.translate.y + ")");
	    }
	    if (options.fill) {
	        g.setAttribute("fill", options.fill);
	    }
	    if (options.stroke) {
	        g.setAttribute("stroke", options.stroke);
	    }
	    if (options.strokeWidth) {
	        g.setAttribute("stroke-width", options.strokeWidth.toString());
	    }
	    if (options.onClick) {
	        g.addEventListener("click", options.onClick);
	    }
	    if (options.onMouseOver) {
	        g.addEventListener("mouseover", options.onMouseOver);
	    }
	    if (options.onMouseOut) {
	        g.addEventListener("mouseout", options.onMouseOut);
	    }
	    return g;
	}
	function createText(options) {
	    var text = document.createElementNS(SVG_NAMESPACE, "text");
	    text.setAttribute("alignment-baseline", "central");
	    text.setAttribute("dominant-baseline", "central");
	    text.textContent = options.content;
	    if (options.fill) {
	        text.setAttribute("fill", options.fill);
	    }
	    if (options.font) {
	        text.setAttribute("style", "font: " + options.font);
	    }
	    if (options.anchor) {
	        text.setAttribute("text-anchor", options.anchor);
	    }
	    if (options.translate) {
	        text.setAttribute("x", options.translate.x.toString());
	        text.setAttribute("y", options.translate.y.toString());
	    }
	    if (options.onClick) {
	        text.addEventListener("click", options.onClick);
	    }
	    return text;
	}
	function createCircle(options) {
	    var circle = document.createElementNS(SVG_NAMESPACE, "circle");
	    circle.setAttribute("cx", options.radius.toString());
	    circle.setAttribute("cy", options.radius.toString());
	    circle.setAttribute("r", options.radius.toString());
	    if (options.id) {
	        circle.setAttribute("id", options.id);
	    }
	    if (options.fill) {
	        circle.setAttribute("fill", options.fill);
	    }
	    return circle;
	}
	function createRect(options) {
	    var rect = document.createElementNS(SVG_NAMESPACE, "rect");
	    rect.setAttribute("width", options.width.toString());
	    rect.setAttribute("height", options.height.toString());
	    if (options.borderRadius) {
	        rect.setAttribute("rx", options.borderRadius.toString());
	    }
	    if (options.fill) {
	        rect.setAttribute("fill", options.fill || "transparent");
	    }
	    if (options.stroke) {
	        rect.setAttribute("stroke", options.stroke);
	    }
	    return rect;
	}
	function createPath(options) {
	    var path = document.createElementNS(SVG_NAMESPACE, "path");
	    path.setAttribute("d", options.d);
	    if (options.fill) {
	        path.setAttribute("fill", options.fill);
	    }
	    if (options.stroke) {
	        path.setAttribute("stroke", options.stroke);
	    }
	    if (options.strokeWidth) {
	        path.setAttribute("stroke-width", options.strokeWidth.toString());
	    }
	    if (options.translate) {
	        path.setAttribute("transform", "translate(" + options.translate.x + ", " + options.translate.y + ")");
	    }
	    return path;
	}
	function createUse(href) {
	    var use = document.createElementNS(SVG_NAMESPACE, "use");
	    use.setAttribute("href", "#" + href);
	    // xlink:href is deprecated in SVG2, but we keep it for retro-compatibility
	    // => https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use#Browser_compatibility
	    use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + href);
	    return use;
	}
	function createClipPath() {
	    return document.createElementNS(SVG_NAMESPACE, "clipPath");
	}
	function createDefs(children) {
	    var defs = document.createElementNS(SVG_NAMESPACE, "defs");
	    children.forEach(function (child) { return defs.appendChild(child); });
	    return defs;
	}
	function createForeignObject(options) {
	    var result = document.createElementNS(SVG_NAMESPACE, "foreignObject");
	    result.setAttribute("width", options.width.toString());
	    if (options.translate) {
	        result.setAttribute("x", options.translate.x.toString());
	        result.setAttribute("y", options.translate.y.toString());
	    }
	    var p = document.createElement("p");
	    p.textContent = options.content;
	    result.appendChild(p);
	    return result;
	}

	var PADDING_X = 10;
	var PADDING_Y = 5;
	function createBranchLabel(branch, commit) {
	    var rect = createRect({
	        width: 0,
	        height: 0,
	        borderRadius: branch.style.label.borderRadius,
	        stroke: branch.style.label.strokeColor || commit.style.color,
	        fill: branch.style.label.bgColor,
	    });
	    var text = createText({
	        content: branch.name,
	        translate: {
	            x: PADDING_X,
	            y: 0,
	        },
	        font: branch.style.label.font,
	        fill: branch.style.label.color || commit.style.color,
	    });
	    var branchLabel = createG({ children: [rect] });
	    var observer = new MutationObserver(function () {
	        var _a = text.getBBox(), height = _a.height, width = _a.width;
	        var boxWidth = width + 2 * PADDING_X;
	        var boxHeight = height + 2 * PADDING_Y;
	        // Ideally, it would be great to refactor these behavior into SVG elements.
	        rect.setAttribute("width", boxWidth.toString());
	        rect.setAttribute("height", boxHeight.toString());
	        text.setAttribute("y", (boxHeight / 2).toString());
	    });
	    observer.observe(branchLabel, {
	        attributes: false,
	        subtree: false,
	        childList: true,
	    });
	    // Add text after observer is set up => react based on text size.
	    // We might refactor it by including `onChildrenUpdate()` to `createG()`.
	    branchLabel.appendChild(text);
	    return branchLabel;
	}

	var PADDING_X$1 = 10;
	var PADDING_Y$1 = 5;
	function createTag(tag) {
	    var path = createPath({
	        d: "",
	        fill: tag.style.bgColor,
	        stroke: tag.style.strokeColor,
	    });
	    var text = createText({
	        content: tag.name,
	        fill: tag.style.color,
	        font: tag.style.font,
	        translate: { x: 0, y: 0 },
	    });
	    var result = createG({ children: [path] });
	    var offset = tag.style.pointerWidth;
	    var observer = new MutationObserver(function () {
	        var _a = text.getBBox(), height = _a.height, width = _a.width;
	        if (height === 0 || width === 0)
	            return;
	        var radius = tag.style.borderRadius;
	        var boxWidth = offset + width + 2 * PADDING_X$1;
	        var boxHeight = height + 2 * PADDING_Y$1;
	        var pathD = [
	            "M 0,0",
	            "L " + offset + "," + boxHeight / 2,
	            "V " + boxHeight / 2,
	            "Q " + offset + "," + boxHeight / 2 + " " + (offset + radius) + "," + boxHeight / 2,
	            "H " + (boxWidth - radius),
	            "Q " + boxWidth + "," + boxHeight / 2 + " " + boxWidth + "," + (boxHeight / 2 - radius),
	            "V -" + (boxHeight / 2 - radius),
	            "Q " + boxWidth + ",-" + boxHeight / 2 + " " + (boxWidth - radius) + ",-" + boxHeight / 2,
	            "H " + (offset + radius),
	            "Q " + offset + ",-" + boxHeight / 2 + " " + offset + ",-" + boxHeight / 2,
	            "V -" + boxHeight / 2,
	            "z",
	        ].join(" ");
	        // Ideally, it would be great to refactor these behavior into SVG elements.
	        path.setAttribute("d", pathD.toString());
	        text.setAttribute("x", (offset + PADDING_X$1).toString());
	    });
	    observer.observe(result, {
	        attributes: false,
	        subtree: false,
	        childList: true,
	    });
	    // Add text after observer is set up => react based on text size.
	    // We might refactor it by including `onChildrenUpdate()` to `createG()`.
	    result.appendChild(text);
	    return result;
	}

	var PADDING = 10;
	var OFFSET = 10;
	function createTooltip(commit) {
	    var path = createPath({ d: "", fill: "#EEE" });
	    var text = createText({
	        translate: { x: OFFSET + PADDING, y: 0 },
	        content: commit.hashAbbrev + " - " + commit.subject,
	        fill: "#333",
	    });
	    var commitSize = commit.style.dot.size * 2;
	    var tooltip = createG({
	        translate: { x: commitSize, y: commitSize / 2 },
	        children: [path],
	    });
	    var observer = new MutationObserver(function () {
	        var width = text.getBBox().width;
	        var radius = 5;
	        var boxHeight = 50;
	        var boxWidth = OFFSET + width + 2 * PADDING;
	        var pathD = [
	            "M 0,0",
	            "L " + OFFSET + "," + OFFSET,
	            "V " + (boxHeight / 2 - radius),
	            "Q " + OFFSET + "," + boxHeight / 2 + " " + (OFFSET + radius) + "," + boxHeight / 2,
	            "H " + (boxWidth - radius),
	            "Q " + boxWidth + "," + boxHeight / 2 + " " + boxWidth + "," + (boxHeight / 2 - radius),
	            "V -" + (boxHeight / 2 - radius),
	            "Q " + boxWidth + ",-" + boxHeight / 2 + " " + (boxWidth - radius) + ",-" + boxHeight / 2,
	            "H " + (OFFSET + radius),
	            "Q " + OFFSET + ",-" + boxHeight / 2 + " " + OFFSET + ",-" + (boxHeight / 2 - radius),
	            "V -" + OFFSET,
	            "z",
	        ].join(" ");
	        // Ideally, it would be great to refactor these behavior into SVG elements.
	        // rect.setAttribute("width", boxWidth.toString());
	        path.setAttribute("d", pathD.toString());
	    });
	    observer.observe(tooltip, {
	        attributes: false,
	        subtree: false,
	        childList: true,
	    });
	    tooltip.appendChild(text);
	    return tooltip;
	}

	function createGitgraph(graphContainer, options) {
	    var commitsElements = {};
	    // Store a map to replace commits y with the correct value,
	    // including the message offset. Allows custom, flexible message height.
	    // E.g. {20: 30} means for commit: y=20 -> y=30
	    // Offset should be computed when graph is rendered (componentDidUpdate).
	    var commitYWithOffsets = {};
	    var shouldRecomputeOffsets = false;
	    var lastData;
	    var $commits;
	    var commitMessagesX = 0;
	    var $tooltip = null;
	    // Create an `svg` context in which we'll render the graph.
	    var svg = createSvg();
	    adaptSvgOnUpdate();
	    graphContainer.appendChild(svg);
	    // React on gitgraph updates to re-render the graph.
	    var gitgraph = new lib_1(options);
	    gitgraph.subscribe(function (data) {
	        shouldRecomputeOffsets = true;
	        render(data);
	    });
	    // Return usable API for end-user.
	    return gitgraph.getUserApi();
	    function render(data) {
	        // Reset before new rendering to flush previous state.
	        commitsElements = {};
	        var commits = data.commits, branchesPaths = data.branchesPaths;
	        commitMessagesX = data.commitMessagesX;
	        // Store data so we can re-render after offsets are computed.
	        lastData = data;
	        // Store $commits so we can compute offsets from actual height.
	        $commits = renderCommits(commits);
	        // Reset SVG with new content.
	        svg.innerHTML = "";
	        svg.appendChild(createG({
	            // Translate graph left => left-most branch label is not cropped (horizontal)
	            // Translate graph down => top-most commit tooltip is not cropped
	            translate: { x: PADDING_X, y: PADDING },
	            children: [renderBranchesPaths(branchesPaths), $commits],
	        }));
	    }
	    function adaptSvgOnUpdate() {
	        var observer = new MutationObserver(function () {
	            if (shouldRecomputeOffsets) {
	                shouldRecomputeOffsets = false;
	                computeOffsets();
	                render(lastData);
	            }
	            else {
	                positionCommitsElements();
	                adaptGraphDimensions();
	            }
	        });
	        observer.observe(svg, {
	            attributes: false,
	            // Listen to subtree changes to react when we append the tooltip.
	            subtree: true,
	            childList: true,
	        });
	        function computeOffsets() {
	            var commits = Array.from($commits.children);
	            var totalOffsetY = 0;
	            // In VerticalReverse orientation, commits are in the same order in the DOM.
	            var orientedCommits = gitgraph.orientation === lib_12.VerticalReverse
	                ? commits
	                : commits.reverse();
	            commitYWithOffsets = orientedCommits.reduce(function (newOffsets, commit) {
	                var commitY = parseInt(commit
	                    .getAttribute("transform")
	                    .split(",")[1]
	                    .slice(0, -1), 10);
	                var firstForeignObject = commit.getElementsByTagName("foreignObject")[0];
	                var customHtmlMessage = firstForeignObject && firstForeignObject.firstElementChild;
	                newOffsets[commitY] = commitY + totalOffsetY;
	                // Increment total offset after setting the offset
	                // => offset next commits accordingly.
	                totalOffsetY += getMessageHeight(customHtmlMessage);
	                return newOffsets;
	            }, {});
	        }
	        function positionCommitsElements() {
	            if (gitgraph.isHorizontal) {
	                // Elements don't appear on horizontal mode, yet.
	                return;
	            }
	            var padding = 10;
	            // Ensure commits elements (branch labels, message…) are well positionned.
	            // It can't be done at render time since elements size is dynamic.
	            Object.keys(commitsElements).forEach(function (commitHash) {
	                var _a = commitsElements[commitHash], branchLabel = _a.branchLabel, tags = _a.tags, message = _a.message;
	                // We'll store X position progressively and translate elements.
	                var x = commitMessagesX;
	                if (branchLabel) {
	                    moveElement(branchLabel, x);
	                    // BBox width misses box padding
	                    // => they are set later, on branch label update.
	                    // We would need to make branch label update happen before to solve it.
	                    var branchLabelWidth = branchLabel.getBBox().width + 2 * PADDING_X;
	                    x += branchLabelWidth + padding;
	                }
	                tags.forEach(function (tag) {
	                    moveElement(tag, x);
	                    // BBox width misses box padding and offset
	                    // => they are set later, on tag update.
	                    // We would need to make tag update happen before to solve it.
	                    var offset = parseFloat(tag.getAttribute("data-offset") || "0");
	                    var tagWidth = tag.getBBox().width + 2 * PADDING_X$1 + offset;
	                    x += tagWidth + padding;
	                });
	                if (message) {
	                    moveElement(message, x);
	                }
	            });
	        }
	        function adaptGraphDimensions() {
	            var _a = svg.getBBox(), height = _a.height, width = _a.width;
	            // FIXME: In horizontal mode, we mimic @gitgraph/react behavior
	            // => it gets re-rendered after offsets are computed
	            // => it applies paddings twice!
	            //
	            // It works… by chance. Technically, we should compute what would
	            // *actually* go beyond the computed limits of the graph.
	            var horizontalCustomOffset = 50;
	            var widthOffset = gitgraph.isHorizontal
	                ? horizontalCustomOffset
	                : // Add `TOOLTIP_PADDING` so we don't crop the tooltip text.
	                    // Add `BRANCH_LABEL_PADDING_X` so we don't cut branch label.
	                    PADDING_X + PADDING;
	            var heightOffset = gitgraph.isHorizontal
	                ? horizontalCustomOffset
	                : // Add `TOOLTIP_PADDING` so we don't crop tooltip text
	                    // Add `BRANCH_LABEL_PADDING_Y` so we don't crop branch label.
	                    PADDING_Y + PADDING;
	            svg.setAttribute("width", (width + widthOffset).toString());
	            svg.setAttribute("height", (height + heightOffset).toString());
	        }
	    }
	    function moveElement(target, x) {
	        var transform = target.getAttribute("transform") || "translate(0, 0)";
	        target.setAttribute("transform", transform.replace(/translate\(([\d\.]+),/, "translate(" + x + ","));
	    }
	    function renderBranchesPaths(branchesPaths) {
	        var offset = gitgraph.template.commit.dot.size;
	        var isBezier = gitgraph.template.branch.mergeStyle === lib_9.Bezier;
	        var paths = Array.from(branchesPaths).map(function (_a) {
	            var branch = _a[0], coordinates = _a[1];
	            return createPath({
	                d: lib_13(coordinates.map(function (coordinate) { return coordinate.map(getWithCommitOffset); }), isBezier, gitgraph.isVertical),
	                fill: "transparent",
	                stroke: branch.computedColor || "",
	                strokeWidth: branch.style.lineWidth,
	                translate: {
	                    x: offset,
	                    y: offset,
	                },
	            });
	        });
	        return createG({ children: paths });
	    }
	    function renderCommits(commits) {
	        return createG({ children: commits.map(renderCommit) });
	        function renderCommit(commit) {
	            var _a = getWithCommitOffset(commit), x = _a.x, y = _a.y;
	            return createG({
	                translate: { x: x, y: y },
	                children: [
	                    renderDot(commit)
	                ].concat(renderArrows(commit), [
	                    createG({
	                        translate: { x: -x, y: 0 },
	                        children: [
	                            renderMessage(commit)
	                        ].concat(renderBranchLabels(commit), renderTags(commit)),
	                    }),
	                ]),
	            });
	        }
	        function renderArrows(commit) {
	            if (!gitgraph.template.arrow.size) {
	                return [null];
	            }
	            var commitRadius = commit.style.dot.size;
	            return commit.parents.map(function (parentHash) {
	                var parent = commits.find(function (_a) {
	                    var hash = _a.hash;
	                    return hash === parentHash;
	                });
	                if (!parent)
	                    return null;
	                // Starting point, relative to commit
	                var origin = gitgraph.reverseArrow
	                    ? {
	                        x: commitRadius + (parent.x - commit.x),
	                        y: commitRadius + (parent.y - commit.y),
	                    }
	                    : { x: commitRadius, y: commitRadius };
	                var path = createPath({
	                    d: lib_14(gitgraph, parent, commit),
	                    fill: gitgraph.template.arrow.color || "",
	                });
	                return createG({ translate: origin, children: [path] });
	            });
	        }
	    }
	    function renderMessage(commit) {
	        if (!commit.style.message.display) {
	            return null;
	        }
	        var message;
	        if (commit.renderMessage) {
	            message = createG({ children: [] });
	            // Add message after observer is set up => react based on body height.
	            // We might refactor it by including `onChildrenUpdate()` to `createG()`.
	            adaptMessageBodyHeight(message);
	            message.appendChild(commit.renderMessage(commit));
	            setMessageRef(commit, message);
	            return message;
	        }
	        var text = createText({
	            content: commit.message,
	            fill: commit.style.message.color || "",
	            font: commit.style.message.font,
	            onClick: commit.onMessageClick,
	        });
	        message = createG({
	            translate: { x: 0, y: commit.style.dot.size },
	            children: [text],
	        });
	        if (commit.body) {
	            var body = createForeignObject({
	                width: 600,
	                translate: { x: 10, y: 0 },
	                content: commit.body,
	            });
	            // Add message after observer is set up => react based on body height.
	            // We might refactor it by including `onChildrenUpdate()` to `createG()`.
	            adaptMessageBodyHeight(message);
	            message.appendChild(body);
	        }
	        setMessageRef(commit, message);
	        return message;
	    }
	    function adaptMessageBodyHeight(message) {
	        var observer = new MutationObserver(function (mutations) {
	            mutations.forEach(function (_a) {
	                var target = _a.target;
	                return setChildrenForeignObjectHeight(target);
	            });
	        });
	        observer.observe(message, {
	            attributes: false,
	            subtree: false,
	            childList: true,
	        });
	        function setChildrenForeignObjectHeight(node) {
	            if (node.nodeName === "foreignObject") {
	                // We have to access the first child's parentElement to retrieve
	                // the Element instead of the Node => we can compute dimensions.
	                var foreignObject = node.firstChild && node.firstChild.parentElement;
	                if (!foreignObject)
	                    return;
	                // Force the height of the foreignObject (browser issue)
	                foreignObject.setAttribute("height", getMessageHeight(foreignObject.firstElementChild).toString());
	            }
	            node.childNodes.forEach(setChildrenForeignObjectHeight);
	        }
	    }
	    function renderBranchLabels(commit) {
	        // @gitgraph/core could compute branch labels into commits directly.
	        // That will make it easier to retrieve them, just like tags.
	        var branches = Array.from(gitgraph.branches.values());
	        return branches.map(function (branch) {
	            if (!branch.style.label.display)
	                return null;
	            if (!gitgraph.branchLabelOnEveryCommit) {
	                var commitHash = gitgraph.refs.getCommit(branch.name);
	                if (commit.hash !== commitHash)
	                    return null;
	            }
	            // For the moment, we don't handle multiple branch labels.
	            // To do so, we'd need to reposition each of them appropriately.
	            if (commit.branchToDisplay !== branch.name)
	                return null;
	            var branchLabel = branch.renderLabel
	                ? branch.renderLabel(branch)
	                : createBranchLabel(branch, commit);
	            var branchLabelContainer;
	            if (gitgraph.isVertical) {
	                branchLabelContainer = createG({
	                    children: [branchLabel],
	                });
	            }
	            else {
	                var commitDotSize = commit.style.dot.size * 2;
	                var horizontalMarginTop = 10;
	                branchLabelContainer = createG({
	                    translate: { x: commit.x, y: commitDotSize + horizontalMarginTop },
	                    children: [branchLabel],
	                });
	            }
	            setBranchLabelRef(commit, branchLabelContainer);
	            return branchLabelContainer;
	        });
	    }
	    function renderTags(commit) {
	        if (!commit.tags)
	            return [];
	        if (gitgraph.isHorizontal)
	            return [];
	        return commit.tags.map(function (tag) {
	            var tagElement = tag.render
	                ? tag.render(tag.name, tag.style)
	                : createTag(tag);
	            var tagContainer = createG({
	                translate: { x: 0, y: commit.style.dot.size },
	                children: [tagElement],
	            });
	            // `data-offset` is used to position tag element in `positionCommitsElements`.
	            // => because when it's executed, tag offsets are not resolved yet
	            tagContainer.setAttribute("data-offset", tag.style.pointerWidth.toString());
	            setTagRef(commit, tagContainer);
	            return tagContainer;
	        });
	    }
	    function renderDot(commit) {
	        if (commit.renderDot) {
	            return commit.renderDot(commit);
	        }
	        /*
	        In order to handle strokes, we need to do some complex stuff here… 😅
	    
	        Problem: strokes are drawn inside & outside the circle.
	        But we want the stroke to be drawn inside only!
	    
	        The outside overlaps with other elements, as we expect the dot to have a fixed size. So we want to crop the outside part.
	    
	        Solution:
	        1. Create the circle in a <defs>
	        2. Define a clip path that references the circle
	        3. Use the clip path, adding the stroke.
	        4. Double stroke width as half of it will be clipped (the outside part).
	    
	        Ref.: https://stackoverflow.com/a/32162431/3911841
	    
	        P.S. there is a proposal for a stroke-alignment property,
	        but it's still a W3C Draft ¯\_(ツ)_/¯
	        https://svgwg.org/specs/strokes/#SpecifyingStrokeAlignment
	      */
	        var circleId = commit.hash;
	        var circle = createCircle({
	            id: circleId,
	            radius: commit.style.dot.size,
	            fill: commit.style.dot.color || "",
	        });
	        var clipPathId = "clip-" + commit.hash;
	        var circleClipPath = createClipPath();
	        circleClipPath.setAttribute("id", clipPathId);
	        circleClipPath.appendChild(createUse(circleId));
	        var useCirclePath = createUse(circleId);
	        useCirclePath.setAttribute("clip-path", "url(#" + clipPathId + ")");
	        useCirclePath.setAttribute("stroke", commit.style.dot.strokeColor || "");
	        var strokeWidth = commit.style.dot.strokeWidth
	            ? commit.style.dot.strokeWidth * 2
	            : 0;
	        useCirclePath.setAttribute("stroke-width", strokeWidth.toString());
	        var dotText = commit.dotText
	            ? createText({
	                content: commit.dotText,
	                font: commit.style.dot.font,
	                anchor: "middle",
	                translate: { x: commit.style.dot.size, y: commit.style.dot.size },
	            })
	            : null;
	        return createG({
	            onClick: commit.onClick,
	            onMouseOver: function () {
	                appendTooltipToGraph(commit);
	                commit.onMouseOver();
	            },
	            onMouseOut: function () {
	                if ($tooltip)
	                    $tooltip.remove();
	                commit.onMouseOut();
	            },
	            children: [createDefs([circle, circleClipPath]), useCirclePath, dotText],
	        });
	    }
	    function appendTooltipToGraph(commit) {
	        if (!svg.firstChild)
	            return;
	        if (gitgraph.isVertical && gitgraph.mode !== lib_2.Compact)
	            return;
	        if (gitgraph.isVertical && !commit.style.hasTooltipInCompactMode)
	            return;
	        var tooltip = commit.renderTooltip
	            ? commit.renderTooltip(commit)
	            : createTooltip(commit);
	        $tooltip = createG({
	            translate: getWithCommitOffset(commit),
	            children: [tooltip],
	        });
	        svg.firstChild.appendChild($tooltip);
	    }
	    function getWithCommitOffset(_a) {
	        var x = _a.x, y = _a.y;
	        return { x: x, y: commitYWithOffsets[y] || y };
	    }
	    function setBranchLabelRef(commit, branchLabels) {
	        if (!commitsElements[commit.hashAbbrev]) {
	            initCommitElements(commit);
	        }
	        commitsElements[commit.hashAbbrev].branchLabel = branchLabels;
	    }
	    function setMessageRef(commit, message) {
	        if (!commitsElements[commit.hashAbbrev]) {
	            initCommitElements(commit);
	        }
	        commitsElements[commit.hashAbbrev].message = message;
	    }
	    function setTagRef(commit, tag) {
	        if (!commitsElements[commit.hashAbbrev]) {
	            initCommitElements(commit);
	        }
	        commitsElements[commit.hashAbbrev].tags.push(tag);
	    }
	    function initCommitElements(commit) {
	        commitsElements[commit.hashAbbrev] = {
	            branchLabel: null,
	            tags: [],
	            message: null,
	        };
	    }
	}
	function getMessageHeight(message) {
	    var messageHeight = 0;
	    if (message) {
	        var height = message.getBoundingClientRect().height;
	        var marginTopInPx = window.getComputedStyle(message).marginTop || "0px";
	        var marginTop = parseInt(marginTopInPx.replace("px", ""), 10);
	        messageHeight = height + marginTop;
	    }
	    return messageHeight;
	}

	exports.MergeStyle = lib_9;
	exports.Mode = lib_2;
	exports.Orientation = lib_12;
	exports.TemplateName = lib_10;
	exports.createGitgraph = createGitgraph;
	exports.templateExtend = lib_11;

	Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],"node_modules/@gitgraph/core/lib/orientation.js":[function(require,module,exports) {
"use strict";
// Extracted from `gitgraph.ts` because it caused `utils` tests to fail
// because of circular dependency between `utils` and `template`.
// It's not clear why (the circular dependency still exist) but `Orientation`
// was the only one causing issue. Maybe because it's an enum?
Object.defineProperty(exports, "__esModule", { value: true });
var Orientation;
(function (Orientation) {
    Orientation["VerticalReverse"] = "vertical-reverse";
    Orientation["Horizontal"] = "horizontal";
    Orientation["HorizontalReverse"] = "horizontal-reverse";
})(Orientation = exports.Orientation || (exports.Orientation = {}));

},{}],"node_modules/@gitgraph/core/lib/utils.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orientation_1 = require("./orientation");
/**
 * Provide a default value to a boolean.
 * @param value
 * @param defaultValue
 */
function booleanOptionOr(value, defaultValue) {
    return typeof value === "boolean" ? value : defaultValue;
}
exports.booleanOptionOr = booleanOptionOr;
/**
 * Provide a default value to a number.
 * @param value
 * @param defaultValue
 */
function numberOptionOr(value, defaultValue) {
    return typeof value === "number" ? value : defaultValue;
}
exports.numberOptionOr = numberOptionOr;
/**
 * Creates an object composed of the picked object properties.
 * @param obj The source object
 * @param paths The property paths to pick
 */
function pick(obj, paths) {
    return Object.assign({}, paths.reduce((mem, key) => (Object.assign({}, mem, { [key]: obj[key] })), {}));
}
exports.pick = pick;
/**
 * Print a light version of commits into the console.
 * @param commits List of commits
 * @param paths The property paths to pick
 */
function debug(commits, paths) {
    // tslint:disable-next-line:no-console
    console.log(JSON.stringify(commits.map((commit) => pick(commit, paths)), null, 2));
}
exports.debug = debug;
/**
 * Return true if is undefined.
 *
 * @param obj
 */
function isUndefined(obj) {
    return obj === undefined;
}
exports.isUndefined = isUndefined;
/**
 * Return a version of the object without any undefined keys.
 *
 * @param obj
 */
function withoutUndefinedKeys(obj = {}) {
    return Object.keys(obj).reduce((mem, key) => isUndefined(obj[key]) ? mem : Object.assign({}, mem, { [key]: obj[key] }), {});
}
exports.withoutUndefinedKeys = withoutUndefinedKeys;
/**
 * Return a string ready to use in `svg.path.d` to draw an arrow from params.
 *
 * @param graph Graph context
 * @param parent Parent commit of the target commit
 * @param commit Target commit
 */
function arrowSvgPath(graph, parent, commit) {
    const commitRadius = commit.style.dot.size;
    const size = graph.template.arrow.size;
    const h = commitRadius + graph.template.arrow.offset;
    // Delta between left & right (radian)
    const delta = Math.PI / 7;
    // Alpha angle between parent & commit (radian)
    const alpha = getAlpha(graph, parent, commit);
    // Top
    const x1 = h * Math.cos(alpha);
    const y1 = h * Math.sin(alpha);
    // Bottom right
    const x2 = (h + size) * Math.cos(alpha - delta);
    const y2 = (h + size) * Math.sin(alpha - delta);
    // Bottom center
    const x3 = (h + size / 2) * Math.cos(alpha);
    const y3 = (h + size / 2) * Math.sin(alpha);
    // Bottom left
    const x4 = (h + size) * Math.cos(alpha + delta);
    const y4 = (h + size) * Math.sin(alpha + delta);
    return `M${x1},${y1} L${x2},${y2} Q${x3},${y3} ${x4},${y4} L${x4},${y4}`;
}
exports.arrowSvgPath = arrowSvgPath;
function getAlpha(graph, parent, commit) {
    const deltaX = parent.x - commit.x;
    const deltaY = parent.y - commit.y;
    const commitSpacing = graph.template.commit.spacing;
    let alphaY;
    let alphaX;
    // Angle usually start from previous commit Y position:
    //
    // o
    // ↑ ↖ ︎
    // o  |  <-- path is straight until last commit Y position
    // ↑  o
    // | ↗︎
    // o
    //
    // So we can to default to commit spacing.
    // For horizontal orientation => same with commit X position.
    switch (graph.orientation) {
        case orientation_1.Orientation.Horizontal:
            alphaY = deltaY;
            alphaX = -commitSpacing;
            break;
        case orientation_1.Orientation.HorizontalReverse:
            alphaY = deltaY;
            alphaX = commitSpacing;
            break;
        case orientation_1.Orientation.VerticalReverse:
            alphaY = -commitSpacing;
            alphaX = deltaX;
            break;
        default:
            alphaY = commitSpacing;
            alphaX = deltaX;
            break;
    }
    // If commit is distant from its parent, there should be no angle.
    //
    //    o ︎
    //    ↑  <-- arrow is like previous commit was on same X position
    // o  |
    // | /
    // o
    //
    // For horizontal orientation => same with commit Y position.
    if (graph.isVertical) {
        if (Math.abs(deltaY) > commitSpacing)
            alphaX = 0;
    }
    else {
        if (Math.abs(deltaX) > commitSpacing)
            alphaY = 0;
    }
    if (graph.reverseArrow) {
        alphaY *= -1;
        alphaX *= -1;
    }
    return Math.atan2(alphaY, alphaX);
}

},{"./orientation":"node_modules/@gitgraph/core/lib/orientation.js"}],"node_modules/@gitgraph/core/lib/template.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Branch merge style enum
 */
var MergeStyle;
(function (MergeStyle) {
    MergeStyle["Bezier"] = "bezier";
    MergeStyle["Straight"] = "straight";
})(MergeStyle || (MergeStyle = {}));
exports.MergeStyle = MergeStyle;
exports.DEFAULT_FONT = "normal 12pt Calibri";
/**
 * Gitgraph template
 *
 * Set of design rules for the rendering.
 */
class Template {
    constructor(options) {
        // Options
        options.branch = options.branch || {};
        options.branch.label = options.branch.label || {};
        options.arrow = options.arrow || {};
        options.commit = options.commit || {};
        options.commit.dot = options.commit.dot || {};
        options.commit.message = options.commit.message || {};
        // One color per column
        this.colors = options.colors || ["#000000"];
        // Branch style
        this.branch = {
            color: options.branch.color,
            lineWidth: options.branch.lineWidth || 2,
            mergeStyle: options.branch.mergeStyle || MergeStyle.Bezier,
            spacing: utils_1.numberOptionOr(options.branch.spacing, 20),
            label: {
                display: utils_1.booleanOptionOr(options.branch.label.display, true),
                color: options.branch.label.color || options.commit.color,
                strokeColor: options.branch.label.strokeColor || options.commit.color,
                bgColor: options.branch.label.bgColor || "white",
                font: options.branch.label.font ||
                    options.commit.message.font ||
                    exports.DEFAULT_FONT,
                borderRadius: utils_1.numberOptionOr(options.branch.label.borderRadius, 10),
            },
        };
        // Arrow style
        this.arrow = {
            size: options.arrow.size || null,
            color: options.arrow.color || null,
            offset: options.arrow.offset || 2,
        };
        // Commit style
        this.commit = {
            color: options.commit.color,
            spacing: utils_1.numberOptionOr(options.commit.spacing, 25),
            hasTooltipInCompactMode: utils_1.booleanOptionOr(options.commit.hasTooltipInCompactMode, true),
            dot: {
                color: options.commit.dot.color || options.commit.color,
                size: options.commit.dot.size || 3,
                strokeWidth: utils_1.numberOptionOr(options.commit.dot.strokeWidth, 0),
                strokeColor: options.commit.dot.strokeColor,
                font: options.commit.dot.font ||
                    options.commit.message.font ||
                    "normal 10pt Calibri",
            },
            message: {
                display: utils_1.booleanOptionOr(options.commit.message.display, true),
                displayAuthor: utils_1.booleanOptionOr(options.commit.message.displayAuthor, true),
                displayHash: utils_1.booleanOptionOr(options.commit.message.displayHash, true),
                color: options.commit.message.color || options.commit.color,
                font: options.commit.message.font || exports.DEFAULT_FONT,
            },
        };
        // Tag style
        // This one is computed in the Tag instance. It needs Commit style
        // that is partially computed at runtime (for colors).
        this.tag = options.tag || {};
    }
}
exports.Template = Template;
/**
 * Black arrow template
 */
const blackArrowTemplate = new Template({
    colors: ["#6963FF", "#47E8D4", "#6BDB52", "#E84BA5", "#FFA657"],
    branch: {
        color: "#000000",
        lineWidth: 4,
        spacing: 50,
        mergeStyle: MergeStyle.Straight,
    },
    commit: {
        spacing: 60,
        dot: {
            size: 16,
            strokeColor: "#000000",
            strokeWidth: 4,
        },
        message: {
            color: "black",
        },
    },
    arrow: {
        size: 16,
        offset: -1.5,
    },
});
exports.blackArrowTemplate = blackArrowTemplate;
/**
 * Metro template
 */
const metroTemplate = new Template({
    colors: ["#979797", "#008fb5", "#f1c109"],
    branch: {
        lineWidth: 10,
        spacing: 50,
    },
    commit: {
        spacing: 80,
        dot: {
            size: 14,
        },
        message: {
            font: "normal 14pt Arial",
        },
    },
});
exports.metroTemplate = metroTemplate;
var TemplateName;
(function (TemplateName) {
    TemplateName["Metro"] = "metro";
    TemplateName["BlackArrow"] = "blackarrow";
})(TemplateName || (TemplateName = {}));
exports.TemplateName = TemplateName;
/**
 * Extend an existing template with new options.
 *
 * @param selectedTemplate Template to extend
 * @param options Template options
 */
function templateExtend(selectedTemplate, options) {
    const template = getTemplate(selectedTemplate);
    if (!options.branch)
        options.branch = {};
    if (!options.commit)
        options.commit = {};
    // This is tedious, but it seems acceptable so we don't need lodash
    // as we want to keep bundlesize small.
    return {
        colors: options.colors || template.colors,
        arrow: Object.assign({}, template.arrow, options.arrow),
        branch: Object.assign({}, template.branch, options.branch, { label: Object.assign({}, template.branch.label, options.branch.label) }),
        commit: Object.assign({}, template.commit, options.commit, { dot: Object.assign({}, template.commit.dot, options.commit.dot), message: Object.assign({}, template.commit.message, options.commit.message) }),
        tag: Object.assign({}, template.tag, options.tag),
    };
}
exports.templateExtend = templateExtend;
/**
 * Resolve the template to use regarding given `template` value.
 *
 * @param template Selected template name, or instance.
 */
function getTemplate(template) {
    if (!template)
        return metroTemplate;
    if (typeof template === "string") {
        return {
            [TemplateName.BlackArrow]: blackArrowTemplate,
            [TemplateName.Metro]: metroTemplate,
        }[template];
    }
    return template;
}
exports.getTemplate = getTemplate;

},{"./utils":"node_modules/@gitgraph/core/lib/utils.js"}],"node_modules/color-name/index.js":[function(require,module,exports) {
'use strict'

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

},{}],"node_modules/simple-swizzle/node_modules/is-arrayish/index.js":[function(require,module,exports) {
module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};

},{}],"node_modules/simple-swizzle/index.js":[function(require,module,exports) {
'use strict';

var isArrayish = require('is-arrayish');

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};

},{"is-arrayish":"node_modules/simple-swizzle/node_modules/is-arrayish/index.js"}],"node_modules/color-string/index.js":[function(require,module,exports) {
/* MIT license */
var colorNames = require('color-name');
var swizzle = require('simple-swizzle');

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}

},{"color-name":"node_modules/color-name/index.js","simple-swizzle":"node_modules/simple-swizzle/index.js"}],"node_modules/color-convert/conversions.js":[function(require,module,exports) {
/* MIT license */
var cssKeywords = require('color-name');

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};

},{"color-name":"node_modules/color-name/index.js"}],"node_modules/color-convert/route.js":[function(require,module,exports) {
var conversions = require('./conversions');

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};


},{"./conversions":"node_modules/color-convert/conversions.js"}],"node_modules/color-convert/index.js":[function(require,module,exports) {
var conversions = require('./conversions');
var route = require('./route');

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;

},{"./conversions":"node_modules/color-convert/conversions.js","./route":"node_modules/color-convert/route.js"}],"node_modules/color/index.js":[function(require,module,exports) {
'use strict';

var colorString = require('color-string');
var convert = require('color-convert');

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		if (!mixinColor || !mixinColor.rgb) {
			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
		}
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;

},{"color-string":"node_modules/color-string/index.js","color-convert":"node_modules/color-convert/index.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _js = require("@gitgraph/js");

var _template = require("@gitgraph/core/lib/template");

var Color = require('color');

var c = {
  master: new Color('#607d8b'),
  // blueGrey
  develop: new Color('#2196f3'),
  // blue
  feature: new Color('#4caf50'),
  // green
  release: new Color('#ffc107'),
  // amber
  qa: new Color('#9e9e9e'),
  //grey
  bugfix: new Color('#e91e63'),
  // pink
  hotfix: new Color('#9c27b0') // purple

}; // Get the graph container HTML element.

var graphContainer = document.getElementById("graph-container");
var customTemplate = (0, _js.templateExtend)('metro', {
  commit: {
    message: {
      displayAuthor: false,
      displayHash: false
    }
  },
  colors: [c.master.hex(), c.develop.hex(), c.feature.hex(), c.release.hex(), c.qa.hex(), c.bugfix.hex(), c.hotfix.hex()]
}); // Instantiate the graph.

var gg = (0, _js.createGitgraph)(graphContainer, {
  template: customTemplate,
  orientation: 'vertical',
  // mode: compact,
  // reverseArrow: false,
  // initCommitOffsetX?: number;
  // initCommitOffsetY?: number;
  author: 'J Smith' // branchLabelOnEveryCommit: true,

});
/***************************************************************************
 * MASTER AND DEVELOP BRANCHES
 ***************************************************************************
 * - Init repository with two historical, long-lived branches:
 *    - master
 *    - develop
 * - Create a release v1.0.0 for reference
 **************************************************************************/

var master = gg.branch('master').commit('First commit on master');
var develop = gg.branch({
  name: 'develop',
  from: master
}).commit('First commit on develop');
/***************************************************************************
 * FEATURE BRANCHES
 ***************************************************************************
 * - Create two feature branches, each with one commit:
 *    - feature/feature-a
 *    - feature/feature-b
 * - Merge feature/feature-a into develop
 * - Merge feature/feature-b into develop
 **************************************************************************/

var featureA = gg.branch({
  name: 'feature/feature-a',
  from: develop
}).commit('Feature A commit one');
develop.merge(featureA);
/***************************************************************************
 * RELEASE CYCLE: RELEASE AND QA BRANCHES
 ***************************************************************************
 *  - Start a release cycle by creating a release branch from develop:
 *      - release/1.0.0 (with a commit for bumping version numbers)
 *  - Create a QA branch from the release branch
 *      - qa
 **************************************************************************/

var release = gg.branch({
  name: 'release/1.0.0',
  from: develop
}).commit('Start release: Bump version numbers');
var qa = gg.branch({
  name: 'qa',
  from: release
}).commit('Start qa: reference only');
/***************************************************************************
 * RELEASE CYCLE: BUGFIX BRANCHES
 ***************************************************************************
 *  - Create a bugfix branch off release:
 *    - bugfix/bugfix-a
 *  - Merge bugfix/bugfix-a into release
 *  - Create another bugfix branch off release
 *    - bugfix/bugfix-b
 *  - Merge release branch into qa for testing,
 *  - Merge last bugfix into release
 *  - Merge release into qa to reveiew bugfixes
 **************************************************************************/

var bugfixA = gg.branch({
  name: 'bugfix/bugfix-a',
  from: release
}).commit('Bugfix A first commit');
release.merge(bugfixA);
qa.merge(release);
/***************************************************************************
 * RELEASE CYCLE: FINISH QA AND RELEASE BRANCHES
 ***************************************************************************
 * - Merge release branch into master with tagged commit
 * - Merge release branch into develop to get bugfixes into develop
 **************************************************************************/

release.commit('Finished with release');
develop.merge(release);
var v2_tagged = master.merge(release).tag("1.0.0");
/***************************************************************************
 * HOTFIX BRANCHES
 ***************************************************************************
 * - Create hotfix branch on master
 * - Merge hotfix branch into master and develop
 **************************************************************************/

var hotfixA = gg.branch({
  name: 'hotfix/hotfix-a',
  from: v2_tagged
}).commit('Hotfix first commit');
master.merge(hotfixA).tag("1.0.1");
develop.merge(hotfixA); // Examples:
// Branch

/**
  const master = gg.branch({
    name: 'master',
    style: {
     }
  });
 */
// Commit

/**
  master.commit({
    subject: 'Initial commit',
    body: "This is the inital commit on master",
    dotText: "❤️",
    tag: "v1.2",
    style: {
     }
  });
*/
// Merge

/**
  master.merge({
    branch: develop,
    fastForward: true,
    commitOptions: {
      // Every valid `options` for a commit
    },
  });
*/
},{"@gitgraph/js":"node_modules/@gitgraph/js/lib/gitgraph.umd.js","@gitgraph/core/lib/template":"node_modules/@gitgraph/core/lib/template.js","color":"node_modules/color/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44945" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map