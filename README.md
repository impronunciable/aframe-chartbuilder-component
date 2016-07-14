## aframe-chartbuilder-component

A component for using [ChartBuilder](http://quartz.github.io/Chartbuilder) charts in AFrame.

Here is a [basic example](http://impronunciable.github.io/aframe-chartbuilder-component/basic)

### Properties

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|    src      |    ChartBuilder json location         |   data.json          |

### Usage

#### Properties

The src property requires a path to a json file exported by ChartBuilder. It can be
local or remote.

#### Browser Installation

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.2.0/aframe.min.js"></script>
  <script src="https://rawgit.com/impronunciable/aframe-chartbuilder-component/master/dist/aframe-chartbuilder-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity chartbuilder="src: data.json"></a-entity>
  </a-scene>
</body>
```

#### NPM Installation

Install via NPM:

```bash
npm install aframe-chartbuilder-component
```

Then register and use.

```js
require('aframe');
require('aframe-chartbuilder-component');
```
