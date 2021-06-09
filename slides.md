---
theme: geist
highlighter: 'shiki'
---

# Component design

Reusable tailwind components

<div class="absolute right-0 bottom-0 pb-20 pr-20">

<div class="transform -rotate-15" v-click>
    Discussion & questions encouraged 😊
</div> 

</div>


---

# About

<v-clicks>

- ~~Tailwind vs. SCSS~~

- ~~Component design~~

- Tailwind herbruikbaar inzetten d.m.v. components

</v-clicks>

<!--
-

Dit is geen verdediging voor Tailwind.

-

In deze talk gaan we het hebben over het gebruik van componenten. Hierbij gaan we ervan uit dat je al een beetje begrijpt wat een component is en de meerwaarde daarvan.


-->

---

# The button

```html
<button class="button">
    Add to cart
</button>
```

```css
.button {
    padding: 4px 3px;
    border-radius: 4px;
    color: white;
    background-color: cyan;
    font-weight: bold;
}
```

<div class="flex space-x-4">

<button class="bg-cyan-500 text-sm font-bold text-white px-4 py-3 rounded">Add to cart</button>

<v-click>

<button class="bg-orange-500 text-sm font-bold text-white px-4 py-3 rounded">Add to cart</button> 

<button class="bg-gray-300 text-sm font-bold text-gray-700 px-4 py-3 rounded">Add to cart</button>

</v-click>

</div>

<!--
-

Button component
Heeft varianten

-

* Varianten laten zien *
-->

---
layout: 'compare'
---

# The button


:: left ::
```css
.button {
  &--primary {
    background-color: cyan;
    color: white;
  }

  &--secondary {
    background-color: orange;
    color: white;
  }

  &--plain {
    background-color: gray;
    color: darkgray;
  }
}
```

:: right ::

```html
<button class="button button--primary"></button>
```

```html
<button class="button button--secondary"></button>
```

```html
<button class="button button--plain"></button>
```



:: after ::
<div class="flex space-x-4">

<button class="bg-cyan-500 text-sm font-bold text-white px-4 py-3 rounded">Add to cart</button>

<button class="bg-orange-500 text-sm font-bold text-white px-4 py-3 rounded">Add to cart</button>

<button class="bg-gray-300 text-sm font-bold text-gray-700 px-4 py-3 rounded">Add to cart</button>

</div>

<!--
-

Met behulp van de BEM notatie kunnen we varianten toevoegen aan de button class
-->

---
layout: center
---

# Tailwind

- 

<!--
-

Hoe werkt dit in Tailwind
-->

---
layout: compare
---

# A comparison

::left::

```html
<button class="button button--primary">
    Add to cart
</button>
```

```html
<button class="button button--secondary">
    Add to cart
</button>
```


```html
<button class="button button--plain">
    Add to cart
</button>
```

::right:: 

```html
<button class="bg-cyan-500 text-white px-4 py-3 rounded">
    Add to cart
</button>
```

```html
<button class="bg-orange-500 text-white px-4 py-3 rounded">
    Add to cart
</button>
```

```html
<button class="bg-gray-300 text-gray-700 px-4 py-3 rounded">
    Add to cart
</button>
```

::after::

<div class="flex space-x-4">

<button class="bg-cyan-500 text-sm font-bold text-white px-4 py-3 rounded">Add to cart</button>

<button class="bg-orange-500 text-sm font-bold text-white px-4 py-3 rounded">Add to cart</button>

<button class="bg-gray-300 text-sm font-bold text-gray-700 px-4 py-3 rounded">Add to cart</button>

</div>

<!--
-

Tailwind lijkt aanvankelijk omslachtiger
Hoe kunnen we het hergebruik hiervan simpeler maken?
-->

---
layout: compare
---

# A solution

::left::

<div class="flex flex-col gap-4">

```html
<button class="bg-cyan-500 text-white px-4 py-3 rounded">
    Add to cart
</button>
```

```html
<button class="bg-orange-500 text-white px-4 py-3 rounded">
    Add to cart
</button>
```

```html
<button class="bg-gray-300 text-gray-700 px-4 py-3 rounded">
    Add to cart
</button>
```

</div>


::right::

<div class="flex flex-col gap-4">


```blade
<x-button primary>
    Add to Card
</x-button>
```

```blade
<x-button secondary>
    Add to Card
</x-button>
```


```blade
<x-button plain>
    Add to Card
</x-button>
```


</div>

<!--
-

Met de introductie van components en "custom properties" vatten we stukjes state samen in 1 flag.

We gebruiken components om de ownership van een stuk front-end op 1 plek vast te leggen

Maken gebruik van Laravel's Blade components.

Dit werkt ook voor Vue en React
-->

---

# Under the hood


```blade
@php
$classes = [];

if ($primary ?? false) {
    $classes[] = 'bg-cyan-500 text-white';
}

if ($secondary ?? false) {
    $classes[] = 'bg-orange-500 text-white';
}

if ($plain ?? false) {
    $classes[] = 'bg-gray-300 text-gray-700';
}
@endphp

<button class="px-4 py-3 rounded {{ implode(' ', $classes) }}">
    {{ $slot }}
</button>
```

<!--
-

Hoe ziet dat eruit?
Dit is een voorbeeld in blade
Maak gebruik van blade components
-->

---

# Defaults

```blade
<x-button></x-button>
```
<br> 

<div class="flex gap-4">
<button class="bg-cyan-500 text-sm font-bold text-white px-4 py-3 rounded">Add to cart</button>

