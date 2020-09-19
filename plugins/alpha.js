const plugin = require("tailwindcss/plugin");
const Color = require("color");
const _ = require("lodash");

const PREFIXES = {
  backgroundColors: ["bg"],
  textColors: ["text"],
  borderColors: ["border", "border-t", "border-r", "border-b", "border-l"],
  svgFill: ["fill"],
  svgStroke: ["stroke"]
};

const PROPERTIES = {
  backgroundColors: ["backgroundColor"],
  textColors: ["color"],
  borderColors: [
    "borderColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor"
  ],
  svgFill: ["fill"],
  svgStroke: ["stroke"]
};

module.exports = plugin(
  function ({ addUtilities, theme, variants }) {
    const options = theme("alpha", {});
    const pluginVariants = variants("alpha", []);
    Object.entries(options.opacity).forEach(([alphaKey, alphaValue]) => {
      let alphaValueFloat = parseFloat(alphaValue);
      if (alphaValueFloat === 0 || alphaValueFloat === 1) return null;
      Object.entries(options.modules).forEach(([moduleKey, moduleEnabled]) => {
        if (moduleEnabled === false) return;
        const colors = options.colors
          ? _.pick(theme("colors", []), options.colors)
          : theme("colors", {});
        const flatColors = _.flatMap(
          Object.entries(colors),
          ([colorKey, colorMapping]) =>
            _.isString(colorMapping)
              ? [[colorKey, colorMapping]]
              : Object.entries(colorMapping).map(([shadeKey, colorMapping]) => [
                  `${colorKey}-${shadeKey}`,
                  colorMapping
                ])
        );

        const utilities = flatColors
          .map(([colorKey, colorMapping]) => {
            try {
              let parsed = Color(colorMapping);
              if (parsed.valpha === 1) {
                return PREFIXES[moduleKey].map((prefix, i) => {
                  return {
                    [`.${prefix}-${colorKey}-${alphaKey}`]: {
                      [`${PROPERTIES[moduleKey][i]}`]: parsed
                        .alpha(alphaValueFloat)
                        .string()
                    }
                  };
                });
              }
            } catch (err) {
              return null;
            }
          })
          .filter(Boolean);
        addUtilities(utilities, pluginVariants);
      });
    });
  },
  {
    theme: {
      alpha: {
        modules: {
          backgroundColors: true,
          textColors: false,
          borderColors: false,
          svgFill: false,
          svgStroke: false
        },
        opacity: {}
      }
    },
    variants: {
      alpha: ["hover"]
    }
  }
);
