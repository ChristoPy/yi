# Tag
A Tag parser is a parser responsible for parsing... yes, tags.

It uses a simple state machine to know where in the code it is parsing and start parsing another separate thing, like an attribute, and start where it needs, go back, and skip the space occupied by the attribute read previously.

## To do:
[ ] Prevent bad unescaped HTML attribute value, like the following:
```html
<img class="'my-awesome class'"/>
```

[ ] Parse a tag content when the opening tag is closed and there is more data to parse, like:
```html
<h1>Site title</h1> <!-- The parser hangs up after parsing the first <h1> -->
```

[ ] Parse a tag content and *understand* where the data is bound:
```html
<h1>Welcome, {{ user.name }}!</h1>
```

[ ] Add support to differentiate between a HTML attribute and a parameter: 
```html
<img :class="dynamicClass" source="logo.png"/>
```

[ ] Sanitize attributes/parameters names:
```html
<img $-=source="logo.png"/> <!-- The parser thinks the attribute is '$-' <h1> -->
```
[ ] Parse nested tags recurssively?:
```html
<div class="card">
  <h3 class="card-title">Hello internet!</h3>
  <p class="card-text">Awesome stuff!!</p>
</p>
```

## Examples that currently work:
**Self closing tags**
```html
<br/>
```

**Self closing tags with attribute**
```html
<img url="logo.png"/>
```

**Self closing tags with multiple attributes**
```html
<img url="logo.png" alt="A delicious slice of pizza on a plate"/>
```

**Self closing tags with overwritten attribute**
```html
<img url="logo.png" url="not-logo.png"/>
```
