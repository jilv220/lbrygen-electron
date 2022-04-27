<template>
    <div class="dropdown dropdown-end">
        <label class="cursor-pointer" tabindex="0">
            <slot name="btn-icon"></slot>
        </label>
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
</style>