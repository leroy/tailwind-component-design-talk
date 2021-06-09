<template>
  <div>
    <div>
      <slot></slot>
    </div>

    <div class="flex gap-4">
      <div class="w-1/2">
        <slot name="left"></slot>
      </div>

      <div class="w-1/2">
        <slot name="right"></slot>
      </div>
    </div>

    <div>
      <slot name="after"></slot>
    </div>
  </div>
</template>