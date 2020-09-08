# Playing cards svg

The SVG embedded in this project comes from [https://github.com/htdebeer/SVG-cards](https://github.com/htdebeer/SVG-cards), after a little optmization via [SVGOMG](https://jakearchibald.github.io/svgomg/)

In order to use them:

```jsx
import svgCards from '[RELATIVE_PATH_TO_ASSETS]/svg-cards-optimized.svg';

<svg viewBox="0 0 171 251" className={classes.svgStyle}>
    <use xlinkHref={`${svgCards}#joker_black`} />
</svg>
```

The various cards have the following names:

* Jokers: joker_black and joker_red
* Back card: back or alternative-back
* Picture cards: {club,diamond,heart,spade}_{king,queen,jack}
* Pip cards:{club,diamond,heart,spade}_{1,2,3,4,5,6,7,8,9,10}

Examples:

* The ace of club is `club_1`.
* The queen of diamonds is `diamond_queen`.

The cards have the following natural positions:

* width: `169.075`
* height: `244.64`
* center: `(+98.0375, +122.320)`