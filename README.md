# canvas-scratch-card

scratch card plugin base on Canvas,Compatible with pc and mobile

## how to use?

```javascript
import scratchCard from 'canvas-scratch-card';
scratchCard.init({
  dom: document.getElementById('id'),
  r: 20, // radius default 20
  rate: 0.5, // when to call callback 0.1 - 1,
  image: 'https://xxxx.jpg', // <img> dom or url
  fillColor: '#b22', // fillColor, when this prop set, image will not render
  callback: () => {
    alert('haha');
  },
});

// reset
scratchCard.reset();
```

## example

![pc & mobile](./assets/example.gif)
