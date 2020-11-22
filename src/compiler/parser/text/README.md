# Text
A Text parser is used (until now) to parse text between tags.

It uses a state machine like the Tag parser to iterate over the tokens and know if it started parsing a text binding. Also at the end of the input it checks if the binding is closed.

## To do:
[ ] Parse complex text binding
```html
{{ user.preferedName || user.name }}
```

## Examples that currently work:
**Basic text node**
```html
Site title
```

**Basic text binding**
```html
{{ name }}
```

**Mix of normal text and text binding**
```html
Dear {{ name }}, your order #{{ orderNumber }} just shipped!
```
