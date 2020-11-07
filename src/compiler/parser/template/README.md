# Tag
A Template parser is used to parse the component's template and its nested HTML.

It uses the Tag and Text parser to parse the template.

## To do:
[ ] Ignore whitespaces: 
```html
<div class="card">
    <h3 class="card-title">Hello     internet!</h3>
 <p class="card-text">Awesome stuff!!</p>
</p>

```

## Examples that currently work:
**Nested code**
```html
<div class="card"><h3 class="card-title">Hello internet!</h3><p class="card-text">Awesome stuff!!</p></p>
```