<v-click>
<button class="bg-orange-500 text-sm font-bold text-white px-4 py-3 rounded">Add to cart</button>
<button class="bg-gray-300 text-sm text-gray-600 font-bold px-4 py-3 rounded">Add to cart</button>
</v-click>

</div>

<!--
-

Hoe bepalen we de default?
-->

---

```blade {all|4}
@php
$classes = [];

$primary = !($secondary && $plain);

if ($primary ?? false) {
    $classes[] = 'bg-cyan-500 text-white';
}

if ($secondary ?? false) {
    $classes[] = 'bg-orange-500 text-white';
}

if ($plain ?? false) {
    $classes[] = 'bg-gray-300 text-gray-700';
}
@endphp

<button class="px-4 py-3 rounded {{ implode(' ', $classes) }}">
    {{ $slot }}
</button>
```

<!--
-

Een verbeterde versie met een condition boven aan die primary op TRUE zet

-

* Licht de regel uit *

-
-->

---

```blade {4}
@php
$classes = [];

$primary = !($secondary && $tertiary && $plain && $outlined && $disabled);

if ($primary ?? false) {
    $classes[] = 'bg-cyan-500 text-white';
}

if ($secondary ?? false) {
    $classes[] = 'bg-orange-500 text-white';
}

if ($plain ?? false) {
    $classes[] = 'bg-gray-300 text-gray-700';
}
@endphp

<button class="px-4 py-3 rounded {{ implode(' ', $classes) }}">
    {{ $slot }}
</button>
```

<!--
-

Wat gebeurt er als we meer states toevoegen aan dit component?

Conclusie:

Het schaalt niet.
-->

---

# A type attribute

<div class="flex flex-col gap-4">

```html
<x-button type="primary"></x-button>
```

```html
<x-button type="secondary"></x-button>
```

```html
<x-button type="plain"></x-button>
```

</div>

<!--
-

Oplossing:

We groeperen alle states onder de noemer type.
-->

---

```blade {all|4|all}
@php
$classes = [];

switch($type ?? 'primary')
{
    case 'primary':
        $classes[] = 'bg-cyan-500 text-white';
        break;
    case 'secondary':
        $classes[] = 'bg-orange-500 text-white';
        break;
    case 'plain';
        $classes[] = 'bg-gray-300 text-gray-700';
        break;
}
@endphp

<button class="px-4 py-3 rounded {{ implode(' ', $classes) }}">
{{ $slot }}
</button>
```

<!--
- 

Met de introductie van een "type" kunnen we nu met een simpele null coaliscense operater een default defineren

Echter is deze code nog vrij bulky.
-->

---

```blade
<x-button type="primary">
    Add to cart
</button>
```

<v-clicks>

```blade
<x-button type="primary" size="large">
    Add to cart
</button>
```

```blade
<x-button type="primary" outlined>
    Add to cart
</button>
```

```blade
<x-button type="primary" submit>
    Add to cart
</button>
```

```blade
<x-button type="primary" href="{{ $url }}">
    Add to cart
</button>
```

```blade
<x-button type="primary" href="{{ $url }}" disabled="{{ auth()->user()->can('order') }}">
    Add to cart
</button>
```

</v-clicks>

<!--
-

Wat als we meerdere states toe voegen?

Voorbeeld laten zien van alle soorten states

Zowel logisch als qua stijling

Stijling:

- primary
- secondary
- outlined
- large


Logisch:

- submit
- href
- disabled
-->

---

```blade
@php

switch($type ?? 'primary')
{
    case 'primary':
        $classes[] = 'bg-cyan-500 text-white';
        break;
    case 'secondary':
        $classes[] = 'bg-orange-500 text-white';
        break;
    case 'plain';
        $classes[] = 'bg-gray-300 text-gray-700';
        break;
}

switch($size ?? 'medium')
{
    case 'small':
        $classes[] = 'px-2 py-1';
        break;
    case 'medium':
        $classes[] = 'px-4 py-3';
        break;
    case 'large';
        $classes[] = 'px-6 py-5';
        break;
}

@endphp

<button>
    {{ $slot }}
</button>


```

<!--
-

Probleem: Relatief veel code.
-->

---

```blade {all|7|15|all}
@php

$type = [
    'primary' => '',
    'secondary' => '',
    'plain' => ''
][$type ?? 'primary'];

$size = [
    'small' => '',
    'medium' => '',
    'large' => '',
][$size ?? 'medium'];

$classes = [$type, $size];

@endphp


<button class="{{ implode(' ', $classes) }}" @if($disabled) disabled @endif>
    {{ $slot }}
</button>

```

<!--
-

Een simpelere notatie

-

Licht eerste default regel uit


-

Licht de regel uit waarbij alle classes samen komen
-->

---

# Concept

```blade
@php

$classes->type()
            ->primary('bg-cyan-500 text-white')->default()
            ->secondary('bg-cyan-500 text-white')
            ->plain('bg-gray-300 text-gray-700')

$classes->size()
            ->small('px-2 py-1')
            ->medium('px-4 py-3')->default()
            ->large('px-6 py-4')
@endphp

<button {{ $classes }}>
    {{ $slot }}
</button>
```

<!--
-

Een concept waarbij we een package introduceren met een aantal helper functies om overzichtelijk components op te kunnen bouwen.
-->

---

# Usage

## Laravel 7+

- Built-in

## Laravel <= 6 / Themosis 2.0

```shell
composer require spatie/laravel-blade-x
```

<!--
-

Hoe gebruik ik dit?
-->

---
layout: 'center'
---

# Thanks for listening
