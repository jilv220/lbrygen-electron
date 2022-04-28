<template>
    <div class="dropdown dropdown-end dropdown-hover">
        <div class="cursor-pointer" tabindex="0">
            <slot name="btn-icon"></slot>
        </div>
        <div class="dropdown-content menu">
            <slot name="dropdown-content"></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.btn {
  background-color: unset !important;
  color: unset !important;
}
</style>