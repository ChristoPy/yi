# Tag
A Tag parser is a parser responsible for parsing... yes, tags.

It uses a simple state machine to know where in the code it is parsing and start parsing another separate thing, like an attribute, and start where it needs, go back, and skip the space occupied by the attribute read previously.

## To do:
[ ] Add support to differentiate between a HTML attribute and a parameter: 
```html
<img :class="dynamicClass" source="logo.png"/>
```

## Examples that currently work:
**Opening tag**
```html
<br>
```

**Closing tag**
```html
</br>
```

**Self closing tags**
```html
<br/>
```

**Opening/Self closing tags with attribute**
```html
<img url="logo.png">
<img url="logo.png"/>
```

**Opening/Self closing tags with multiple attributes**
```html
<img url="logo.png" alt="A delicious slice of pizza on a plate">
<img url="logo.png" alt="A delicious slice of pizza on a plate"/>
```

**Opening/Self closing tags with overwritten attribute**
```html
<img url="logo.png" url="not-logo.png">
<img url="logo.png" url="not-logo.png"/>
```
